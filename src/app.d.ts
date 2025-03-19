// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		type Role = 'admin' | 'teacher' | 'student';

		interface User {
		    id: number;
            email: string;
            name: string;
            role: Role;
            formation: string;
            created_at: Date;
		}
	}
}

export {};
