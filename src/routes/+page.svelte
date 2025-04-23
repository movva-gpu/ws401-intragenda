<script>
    import { faBookOpen, faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons';

    import Breadcrumb from "$lib/components/Breadcrumb.svelte";
    import { FontAwesomeIcon } from 'fontawesome-svelte';

    let { data = { user: { homeworks: [] } } } = $props();

    data.user.homeworks = data.user.homeworks.sort((a, b) => a.due_date.valueOf() - b.due_date.valueOf());

    const doneHomeworks = $derived(data.user.homeworks.filter(h => h.done));
    const activeHomeworks = $derived(data.user.homeworks.filter(h => !h.done));
    const soonHomeworks = $derived(data.user.homeworks.filter(h => {
        const oneDayInMs = 24 * 60 * 60 * 1000;
        const now = Date.now();
        const inOneDay = now + oneDayInMs;
        return h.dueDate > now && h.dueDate <= inOneDay;
    }));

    const someActiveHomeworks = $derived(activeHomeworks.slice(0, 5));

    let areHomeworksExpended = $state(false);
</script>

<h1>Tableau de bord</h1>
<Breadcrumb />

{#if data.user.homeworks.length === 0}
    <div class="nothing">C'est calme, trop calme. Allez donc faire une sieste&nbsp;!</div>
{:else if activeHomeworks.length === 0}
    <div class="done">Bravo vous avez terminé tous vos devoirs&nbsp;!</div>
{:else}
    <div class="stats-cards">
        <div class="stat-card">
            <FontAwesomeIcon size="xl" icon={faBookOpen} />
            <div class="stat-card__label">Devoirs en cours</div>
            <div class="stat-card__number">{activeHomeworks.length}</div>
        </div>
        <div class="stat-card">
            <FontAwesomeIcon size="xl" icon={faCheckCircle} />
            <div class="stat-card__label">Devoirs terminés</div>
            <div class="stat-card__number">{doneHomeworks.length}</div>
        </div>
        <div class="stat-card">
            <FontAwesomeIcon size="xl" icon={faClock} />
            <div class="stat-card__label">Échéances proches</div>
            <div class="stat-card__number">{soonHomeworks.length}</div>
        </div>
    </div>
{/if}

<div class="dashboard-section">
    <div class="section-header">
        <h3>
            Devoirs en cours
            <small>- {(areHomeworksExpended ? activeHomeworks : someActiveHomeworks).length}/{activeHomeworks.length}</small>
        </h3>
        <button class="btn-view-all" onclick={() => areHomeworksExpended = !areHomeworksExpended}>Voir tout</button>
    </div>
    <div class="devoirs-list" id="upcomingAssignments">
        {#each areHomeworksExpended ? activeHomeworks : someActiveHomeworks as homework}
        {@const _date = homework.due_date.toLocaleDateString(
            'fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}
        <div class="devoir-item">
            <div>
                <div class="devoir-title">{homework.title}</div>
                <div class="devoir-info">{homework.subject}</div>
            </div>
            <div class="devoir-date">
                <i class="far fa-calendar-alt"></i>
                <span>{_date[0].toUpperCase() + _date.slice(1)}</span>
            </div>
        </div>
        {:else}
        <div class="devoir-item">
            <div><div class="devoir-title">Aucun devoir à venir</div></div>
        </div>
        {/each}
    </div>
</div>

<style lang="scss">
    @use '$lib/globals';

    .done {
        text-align: center;
        color: globals.$cl-suc;
        font-weight: bold;
    }

    .nothing {
        text-align: center;
        color: globals.$cl-text;
        font-weight: 300;
    }

    .stats-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin-bottom: 20px;
    }

    .stat-card {
        background-color: white;
        border-radius: 5px;
        padding-block: globals.$sz-md;
        padding-inline: globals.$sz-lg;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);

        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-template-areas:
            "icon"
            "number"
            "label"
        ;
        place-items: center;

        &__number {
            font-size: 24px;
            font-weight: bold;
            color: globals.$cl-sec;
            grid-area: number;
        }

        &__label {
            font-weight: 300;
            grid-area: label;
        }

        :global(svg) {
            color: globals.$cl-sec;
            font-size: 24px;
            margin-bottom: 10px;
            grid-area: icon;
        }
    }

    .devoirs-list {
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .devoir-item {
        padding: 15px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        display: flex;
        align-items: flex-start;
        padding: 15px;
        border-bottom: 1px solid var(--border-color);
        transition: background-color 0.2s;
    }

    .devoir-item:last-child {
        border-bottom: none;
    }

    .devoir-title {
        font-weight: bold;
        color: #333;
        margin-bottom: 5px;
    }

    .devoir-info {
        color: #777;
        font-size: 13px;
    }

    .devoir-item:hover {
        background-color: #f9f9f9;
    }

    .devoir-status {
        margin-right: 15px;
        padding-top: 5px;
    }

    .devoir-content {
        flex: 1;
    }

    .devoir-title {
        font-weight: bold;
        color: var(--text-dark);
        margin-bottom: 5px;
    }

    .devoir-description {
        margin: 5px 0;
        color: #666;
        font-size: 14px;
    }

    .devoir-info {
        color: var(--text-light);
        font-size: 13px;
    }

    .devoir-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 10px;
    }

    .devoir-date {
        color: var(--text-medium);
        font-size: 13px;
        display: flex;
        align-items: center;
    }
</style>
