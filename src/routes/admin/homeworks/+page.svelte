<script>
    import Breadcrumb from "$lib/components/Breadcrumb.svelte";
    import '$lib/_admin.scss';

    let { data } = $props();
</script>

{#if data && 'homeworks' in data}
    <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Admin', href: '/admin' },
        { label: 'Devoirs', href: '/admin/homeworks' },
    ]} />

    <div class="header">
        <h1>Devoirs</h1>
        <a href="/admin/homeworks/add" class="add-button">Ajouter</a>
    </div>

    {#if data.homeworks.length === 0}
        <p>Aucun devoir</p>
    {:else}
    <table>
        <thead>
            <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Matière</th>
                <th>Date limite</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each data.homeworks as homework}
                <tr>
                    <td>{homework.title}</td>
                    <td>{homework.description}</td>
                    <td>{homework.subject_name}</td>
                    <td>{homework.due_date.toLocaleDateString('fr-FR')}</td>
                    <td>
                        <a href="/admin/homeworks/{homework.id}/edit/">Modifier</a>
                        <a href="/admin/homeworks/{homework.id}/del/">Supprimer</a>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    {/if}
{:else}
    <p>Erreur de données</p>
{/if}
