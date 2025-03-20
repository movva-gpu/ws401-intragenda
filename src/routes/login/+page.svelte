<script>
    import '$lib/app.scss';
    import '$lib/login.scss';

    let { form, data } = $props();

    const fields = [
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
    <button type="submit">Se connecter</button>
</form>
<a href="/register">Se créer un compte</a>

<style lang="scss">
    @use '$lib/globals';

    .error {
        border-color: red;
    }

    label small {
        font-size: globals.$sz-xs;
    }
</style>
