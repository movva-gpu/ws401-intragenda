<script>
    import Breadcrumb from '../../../../../lib/components/Breadcrumb.svelte';
    import '$lib/_admin.scss';

    let { data } = $props();

    let title = $state(data.homeworks.title);
</script>

{#if !('homeworks' in data) }
    <p>Unreachable</p>
{:else}
<Breadcrumb items={[
    { label: 'Home', href: '/' },
    { label: 'Admin', href: '/admin' },
    { label: 'Devoirs', href: '/admin/homeworks' },
    { label: `Modification de "${title}"`, href: `/admin/homeworks/${data.homeworks.id}/edit` }
]} />

<div class="header">
    <h1>Modification de {title}</h1>
</div>

<form method="POST" class="form-container">
    <label>
        Titre du devoir :
        <input type="text" bind:value={title} name="title" required>
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
