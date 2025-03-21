import { db } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ params }) {
    const [ user ] = await db.execute('SELECT * FROM users WHERE id = ?', [params.id]);

    if (!user) redirect(307, '/admin/users');

    const formations = await db.execute('SELECT * FROM formations');

    return { user, formations };
}

export const actions = {
    default: async ({ request, params }) => {
        const data = await request.formData();
        const { full_name, mail, role, formation } = Object.fromEntries(data);
        
        if (!full_name) {
            return fail(400, { field: 'full_name', message: 'Le nom complet est requis' });
        } else if (!mail) {
            return fail(400, { field: 'mail', message: 'L\'adresse email est requise' });
        } else if (!role) {
            return fail(400, { field: 'role', message: 'Le rôle est requis' });
        } else if (!formation) {
            return fail(400, { field: 'formation', message: 'La formation est requise' });
        }

        const err = await db.query(
            `UPDATE users SET full_name = ?, email = ?, role = ?, formation_id = ? WHERE id = ?`,
            [full_name, mail, role, formation, params.id],
        ).catch((error) => {
            return fail(500, { message: error.message });
        });
        if (isActionFailure(err)) return err;
        
        return redirect(303, '/admin/users');
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
