import { db } from "$lib/db.js";

/** @type {import('@sveltejs/kit').Load} */
export async function load() {
    /** @type {App.User[]} */
    const users = await db.execute("SELECT * FROM users;");
    return { users };
}
