<script>
    import Breadcrumb from '../../../lib/components/Breadcrumb.svelte';
    import '$lib/_admin.scss';

    let { data } = $props();
</script>

{#if data && 'subjects' in data}
    <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Admin', href: '/admin' },
        { label: 'Matières', href: '/admin/subjects' },
    ]} />

    <div class="header">
        <h1>Matières</h1>
        <a href="/admin/subjects/add" class="add-button">Ajouter</a>
    </div>

    {#if data.subjects.length === 0}
        <p>Aucune matière</p>
    {:else}
    <table>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Formation</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each data.subjects as subjects}
                <tr>
                    <td>{subjects.name}</td>
                    <td>{data.subjects[subjects.formation_id - 1].name}</td>
                    <td>
                        <a href="/admin/subjects/{subjects.id}/edit/">Modifier</a>
                        <a href="/admin/subjects/{subjects.id}/del/">Supprimer</a>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    {/if}
{:else}
    <p>Wtf</p>
{/if}
