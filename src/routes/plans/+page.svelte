<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import {
		faGamepad,
		faPalette,
		faPuzzlePiece
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	export let selectedPlan = 'anual';
	import { existingCollections, prices } from 'stores/collections';
	import { collection } from 'firebase/firestore';
	import { authentication } from 'stores/firebase';

	$: if (browser && !$page.url.searchParams.get('selectedPlan')) {
		if ($page.url.searchParams.get('collectionId')) {
			goto(
				`/plans?collectionId=${$page.url.searchParams.get(
					'collectionId'
				)}&selectedPlan=anual`
			);
		} else {
			goto(`/plans?selectedPlan=anual`);
		}
	}

	$: price = prices.find(
		(price) => price.id === $page.url.searchParams.get('selectedPlan')
	) ?? { id: '', price: 'R$ ????' };

	$: priceStr = price.price + ' / mês';

	$: selectedCollection =
		existingCollections.find(
			(collection) =>
				collection.id === $page.url.searchParams.get('collectionId')
		) ?? undefined;

	$: checkoutLink = selectedCollection
		? price
			? price.id === 'anual'
				? selectedCollection.stripeAnnualUrl
				: price.id === 'semestral'
				? selectedCollection.stripeSemiAnnualUrl
				: price.id === 'trimestral'
				? selectedCollection.stripeTriMonthlyUrl
				: price.id === 'mensal'
				? selectedCollection.stripeMonthlyUrl
				: undefined
			: undefined
		: undefined;
</script>

<div class="w-full flex flex-col justify-center items-center p-4 gap-4 mb-20">
	<div class="dropdown w-full max-w-xl">
		<label tabindex="0" class="btn bg-base-300 m-1 w-full">
			{#if $page.url.searchParams.get('collectionId') === 'arte'}
				<Fa icon={faPuzzlePiece} size="1.5x" />
				{$page.url.searchParams.get('collectionId')}
			{:else if $page.url.searchParams.get('collectionId') === 'geek'}
				<Fa icon={faGamepad} size="1.3x" />
				{$page.url.searchParams.get('collectionId')}
			{:else if $page.url.searchParams.get('collectionId') === 'kids'}
				<Fa icon={faPalette} size="1.5x" />
				{$page.url.searchParams.get('collectionId')}
			{:else}
				Selecione uma coleção
			{/if}
		</label>
		<ul
			tabindex="0"
			class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
		>
			<li>
				<a href="/plans?collectionId=arte">
					<Fa icon={faPuzzlePiece} size="1.5x" />
					Arte
				</a>
			</li>
			<li>
				<a href="/plans?collectionId=geek">
					<Fa icon={faGamepad} size="1.3x" />
					Geek
				</a>
			</li>
			<li>
				<a href="/plans?collectionId=kids">
					<Fa icon={faPalette} size="1.5x" />
					Kids
				</a>
			</li>
		</ul>
	</div>

	<div class="w-full flex justify-between gap-2 flex-wrap max-w-xl">
		<a
			class="flex-1 text-center p-2 min-w-fit btn btn-accent btn-sm
			{$page.url.searchParams.get('selectedPlan') === 'mensal'
				? ''
				: 'bg-base-200 hover:bg-base-300 text-base-content'}"
			href="/plans?collectionId={$page.url.searchParams.get(
				'collectionId'
			)}&selectedPlan=mensal"
		>
			Mensal
		</a>

		<a
			class="flex-1 text-center p-2 min-w-fit btn btn-accent btn-sm
			{$page.url.searchParams.get('selectedPlan') === 'trimestral'
				? ''
				: 'bg-base-200 hover:bg-base-300 text-base-content'}"
			href="/plans?collectionId={$page.url.searchParams.get(
				'collectionId'
			)}&selectedPlan=trimestral"
		>
			Trimestral
		</a>

		<a
			class="flex-1 text-center p-2 min-w-fit btn btn-accent btn-sm
			{$page.url.searchParams.get('selectedPlan') === 'semestral'
				? ''
				: 'bg-base-200 hover:bg-base-300 text-base-content'}"
			href="/plans?collectionId={$page.url.searchParams.get(
				'collectionId'
			)}&selectedPlan=semestral"
		>
			Semestral
		</a>

		<a
			class="flex-1 text-center p-2 min-w-fit btn btn-accent btn-sm
			{$page.url.searchParams.get('selectedPlan') === 'anual'
				? ''
				: 'bg-base-200 hover:bg-base-300 text-base-content'}"
			href="/plans?collectionId={$page.url.searchParams.get(
				'collectionId'
			)}&selectedPlan=anual"
		>
			Anual
		</a>
	</div>

	<div
		class=" rounded-xl overflow-hidden w-64 h-64 text-center flex items-center justify-center bg-base-100 shadow-xl"
	>
		{#if selectedCollection}
			<figure><img src={selectedCollection.image} alt="image" /></figure>
		{:else}
			<p class="font-semibold text-lg">Selecione uma coleção</p>
		{/if}
	</div>

	<h1 class="text-3xl font-bold text-center w-full max-w-xl truncate">
		{priceStr}
	</h1>

	{#if !$authentication}
		<a href="/auth/login" class="btn btn-primary w-full max-w-[256px]">
			Login
		</a>
	{:else if checkoutLink}
		<a
			href={checkoutLink}
			target="_blank"
			class="btn btn-primary w-full max-w-[256px]"
		>
			Assinar
		</a>
	{:else}
		<button disabled class="btn btn-disabled btn-primary max-w-[256px]">
			Selecionar plano e coleção
		</button>
	{/if}
</div>
