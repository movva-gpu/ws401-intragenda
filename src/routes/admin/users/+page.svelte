<script>
    export let data;
</script>

{#if data && 'users' in data}
    <div class="header">
        <h1>Utilisateurs</h1>
        <a href="/admin/users/add" class="add-button">Ajouter</a>
    </div>
    
    {#if data.users.length === 0}
        <p>No users</p>
    {:else}
        <ul>
            {#each data.users as user}
                <li>
                    {user.id} - 
                    {user.full_name} - 
                    {user.email} - 
                    <a href="/admin/users/{user.id}/edit/">Modifier</a>
                    <a href="/admin/users/{user.id}/del/">Supprimer</a>
                </li>
            {/each}
        </ul>
    {/if}
{:else}
    <p>Impossible de charger les utilisateurs.</p>
{/if}

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .add-button {
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        transition: background-color 0.3s;
    }

    .add-button:hover {
        background-color: #45a049;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 10px 0;
    }

    a {
        margin-left: 10px;
        text-decoration: none;
        color: #007BFF;
    }

    a:hover {
        text-decoration: underline;
    }
</style>
