<script lang="ts">
	import Fa from 'svelte-fa';
	import logo from 'assets/logo_no_bg.png';
	import { Icon } from 'svelte-hero-icons';
	import {
		faGithub,
		faInstagram,
		faLinkedinIn,
		faTiktok
	} from '@fortawesome/free-brands-svg-icons';
	import { success } from './Toast.svelte';
</script>

<footer
	class="footer footer-center p-10 bg-neutral text-neutral-content rounded"
>
	<nav class="grid grid-flow-col gap-4">
		<a
			href="https://omniscient-robin-7db.notion.site/Sobre-n-s-18fce53f560f4898aae42b3601d82331?pvs=4"
			target="_blank"
			class="link link-hover">Sobre nós</a
		>
		<button
			on:click={() => {
				success('Email copiado para a área de transferência');
				navigator.clipboard.writeText('plagesribeiro@gmail.com');
			}}
			class="link link-hover">Entrar em contato</button
		>
		<a href="/plans" class="link link-hover">Planos</a>
	</nav>

	<nav>
		<div class="flex items-center gap-4">
			<a href="www.google.com" target="_blank">
				<Fa icon={faInstagram} class="text-neutral-content" size={'2.3x'} />
			</a>
			<a href="www.google.com" target="_blank">
				<Fa icon={faTiktok} class="text-neutral-content" size={'2x'} />
			</a>

			<img alt="" src={logo} class="h-10 my-2 cursor-pointer" />
		</div>
	</nav>

	<aside>
		<p>Copyright © 2023 - All right reserved by Paint & Solids</p>
	</aside>
</footer>
