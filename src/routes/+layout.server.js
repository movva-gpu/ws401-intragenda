import { db } from "$lib/db.js";
import { faHome } from "@fortawesome/free-solid-svg-icons";

/** @type {import('@sveltejs/kit').Load}*/
export async function load({ url, cookies }) {
    const data = { reason: url.searchParams.get('r'), path: url.pathname }

    const sessionToken = cookies.get('session');

    if (!sessionToken || '' === sessionToken) return data;

    const user = await db.execute(
        `SELECT u.full_name AS name, u.email, u.role, f.name AS formation
        FROM users u
        LEFT JOIN formations f ON u.formation_id = f.id
        WHERE u.id = (SELECT user_id FROM connected_users WHERE token = ?)`,
        [sessionToken]
    );

    if (user.length) user[0].homeworks = await db.execute(
        `SELECT
            h.id,
            h.title,
            h.description,
            h.due_date,
            h.subject_id,
            h.created_at,
            h.updated_at,
            ufh.done as done,
            creator.full_name AS creator_name,
            creator.email AS creator_email,
            f.name AS creator_formation,
            s.name AS subject
        FROM homeworks h
        INNER JOIN user_follow_homeworks ufh ON h.id = ufh.homework_id
        INNER JOIN users creator ON h.user_id = creator.id
        INNER JOIN formations f ON creator.formation_id = f.id
        INNER JOIN subjects s ON h.subject_id = s.id
        WHERE ufh.user_id = (SELECT user_id FROM connected_users WHERE token = ?)`,
        [sessionToken]
    );

    const homeworks = await db.execute(
        `SELECT
            h.id,
            h.title,
            h.description,
            h.due_date,
            h.subject_id,
            h.created_at,
            h.updated_at,
            creator.full_name AS creator_name,
            creator.email AS creator_email,
            f.name AS creator_formation,
            s.name AS subject
        FROM homeworks h
        INNER JOIN users creator ON h.user_id = creator.id
        INNER JOIN formations f ON creator.formation_id = f.id
        INNER JOIN subjects s ON h.subject_id = s.id
        WHERE h.id NOT IN (SELECT homework_id FROM user_follow_homeworks WHERE user_id = (SELECT user_id FROM connected_users WHERE token = ?))`,
        [sessionToken]
    );

    if (!user.length) {
        return data;
    }

    return { user: user[0], homeworks, ...data };
}
