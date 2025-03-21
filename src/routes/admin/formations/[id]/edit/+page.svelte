<script>
    let { data } = $props();
</script>

{#if !('formations' in data)}
    <p>Unreachable</p>
{:else}
<form method="POST" class="form-container">
    <label>
        Nom :
        <input type="text" value={data.formations.name} name="name" required />
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
