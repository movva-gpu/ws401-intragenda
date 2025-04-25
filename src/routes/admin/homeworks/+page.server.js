import { db } from '$lib/db.js';

export async function load() {
    const homeworks = await db.execute(`SELECT
        homeworks.id,
        homeworks.title,
        homeworks.description,
        homeworks.user_id,
        homeworks.due_date,
        homeworks.created_at,
        homeworks.updated_at,
        subjects.name AS subject_name
    FROM homeworks
    INNER JOIN subjects ON homeworks.subject_id = subjects.id`);
    return { homeworks };
}
