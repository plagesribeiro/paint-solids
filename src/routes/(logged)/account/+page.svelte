<script lang="ts">
	import Button from 'components/Button.svelte';
	import DarkMode from 'components/DarkMode.svelte';
	import TextInput from 'components/TextInput.svelte';
	import { danger, success } from 'components/Toast.svelte';
	import { doc, setDoc } from 'firebase/firestore';
	import { db } from 'stores/firebase';
	import { stripe } from 'stores/stripe';
	import { userData } from 'stores/user';
	import { onMount } from 'svelte';

	let editing = false;
	let loadingData = true;

	let email = '';
	let name = '';
	let phone = '';

	$: if (loadingData && $userData.email) {
		new Promise((resolve) => setTimeout(resolve, 200)).then(() => {
			email = $userData.email || '';
			name = $userData.name || '';
			phone = $userData.phone || '';
			editing = false;
			loadingData = false;
		});
	}

	const calcel = () => {
		name = $userData.name || '';
		phone = $userData.phone || '';
		editing = false;
	};

	const saveNewData = async () => {
		// check if there is any change
		if (name === $userData.name && phone === $userData.phone) {
			success('Nenhum dado foi alterado.');
			editing = false;
			return;
		}

		try {
			const userRef = doc(db, 'users', $userData.user.uid);
			await setDoc(
				userRef,
				{
					name,
					phone
				},
				{ merge: true }
			);

			userData.update((current) => {
				return {
					...current,
					name: name,
					phone: phone
				};
			});

			success('Dados salvos com sucesso!');
		} catch (err) {
			danger('Erro ao salvar os dados.');
		} finally {
			editing = false;
		}
	};
</script>

<div
	class="w-full h-full flex justify-start items-center p-16 tablet:flex-col gap-6 overflow-auto"
>
	<div
		class="flex flex-col gap-4 max-w-lg w-full h-full justify-start items-center"
	>
		<h1 class="text-2xl font-bold">Dados Pessoais</h1>
		<div class="flex w-full justify-start items-center gap-3">
			<span class="font-semibold ">Email:</span>
			<span>{email}</span>
		</div>

		<TextInput
			label="Nome"
			bind:value={name}
			placeholder="Seu Nome"
			disabled={!editing}
		/>
		<TextInput
			label="Telefone"
			bind:value={phone}
			placeholder="(00) 00000-0000"
			disabled={!editing}
		/>

		<div class="mt-4 flex justify-center w-full gap-4 items-center">
			{#if !editing}
				<Button on:click={() => (editing = true)}>Editar</Button>
			{:else}
				<Button on:click={() => calcel()}>Cancelar</Button>
				<Button on:click={saveNewData}>Salvar</Button>
			{/if}
		</div>
	</div>
	<div
		class="flex flex-col gap-4 max-w-lg w-full items-center justify-start h-full"
	>
		<h1 class="text-2xl font-bold">Ferramentas</h1>

		<div
			class="w-full bg-gray-300 dark:bg-gray-600 flex justify-evenly p-2 rounded-lg"
		>
			<DarkMode />
		</div>
		<div
			class="w-full bg-gray-300 dark:bg-gray-600 flex justify-evenly p-2 rounded-lg"
		>
			<a href="/auth/logout" class="hover:font-bold hover:text-red-500"
				>Logout</a
			>
		</div>
	</div>
</div>
