import type { Actions } from './$types';

interface ReturnObject {
	success: boolean;
	errors: string[];
}

export let actions = {
	default: async ({ request }) => {
		let formData = await request.formData();

		let name = formData.get('name') as string;
		let email = formData.get('email') as string;
		let password = formData.get('password') as string;
		let passwordConfirmation = formData.get('passwordConfirmation') as string;

		let returnObject: ReturnObject = {
			success: true,
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

    return returnObject;

		console.log(formData);
	}
};
