<script>
    export let data;
</script>

{#if data && 'formations' in data}
    <div class="header">
        <h1>Formations</h1>
        <a href="/admin/formations/add" class="add-button">Ajouter</a>
    </div>

    {#if data.formations.length === 0}
        <p>No formations</p>
    {:else}
        <ul>
            {#each data.formations as formation}
                <li>
                    {formation.id} - {formation.name} - 
                    <a href="/admin/formations/{formation.id}/edit/">Modifier</a>
                    <a href="/admin/formations/{formation.id}/del/">Supprimer</a>
                </li>
            {/each}
        </ul>
    {/if}
{:else}
    <p>Erreur de données</p>
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
</style>
