<script>
    let { data } = $props();    
</script>

{#if data && 'users' in data}
    <h1>Users</h1>
    {#if data.users.length === 0}
        <p>No users</p>
    {:else}
        <ul>
            {#each data.users as user}
                <li>
                    {user.full_name} en {data.formations[user.formation_id - 1].name} -
                    <a href="/admin/users/{user.id}/edit/">Modifier</a>
                    <a href="/admin/users/{user.id}/del/">Supprimer</a>
                </li>
            {/each}
        </ul>
    {/if}
{:else}
    <p>Wtf</p>
{/if}