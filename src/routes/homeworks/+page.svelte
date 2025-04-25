<script>
    import { faBookOpen, faCheckCircle, faClock, faPlus } from '@fortawesome/free-solid-svg-icons';

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
    const createdHomeworks = $derived(data.user.created_homeworks)

    const someHomeworks = $derived(data.user.homeworks.slice(0, 5));
    const someCreatedHomeworks = $derived(createdHomeworks.slice(0, 5));

    let areHomeworksExpended = $state(false);
    let areCreatedHomeworksExpended = $state(false);
</script>

<Breadcrumb items={[
    { label: 'Home', href: '/' },
    { label: 'Devoirs', href: '/homeworks' }
]} />
<h1>Devoirs</h1>

<div class="dashboard-section">
    <div class="section-header">
        <h3>
            Devoirs suivis
        {#if someHomeworks.length !== data.user.homeworks.length}
            <small>- {(areHomeworksExpended ? data.user.homeworks : someHomeworks).length}/{data.user.homeworks.length}</small>
        <button class="btn-view-all" onclick={() => areHomeworksExpended = !areHomeworksExpended}>Voir tout</button>
        {/if}
        </h3>
        {#if someHomeworks.length !== data.user.homeworks.length}
        <button class="btn-view-all" onclick={() =>
            areHomeworksExpended = !areHomeworksExpended
        }>Voir tout</button>
        {/if}
    </div>
    <DevoirList user={data.user} homeworks={areHomeworksExpended ? data.user.homeworks : someHomeworks} />
</div>
<br>
<div class="dashboard-section">
    <div class="section-header">
        <h3>
            Devoirs créés
        {#if someCreatedHomeworks.length !== createdHomeworks.length}
            <small>- {(areCreatedHomeworksExpended ? createdHomeworks : someCreatedHomeworks).length}/{createdHomeworks.length}</small>
        <button class="btn-view-all" onclick={() => areCreatedHomeworksExpended = !areCreatedHomeworksExpended}>Voir tout</button>
        {/if}
        </h3>
        <a class="add-button" href="/homeworks/create" title="Créer un devoir" style="color: white">
            Ajouter <FontAwesomeIcon icon={faPlus} />
        </a>
        {#if someCreatedHomeworks.length !== createdHomeworks.length}
        <button class="btn-view-all" onclick={() =>
            areCreatedHomeworksExpended = !areCreatedHomeworksExpended
        }>Voir tout</button>
        {/if}
    </div>
    <DevoirList user={data.user} homeworks={areCreatedHomeworksExpended ? createdHomeworks : someCreatedHomeworks} />
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
