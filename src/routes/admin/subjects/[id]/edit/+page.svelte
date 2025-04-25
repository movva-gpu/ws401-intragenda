<script>
    import Breadcrumb from '../../../../../lib/components/Breadcrumb.svelte';
    import '$lib/_admin.scss';

    let { data } = $props();

    let name = $state(data.subjects.name);
</script>

{#if !('subjects' in data) || !('formations' in data)}
    <p>Unreachable</p>
{:else}

<Breadcrumb items={[
    { label: 'Home', href: '/' },
    { label: 'Admin', href: '/admin' },
    { label: 'Matières', href: '/admin/subjects' },
    { label: `Modification de ${name}`, href: `/admin/subjects/${data.subjects.id}/edit` }
]} />

<div class="header">
    <h1>Modification de {name}</h1>
</div>

<form method="POST" class="form-container">
    <label>
        Nom :
        <input type="text" name="name" bind:value={name} required />
    </label>

    <label>
        Formation :
        <select name="formation_id" required>
            <option value="">--Choisir une formation</option>
            {#each data.formations as formation}
                <option
                    value={formation.id}
                    selected={formation.id === data.subjects.formation_id}
                >
                    {formation.name}
                </option>
            {/each}
        </select>
    </label>

    <button type="submit">Modifier</button>
</form>
{/if}

<style>
    .form-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 300px;
    }
</style>
