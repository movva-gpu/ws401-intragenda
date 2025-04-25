<script>
    import Breadcrumb from '../../../../lib/components/Breadcrumb.svelte';
    import '$lib/_admin.scss';

    export let data;
</script>

{#if data}
    <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Admin', href: '/admin' },
        { label: 'Formations', href: '/admin/formations' },
        { label: 'Ajout', href: `/admin/formations/add` }
    ]} />
    <div class="header">
        <h1>Ajouter une formation</h1>
    </div>
    <form method="POST" class="form-container">
        <label>
            Nom de la formation :
            <input type="text" name="name" required />
        </label>

        <button type="submit">Ajouter</button>
    </form>
{:else}
    <p>Erreur de données</p>
{/if}
