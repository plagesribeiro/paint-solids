<script lang="ts">
	import InitialCover from 'components/InitialCover.svelte';
	import Products from 'components/Products.svelte';
	import { products } from 'stores/stripe';
</script>

<!-- image from static folder -->
<div class="relative h-full w-full overflow-auto">
	<InitialCover />

	<div class="flex flex-col w-full items-center p-5">
		<h1 class="text-2xl font-semibold max-w-xl text-center">
			Nossos produtos te ajudam a explorar um novo lado criativo e despertar
			o seu artísta interior
		</h1>
		<div class="w-full flex items-center justify-evenly mt-8">
			{#if $products && $products.length}
				{#each $products as product}
					{#if product.active}
						<Products {product} />
					{/if}
				{/each}
			{/if}
		</div>
	</div>
</div>
