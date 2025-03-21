<script>
    let { data } = $props();    
</script>

{#if data && 'users' in data}
    <h1>Users</h1>
    {#if data.users.length === 0}
        <p>No users</p>
    {:else}
        <table>
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Formation</th>
                    <th>Actions</th>
                </tr>
            </thead>
            {#each data.users as user}
            <tbody>
                <tr>
                    <td>{user.full_name} </td> 
                    <td>{data.formations[user.formation_id - 1].name}</td>
                    <td>
                    <a href="/admin/users/{user.id}/edit/">Modifier</a>
                    <a href="/admin/users/{user.id}/del/">Supprimer</a>
                    </td>
                </tr>
            </tbody>
            {/each}
            </table>
    {/if}
{:else}
    <p>Wtf</p>
{/if}