<script lang="ts">
	import type { Collection } from 'stores/collections';
	import { Icon, ShoppingBag } from 'svelte-hero-icons';

	export let product: Collection;
</script>

<div class="card w-64 bg-base-100 h-64 shadow-xl image-full">
	<figure><img src={product.image} alt="image" /></figure>
	<div class="card-body justify-between gap-0">
		<h2 class="card-title !mb-0">{product.name}</h2>
		<div class="card-actions justify-end w=full">
			<a
				class="btn btn-primary w-full flex"
				href="/plans?collectionId={product.id}"
			>
				Eu quero!
				<Icon src={ShoppingBag} size={'22'} />
			</a>
		</div>
	</div>
</div>
