<script>
    let { data } = $props();    
</script>

{#if data && 'formations' in data}
    <h1>Users</h1>
    {#if data.formations.length === 0}
        <p>No formations</p>
    {:else}
        <ul>
            {#each data.formations as formations}
                <li>
                    {formations.name}
                    <a href="/admin/formations/{formations.id}/edit/">Modifier</a>
                    <a href="/admin/formations/{formations.id}/del/">Supprimer</a>
                </li>
            {/each}
        </ul>
    {/if}
{:else}
    <p>Wtf</p>
{/if}