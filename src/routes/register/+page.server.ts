import { fail, redirect } from '@sveltejs/kit';

interface ReturnObject {
	success: boolean;
	errors: string[];
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

export let actions = {
	default: async ({ request, locals: { supabase } }) => {
		let formData = await request.formData();

		let name = formData.get('name') as string;
		let email = formData.get('email') as string;
		let password = formData.get('password') as string;
		let passwordConfirmation = formData.get('passwordConfirmation') as string;

		let returnObject: ReturnObject = {
			success: true,
			email,
			name,
			password,
			passwordConfirmation,
			errors: []
		};

		if (name.length < 3) {
			returnObject.errors.push('Name must be at least three characters.');
		}
		if (!email.length) {
			returnObject.errors.push('Email is required.');
		}
		if (!password.length) {
			returnObject.errors.push('Password is required.');
		}
		if (password !== passwordConfirmation) {
			returnObject.errors.push('Passwords do not match');
		}

		if (returnObject.errors.length) {
			returnObject.success = false;
			return returnObject;
		}

		// registration flow
		let { data, error } = await supabase.auth.signUp({
			email,
			password
		});

		if (error || !data.user) {
			returnObject.success = false;
			return fail(400, returnObject);
		}

		let userId = data.user.id;
		console.log('inserting new user_names row');
		await supabase.from('user_names').insert([
			{
				user_id: userId,
				name
			}
		]);

		redirect(303, '/private/dashboard');
	}
};
