<script>
    import Breadcrumb from '$lib/components/Breadcrumb.svelte';
    import '$lib/_admin.scss';

    export let data;
</script>

<Breadcrumb items={[
    { label: 'Home', href: '/' },
    { label: 'Admin', href: '/admin' },
    { label: 'Utilisateurs', href: '/admin/users' },
]} />

{#if data && 'users' in data}
    <div class="header">
        <h1>Utilisateurs</h1>
        <a href="/admin/users/add" class="add-button">Ajouter</a>
    </div>

    {#if data.users.length === 0}
        <p>Aucun utilisateurs</p>
    {:else}
        <table>
            <thead>
                <tr>
                    <th>Nom complet</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each data.users as user}
                    <tr>
                        <td>{user.full_name}</td>
                        <td>{user.email}</td>
                        <td>
                            <a href="/admin/users/{user.id}/edit/">Modifier</a>
                            <a href="/admin/users/{user.id}/del/">Supprimer</a>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}
{:else}
    <p>Impossible de charger les utilisateurs.</p>
{/if}
