<script>
    let { homeworks = [], defaultMsg = 'Aucun devoir à venir' } = $props();
</script>

<div class="devoirs-list">
    {#each homeworks as homework}
    {@const _date = homework.due_date.toLocaleDateString(
        'fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}
    <div class="devoir-item">
        <div>
            <h4 class="devoir-title">{homework.title} <small>- par <span title={'en ' + homework.creator_formation}>{homework.creator_name}</span></small></h4>
            <div class="devoir-info">{homework.subject}</div>
        </div>
        <div class="devoir-date">
            <i class="far fa-calendar-alt"></i>
            <span>Pour le {_date[0].toUpperCase() + _date.slice(1)}</span>
        </div>
    </div>
    {:else}
    <div class="devoir-item">
        <div><div class="devoir-title">{defaultMsg}</div></div>
    </div>
    {/each}
</div>

<style lang="scss">
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

            span {
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
</style>
