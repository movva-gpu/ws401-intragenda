import { redirect } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').Load} */
export async function load({ cookies }) {
    const sessionToken = cookies.get('session');
    if (!sessionToken) {
        return redirect(307, '/login')
    }
}
