<script>
    let { data } = $props();    
</script>

{#if data && 'formations' in data}
    <h1>Formations</h1>
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

            {#each data.formations as formations}
                   <tr><td> {formations.name} </td>
                    <td><a href="/admin/formations/{formations.id}/edit/">Modifier</a>
                    <a href="/admin/formations/{formations.id}/del/">Supprimer</a></td></tr>
            {/each}
            </tbody>
            </table>
    {/if}
{:else}
    <p>Wtf</p>
{/if}