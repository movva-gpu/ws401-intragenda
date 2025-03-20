<script>
    import { onMount } from 'svelte';
    import '@fontsource-variable/roboto';

    import '$lib/app.scss';
    import Sidebar from '$lib/components/Sidebar.svelte';

    let { children, data } = $props();

    /** @type {HTMLDivElement} */
    let info;

    onMount(() => setTimeout(() => {
        if (data.reason) {
            info.className += ' bye';
            setTimeout(() => window.location.href = new URL(window.location.href).origin, 333);
        }
    }, 5000));

    function message(reason) {
        switch (reason) {
            case 'connected': return 'Vous êtes déjà connecté&nbsp;!';
            case 'registered': return 'Votre compte a été créé avec succès&nbsp;!';
        }
    }
</script>

<Sidebar active={'path' in data && data.path ? data.path : '/'} isAdmin={'user' in data && 'role' in data.user && 'admin' === data.user.role} />
<main>
    <div class="info" bind:this={info}>{@html message(data.reason)}</div>
    {@render children()}
</main>

<style>
    .info {
        transition: opacity 333ms;
        &:global(.bye) {
            opacity: 0;
        }
    }
</style>
