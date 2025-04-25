import { db } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';

export async function load() {
    const formations = await db.execute('SELECT * FROM formations');
    return { formations };
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const { full_name, email, password_hash, role, formation_id } = Object.fromEntries(data);

        if (!full_name || !email || !password_hash || !role || !formation_id) {
            return fail(400, { message: 'Tous les champs sont requis.' });
        }

        const err = await db.query(
            `INSERT INTO users (full_name, email, password_hash, role, formation_id) VALUES (?, ?, ?, ?, ?)`,
            [full_name, email, password_hash, role, formation_id]
        ).catch((error) => {
            return fail(500, { message: error.message });
        });

        if (err) return err;

        return redirect(303, '/admin/users');
    }
};
