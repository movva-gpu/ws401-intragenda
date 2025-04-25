<script>
    import { faBookOpen, faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons';

    import Breadcrumb from "$lib/components/Breadcrumb.svelte";
    import { FontAwesomeIcon } from 'fontawesome-svelte';
    import DevoirList from '$lib/components/DevoirList.svelte';

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
    const isHomeworkLate = (homework) => homework.due_date.valueOf() < Date.now();
    const lateHomeworks = $derived(data.user.homeworks.filter(isHomeworkLate));

    const someActiveHomeworks = $derived(activeHomeworks.slice(0, 5));
    const someDoneHomeworks = $derived(doneHomeworks.slice(0, 5));

    let areActiveHomeworksExpended = $state(false);
    let areDoneHomeworksExpended = $state(false);
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
            <FontAwesomeIcon size="xl" icon={faBookOpen} fixedWidth />
            <div class="stat-card__label">Devoirs en cours</div>
            <div class="stat-card__number">{activeHomeworks.length}</div>
        </div>
        <div class="stat-card">
            <FontAwesomeIcon size="xl" icon={faCheckCircle} fixedWidth />
            <div class="stat-card__label">Devoirs terminés</div>
            <div class="stat-card__number">{doneHomeworks.length}</div>
        </div>
        <div class="stat-card">
            <FontAwesomeIcon size="xl" icon={faClock} fixedWidth />
            <div class="stat-card__label">Échéances proches</div>
            <div class="stat-card__number">{soonHomeworks.length}</div>
        </div>
        <div class="stat-card">
            <FontAwesomeIcon size="xl" icon={faClock} fixedWidth />
            <div class="stat-card__label">Devoirs en retard</div>
            <div class="stat-card__number">{lateHomeworks.length}</div>
        </div>
    </div>
{/if}

<div class="dashboard-section">
    <div class="section-header">
        <h3>
            Devoirs en cours
        {#if someActiveHomeworks.length !== activeHomeworks.length}
            <small>- {(areActiveHomeworksExpended ? activeHomeworks : someActiveHomeworks).length}/{activeHomeworks.length}</small>
        {/if}
        </h3>
        {#if someActiveHomeworks.length !== activeHomeworks.length}
        <button class="btn-view-all" onclick={() =>
            areActiveHomeworksExpended = !areActiveHomeworksExpended
        }>Voir tout</button>
        {/if}
    </div>
    <DevoirList user={data.user} homeworks={areActiveHomeworksExpended ? activeHomeworks : someActiveHomeworks} />
</div>
<br>
<div class="dashboard-section">
    <div class="section-header">
        <h3>
            Devoirs terminés
        {#if someDoneHomeworks.length !== doneHomeworks.length}
            <small>- {(areDoneHomeworksExpended ? doneHomeworks : someDoneHomeworks).length}/{doneHomeworks.length}</small>
        {/if}
        {#if someDoneHomeworks.length !== doneHomeworks.length}
        <button class="btn-view-all" onclick={() =>
            areDoneHomeworksExpended = !areDoneHomeworksExpended
        }>Voir tout</button>
        {/if}
        </h3>
    </div>
    <DevoirList user={data.user} homeworks={areDoneHomeworksExpended ? doneHomeworks : someDoneHomeworks} />
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
</style>
