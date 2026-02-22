<script lang="ts">
	import { Button } from '$components';
	import { getUserState } from '$lib/state/user-state.svelte';
	import type { User } from '@supabase/supabase-js';

	let userContext = getUserState();
	let { userName, user } = $derived(userContext);
	let { email } = $derived(user as User);
	let isEditMode = $state(false);

	let averageRating = $derived.by(() => {
		let booksWithRating = userContext.allBooks.filter((book) => book.rating);
		if (booksWithRating.length === 0) return 'No ratings yet.';

		let sumOfAllRatings = booksWithRating.reduce((acc, book) => acc + book.rating!, 0);
		return Math.round((100 * sumOfAllRatings) / booksWithRating.length) / 100;
	});
</script>

<div class="settings-page">
	<div class="settings-container">
		<h2>Settings</h2>
		<h5 class="mt-m mb-xs semi-bold">Username</h5>
		{#if isEditMode}
			<input type="text" name="userName" class="username-input" bind:value={userName} />
		{:else}
			<h3>{userName}</h3>
		{/if}
		<h5 class="mt-m mb-xs semi-bold">Email Address</h5>
		{#if isEditMode}
			<input type="text" name="email" bind:value={email} />
		{:else}
			<h3>{email}</h3>
		{/if}
		<div class="buttons-container mt-l">
			<Button isSecondary={true} onclick={() => console.log('edit mode?')}>
				{isEditMode ? 'Save changes' : 'Edit'}
			</Button>
			<Button isDanger={true} onclick={() => console.log('delete account')}>Delete Account</Button>
		</div>
	</div>
	<div class="stats-container">
		<h5 class="semi-bold">Books in Library</h5>
		<h3>{userContext.allBooks.length}</h3>
		<h5 class="semi-bold mt-m">Finished books</h5>
		<h3>{userContext.allBooks.filter((book) => Boolean(book.finished_reading_on)).length}</h3>
		<h5 class="semi-bold mt-m">Average rating given</h5>
		<h3>{averageRating}</h3>
	</div>
</div>
