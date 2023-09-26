<script lang="ts">
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
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Fa from 'svelte-fa';
	import { faGoogle } from '@fortawesome/free-brands-svg-icons';

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

			const redirectTo = localStorage.getItem('redirectTo') ?? '/';
			localStorage.removeItem('redirectTo');
			goto(redirectTo);
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
	<title>P&S - Login</title>
</svelte:head>

<form
	class="flex flex-col items-center gap-3 w-full p-[5%] overflow-auto"
	on:submit|preventDefault={onSubmitLoginForm}
>
	<h1 class="font-bold text-2xl w-full">Login</h1>

	<label for="email" class="flex flex-col gap-3 w-full mt-4">
		<TextInput
			label="Email"
			placeholder="Digite seu email"
			bind:value={emailValue}
			required
		/>
	</label>

	<label for="email" class="flex flex-col gap-3 w-full">
		<TextInput
			label="Senha"
			type="password"
			placeholder="************"
			bind:value={passwordValue}
			required
		/>
	</label>

	<div class="flex justify-between items-center w-full text-sm mt-6 mb-6">
		<label for="remember" class="flex gap-2 items-center justify-start">
			<input
				type="checkbox"
				bind:checked={remember}
				class="checkbox checkbox-sm"
			/>
			Lembrar de mim
		</label>

		<a
			href="/auth/forgot-password"
			class="underline hover:font-semibold cursor-pointer"
		>
			Esqueceu sua senha?
		</a>
	</div>

	<button class="btn btn-primary w-full" type="submit">Entrar</button>

	<button class="btn btn-info w-full" on:click={signInWithGoogle}>
		<Fa icon={faGoogle} class="text-info-content" size={'1.5x'} />
		<span>Entrar com o Google</span>
	</button>

	<footer class="flex flex-col items-center gap-4 mt-6 text-sm">
		<a
			href="/auth/register"
			class="underline hover:font-semibold cursor-pointer"
		>
			Não possui conta? Crie uma agora!
		</a>
	</footer>
</form>
