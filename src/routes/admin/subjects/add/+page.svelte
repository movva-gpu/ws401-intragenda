<script>
    import Breadcrumb from '../../../../lib/components/Breadcrumb.svelte';
    import '$lib/_admin.scss';

    export let data;
</script>

{#if !('formations' in data)}
    <p>Unreachable</p>
{:else}

<Breadcrumb items={[
    { label: 'Home', href: '/' },
    { label: 'Admin', href: '/admin' },
    { label: 'Matières', href: '/admin/subjects' },
    { label: 'Ajout', href: '/admin/subjects/add' }
]} />

<div class="header">
    <h1>Ajout d'une matière</h1>
</div>

<form method="POST" class="form-container">
    <label>
        Nom :
        <input type="text" name="name" required />
    </label>

    <label>
        Formation :
        <select name="formation_id" required>
            <option value="">--Choisir une formation</option>
            {#each data.formations as formation}
                <option value={formation.id}>
                    {formation.name}
                </option>
            {/each}
        </select>
    </label>

    <button type="submit">Ajouter</button>
</form>
{/if}
