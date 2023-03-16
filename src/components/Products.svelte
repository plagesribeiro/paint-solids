<script lang="ts">
	import type Stripe from 'stripe';

	export let product: Stripe.Product;
</script>

<a
	href={product.metadata.URL}
	target="_blank"
	class="flex flex-col items-center justify-center w-fit h-fil p-4 gap-4 rounded-lg bg-gray-300 dark:bg-gray-600"
>
	<div class="max-w-[150px] max-h-[150px]">
		<img
			class="w-full h-full flex items-center justify-center"
			src={product.images[0]}
			alt=""
		/>
	</div>
	<span class="font-semibold">
		{product.name}
	</span>
	<span>
		{product.metadata.price}
	</span>
</a>
