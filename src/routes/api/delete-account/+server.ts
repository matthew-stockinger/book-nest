import { SUPABASE_SECRET_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$lib/types/database.types';
import { createClient } from '@supabase/supabase-js';
import { json, type RequestHandler } from '@sveltejs/kit';

export let DELETE: RequestHandler = async ({ request }) => {
	// create supabase admin instance
	let supabaseAdmin = createClient<Database>(PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY);

	let authHeader = request.headers.get('Authorization');
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return json({ error: 'No valid authorization header.' }, { status: 401 });
	}
	let token = authHeader.split(' ')[1];
	// find the user that wants to make this change
	try {
		let { data: userData, error: verificationError } = await supabaseAdmin.auth.getUser(token);
		if (verificationError || !userData.user) {
			return json({ error: 'Invalid session' }, { status: 401 });
		}
		let userId = userData.user.id;

		let { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

		if (deleteError) {
			return json({ error: 'Failed to delete user account' }, { status: 500 });
		} else {
			return json({ message: 'Account successfully deleted' });
		}
	} catch (error) {
		return json({ error: 'an unexpected error occurred' }, { status: 500 });
	}
};
