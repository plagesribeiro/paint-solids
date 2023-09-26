<script lang="ts">
	import TextInput from 'components/TextInput.svelte';
	import { danger, success } from 'components/Toast.svelte';
	import { firebaseApp } from 'stores/firebase';
	import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
	import { Envelope } from 'svelte-hero-icons';
	import { goto } from '$app/navigation';

	let emailValue: string;

	const onSubmitRequestPasswordReset = async () => {
		try {
			emailValue = emailValue?.trim();
			await sendPasswordResetEmail(getAuth(firebaseApp), emailValue);

			success('Te enviamos um e-mail com os detalhes de redefinição');
			await goto('/auth/login');
		} catch (e: any) {
			if (e.message.includes('user-not-found')) {
				danger('E-mail não cadastrado');
			} else if (e.code === 'auth/invalid-email') {
				danger('Email inválido');
			} else {
				throw e;
			}
		}
	};
</script>

<svelte:head>
	<title>P&S - Esqueçeu senha</title>
</svelte:head>

<form
	class="flex flex-col items-center gap-3 w-full p-[5%] overflow-auto"
	on:submit|preventDefault={onSubmitRequestPasswordReset}
>
	<h1 class="font-bold text-2xl w-full">Esqueci minha senha</h1>

	<label for="email" class="flex flex-col gap-3 w-full mt-4 mb-6">
		<TextInput
			label="Email"
			placeholder="Digite seu email"
			bind:value={emailValue}
			required
		/>
	</label>

	<button class="btn btn-primary w-full" type="submit"
		>Redefinir minha senha</button
	>

	<footer class="flex flex-col items-center gap-4 mt-6 text-sm">
		<a
			href="/auth/login"
			class="underline hover:font-semibold cursor-pointer"
		>
			Ir para a página de login
		</a>

		<a
			href="/auth/register"
			class="underline hover:font-semibold cursor-pointer"
		>
			Não possui conta? Crie uma agora!
		</a>
	</footer>
</form>
