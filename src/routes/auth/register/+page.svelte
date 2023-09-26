<script lang="ts">
	import TextInput from 'components/TextInput.svelte';
	import { danger, success } from 'components/Toast.svelte';
	import { firebaseApp } from 'stores/firebase';
	import {
		getAuth,
		createUserWithEmailAndPassword,
		GoogleAuthProvider,
		signInWithPopup
	} from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import { faGoogle } from '@fortawesome/free-brands-svg-icons';

	let emailValue = $page.url.searchParams.get('email') || '';

	let passwordValue = '';
	let passwordConfirmationValue = '';

	const onSubmitRegistration = async () => {
		const auth = getAuth(firebaseApp);
		try {
			await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
			success('Conta criada com sucesso');

			const redirectTo = localStorage.getItem('redirectTo') ?? '/';
			localStorage.removeItem('redirectTo');
			goto(redirectTo);
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

			const redirectTo = localStorage.getItem('redirectTo') ?? '/';
			localStorage.removeItem('redirectTo');
			goto(redirectTo);
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
	<label for="email" class="flex flex-col gap-3 w-full mb-6">
		<TextInput
			label="Confirme sua senha"
			type="password"
			placeholder="************"
			bind:value={passwordConfirmationValue}
			required
		/>
	</label>

	<button class="btn btn-primary w-full" type="submit">Registrar</button>

	<button class="btn btn-info w-full" on:click={registerWithGoogle}>
		<Fa icon={faGoogle} size={'1.5x'} />
		Continuar com o Google
	</button>

	<footer class="flex flex-col items-center gap-4 mt-6 text-sm">
		<a
			href="/auth/login"
			class="underline hover:font-semibold cursor-pointer"
		>
			Voltar para a página de login
		</a>
	</footer>
</form>
