<script lang="ts">
	// This component is a flexible button.  The button can act as a simple link.
	// It can also act as an actual button.
	// We have four types of button styles in the app: primary, secondary, danger, and menu.

	import type { Snippet } from 'svelte';

	interface BasicProps {
		children: Snippet;
		isSecondary?: boolean;
		isDanger?: boolean;
		isMenu?: boolean;
	}

	interface ButtonProps extends BasicProps {
		onclick: (e: MouseEvent) => void;
		href?: never;
	}

	interface LinkProps extends BasicProps {
		href: string;
		onclick?: never;
	}

	type ComponentProps = ButtonProps | LinkProps;

	let { children, href, onclick, isSecondary, isDanger, isMenu, ...props }: ComponentProps =
		$props();
</script>

{#if href}
	<a
		{href}
		class={['btn', { 'btn-secondary': isSecondary, 'btn-danger': isDanger, 'btn-menu': isMenu }]}
	>
		{@render children()}
	</a>
{:else}
	<button
		{...props}
		{onclick}
		class={['btn', { 'btn-secondary': isSecondary, 'btn-danger': isDanger, 'btn-menu': isMenu }]}
	>
		{@render children()}
	</button>
{/if}
