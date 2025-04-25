import { db } from '$lib/db';
import { fail, isActionFailure, redirect } from '@sveltejs/kit';

export async function load() {
    const subjects = await db.execute('SELECT * FROM subjects');
    return { subjects };
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const { title, description, subject_id, due_date } = Object.fromEntries(data);

        if (!title) {
            return fail(400, { field: 'title', message: 'Le titre est requis' });
        } else if (!description) {
            return fail(400, { field: 'description', message: 'La description est requise' });
        } else if (!subject_id) {
            return fail(400, { field: 'subject_id', message: 'Le sujet est requis' });
        } else if (!due_date) {
            return fail(400, { field: 'due_date', message: 'La date d\'échéance est requise' });
        }

        const err = await db.query(
            `INSERT INTO homeworks (title, description, subject_id, due_date, user_id) VALUES (?, ?, ?, ?, ?)`,
            [title, description, subject_id, due_date, 1] 
        ).catch((error) => {
            return fail(500, { message: error.message });
        });
        if (isActionFailure(err)) return err;

        return redirect(303, '/admin/homeworks');
    }
};
