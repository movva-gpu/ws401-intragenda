<script>
    import '$lib/app.scss';
    import '$lib/login.scss';

    let { form, data } = $props();

    const fields = [
        {
            label: 'Nom complet',
            name: 'name',
            type: 'text',
            required: false, // true
        },
        {
            label: 'Addresse mail',
            name: 'mail',
            type: 'email',
            required: false, // true
        },
        {
            label: 'Mot de passe',
            name: 'password',
            type: 'password',
            required: false, // true
        },
        {
            label: 'Répéter le mot de passe',
            name: 'passwordr',
            type: 'password',
            required: false, // true
        },
    ];
</script>

<form method="POST">
    {#each fields as field}
        <label>
            {field.label}&nbsp;:
            {#if form && 'field' in form && form.field === field.name}
                <input
                    class='error'
                    name={field.name}
                    type={field.type}
                    required={field.required}
                >
                <small>{form.msg}</small>
            {:else}
                <input
                    name={field.name}
                    type={field.type}
                    required={field.required}
                >
            {/if}
        </label>
    {/each}

    <label>
        Formation&nbsp;:
        <select class={form && 'field' in form && form.field === 'formation'
          ? 'error'
          : ''
        } name="formation">
                <option value="" disabled selected>--Choisir une formation</option>
            {#each data.formations as formation}
                <option value={formation.id}>{formation.name}</option>
            {/each}
        </select>
    </label>
    <button type="submit">S'inscrire</button>
</form>

<style lang="scss">
    @use '$lib/globals';

    .error {
        border-color: red;
    }

    label small {
        font-size: globals.$sz-xs;
    }
</style>
