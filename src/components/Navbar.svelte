<script lang="ts">
	import { authentication } from 'stores/firebase';
	import { page } from '$app/stores';
	import DarkMode from './DarkMode.svelte';
</script>

<div
	class="flex justify-between w-full border-b-[1px] bg-gray-800 text-gray-50 border-gray-600"
>
	<div class="flex h-full items-center ml-4">
		<a
			href="/products"
			class="p-2 hover:bg-gray-00 rounded-lg 
		{$page.url.pathname.startsWith('/products') ? 'bg-gray-900' : ''}">Loja</a
		>
	</div>
	<div class="ml-4 py-2">
		<a href="/" class="font-semibold text-2xl ">Paint & Solids</a>
	</div>
	<div class="flex h-full items-center mr-4">
		{#if !$authentication}
			<a href="/auth/login" class="p-2  hover:bg-gray-900 rounded-lg"
				>Login</a
			>
		{:else}
			<a
				href="/account"
				class="p-2 hover:bg-gray-00 rounded-lg 
				{$page.url.pathname.startsWith('/account') ? 'bg-gray-900' : ''}">Conta</a
			>
		{/if}
	</div>
</div>
