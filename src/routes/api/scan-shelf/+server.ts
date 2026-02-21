import { json, type RequestHandler } from '@sveltejs/kit';

export let POST: RequestHandler = async ({ request }) => {
	let { base64 } = await request.json();

  // OpenAI integration would go here.  
  // would need to pnpm add open AI's connector object, then send a prompt with base64 image to gpt-4-mini.
  // it then sends back an array of book titles and authors
  // here I'm returning a dummy array.

  let bookArray = [
    { bookTitle: 'The Diary of a CEO', author: 'Steven Bartlett' },
    { bookTitle: 'Invisible Women', author: 'Caroline Criado Perez' },
    { bookTitle: 'Where Good Ideas Come From', author: 'Steven Johnson' },
    { bookTitle: 'The Narrows', author: 'Michael Connelly' },
    { bookTitle: 'The Drop', author: 'Michael Connelly' },
    { bookTitle: 'The Black Ice', author: 'Michael Connelly' },
    { bookTitle: 'Emotional Intelligence', author: 'Daniel Goleman' },
    { bookTitle: 'How to Read a Book', author: 'Mortimer J. Adler' },
    { bookTitle: 'The Unfair Advantage', author: 'Ash Ali' },
    { bookTitle: 'The Collingridge Dilemma', author: 'Jared Cohen' },
  ];

	return json({ bookArray });
};
