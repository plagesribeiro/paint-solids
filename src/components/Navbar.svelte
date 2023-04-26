<script lang="ts">
	import { authentication } from 'stores/firebase';
	import { page } from '$app/stores';
	import DarkMode from './DarkMode.svelte';
	import { goto } from '$app/navigation';
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

	<!-- Insert the logo with no background using the full height of this navbar -->
	<img
		alt=""
		src="src/assets/logo_no_bg.png"
		class="h-[70px] my-2 cursor-pointer"
		on:click={() => goto('/')}
	/>

	<div class="flex h-full items-center mr-4">
		{#if !$authentication}
			<a href="/auth/login" class="p-2 hover:bg-gray-900 rounded-lg">Login</a
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
