import { db } from '$lib/db';
import { fail, isActionFailure, redirect } from '@sveltejs/kit';

export async function load({ params }) {
    const [ formations ] = await db.execute('SELECT * FROM formations WHERE id = ?', [params.id]);

    if (!formations) redirect(307, '/admin/formations');

    return { formations };
}

export const actions = {
    default: async ({ request, params }) => {
        const data = await request.formData();
        const { name } = Object.fromEntries(data);

        if (!name) {
            return fail(400, { field: 'name', message: 'Le nom complet est requis' });
        }

        const err = await db.query(
            `UPDATE formations SET name = ? WHERE id = ?`,
            [name, params.id],
        ).catch((error) => {
            return fail(500, { message: error.message });
        });
        if (isActionFailure(err)) return err;

        return redirect(303, '/admin/formations');
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
