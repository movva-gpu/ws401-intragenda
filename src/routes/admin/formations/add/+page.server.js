import { db } from '$lib/db';
import { fail, isActionFailure, redirect } from '@sveltejs/kit';

export async function load() {
    return {};
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const { name } = Object.fromEntries(data);

        if (!name) {
            return fail(400, { field: 'name', message: 'Le nom est requis' });
        }

        const err = await db.query(
            `INSERT INTO formations (name) VALUES (?)`,
            [name]
        ).catch((error) => {
            return fail(500, { message: error.message });
        });
        if (isActionFailure(err)) return err;

        return redirect(303, '/admin/formations');
    }
};
