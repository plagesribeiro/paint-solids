<script lang="ts">
	import '../app.css';
	import Toast from 'components/Toast.svelte';
	import Navbar from 'components/Navbar.svelte';
	import { userDoc } from 'stores/user';
	import { onMount } from 'svelte';
	import Footer from 'components/Footer.svelte';
	import mixpanel from 'mixpanel-browser';

	mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, { debug: true });

	onMount(async () => {
		// to load userDoc
		console.log('import userDoc', $userDoc);
	});
</script>

<svelte:head>
	<title>P&S</title>
</svelte:head>

<div class="fixed top-0 z-20 left-0 w-full h-16">
	<Navbar />
</div>

<div class="overflow-auto z-10 body mt-16">
	<slot />

	<Toast />

	<Footer />
</div>

<style>
	.body {
		height: calc(100vh - 64px);
	}
</style>
