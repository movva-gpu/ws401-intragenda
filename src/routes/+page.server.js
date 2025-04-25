import { redirect } from "@sveltejs/kit";
import { db } from '$lib/db';

/** @type {import('@sveltejs/kit').Load} */
export async function load({ cookies }) {
    const sessionToken = cookies.get('session');
    if (!sessionToken) {
        return redirect(307, '/login')
    }
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
	    const data = await request.formData();
		const id = data.get('id');
		const hid = data.get('hid');
		const done = data.get('done');
		const follow = data.get('follow');
		const sessionToken = cookies.get('session');

		const users = await db.execute(
            `SELECT u.id as id, u.full_name AS name, u.email, u.role, f.name AS formation
            FROM users u
            LEFT JOIN formations f ON u.formation_id = f.id
            WHERE u.id = (SELECT user_id FROM connected_users WHERE token = ?) AND u.id = ?`,
            [sessionToken, id]
        );

		if (!users || users.length !== 1) {
			return { success: false, error: 'User not found' };
		}

		if (follow === 'on') {
            const ufh = await db.execute(
                `SELECT ufh.done as done
                FROM homeworks h
                INNER JOIN user_follow_homeworks ufh ON h.id = ufh.homework_id
                WHERE ufh.user_id = ? AND ufh.homework_id = ?`,
                [id, hid]
            );

            if (!ufh || ufh.length !== 1) await db.execute(
                `INSERT INTO user_follow_homeworks (user_id, homework_id, done) VALUES (?, ?, ?)`,
                [id, hid, done === 'on']
            ); else await db.execute(
                `UPDATE user_follow_homeworks SET done = ? WHERE user_id = ? AND homework_id = ?`,
                [done === 'on', id, hid]
            );
		} else {
            const ufh = await db.execute(
                `SELECT ufh.done as done
                FROM homeworks h
                INNER JOIN user_follow_homeworks ufh ON h.id = ufh.homework_id
                WHERE ufh.user_id = ? AND ufh.homework_id = ?`,
                [id, hid]
            );

            if (ufh && ufh.length === 1) await db.execute(
                `DELETE FROM user_follow_homeworks WHERE user_id = ? AND homework_id = ?`,
                [id, hid]
            );
		}

		return { success: true };
	}
};
