<script>
    import Breadcrumb from '../../../lib/components/Breadcrumb.svelte';
    import '$lib/_admin.scss';

    export let data;
</script>

{#if data && 'formations' in data}
    <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Admin', href: '/admin' },
        { label: 'Formations', href: '/admin/formations' },
    ]} />

    <div class="header">
        <h1>Formations</h1>
        <a href="/admin/formations/add" class="add-button">Ajouter</a>
    </div>

    {#if data.formations.length === 0}
        <p>No formations</p>
    {:else}
        <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each data.formations as formation}
                    <tr>
                        <td>{formation.name}</td>
                        <td>
                            <a href="/admin/formations/{formation.id}/edit/">Modifier</a>
                            <a href="/admin/formations/{formation.id}/del/">Supprimer</a>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}
{:else}
    <p>Erreur de données</p>
{/if}
