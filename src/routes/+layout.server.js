import { db } from "$lib/db.js";

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

    if (!user.length) {
        return data;
    }

    return { user: user[0], ...data };
}
