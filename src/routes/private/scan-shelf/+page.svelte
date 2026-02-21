<script lang="ts">
	import { convertFileToBase64 } from '$lib/utils/openai-helpers';
	import Icon from '@iconify/svelte';
	import Dropzone from 'svelte-file-dropzone';

	let isLoading = $state(false);

	interface OpenAiBook {
		bookTitle: string;
		author: string;
	}

	async function handleDrop(e: CustomEvent<any>) {
		let { acceptedFiles } = e.detail;

		if (acceptedFiles.length) {
			isLoading = true;
			let fileToSendToOpenAi = acceptedFiles[0];
			let base64String = await convertFileToBase64(fileToSendToOpenAi);

			try {
				// don't fetch from openAI on the frontend because it would expose API key
				// instead, fetch from our own server-side route
				let response = await fetch('/api/scan-shelf', {
					method: 'POST',
					headers: {
						ContentType: 'application/json'
					},
					body: JSON.stringify({ base64: base64String })
				});

				let result = (await response.json()) as { bookArray: OpenAiBook[] };
				console.log(result);
			} catch (error) {}
		}
	}
</script>

<h2 class="mt-m mb-l">Take a picture to add books</h2>
<div class="upload-area">
	<div class="upload-container">
		<Dropzone
			on:drop={handleDrop}
			multiple={false}
			accept="image/*"
			maxSize={10 * 1024 * 1024}
			containerClasses={'dropzone-cover'}
		>
			<Icon icon="bi:camera-fill" width={'40px'} />
			<p>Drag a picture here or click to select a file.</p>
		</Dropzone>
	</div>
</div>
