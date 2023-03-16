<script lang="ts">
	import { browser } from '$app/environment';
	import { authentication } from 'stores/firebase';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	$: if (browser && $authentication !== undefined) {
		if (!$authentication && !$page.url.pathname.startsWith('/auth')) {
			goto('/auth/logout');
		}
	}
</script>

<slot />
