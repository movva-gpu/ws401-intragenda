<script>
    import '@fontsource-variable/roboto';
    import '$lib/app.scss';

    /** @type {{users:App.User[]}} */
    export let data;
    console.log(data); // OH NO, LOGGING USERS TO THE CONSOLE?!!!
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<style lang="scss">
    @use '$lib/_globals.scss';

    h1 {
        color: globals.$cl-text;
    }
</style>
