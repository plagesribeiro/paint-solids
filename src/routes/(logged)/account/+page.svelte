<script lang="ts">
	import { browser } from '$app/environment';
	import {
		faCircleCheck,
		faCircleXmark,
		faClock,
		faTriangleExclamation
	} from '@fortawesome/free-solid-svg-icons';
	import TextInput from 'components/TextInput.svelte';
	import { danger, success } from 'components/Toast.svelte';
	import { doc, setDoc } from 'firebase/firestore';
	import { db } from 'stores/firebase';
	import { userData } from 'stores/user';
	import Fa from 'svelte-fa';

	let editing = false;
	let firstTime = true;
	let loadingSubs = true;

	let mySubs: Subs[] = [];
	type Subs = {
		id: number;
		status: string;
	};
	let email = '';
	let name = '';
	let phone = '';

	$: if (browser && $userData.email && firstTime) {
		email = $userData.email || '';
		name = $userData.name || '';
		phone = $userData.phone || '';
		firstTime = false;
		loadSubs();
	}

	const cancel = () => {
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

	const loadSubs = () => {
		fetch(
			`https://private-anon-17de7e2ddb-digitalmanagerguru.apiary-proxy.com/api/v1/subscriptions?contact_email=${email}`,
			{
				headers: {
					'Authorization': `Bearer ${import.meta.env.VITE_GURU_API_KEY}`,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			}
		)
			.then((response) => {
				response.json().then((data) => {
					for (let i = 0; i < data.data.length; i++) {
						mySubs = [
							...mySubs,
							{
								id: data.data[i].subscription_code,
								status: data.data[i].last_status
							}
						];

						//console.log(data.data[i]);
					}
				});
				success('Assinaturas carregadas com sucesso!');
			})
			.catch((err) => {
				console.log(err);
				danger('Erro ao buscar assinaturas.');
			})
			.finally(() => {
				loadingSubs = false;
			});
	};
</script>

<div
	class="w-full flex justify-center items-start tablet:items-center tablet:p-4 p-16 tablet:flex-col gap-6"
>
	<div class="flex flex-col gap-4 max-w-lg w-full justify-start items-center">
		<h1 class="text-2xl font-bold w-full text-start">Dados Pessoais:</h1>
		{#if !browser || !$userData.email}
			<div class="w-full mt-4 flex justify-center">
				<span class="loading loading-ring loading-lg" />
			</div>
		{:else}
			<div class="flex w-full justify-start items-center gap-3">
				<span class="font-semibold">Email:</span>
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
					<button
						class="btn btn-primary w-full"
						on:click={() => (editing = true)}>Editar</button
					>
				{:else}
					<div class="w-full flex gap-4">
						<button
							class="btn btn-warning flex-1"
							on:click={() => cancel()}>Cancelar</button
						>
						<button class="btn btn-success flex-1" on:click={saveNewData}
							>Salvar</button
						>
					</div>
				{/if}
			</div>
		{/if}
	</div>
	<div
		class="flex flex-col gap-4 max-w-lg w-full items-start justify-start h-full"
	>
		<h1 class="text-2xl font-bold w-full text-start">Minhas assinaturas:</h1>
		{#if loadingSubs}
			<div class="w-full mt-4 flex justify-center">
				<span class="loading loading-ring loading-lg" />
			</div>
		{:else if mySubs.length === 0}
			<div class="alert alert-warning">
				<span>Nenhuma assinatura encontrada</span>
			</div>
		{:else}
			{#each mySubs as subs}
				{#if subs.status === 'active'}
					<div class="alert alert-success">
						<Fa icon={faCircleCheck} size={'1.5x'} />
						<span>{subs.id}: Ativa</span>
					</div>
				{:else if subs.status === 'canceled'}
					<div class="alert alert-error">
						<Fa icon={faCircleXmark} size={'1.5x'} />
						<span>{subs.id}: Cancelada</span>
					</div>
				{:else if subs.status === 'expired'}
					<div class="alert alert-warning">
						<Fa icon={faClock} size={'1.5x'} />
						<span>{subs.id}: Expirada</span>
					</div>
				{:else if subs.status === 'pending'}
					<div class="alert alert-warning">
						<Fa icon={faTriangleExclamation} size={'1.5x'} />
						<span>{subs.id}: Pendente</span>
					</div>
				{/if}
			{/each}
		{/if}
	</div>
</div>
