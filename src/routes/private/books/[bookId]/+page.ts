import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export let load: PageLoad = async ({ parent, params }) => {
	let { supabase } = await parent();
	let { bookId } = params;

	let { data } = await supabase
		.from('books')
		.select('*')
		.eq('id', Number.parseInt(bookId))
		.single();

	if (data) {
		return { book: data };
	}

	error(404, 'not found');
};
