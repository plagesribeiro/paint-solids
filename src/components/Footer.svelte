<script lang="ts">
	import Fa from 'svelte-fa';
	import logo from 'assets/logo_no_bg.png';
	import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
	import { success } from './Toast.svelte';
</script>

<footer
	class="footer footer-center p-10 bg-neutral text-neutral-content rounded"
>
	<nav class="grid grid-flow-col gap-4">
		<a
			href="https://paintsolids.notion.site/Sobre-n-s-18fce53f560f4898aae42b3601d82331?pvs=4"
			target="_blank"
			class="link link-hover">Sobre nós</a
		>
		<button
			on:click={() => {
				navigator.clipboard.writeText('suporte.paintsolids@gmail.com');
				success('Email copiado para a área de transferência');
			}}
			class="link link-hover">Entrar em contato</button
		>
		<a href="/plans" class="link link-hover">Planos</a>
	</nav>

	<nav class="grid grid-flow-col gap-4">
		<a
			href="https://paintsolids.notion.site/Pol-tica-de-Reembolso-39bed47f154d4215a2655691a6866f3e?pvs=4"
			target="_blank"
			class="link link-hover">Política de reembolso</a
		>
		<a
			href="https://paintsolids.notion.site/Pol-tica-de-Privacidade-4746f6d6ff864b119a3420a231e39bdc?pvs=4"
			target="_blank"
			class="link link-hover">Política de privacidade</a
		>
		<a
			href="https://paintsolids.notion.site/Termos-de-Servi-o-8e66569aeb2f4430b5d4f9a801a26e06?pvs=4"
			target="_blank"
			class="link link-hover">Termos de Serviço</a
		>
	</nav>

	<nav>
		<div class="flex items-center gap-4">
			<a href="https://www.instagram.com/paintsolids/" target="_blank">
				<Fa icon={faInstagram} class="text-neutral-content" size={'2.3x'} />
			</a>
			<!-- <a href="www.google.com" target="_blank">
				<Fa icon={faTiktok} class="text-neutral-content" size={'2x'} />
			</a> -->

			<img alt="" src={logo} class="h-10 my-2 cursor-pointer" />
		</div>
	</nav>

	<aside>
		<p>Copyright © 2023 - All right reserved by Paint & Solids</p>
	</aside>
</footer>
