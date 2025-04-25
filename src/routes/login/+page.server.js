import * as crypto from "crypto";

import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { fail, isActionFailure, redirect } from "@sveltejs/kit";

import { transporter } from "$lib/mailer.js";
import { db } from "$lib/db.js";

export async function load({ cookies }) {
    const sessionToken = cookies.get("session");
    if (sessionToken) {
        if (
            (
                await db.execute(
                    "SELECT u.id FROM users u WHERE u.id = (SELECT user_id FROM `connected_users` WHERE token = ?)",
                    [sessionToken],
                )
            ).length
        ) {
            redirect(307, "/?r=connected");
        }
    }

    const formations = await db.execute("SELECT * FROM formations");

    return { formations };
}

/** @satisfies {import('@sveltejs/kit').Action} */
export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const mail = data.get("mail"),
            password = data.get("password");

        for (const key in { mail, password }) {
            const value = data.get(key);
            if (value === null || value === "") {
                return fail(400, {
                    tab: "login",
                    field: key,
                    msg: "Le champ est requis.",
                });
            }
        }

        const user = await db
            .execute(`SELECT * FROM users u WHERE u.email = ?`, [mail])
            .catch((err) => {
                fail(500, {
                    tab: "login",
                    field: "mail",
                    msg: "Erreur interne.",
                });
                console.error(err);
            });

        if (isActionFailure(user)) return user;

        if (!user.length) {
            return fail(401, {
                tab: "login",
                field: "mail",
                msg: "Adresse e-mail inconnue.",
            });
        }

        if (!compareSync(password, user[0].password_hash)) {
            return fail(401, {
                tab: "login",
                field: "password",
                msg: "Mot de passe incorrect.",
            });
        }

        const sessionToken = crypto
            .createHash("sha1")
            .update(`${Date.now()}${user[0].full_name}`)
            .digest("hex");

        const err = await db
            .query(
                `INSERT INTO connected_users (token, user_id) VALUES (?, ?)`,
                [sessionToken, user[0].id],
            )
            .catch((err) => {
                fail(500, {
                    tab: "login",
                    field: "mail",
                    msg: "Erreur interne.",
                });
                console.error(err);
            });

        if (isActionFailure(err)) return err;

        cookies.set("session", sessionToken, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        redirect(303, "/");
    },
    register: async ({ request, cookies }) => {
        const data = await request.formData();
        const name = data.get("name"),
            mail = data.get("mail"),
            password = data.get("password"),
            passwordr = data.get("passwordr"),
            formation = data.get("formation");

        for (const key in { name, mail, password, passwordr, formation }) {
            const value = data.get(key);
            if (value === null || value === "") {
                return fail(400, {
                    tab: "register",
                    field: key,
                    msg: "Le champ est requis.",
                });
            }
        }

        if (password !== passwordr) {
            return fail(400, {
                tab: "register",
                field: "passwordr",
                msg: "Le mot de passe n'est pas répété correctemment.",
            });
        }

        const hash = hashSync(password, genSaltSync());
        let err = await db
            .query(
                `INSERT INTO users (full_name, password_hash, email, role, formation_id) VALUES (?, ?, ?, ?, ?)`,
                [name, hash, mail, "student", formation],
            )
            .catch((err) => {
                fail(500, {
                    tab: "register",
                    field: "mail",
                    msg: "Erreur interne.",
                });
                console.error(err);
            });
        if (isActionFailure(err)) return err;

        err = await transporter
            .sendMail({
                from: `Intragenda IUT Troyes <no-reply@${new URL(request.url).hostname}>`,
                to: mail,
                subject: "Inscription à Intragenda",
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
                </html>`,
            })
            .catch((err) => {
                fail(500, {
                    tab: "register",
                    field: "mail",
                    msg: "Erreur interne.",
                });
                console.error(err);
            });
        if (isActionFailure(err)) return err;

        const sessionToken = crypto.hash("sha1", `${Date.now()}${name}`);
        err = await db
            .query(
                `INSERT INTO connected_users (token, user_id) VALUES (?, (SELECT id FROM users WHERE email = ?))`,
                [sessionToken, mail],
            )
            .catch((err) => {
                fail(500, {
                    tab: "register",
                    field: "mail",
                    msg: "Erreur interne.",
                });
                console.error(err);
            });
        if (isActionFailure(err)) return err;

        cookies.set("session", sessionToken, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        redirect(303, "/?r=registered");
    },
};
