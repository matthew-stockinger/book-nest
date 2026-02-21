import { json, type RequestHandler } from '@sveltejs/kit';

export let POST: RequestHandler = async ({ request }) => {
	let { base64 } = await request.json();

	return json({ success: true });
};
