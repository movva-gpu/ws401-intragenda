<script>
    let { data } = $props();
</script>

{#if data && 'subjects' in data}
    <div class="header">
        <h1>Subjects</h1>
        <a href="/admin/subjects/add" class="add-button">Ajouter</a>
    </div>
    
    {#if data.subjects.length === 0}
        <p>No subjects</p>
    {:else}
        <ul>
            {#each data.subjects as subjects}
                <li>
                    {subjects.id} - 
                    {subjects.name} en {data.subjects[subjects.formation_id - 1].name} -
                    <a href="/admin/subjects/{subjects.id}/edit/">Modifier</a>
                    <a href="/admin/subjects/{subjects.id}/del/">Supprimer</a>
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
