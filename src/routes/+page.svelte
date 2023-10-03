<script lang="ts">
	import InitialCover from 'components/InitialCover.svelte';
	import ProductBanner from 'components/ProductBanner.svelte';
	import { existingCollections } from 'stores/collections';
	import mixpanel from 'mixpanel-browser';
	import { onMount } from 'svelte';
	import { userData } from 'stores/user';

	onMount(() => {
		mixpanel.track('HomePage', {
			user: $userData.email ?? 'anonymous'
		});
	});
</script>

<!-- image from static folder -->
<div class="relative w-full">
	<InitialCover />

	<div class="flex flex-col w-full items-center p-5">
		<h1 class="text-2xl font-semibold max-w-xl text-center">
			Nossos produtos te ajudam a explorar um novo lado criativo e despertar
			o seu artísta interior
		</h1>
		<div
			class="w-full flex items-center justify-evenly mt-8 flex-wrap gap-4 h-full pb-8"
		>
			{#each existingCollections as product}
				<ProductBanner {product} />
			{/each}
		</div>
	</div>
</div>
