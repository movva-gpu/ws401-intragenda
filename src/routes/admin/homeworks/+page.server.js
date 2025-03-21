import { db } from '$lib/db.js';

export async function load() {
    const homeworks = await db.execute('SELECT * FROM homeworks');
    return { homeworks };
}