<script lang="ts">
	import TextInput from 'components/TextInput.svelte';
	import Button from 'components/Button.svelte';
	import { danger, success } from 'components/Toast.svelte';
	import LogoGoogle from 'assets/LogoGoogle.svelte';
	import { Envelope, LockClosed } from 'svelte-hero-icons';
	import { firebaseApp } from 'stores/firebase';
	import {
		getAuth,
		createUserWithEmailAndPassword,
		GoogleAuthProvider,
		signInWithPopup
	} from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let emailValue = $page.url.searchParams.get('email') || '';

	let passwordValue = '';
	let passwordConfirmationValue = '';

	const onSubmitRegistration = async () => {
		const auth = getAuth(firebaseApp);
		try {
			await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
			success('Conta criada com sucesso');

			await goto('/');
		} catch (err: any) {
			console.error(err);

			if (err.code === 'auth/email-already-in-use') {
				danger('Email já cadastrado');
			} else if (err.code === 'auth/invalid-email') {
				danger('Email inválido');
			} else if (err.code === 'auth/weak-password') {
				danger('Senha fraca');
			} else {
				danger('Erro ao criar conta');
			}
		}
	};

	const registerWithGoogle = async () => {
		const googleProvider = new GoogleAuthProvider();
		const auth = getAuth(firebaseApp);
		try {
			await signInWithPopup(auth, googleProvider);
			success('Conta criada com sucesso');

			await goto('/');
		} catch (err: any) {
			console.error(err);
			danger('Erro ao entrar com o Google');
		}
	};
</script>

<svelte:head>
	<title>P&S - Regitrar</title>
</svelte:head>

<form
	class="flex flex-col items-center gap-3 w-full p-[5%] overflow-auto"
	on:submit|preventDefault={onSubmitRegistration}
>
	<h1 class="font-bold text-2xl w-full">Registrar-se</h1>

	<label for="email" class="flex flex-col gap-3 w-full mt-4">
		<div class="font-semibold">Endereço de email</div>
		<TextInput
			placeholder="Digite seu email"
			icon={Envelope}
			bind:value={emailValue}
			required
		/>
	</label>

	<label for="email" class="flex flex-col gap-3 w-full">
		<div class="font-semibold">Senha</div>
		<TextInput
			type="password"
			placeholder="************"
			icon={LockClosed}
			bind:value={passwordValue}
			required
		/>
	</label>
	<label for="email" class="flex flex-col gap-3 w-full mb-6">
		<div class="font-semibold">Repita sua senha</div>
		<TextInput
			type="password"
			placeholder="************"
			icon={LockClosed}
			bind:value={passwordConfirmationValue}
			required
		/>
	</label>

	<Button type="submit">Registrar</Button>

	<Button on:click={registerWithGoogle} variants="google">
		<LogoGoogle />
		<span>Continuar com o Google</span>
	</Button>

	<footer class="flex flex-col items-center gap-4 mt-6 text-sm">
		<a
			href="/auth/login"
			class="link text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
		>
			Voltar para a página de login
		</a>
	</footer>
</form>

<style lang="scss">
	.link {
		@apply underline hover:font-semibold cursor-pointer;
	}
</style>
