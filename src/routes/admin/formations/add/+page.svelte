<script>
    export let data;
</script>

{#if data}
    <div class="header">
        <a href="/admin/formations" class="back-button">Retour à la liste</a>
    </div>

    <form method="POST" class="form-container">
        <label>
            Nom de la formation :
            <input type="text" name="name" required />
        </label>

        <button type="submit">Ajouter</button>
    </form>
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

    .back-button {
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        transition: background-color 0.3s;
    }

    .back-button:hover {
        background-color: #45a049;
    }

    .form-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 300px;
    }

    input {
        padding: 8px;
        margin: 5px 0;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    button {
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border-radius: 5px;
        font-weight: bold;
        border: none;
        cursor: pointer;
    }

    button:hover {
        background-color: #45a049;
    }
</style>
