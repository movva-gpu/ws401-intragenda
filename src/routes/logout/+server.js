import { db } from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ cookies }) {
    const sessionToken = cookies.get('session');
    cookies.delete('session', { path: '/' });
    await db.query('DELETE FROM `connected_users` WHERE token = ?', [sessionToken]);

    redirect(307, '/');
}
