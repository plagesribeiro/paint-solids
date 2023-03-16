<script lang="ts">
	import Button from 'components/Button.svelte';
	import LogoGoogle from 'assets/LogoGoogle.svelte';
	import TextInput from 'components/TextInput.svelte';
	import { danger, success } from 'components/Toast.svelte';
	import { firebaseApp } from 'stores/firebase';
	import {
		GoogleAuthProvider,
		getAuth,
		signInWithPopup,
		signInWithEmailAndPassword,
		setPersistence,
		browserLocalPersistence,
		browserSessionPersistence
	} from 'firebase/auth';
	import type { UserCredential } from 'firebase/auth';
	import { Envelope, LockClosed } from 'svelte-hero-icons';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Checkbox from 'components/Checkbox.svelte';

	let emailValue: string;
	let passwordValue: string;
	let remember: boolean = true;

	$: browser &&
		setPersistence(
			getAuth(firebaseApp),
			remember ? browserLocalPersistence : browserSessionPersistence
		);

	const trySignIn = async (
		signInHandler: (
			auth: ReturnType<typeof getAuth>
		) => Promise<UserCredential>
	) => {
		const auth = getAuth(firebaseApp);
		try {
			await signInHandler(auth);
			success('Login realizado com sucesso');

			await goto('/');
		} catch (err: any) {
			if (err.code === 'auth/user-not-found') {
				danger('E-mail não cadastrado');
			} else if (err.code === 'auth/wrong-password') {
				danger('Senha incorreta');
			} else if (err.code === 'auth/too-many-requests') {
				danger('Muitas tentativas de login, tente novamente mais tarde');
			} else if (err.code === 'auth/invalid-email') {
				danger('E-mail inválido');
			} else {
				danger('Erro ao realizar login');
			}
		}
	};

	const onSubmitLoginForm = async () => {
		await trySignIn((auth) =>
			signInWithEmailAndPassword(auth, emailValue, passwordValue)
		);
	};

	const signInWithGoogle = async () => {
		const googleProvider = new GoogleAuthProvider();
		await trySignIn((auth) => signInWithPopup(auth, googleProvider));
	};
</script>

<svelte:head>
	<title>P&S - Entrar</title>
</svelte:head>

<form
	class="flex flex-col items-center gap-3 w-full p-[5%] overflow-auto"
	on:submit|preventDefault={onSubmitLoginForm}
>
	<h1 class="font-bold text-2xl w-full">Entrar</h1>

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

	<div class="flex justify-between items-center w-full text-sm mt-6 mb-6">
		<label
			for="remember"
			class="flex gap-2 items-center justify-start text-gray-800 dark:text-gray-300"
		>
			<Checkbox bind:isChecked={remember} />
			Lembrar de mim
		</label>

		<a
			href="/auth/forgot-password"
			class="underline hover:font-semibold cursor-pointer text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200"
		>
			Esqueceu sua senha?
		</a>
	</div>

	<Button type="submit">Entrar</Button>

	<Button on:click={signInWithGoogle} variants="google">
		<LogoGoogle />
		<span>Entrar com o Google</span>
	</Button>

	<footer class="flex flex-col items-center gap-4 mt-6 text-sm">
		<a
			href="/auth/register"
			class="underline hover:font-semibold cursor-pointer text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200"
		>
			Não possui conta? Crie uma agora!
		</a>
	</footer>
</form>
