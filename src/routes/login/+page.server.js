import * as crypto from 'crypto';

import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { fail, redirect } from '@sveltejs/kit';

import { transporter } from '$lib/mailer.js';
import { db } from '$lib/db.js';

export async function load({ cookies }) {
    const sessionToken = cookies.get('session');
    if (sessionToken) {
        if ((await db.execute(
            'SELECT u.id FROM users u WHERE u.id = (SELECT user_id FROM `connected_users` WHERE token = ?)',
            [sessionToken]
        )).length) {
            redirect(307, '/?r=connected');
        }
    }
}

/** @satisfies {import('@sveltejs/kit').Action} */
export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const mail = data.get('mail'),
            password = data.get('password');

        for (const key in { mail, password }) {
            const value = data.get(key);
            if (value === null || value === '') {
                return fail(400, { field: key, msg: 'Le champ est requis.' });
            }
        }

        const hash = hashSync(password, genSaltSync());
        console.log(hash);
        const user = await db.execute(`SELECT * FROM users u WHERE u.email = ?`, [mail]);

        if (!user.length) {
            return fail(401, { field: 'mail', msg: 'Adresse e-mail inconnue.' });
        }

        if (!compareSync(password, user[0].password_hash)) {
            return fail(401, { field: 'password', msg: 'Mot de passe incorrect.' });
        }

        const sessionToken = crypto.createHash('sha1').update(`${Date.now()}${user[0].full_name}`).digest('hex');
        await db.query(
            `INSERT INTO connected_users (token, user_id) VALUES (?, ?)`,
            [sessionToken, user[0].id]
        ).catch((err) => console.error('Database error:', err));

        cookies.set('session', sessionToken, { path: '/', maxAge: 60 * 60 * 24 * 7 });

        redirect(303, '/');
    },
};
