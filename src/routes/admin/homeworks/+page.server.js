import { db } from '$lib/db.js';

export async function load() {
    const users = await db.execute('SELECT * FROM users');
    const formations = await db.execute('SELECT * FROM formations');
    return { users, formations };
}