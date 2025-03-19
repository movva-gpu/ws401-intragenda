<script>
    import { faHome, faBook, faUniversity } from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from "fontawesome-svelte";

    export let active = '/';

    const asideItems = [
        {
            name: 'Dashboard',
            icon: faHome,
            route: '/'
        },
        {
            name: 'Devoirs',
            icon: faBook,
            route: '/homeworks'
        },
    ];
</script>

<aside class="sidebar">
    <nav>
        <ul>
            <li>
                <a href="/" class="sidebar__logo">
                    <FontAwesomeIcon icon={faUniversity} />
                </a>
            </li>
        {#each asideItems as item}
            <li>
                <a class="sidebar__item { active === item.route ? 'active' : '' }" href="{ item.route }">
                    <FontAwesomeIcon icon={item.icon} />
                    <span>{ item.name }</span>
                </a>
            </li>
        {/each}
        </ul>
    </nav>
</aside>

<style lang="scss">
    @use '$lib/globals';
    @use 'sass:color';

    .sidebar {
        display: flex;
        flex-direction: column;

        width: 100px;

        background-color: globals.$cl-sec;
        color: white;

        box-shadow: 0 0 8px #ffffff1a;
        user-select: none;

        &__item {
            position: relative;
            border-top: 1px solid #ffffff14;

            transition: background-color linear 200ms;

            &:hover {
                background-color: color.adjust($color: globals.$cl-sec, $lightness: -5%);
                transition: background-color linear 100ms;
            }

            &:active {
                background-color: color.adjust($color: globals.$cl-sec, $lightness: -8%);
            }

            &.active {
                fill: globals.$cl-sec;
                color: globals.$cl-sec;
                background-color: globals.$cl-iut;
                pointer-events: none;
                cursor: default;
            }
        }

        &__item, &__logo {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            height: 80px;

            color: white;
            fill: white;
            font-size: .9em;
            font-weight: 300;
            text-align: center;
            text-decoration: none;

            :global(svg) {
                width: 2em;
                height: 2em;
                margin-block-end: globals.$sz-xxxs;
            }
        }

        &__logo {
            background: #fff;
            color: globals.$cl-sec;
            height: 4em;
        }
    }
</style>
