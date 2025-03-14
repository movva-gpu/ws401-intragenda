<script lang="ts">
    import '@fontsource-variable/roboto';
    import '$lib/app.scss';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<style lang="scss">
    @use '$lib/_globals.scss';

    h1 {
        color: globals.$cl-text;
    }
</style>
