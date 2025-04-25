import { db } from "$lib/db";

/** @satisfies {import('./$types').Actions} */
export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const title = formData.get("title");
        const description = formData.get("description");
        const dueDate = formData.get("due-date");
        const subjectId = formData.get("subject");
        const sessionToken = cookies.get("session");

        await db.query(
            `INSERT INTO homeworks (
				title,
				description,
				due_date,
				subject_id,
				user_id
			) VALUES (?, ?, ?, ?, (SELECT user_id FROM connected_users WHERE token = ?))`,
            [title, description, dueDate, subjectId, sessionToken],
        );

        return { success: true };
    },
};
