<script lang="ts">
	import { Button } from '$components';
	import bookNestLogo from '$lib/assets/app-logo.svg';
</script>

<header>
	<a href="/">
		<img class="logo" src={bookNestLogo} alt="go to home" />
	</a>
	<nav>
		<ul>
			<li>
				<Button isMenu={true} href="/register">Create account</Button>
			</li>
			<li>
				<Button isMenu={true} isSecondary={true} href="/login">Login</Button>
			</li>
		</ul>
	</nav>
</header>
