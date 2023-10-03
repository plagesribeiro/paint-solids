<script lang="ts">
	import mixpanel from 'mixpanel-browser';
	import { userData } from 'stores/user';
</script>

<div class="bg-image flex w-full body">
	<div class="h-full w-full flex flex-col justify-end">
		<div
			class="bg-neutral pb-4 pl-16 pt-4 flex flex-col gap-4 max-w-4xl rounded-tr-lg bg-opacity-60 text-neutral-content"
		>
			<h1 class="font-bold text-4xl">A união entre a arte e a tecnologia</h1>
			<h2 class="font-semi-bold text-sm">
				A Paint & Solids desperta o artista em cada um de nós,
				proporcionando impressões 3D e kits de pintura para que possamos
				decorar nosso ambiente com a nossa personalidade única e criativa.
			</h2>
			<a
				class="underline tablet:mt-4 hover:font-semibold w-fit"
				href="/plans"
				on:click={() => {
					mixpanel.track('ExplorePlans', {
						user: $userData.email ?? 'anonymous'
					});
				}}>Explorar nossos planos</a
			>
		</div>
	</div>
</div>

<style>
	.bg-image {
		background-image: url('../assets/bg_image.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: bottom;
	}

	.body {
		height: calc(100vh - 64px);
	}
</style>
