<script lang="ts">
	export let placeholder = 'placeholder';
	export let value = '';
	export let required = false;
	export let label = '';
</script>

<div class="flex w-full items-start gap-1 flex-col">
	<div class="label">
		<span class="label-text">{label}</span>
	</div>

	<input
		{...$$restProps}
		{placeholder}
		{required}
		bind:value
		class="input input-bordered w-full"
	/>
</div>
