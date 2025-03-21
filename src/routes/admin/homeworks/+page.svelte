<script>
    let { data } = $props();    
</script>

{#if data && 'homeworks' in data}
    <h1>Homeworks</h1>
    {#if data.homeworks.length === 0}
        <p>No homeworks</p>
    {:else}
        <table>
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Date de remise</th>
                    <th>Actions</th>
                </tr>
            </thead>
            {#each data.homeworks as homeworks}
                <tbody>
                    <tr>
                    <td>{homeworks.title}</td>
                    <td>{homeworks.due_date}</td>
                    <td>
                    <a href="/admin/homeworks/{homeworks.id}/edit/">Modifier</a>
                    <a href="/admin/homeworks/{homeworks.id}/del/">Supprimer</a>
                    </td>
                    </tr>
                </tbody>
            {/each}
            </table>
    {/if}
{:else}
    <p>Wtf</p>
{/if}