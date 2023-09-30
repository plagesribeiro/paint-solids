<script lang="ts">
	import { goto } from '$app/navigation';
	import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
	import { success } from 'components/Toast.svelte';
	import Fa from 'svelte-fa';
	import logo from '../../assets/logo_no_bg.png';
</script>

<div class="w-full flex flex-col items-center justify-center gap-6 p-8">
	<Fa icon={faCheckCircle} size={'8x'} class="text-success" />

	<div
		class=" flex flex-col gap-1 items-center justify-centertext-center max-w-sm font-bold"
	>
		<p class="text-3xl text-primary">Obrigado!</p>

		<p class="w-full text-center">Seu pedido foi realizado com sucesso!</p>
	</div>

	<img
		src="https://media.giphy.com/media/tuCFp8rod0x3O/giphy.gif"
		class="w-full max-w-xs"
		alt="gif"
	/>

	<img src={logo} class="w-full max-w-[10rem]" />

	<button
		class="btn btn-sm btn-primary w-full max-w-sm"
		on:click={() => goto('/account')}>Ir para sua conta</button
	>

	<p class="text-center max-w-sm text-sm">
		Qualquer dúvida, entre em contato conosco pelo email:
		<button
			on:click={() => {
				navigator.clipboard.writeText('suporte.paintsolids@gmail.com');
				success('Email copiado para a área de transferência');
			}}
			class="link link-hover underline text-info"
		>
			suporte.paintsolids@gmail.com
		</button>
	</p>
</div>
