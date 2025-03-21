import { db } from '$lib/db.js';

export async function load() {
    const formations = await db.execute('SELECT * FROM formations');
    return { formations };
}