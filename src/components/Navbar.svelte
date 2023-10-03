<script lang="ts">
	import { authentication } from 'stores/firebase';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import logo from 'assets/logo_no_bg.png';
	import { ArrowRightOnRectangle, Icon, User } from 'svelte-hero-icons';
	import { userData } from 'stores/user';
</script>

<div class="navbar shadow-lg flex justify-between w-full bg-neutral h-full">
	<div class="flex h-full items-center ml-4" />

	<img
		alt=""
		src={logo}
		class="h-12 my-2 cursor-pointer"
		on:click={() => goto('/')}
		on:keydown
	/>

	<div class="dropdown dropdown-end">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label tabindex="0" class="btn btn-ghost btn-circle avatar">
			<div
				class="w-10 rounded-full flex items-center justify-center bg-base-300 h-10"
			>
				<div
					class="text-neutral-content h-full text-center flex items-center justify-center"
				>
					{#if !$authentication}
						<Icon src={User} size={'24'} />
					{:else}
						<!--user google photo or initials-->
						{#if !$userData || !$userData.name}
							<Icon src={User} size={'24'} />
						{:else if !$userData.photoUrl}
							{$userData.name
								.split(' ')
								.map((name) => name[0])
								.join('')}
						{:else}
							<img
								alt="img"
								src={$userData.photoUrl}
								class="h-8 w-8 rounded-full"
							/>
						{/if}
					{/if}
				</div>
			</div>
		</label>

		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<ul
			tabindex="0"
			class="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52"
		>
			{#if !$authentication}
				<li><a href="/auth/login">Entrar</a></li>
			{:else}
				<li>
					<a href="/account">
						<Icon src={User} size={'20'} />
						Minha conta
					</a>
				</li>
				<li>
					<a href="/auth/logout" class="text-error hover:text-error">
						<Icon src={ArrowRightOnRectangle} size={'20'} />
						Sair
					</a>
				</li>
			{/if}
		</ul>
	</div>
</div>
