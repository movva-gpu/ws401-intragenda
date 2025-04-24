<script>
    export let data;
</script>

{#if !('formations' in data)}
    <p>Unreachable</p>
{:else}
<form method="POST" class="form-container">
    <label>
        Nom :
        <input type="text" name="name" required />
    </label>
    
    <label>
        Formation :
        <select name="formation_id" required>
            <option value="">--Choisir une formation</option>
            {#each data.formations as formation}
                <option value={formation.id}>
                    {formation.name}
                </option>
            {/each}
        </select>
    </label>

    <button type="submit">Ajouter</button>
</form>
{/if}

<style>
    .form-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 300px;
    }
</style>
