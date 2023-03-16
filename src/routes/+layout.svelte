<script lang="ts">
	import { browser } from '$app/environment';
	import '../app.css';
	import Toast from 'components/Toast.svelte';
	import Navbar from 'components/Navbar.svelte';
	import { userDoc } from 'stores/user';
	import { onMount } from 'svelte';

	onMount(async () => {
		// to load userDoc
		console.log('import userDoc', $userDoc);
	});

	$: if (browser) {
		if (
			localStorage.getItem('theme') === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
</script>

<svelte:head>
	<title>P&S</title>
</svelte:head>

<div id="theme-container">
	<div id="app-content">
		<div
			class="flex flex-col w-screen h-screen overflow-clip items-center justify-start bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100"
		>
			<Navbar />
			<Toast />
			<div
				class="w-full h-full flex items-center justify-center overflow-clip"
			>
				<slot />
			</div>
		</div>
	</div>
</div>
