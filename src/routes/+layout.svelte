<script lang="ts">
	import { Header } from '$components';
	import favicon from '$lib/assets/favicon.svg';
	import './../app.css';

	let { children, data } = $props();
	let { session, supabase, user } = $derived(data);

	$inspect(session);
	$inspect(user);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />
{@render children()}
