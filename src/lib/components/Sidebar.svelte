<script>
    import {
        faHome,
        faBook,
        faUniversity,
        faLandMineOn,
        faUserTie,
        faSearch,
    } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "fontawesome-svelte";
    import { slide } from "svelte/transition";

    let { active = "/", isAdmin = false, searchShown = false } = $props();

    const asideItems = [
        {
            name: "Dashboard",
            icon: faHome,
            match: /^\/$/,
            route: "/",
        },
        {
            name: "Devoirs",
            icon: faBook,
            match: /^\/homeworks/,
            route: "/homeworks",
        },
    ];
</script>

<aside class="sidebar">
    <nav>
        <ul>
            <li>
                <a href="/" class="sidebar__logo">
                    <!-- <FontAwesomeIcon icon={faUniversity} /> -->
                    <img src="/logo.webp" alt="Logo" />
                </a>
            </li>
            <div class="shadow">
                {#if searchShown}
                    <li transition:slide={{ duration: 300, axis: "x" }}>
                        <span
                            title="Searching"
                            class="sidebar__item active"
                        >
                            <FontAwesomeIcon icon={faSearch} />
                            <span>Searching</span>
                        </span>
                    </li>
                {/if}
                {#each asideItems as item}
                    <li transition:slide={{ duration: 300, axis: "x" }}>
                        <a
                            href={item.route}
                            title={item.name}
                            class="sidebar__item {active.match(item.match) &&
                            !searchShown
                                ? 'active'
                                : ''}"
                        >
                            <FontAwesomeIcon icon={item.icon} />
                            <span>{item.name}</span>
                        </a>
                    </li>
                {/each}
                {#if isAdmin}
                    <li transition:slide={{ duration: 300, axis: "x" }}>
                        <a
                            href="/admin"
                            title="Admin"
                            class="sidebar__item {active.startsWith('/admin')
                                ? 'active'
                                : ''}"
                        >
                            <FontAwesomeIcon icon={faUserTie} />
                            <span>Admin</span>
                        </a>
                    </li>
                {/if}
            </div>
        </ul>
    </nav>
</aside>

<style lang="scss">
    @use "$lib/globals";
    @use "sass:color";

    .sidebar {
        position: relative;

        display: flex;
        flex-direction: column;

        width: 100px;
        padding-top: globals.$sz-header;

        background-color: globals.$cl-sec;
        color: white;

        user-select: none;
        z-index: 100;

        .shadow {
            box-shadow: globals.$shadow;
        }

        &__item {
            position: relative;
            border-top: 1px solid #ffffff14;

            transition: background-color linear 200ms;

            &:hover {
                background-color: color.adjust(
                    $color: globals.$cl-sec,
                    $lightness: -5%
                );
                transition: background-color linear 100ms;
            }

            &:active {
                background-color: color.adjust(
                    $color: globals.$cl-sec,
                    $lightness: -8%
                );
            }

            &.active {
                fill: globals.$cl-sec;
                color: globals.$cl-sec;
                background-color: globals.$cl-iut;
                pointer-events: none;
                cursor: default;
            }
        }

        &__item,
        &__logo {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            height: 80px;

            color: white;
            fill: white;
            font-size: 0.9em;
            font-weight: 300;
            text-align: center;
            text-decoration: none;

            :global(img) {
                width: 3em;
                margin-block-end: globals.$sz-xxxs;
            }
        }

        &__logo {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;

            background: #fff;
            color: globals.$cl-sec;
            height: globals.$sz-header;

            z-index: 10;
        }
    }
</style>
