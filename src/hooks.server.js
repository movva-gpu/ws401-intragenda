import { connect, createSchemas } from "$lib/db.js";
import * as _ from "$lib/mailer.js";
import { genSaltSync, hashSync } from "bcrypt";

/** @type {import('@sveltejs/kit').ServerInit} */
export async function init() {
    await connect();
    await createSchemas();
}
