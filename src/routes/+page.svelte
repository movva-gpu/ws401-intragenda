<script>
    import '@fontsource-variable/roboto';
    import '$lib/app.scss';
    import Sidebar from '../components/Sidebar.svelte';

    /** @type {{users:App.User[]}} */
    // export let data;
    // console.log(data); // OH NO, LOGGING USERS TO THE CONSOLE?!!!
</script>


<Sidebar active='/' />
<main>
    <h1>Welcome to SvelteKit</h1>
    <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
</main>

<style lang="scss">
    @use '$lib/globals';

    h1 {
        color: globals.$cl-text;
    }
</style>
