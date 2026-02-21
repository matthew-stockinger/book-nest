import { json, type RequestHandler } from '@sveltejs/kit';

export let POST: RequestHandler = async ({ request }) => {
	let { base64 } = await request.json();

  // OpenAI integration would go here.  
  // would need to pnpm add open AI's connector object, then send a prompt with base64 image to gpt-4-mini.
  // it then sends back an array of book titles and authors
  // here I'm returning a dummy array.

  let bookArray = [
    { booktitle: 'The Diary of a CEO', author: 'Steven Bartlett' },
    { booktitle: 'Invisible Women', author: 'Caroline Criado Perez' },
    { booktitle: 'Where Good Ideas Come From', author: 'Steven Johnson' },
    { booktitle: 'The Narrows', author: 'Michael Connelly' },
    { booktitle: 'The Drop', author: 'Michael Connelly' },
    { booktitle: 'The Black Ice', author: 'Michael Connelly' },
    { booktitle: 'Emotional Intelligence', author: 'Daniel Goleman' },
    { booktitle: 'How to Read a Book', author: 'Mortimer J. Adler' },
    { booktitle: 'The Unfair Advantage', author: 'Ash Ali' },
    { booktitle: 'The Collingridge Dilemma', author: 'Jared Cohen' },
  ];

	return json({ bookArray });
};
