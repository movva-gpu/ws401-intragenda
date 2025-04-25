<script>
    import Breadcrumb from "$lib/components/Breadcrumb.svelte";
    import '$lib/_admin.scss';
</script>

<Breadcrumb
    items={[
        { label: "Home", href: "/" },
        { label: "Admin", href: "/admin" },
    ]}
/>

<ul>
    <li><a href="admin/users">Utilisateurs</a></li>
    <li><a href="admin/formations">Formations</a></li>
    <li><a href="admin/homeworks">Devoirs</a></li>
    <li><a href="admin/subjects">Matières</a></li>
</ul>

<style lang="scss">
    @use "$lib/globals";
    ul {
        display: grid;
        padding-inline: globals.$sz-md;
        grid-auto-flow: column;
        width: 100%;
        place-items: center;
        height: 50vh;
    }
    a {
        color: globals.$cl-sec;
        text-decoration: none;
        font-size: globals.$sz-xl;

        &:hover {
            text-decoration: underline;
        }
    }
</style>
