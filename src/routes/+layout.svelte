<script>
    import { onMount } from 'svelte';
    import '@fontsource-variable/roboto';

    import '$lib/app.scss';
    import Sidebar from '$lib/components/Sidebar.svelte';
    import Header from '$lib/components/Header.svelte';
    import Calendar from '$lib/components/Calendar.svelte';
    import DevoirList from '$lib/components/DevoirList.svelte';
    import { crossfade, fade, slide } from 'svelte/transition';
    import { faTimes } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from 'fontawesome-svelte';

    let { children, data } = $props();

    /** @type {HTMLDivElement} */
    let info = $state();

    /** @type {HTMLButtonElement} */
    let calendarButton = $state();

    /** @type {HTMLInputElement} */
    let search = $state();
    let searchValue = $state();

    if (data && data.reason) {
        onMount(() => setTimeout(() => {
            info.className += ' bye';
            setTimeout(() => { if (window.location.href != '/') window.location.href = new URL(window.location.href).origin; }, 333);
        }, 5000));
    }

    function message(reason) {
        switch (reason) {
            case 'connected': return 'Vous êtes déjà connecté&nbsp;!';
            case 'registered': return 'Votre compte a été créé avec succès&nbsp;!';
        }
    }

    let searchShown = $state(false);
    onMount(() => {
        if (search) {
            search.addEventListener('focus', () => {
                searchShown = true;
            });
            search.addEventListener('blur', () => {
                // searchShown = false;
            });
            search.addEventListener('input', () => {
                searchValue = search.value;
            });
        }
    });
</script>

{#if data.user && 'name' in data.user}
<Sidebar
    active={'path' in data && data.path ? data.path : '/'}
    isAdmin={'user' in data && 'role' in data.user && 'admin' === data.user.role}
    searchShown={searchShown}
/>
{/if}
<main>
    {#if data.user && 'name' in data.user}
        <Header user={data.user.name} bind:calendarButton bind:search />
        <Calendar calendarButton={calendarButton} devoirs={data.user.homeworks} />
    {/if}
    <div class="info" bind:this={info}>{@html message(data.reason)}</div>
    {#if searchShown}
        <div class="search">
            <h1>
                <span
                    tabindex="0"
                    role="button"
                    onclick={() => searchShown = !searchShown}
                    onkeydown={(e) => e.key === 'Enter' && searchValue !== '' && search()}
                >
                    <FontAwesomeIcon icon={faTimes} />
                    Recherche de devoirs
                </span>
            </h1>
            <h2>Devoirs suivis</h2>
            <DevoirList user={data.user} homeworks={data.user.homeworks.filter(homework => searchValue !== '' && (
                homework.title.includes(searchValue) ||
                homework.description.includes(searchValue) ||
                homework.creator_name.includes(searchValue)
            ))} defaultMsg="Aucun devoir suivis trouvé." />
            <hr>
            <h2>Devoirs non suivis</h2>
            <DevoirList user={data.user} homeworks={data.homeworks.filter(homework => searchValue !== '' && (
                homework.title.includes(searchValue) ||
                homework.description.includes(searchValue) ||
                homework.creator_name.includes(searchValue)
            ))} defaultMsg="Aucun devoir non-suivis trouvé." />
        </div>
    {/if}
    <div>
        {@render children()}
    </div>
</main>

<style lang="scss">
    @use '$lib/globals';

    :global(h1) {
        color: globals.$cl-text;
        padding-bottom: globals.$sz-sm;
    }

    hr {
        padding-bottom: globals.$sz-sm;
        margin-bottom: globals.$sz-sm;
    }

    main {
        padding: globals.$sz-lg;
        padding-top: globals.$sz-header + globals.$sz-lg;

        position: relative;
    }

    .search {
        position: absolute;
        inset: 0;
        padding: inherit; // globals.$sz-lg;
        padding-top: globals.$sz-lg;
        top: globals.$sz-header; // + globals.$sz-lg;
        background: #f5f6fa;
        z-index: 90;
    }

    .info {
        transition: opacity 333ms;
        &:global(.bye) {
            opacity: 0;
        }
    }
</style>
