<script>
    let { data } = $props();
</script>

{#if !('homeworks' in data) }
    <p>Unreachable</p>
{:else}
<form method="POST" class="form-container">
    <label>
        Titre du devoir :
        <input type="text" value={data.homeworks.title} name="title" required />
    </label>

    <label>
        Description :
        <input type="text" value={data.homeworks.description} name="description" required />
    </label>
    <label>
        User id :
        <input type="text" value={data.homeworks.user_id} name="user_id" required />
    </label>
    <label>
        Subject id :
        <input type="text" value={data.homeworks.subject_id} name="subject_id" required />
    </label>
    <label>
        Due Date :
        <input type="datetime-local" value={data.homeworks.due_date.toISOString().replace(/\..*Z$/, '')} name="due_date" required />
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
