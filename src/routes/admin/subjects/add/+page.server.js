import { db } from '$lib/db';
import { fail, isActionFailure, redirect } from '@sveltejs/kit';

export async function load() {
    const formations = await db.execute('SELECT * FROM formations');
    return { formations };
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const { name, formation_id } = Object.fromEntries(data);

        if (!name) {
            return fail(400, { field: 'name', message: 'Le nom est requis' });
        } else if (!formation_id) {
            return fail(400, { field: 'formation_id', message: 'La formation est requise' });
        }

        const err = await db.query(
            `INSERT INTO subjects (name, formation_id) VALUES (?, ?)`,
            [name, formation_id]
        ).catch((error) => {
            return fail(500, { message: error.message });
        });
        if (isActionFailure(err)) return err;

        return redirect(303, '/admin/subjects');
    }
};
