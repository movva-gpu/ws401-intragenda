<script>
    import Breadcrumb from '../../../../lib/components/Breadcrumb.svelte';
    import '$lib/_admin.scss';

    export let data;
</script>

{#if data && 'homeworks' in data}
    <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Admin', href: '/admin' },
        { label: 'Devoirs', href: '/admin/homeworks' },
        { label: 'Ajout', href: `/admin/homeworks/add` }
    ]} />

    <div class="header">
        <h1>Ajout d'un devoir</h1>
    </div>

    <form method="POST" class="form-container">
        <label>
            Titre&nbsp;:
            <input type="text" name="title" required />
        </label>

        <label>
            Description&nbsp;:
            <textarea name="description" required></textarea>
        </label>

        <label>
            Sujet&nbsp;:
            <select name="subject_id" required>
                <option value="">--Choisir un sujet</option>
                {#each data.subjects as subject}
                    <option value={subject.id}>{subject.name}</option>
                {/each}
            </select>
        </label>

        <label>
            Date d'échéance&nbsp;:
            <input type="datetime-local" name="due_date" required />
        </label>

        <button type="submit">Ajouter</button>
    </form>
{:else}
    <p>Erreur de données</p>
{/if}
