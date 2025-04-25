<script>
    import { faArrowRightFromBracket, faBell, faCalendarAlt, faSearch, faTimes, faX } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "fontawesome-svelte";
    import { onMount } from "svelte";

    /** @type { user: string, calendarButton: HTMLButtonElement, searchShown: boolean } */
    let { user = 'Étudiant', calendarButton = $bindable(), search = $bindable() } = $props();

    let isMac = $state(false);

    onMount(() => {
        isMac = navigator.userAgent.indexOf('Mac') !== -1;

        window.addEventListener('keydown', e => {
            if ((isMac ? e.metaKey : e.ctrlKey) && e.key == 'k') {
                e.preventDefault();
                if (search) search.focus();
            }
        });
    });
</script>

<header class="header">
    <div class="header__left">
        <h1 class="header__title">Département MMI</h1>
        <div class="header__search">
            <div
                role="button"
                class="header__search__icon"
                tabindex="0"
                onclick={() => search.value = ''}
                onkeydown={(e) => e.key === 'Enter' && search.focus()}
            >
                <FontAwesomeIcon icon={faSearch} />
            </div>
            <div class="header__search__icon x">
                <FontAwesomeIcon icon={faTimes} />
            </div>
            <input type="text" placeholder="Rechercher..." bind:this={search}>
            <kbd>{isMac ? '⌘' : 'Ctrl'}+K</kbd>
        </div>
    </div>
    <div class="header__tools">
        <!-- <div class="header__tools__icon" id="notification-button">
            <FontAwesomeIcon icon={faBell} />
            <span class="header__notification__badge" id="notificationCount">3</span>
        </div> -->
        <button class="header__tools__icon" id="calendar-button" bind:this={calendarButton}>
            <FontAwesomeIcon icon={faCalendarAlt} />
        </button>
        <div class="header__tools__profile">
            <img src="https://placehold.co/30" alt="Profil" class="avatar">
            <span class="username">{user}</span>
        </div>
        <a href="/logout" title="Déconnexion" class="header__tools__icon"><FontAwesomeIcon icon={faArrowRightFromBracket} /></a>
    </div>
</header>

<style lang="scss">
    @use '$lib/globals';

    .header {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;

        display: flex;
        justify-content: space-between;
        align-items: center;

        height: globals.$sz-header;
        padding: 0 globals.$sz-lg;

        background-color: white;

        box-shadow: globals.$shadow;
        z-index: 99;

        &__left {
            display: flex;
            align-items: center;
        }

        &__title {
            padding: 0;
            margin-right: 1em;

            font-size: 1.2rem;
            font-weight: normal;
            color: globals.$cl-title;
        }

        &__tools {
            display: flex;
            align-items: center;
            gap: 1em;

            &__icon {
                display: flex;
                align-items: center;
                justify-content: center;
                color: globals.$cl-text;

                width: 30px;
                height: 30px;
                padding: 0;
                border: 1px solid #ddd;
                border-radius: 50%;

                background-color: #eee;

                cursor: pointer;

                transition: background-color .2s ease;

                &:hover {
                    background-color: #ddd;
                }
            }

            &__profile {
                display: flex;
                align-items: center;
                gap: .33em;

                & .avatar {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }
            }
        }

        &__search {
            position: relative;

            display: flex;
            align-items: center;
            border: 1px solid #ddd;
            border-radius: globals.$sz-xs;
            padding: globals.$sz-xxxs globals.$sz-xs;

            overflow-x: clip;

            & input {
                margin-left: 16px;
                border: none;
                outline: none;
                padding-block: 0;
                padding-inline: 0;
                width: 150px;

                transition: ease 333ms;
                transition-property: padding margin width;
                background: none;
            }

            &__icon {
                transition: all 333ms ease;
            }

            &__icon.x {
                margin-left: -16px;
                opacity: 0;

                & :global(svg) {
                    rotate: .5turn;
                }
            }

            &__icon :global(svg) {
                transition: inherit;
            }

            & kbd {
                position: absolute;
                top: 0;
                bottom: 0;
                right: globals.$sz-xs;

                display: flex;
                align-items: center;

                opacity: .5;
                transition: opacity 100ms;
                transition: ease 333ms translate;

                user-select: none;
            }

            &:has(input:focus), &:hover, &:has(input:not(:placeholder-shown)) {
                & kbd {
                    translate: 125%;
                }
            }

            &:has(input:focus), &:hover {
                & :global(svg) {
                    translate: -175%;
                }

                & input {
                    padding-inline: 0;
                    margin-left: -16px;
                    margin-right: 0;
                    width: 150px + 16px * 2;
                }
            }

            &:has(input:not(:placeholder-shown)) {
                & .header__search__icon {
                    margin-left: -16px;
                    opacity: 0;
                }

                & .header__search__icon.x, .header__search__icon.x :global(svg) {
                    translate: 0;
                    margin-left: 0;
                    opacity: 1;
                    rotate: 0deg;
                }

                & input {
                    padding-inline: 0;
                    margin-left: 16px;
                    width: 150px;
                }
            }
        }
    }
</style>
