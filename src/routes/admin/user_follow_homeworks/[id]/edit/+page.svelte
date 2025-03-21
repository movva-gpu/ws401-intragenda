<script>
    let { data } = $props();
</script>

{#if !('user' in data) || !('formations' in data)}
    <p>Unreachable</p>
{:else}
<form method="POST" class="form-container">
    <label>
        Nom complet :
        <input type="text" value={data.user.full_name} name="full_name" required />
    </label>

    <label>
        Email :
        <input type="email" value={data.user.email} name="mail" required />
    </label>

    <label>
        Rôle :
        <select value={data.user.role} name="role" required>
            <option value="">--Choisir un rôle</option>
            <option value="admin">Admin</option>
            <option value="teacher">Prof</option>
            <option value="student">Élève</option>
        </select>
    </label>
    
    <label>
        Formation :
        <select value={data.user.formation_id} name="formation" required>
            <option value="">--Choisir une formation</option>
            {#each data.formations as formation}
                <option value={formation.id}>{formation.name}</option>
            {/each}
        </select>
    </label>

    <button type="submit">Modifier</button>
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
