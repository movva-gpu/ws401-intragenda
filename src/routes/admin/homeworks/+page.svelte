<script>
    let { data } = $props();
</script>

{#if data && 'homeworks' in data}
    <div class="header">
        <h1>Devoirs</h1>
        <a href="/admin/homeworks/add" class="add-button">Ajouter</a>
    </div>
    
    {#if data.homeworks.length === 0}
        <p>No homeworks</p>
    {:else}
        <ul>
            {#each data.homeworks as homework}
                <li>
                    {homework.id} - 
                    {homework.title} - 
                    {homework.description} - 
                    {data.homeworks[homework.subject_id - 1]?.name} - 
                    {homework.due_date} -
                    <a href="/admin/homeworks/{homework.id}/edit/">Modifier</a>
                    <a href="/admin/homeworks/{homework.id}/del/">Supprimer</a>
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
