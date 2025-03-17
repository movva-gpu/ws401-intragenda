import { connect, createSchemas } from "$lib/db.js";

/** @type {import('@sveltejs/kit').ServerInit} */
export async function init() {
    await connect();
    await createSchemas()
}
