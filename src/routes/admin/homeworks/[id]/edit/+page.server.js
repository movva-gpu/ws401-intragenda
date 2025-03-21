import { db } from '$lib/db';
import { fail, isActionFailure, redirect } from '@sveltejs/kit';

export async function load({ params }) {
    const [ homeworks ] = await db.execute('SELECT * FROM homeworks WHERE id = ?', [params.id]);

    if (!homeworks) redirect(307, '/admin/homeworks');

    return { homeworks };
}

export const actions = {
    default: async ({ request, params }) => {
        const data = await request.formData();
        const { title, description, user_id, subject_id, due_date } = Object.fromEntries(data);
        
        if (!title) {
            return fail(400, { field: 'title', message: 'Le nom complet est requis' });
        } else if (!description) {
            return fail(400, { field: 'description', message: 'La description est requiss' });
        } else if (!user_id) {
            return fail(400, { field: 'user_id', message: 'L\'utilisateur est requis' });
        } else if (!subject_id) {
            return fail(400, { field: 'subject_id', message: 'Le sujet est requis' });
        } else if (!due_date) {
            return fail(400, { field: 'due_date', message: 'La date de fin est requise' });
        }

        const err = await db.query(
            `UPDATE homeworks SET title = ?, description = ?, user_id = ?, subject_id = ?, due_date = ? WHERE id = ?`,
            [title, description, user_id, subject_id, due_date, params.id],
        ).catch((error) => {
            return fail(500, { message: error.message });
        });
        if (isActionFailure(err)) return err;

        return redirect(303, '/admin/homeworks');
    }
}

// export async function PATCH({ params, request }) {
//     const { id } = params;
//     const { full_name, email, role, formation_id } = await request.json();

//     try {
//         await db.query(`
//             UPDATE users SET 
//             full_name = ?, email = ?, role = ?, formation_id = ? 
//             WHERE id = ?`, 
//             [full_name, email, role, formation_id, id]
//         );

//         return new Response(JSON.stringify({ message: 'Utilisateur mis à jour' }), { status: 200 });
//     } catch (error) {
//         return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//     }
// }
