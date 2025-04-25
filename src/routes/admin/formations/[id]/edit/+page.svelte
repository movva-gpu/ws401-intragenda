<script>
    import Breadcrumb from '../../../../../lib/components/Breadcrumb.svelte';
    import '$lib/_admin.scss';

    let { data } = $props();

    let name = $state(data.formations.name);
</script>

{#if !('formations' in data)}
    <p>Impossible de charger les formations</p>
{:else}
<Breadcrumb items={[
    { label: 'Home', href: '/' },
    { label: 'Admin', href: '/admin' },
    { label: 'Formations', href: '/admin/formations' },
    { label: `Modification de "${name}"`, href: `/admin/formations/${data.formations.id}/edit` }
]} />

<div class="header">
    <h1>Modification de {name}</h1>
</div>

<form method="POST" class="form-container">
    <label>
        Nom :
        <input type="text" bind:value={name} name="name" required>
    </label>

    <button type="submit">Modifier</button>
</form>
{/if}
