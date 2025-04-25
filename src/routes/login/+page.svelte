<script>
    import "$lib/app.scss";

    let { form, data } = $props();

    let tab = $state(form && "tab" in form ? form.tab : "login");

    const loginFields = [
        {
            label: "Addresse mail",
            name: "mail",
            type: "email",
            required: false, // true
        },
        {
            label: "Mot de passe",
            name: "password",
            type: "password",
            required: false, // true
        },
    ];

    const registerFields = [
        {
            label: "Nom complet",
            name: "name",
            type: "text",
            required: false, // true
        },
        {
            label: "Addresse mail",
            name: "mail",
            type: "email",
            required: false, // true
        },
        {
            label: "Mot de passe",
            name: "password",
            type: "password",
            required: false, // true
        },
        {
            label: "Répéter le mot de passe",
            name: "passwordr",
            type: "password",
            required: false, // true
        },
    ];
</script>

<div class="login">
    <div class="login__logo">
        <div class="logo">
            iUT<span>Troyes</span>
            <small>Intragenda</small>
        </div>
    </div>

    <div class="login__description">
        Bienvenue sur l'Intragenda de l'IUT de Troyes. Connectez-vous pour
        accéder à votre agenda.
    </div>

    <hr>

    <div class="login__tabs">
        <button
            onclick={(e) => {
                e.preventDefault();
                tab = "login";
                if (form && form.field) form.field = null;
            }}
            class="login__tabs__tab {tab === 'login' ? 'active' : ''}"
            >Connexion</button
        >
        <button
            onclick={(e) => {
                e.preventDefault();
                tab = "register";
                if (form && form.field) form.field = null;
            }}
            class="login__tabs__tab {tab === 'register' ? 'active' : ''}"
            >Inscription</button
        >
    </div>
    {#if tab === "login"}
        <form method="POST" action="?/login">
            {#each loginFields as field}
                <label>
                    {field.label}&nbsp;:
                    {#if form && "field" in form && form.field === field.name}
                        <input
                            class="error"
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
            <button type="submit" class="primary">Se connecter</button>
        </form>
    {:else}
        <form method="POST" action="?/register">
            {#each registerFields as field}
                <label>
                    {field.label}&nbsp;:
                    {#if form && "field" in form && form.field === field.name}
                        <input
                            class="error"
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
                <select
                    class={form && "field" in form && form.field === "formation"
                        ? "error"
                        : ""}
                    name="formation"
                >
                    <option value="" disabled selected
                        >--Choisir une formation</option
                    >
                    {#each data.formations as formation}
                        <option value={formation.id}>{formation.name}</option>
                    {/each}
                </select>
            </label>
            <button class="primary" type="submit">S'inscrire</button>
        </form>
    {/if}

    <p class="login__support">
        En cas de problème de connexion, contacter le support
        <br>à cette adresse :
        <a href="mailto:intranet.iut-troyes@univ-reims.fr" class="login__support__email"
            >intranet.iut-troyes@univ-reims.fr</a
        >
    </p>
</div>

<style lang="scss" scoped>
    @use "$lib/globals";

    :global(main) {
        position: relative;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

        &::after {
            content: '';
            position: absolute;
            inset: 0;
            background: url('/bg.jpg') center / cover;
            filter: blur(16px);
            scale: 1.1;
            z-index: -1;
        }
    }

    label, input {
        display: block;
    }

    input, select, button {
        border: 1px solid #ddd;
        padding: globals.$sz-xs globals.$sz-sm;
        width: 100%;
    }

    select {
        border-color: globals.$cl-text
    }

    label {
        margin-bottom: globals.$sz-xs;

        &:has(:required) {
            color: red;
        }

        & small {
            font-size: globals.$sz-xs;
        }
    }

    button.primary {
        background-color: globals.$cl-iut;
        color: white;
        border: none;
        width: 100%;
        cursor: pointer;
        margin-bottom: 20px;
        text-transform: uppercase;
        font-weight: bold;
    }

    .error {
        border-color: red;
    }

    .login {
        background-color: white;
        width: 100%;
        max-width: 400px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
        text-align: center;

        &__logo {
            background-color: globals.$cl-iut;
            padding: 15px;
            margin-inline: auto;
            margin-block-end: 20px;
            border-radius: 5px;
            width: min-content;

            & .logo {
                font-size: 1.6em;
                font-weight: bold;
                color: white;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                line-height: 1;
                gap: globals.$sz-xxs;

                & h1 {
                    color: #333;
                    margin-bottom: 20px;
                    font-size: 24px;
                }

                & span {
                    font-size: .6em;
                }

                & small {
                    display: block;
                    flex: 2 0;
                    width: 100%;
                    font-size: .8em;
                }
            }
        }

        &__tabs {
            display: flex;
            margin-bottom: globals.$sz-sm;
            gap: 1em;

            &__tab {
                flex: 1;
                padding: 10px;
                text-align: center;
                cursor: pointer;
                border: none;
                border-bottom: 2px solid transparent;
                border-radius: unset;
                background: none;
                color: globals.$cl-text;

                &.active {
                    border-bottom: 2px solid #ffb400;
                    font-weight: bold;
                }
            }
        }

        &__support {
            color: #666;
            font-size: 12px;
            margin-top: 20px;
            line-height: 1.5;

            &__email {
                color: globals.$cl-sec;
            }
        }

        &__description {
            color: #666;
            margin-bottom: 20px;
            font-size: 14px;
            line-height: 1.4;
            padding: 0 15px;
        }
    }
</style>
