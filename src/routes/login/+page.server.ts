import { fail, redirect } from '@sveltejs/kit';

interface ReturnObject {
	success: boolean;
  email: string;
  password: string;
  passwordConfirmation?: never;
  name?: never;
	errors: string[];
}

export let actions = {
	default: async ({ request, locals: { supabase } }) => {
		let formData = await request.formData();

		let email = formData.get('email') as string;
		let password = formData.get('password') as string;

		let returnObject: ReturnObject = {
			success: true,
      email,
      password,
			errors: []
		};

		if (!email.length) {
			returnObject.errors.push('Email is required.');
		}
		if (!password.length) {
			returnObject.errors.push('Password is required.');
		}

		if (returnObject.errors.length) {
			returnObject.success = false;
			return returnObject;
		}

		let { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error || !data.user) {
			returnObject.success = false;
			return fail(400, returnObject);
		}

		redirect(303, '/private/dashboard');
	}
};
