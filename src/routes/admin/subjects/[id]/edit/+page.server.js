import { db } from '$lib/db';
import { fail, isActionFailure, redirect } from '@sveltejs/kit';

export async function load({ params }) {
    const [ subjects ] = await db.execute('SELECT * FROM subjects WHERE id = ?', [params.id]);
    if (!subjects) redirect(307, '/admin/subjects');
    
    const formations = await db.execute('SELECT * FROM formations');
    
    return { subjects, formations };
}

export const actions = {
    default: async ({ request, params }) => {
        const data = await request.formData();
        const { name, formation_id} = Object.fromEntries(data);
        
        if (!name) {
            return fail(400, { field: 'name', message: 'Le nom complet est requis' });
        } else if (!formation_id) {
            return fail(400, { field: 'formation_id', message: 'La description est requiss' });
        }
        console.log(name, formation_id);

        const err = await db.query(
            `UPDATE subjects SET name = ?, formation_id = ? WHERE id = ?`,
            [name, formation_id, params.id],
        ).catch((error) => {
            return fail(500, { message: error.message });
        });
        if (isActionFailure(err)) return err;

        return redirect(303, '/admin/subjects');
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
