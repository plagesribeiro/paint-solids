<div class="w-full h-full overflow-auto flex">
	<div class="bg-image h-full w-1/2 tablet:hidden" />
	<div class=" w-1/2 tablet:w-full h-full flex items-center justify-center">
		<div class="flex w-full h-full max-w-xl items-center justify-center">
			<slot />
		</div>
	</div>
</div>

<style>
	.bg-image {
		background-image: url('../../assets/bg_auth.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}
</style>
