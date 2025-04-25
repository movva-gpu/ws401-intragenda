<script>
    import { faCalendarAlt, faCheck, faMinus, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
    import { onMount } from "svelte";
    import { FontAwesomeIcon } from "fontawesome-svelte";

    let { user, homeworks = [], defaultMsg = 'Aucun devoir à venir', followed = null } = $props();

    /** @type {HTMLElement} */
    let devoirsList;

    const submitParent = event => {
        try { event.target.closest("form").submit(); } catch (_) {}
    };

    const isHomeworkLate = (homework) => homework.due_date.valueOf() < Date.now();
</script>

<div class="devoirs-list" bind:this={devoirsList}>
    {#each homeworks as homework}
    {@const _date = homework.due_date.toLocaleDateString(
        'fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}
    <form method="POST" action="/">
        <input onchange={e => e.target.value = user.id} type="hidden" name="id" value={user.id}>
        <input onchange={e => e.target.value = homework.id} type="hidden" name="hid" value={homework.id}>
        <div class="devoir-item">
            <div>
                <h4 class="devoir-title">
                    {#if isHomeworkLate(homework) && user.homeworks.find(h => h.id === homework.id) !== undefined}
                        <span class="late">En retard</span>-
                    {/if}
                    {homework.title}
                    <small>
                        - par
                        {#if !homework.creator_id || user.id === homework.creator_id}
                            Vous
                        {:else}
                        <span title={'en ' + homework.creator_formation}>{homework.creator_name}</span>
                        {/if}
                    </small>
                </h4>
                <div class="devoir-info">{homework.subject}</div>
            </div>
            <div class="devoir-right">
                <div class="devoir-date">
                    <FontAwesomeIcon icon={faCalendarAlt} />&nbsp;&nbsp;
                    <span>Pour le {_date[0].toUpperCase() + _date.slice(1)}</span>
                </div>
                <div class="devoir-actions">
                    {#if user.homeworks.find(h => h.id === homework.id) !== undefined}
                    <label title={
                        user.homeworks.find(h => h.id === homework.id && h.done === 1) === undefined
                        ? "Marquer comme fait" : "Marquer comme non fait"}>
                        <input onchange={submitParent} style="display: none;" type="checkbox" name="done" checked={
                            user.homeworks.find(h => h.id === homework.id && h.done === 1) !== undefined
                        } />
                        <FontAwesomeIcon icon={
                            user.homeworks.find(h => h.id === homework.id && h.done === 1) === undefined
                            ? faCheck : faTimes} />
                    </label>
                    {/if}
                    <label title={
                        user.homeworks.find(h => h.id === homework.id) === undefined
                        ? "Suivre" : "Ne plus suivre"}>
                        <input onchange={submitParent} style="display: none;" type="checkbox" name="follow" checked={
                            user.homeworks.find(h => h.id === homework.id) !== undefined} />
                        <FontAwesomeIcon icon={
                            user.homeworks.find(h => h.id === homework.id) === undefined
                            ? faPlus : faMinus} />
                    </label>
                </div>
            </div>
        </div>
    </form>
    {:else}
    <div class="devoir-item">
        <div><div class="devoir-title">{defaultMsg}</div></div>
    </div>
    {/each}
</div>

<style lang="scss">
    .late {
        color: red;
        font-weight: bold;
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
        transition: background-color 0.2s;
    }

    .devoir-item:last-child {
        border-bottom: none;
    }

    .devoir-title {
        display: flex;
        align-items: center;
        gap: .33em;
        gap: .5ch;

        small {
            opacity: 0.5;
            font-size: 0.8em;

            span[title] {
                text-decoration: underline dotted;
                cursor: help;
            }
        }
    }

    .devoir-info {
        color: #777;
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
        margin-bottom: 5px;
    }

    .devoir-description {
        margin: 5px 0;
        color: #666;
        font-size: 14px;
    }

    .devoir-info {
        font-size: 13px;
    }

    .devoir-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 10px;
    }

    .devoir-date {
        font-size: 13px;
        display: flex;
        align-items: center;
    }

    .devoir-right {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: centere;
        gap: 10px;
    }
</style>
