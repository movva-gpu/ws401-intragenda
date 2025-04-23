<script>
    import { faHome } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "fontawesome-svelte";
    import { onMount } from "svelte";

    let { items = $bindable([]) } = $props();

    onMount(() => {
        if (items.length !== 0) return

        const pathParts = window.location.pathname.split("/").filter(Boolean);

        items = pathParts.map((part, index) => {
            const href = "/" + pathParts.slice(0, index + 1).join("/");
            const label = decodeURIComponent(part)
                .replace(/-/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase());
            return { label, href };
        });

        if (items.length === 0) {
            items.unshift(
                { label: "Home", href: "/" },
                { label: "Tableau de bord", href: "/" },
            );
            return;
        }

        items = [
            { label: "Home", href: "/" },
            ...items,
        ];
    });

</script>

<nav aria-label="Breadcrumb" class="container__breadcrumb">
    <ol class="container__list">
        {#each items as item, index}
            {#if index > 0}
                <li class="container__separator">/</li>
            {/if}
            <li class="container__item">
                <a href={item.href} class="container__link">
                    {#if item.label === "Home"}
                        <FontAwesomeIcon title="Accueil"
                            icon={faHome}
                            class="container__link"
                        />
                    {:else}
                        <span title={item.label}>{item.label}</span>
                    {/if}
                </a>
            </li>
        {/each}
    </ol>
</nav>

<style lang="scss">
    @use "$lib/globals";

    nav {
        padding-bottom: globals.$sz-sm;
    }

    .container__breadcrumb {
        font-size: globals.$sz-sm;
        color: #4b5563;
    }

    .container__list {
        display: flex;
        gap: globals.$sz-xxs;
    }

    .container__item {
        display: flex;
        align-items: center;
    }

    .container__separator {
        opacity: 0.5;
        user-select: none;
        font-weight: 800;
    }

    .container__link {
        color: inherit;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }

        &:not([href]) {
            user-select: none;
            cursor: not-allowed;
            text-decoration: none;
            opacity: 0.8;
        }
    }

    .container__current {
        font-weight: 600;
        color: #111827;
    }
</style>
