<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { Header } from '$components';
	import favicon from '$lib/assets/favicon.svg';
	import './../app.css';
	import { setUserState } from '$lib/state/user-state.svelte.js';

	let { children, data } = $props();
	let { session, supabase } = $derived(data);
	$inspect(session);

	let userState = setUserState({ session: data.session, supabase: data.supabase, user: data.user });


	$effect(() => {
		let { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			userState.updateState({ session: newSession, supabase, user: newSession?.user || null });
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />
{@render children()}
