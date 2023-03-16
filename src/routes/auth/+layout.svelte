<div class="w-full h-full overflow-auto flex">
	<div class="bg-image w-1/2 h-full tablet:hidden" />
	<div class="w-1/2 h-full tablet:w-full flex items-center justify-center">
		<slot />
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
