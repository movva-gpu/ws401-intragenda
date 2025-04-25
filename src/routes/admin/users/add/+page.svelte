<script>
    import Breadcrumb from '$lib/components/Breadcrumb.svelte';
    import '$lib/_admin.scss';

    export let data;
</script>


{#if data && 'formations' in data}
    <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Admin', href: '/admin' },
        { label: 'Utilisateurs', href: '/admin/users' },
        { label: 'Ajout', href: '/admin/users/add' }
    ]} />

    <div class="header">
        <h1>Ajout d'un utilisateur</h1>
    </div>

    <form method="POST" class="form-container">
        <label>
            Nom complet :
            <input type="text" name="full_name" required />
        </label>

        <label>
            Email :
            <input type="email" name="email" required />
        </label>

        <label>
            Mot de passe :
            <input type="password" name="password_hash" required />
        </label>

        <label>
            Rôle :
            <select  name="role" required>
                <option value="">--Choisir un rôle</option>
                <option value="admin">Admin</option>
                <option value="teacher">Prof</option>
                <option value="student">Élève</option>
            </select>
        </label>
        <label>
            Formation :
            <select  name="formation" required>
                <option value="">--Choisir une formation</option>
                {#each data.formations as formation}
                    <option value={formation.id}>{formation.name}</option>
                {/each}
            </select>
        </label>

        <button type="submit">Ajouter</button>
    </form>
{:else}
    <p>Impossible de charger les formations.</p>
{/if}

<style lang="scss">
    @use 'sass:color';
    @use '$lib/globals';

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .back-button {
        padding: 10px 20px;
        background-color: globals.$cl-iut;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        transition: background-color 0.3s;

        &:hover {
            background-color: color.adjust(globals.$cl-iut, $lightness: 10%);
        }
    }

    .form-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 300px;
    }

    input, select {
        padding: 8px;
        margin: 5px 0;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    button {
        padding: 10px 20px;
        background-color: globals.$cl-iut;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        transition: background-color 0.3s;
        border: none;
        cursor: pointer;

        &:hover {
            background-color: color.adjust(globals.$cl-iut, $lightness: 10%);
        }
    }
</style>
