import * as crypto from 'crypto';

import { genSaltSync, hashSync } from 'bcrypt';
import { fail, redirect } from '@sveltejs/kit';

import { transporter } from '$lib/mailer.js';
import { db } from '$lib/db.js';

/** @type {import('@sveltejs/kit').Load} */
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

    const formations = await db.execute('SELECT * FROM formations');
    return { formations };
}

/** @satisfies {import('@sveltejs/kit').Action} */
export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const name = data.get('name'),
            mail = data.get('mail'),
            password = data.get('password'),
            passwordr = data.get('passwordr'),
            formation = data.get('formation');

        for (const key in { name, mail, password, passwordr, formation }) {
            const value = data.get(key);
            if (value === null || value === '') {
                return fail(400, { field: key, msg: 'Le champ est requis.' });
            }
        }

        if (password !== passwordr) {
            return fail(400, { passwordr, msg: 'Le mot de passe n\'est pas répété correctemment.' });
        }

        const hash = hashSync(password, genSaltSync());
        db.query(
            `INSERT INTO users (full_name, password_hash, email, role, formation_id) VALUES (?, ?, ?, ?, ?)`,
            [name, hash, mail, 'student', formation],
        ).catch((err) => console.error('Database error:', err));

        await transporter.sendMail({
            from: `Intragenda IUT Troyes <no-reply@${ new URL(request.url).hostname }>`,
            to: mail,
            subject: 'Inscription à Intragenda',
            text: `Bonjour ${name},\n\nVotre inscription à Intragenda a bien été prise en compte.\n\nCordialement,\nIntragenda IUT Troyes`,
            html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Inscription à Intragenda</title>
</head>
<body>
    <p>Bonjour ${name},</p>
    <p>Votre inscription à Intragenda a bien été prise en compte.</p>
    <p>Cordialement,<br>Intragenda IUT Troyes</p>
</body>
</html>`
            ,
        }).catch((err) => console.error('Transporter error:', err));

        const sessionToken = crypto.hash('sha1', `${Date.now()}${name}`);
        await db.query(
            `INSERT INTO connected_users (token, user_id) VALUES (?, (SELECT id FROM users WHERE email = ?))`,
            [sessionToken, mail]
        ).catch((err) => console.error('Database error:', err));

        cookies.set('session', sessionToken, { path: '/', maxAge: 60 * 60 * 24 * 7 });

        redirect(307, '/?r=registered');
    },
};
