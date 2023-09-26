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
</script>

<div class="w-full flex flex-col justify-center items-start p-4 gap-4">
	<div class="dropdown w-full">
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

	<div class="w-full flex justify-between gap-2 flex-wrap">
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
</div>
