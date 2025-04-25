<script>
    import Breadcrumb from '$lib/components/Breadcrumb.svelte';
    import '$lib/_admin.scss';

    let { data } = $props();

    let full_name = $state(data.user.full_name);
    let email = $state(data.user.email);
</script>


{#if !('user' in data) || !('formations' in data)}
    <p>Unreachable</p>
{:else}

<Breadcrumb items={[
    { label: 'Home', href: '/' },
    { label: 'Admin', href: '/admin' },
    { label: 'Utilisateurs', href: '/admin/users' },
    { label: `Modification de ${full_name}`, href: `/admin/users/${data.user.id}/edit` }
]} />

<div class="header">
    <h1>Modification de {full_name}</h1>
</div>

<form method="POST" class="form-container">
    <label>
        Nom complet :
        <input type="text" bind:value={full_name} name="full_name" required>
    </label>

    <label>
        Email :
        <input type="email" bind:value={email} name="mail" required>
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
