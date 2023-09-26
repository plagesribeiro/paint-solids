<script lang="ts">
	import InitialCover from 'components/InitialCover.svelte';
	import ProductBanner from 'components/ProductBanner.svelte';
	import arte from 'assets/ARTE.png';
	import geek from 'assets/GEEK.png';
	import kids from 'assets/KIDS.png';
	import { each } from 'svelte/internal';

	const products = [
		{
			id: 'arte',
			name: 'Arte',
			description: 'Coleção Arte',
			image: arte
		},
		{
			id: 'geek',
			name: 'Geek',
			description: 'Coleção Geek',
			image: geek
		},
		{
			id: 'kids',
			name: 'Kids',
			description: 'Coleção Kids',
			image: kids
		}
	];
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
			{#each products as product}
				<ProductBanner {product} />
			{/each}
		</div>
	</div>
</div>
