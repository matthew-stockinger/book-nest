<script lang="ts">
	import type { Book } from '$lib/state/user-state.svelte';

	interface BookCardProps {
		book: Book;
	}

	let { book }: BookCardProps = $props();

	let bookStatus = $derived.by(() => {
		if (book.finished_reading_on) return 'Finished';
		else if (book.started_reading_on) return 'Currently reading';
		else return 'Not started';
	});
</script>

<a href="/private/books/{book.id}" class="book-card">
	<div class="book-status">
		<span>{bookStatus}</span>
	</div>
	<div class="book-cover">
		{#if book.cover_image}
			<img src={book.cover_image} alt="" />
		{/if}
	</div>
	<div class="book-info">
		<h4>{book.title}</h4>
		<p class="mb-s">{book.author}</p>
		<p>Rating: {book.rating}</p>
	</div>
</a>
