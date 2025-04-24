import { db } from '$lib/db.js';

export async function load() {
    const subjects = await db.execute('SELECT * FROM subjects');
    return { subjects };
}