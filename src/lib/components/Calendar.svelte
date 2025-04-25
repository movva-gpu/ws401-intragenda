<script>
    import { faChevronLeft, faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "fontawesome-svelte";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    // const devoirs = [
    //     {
    //         title: "Projet HTML/CSS - Site personnel",
    //         formation: "M1106 - Intégration web",
    //         due_date: new Date(2025, 3, 23) // 20 mars 2025 (mois indexés à partir de 0)
    //     },
    //     {
    //         title: "Examen JavaScript",
    //         formation: "M2203 - Programmation client",
    //         due_date: new Date(2025, 2, 25) // 25 mars 2025
    //     },
    //     {
    //         title: "Projet base de données",
    //         formation: "M3202 - Base de données avancées",
    //         due_date: new Date(2025, 3, 2) // 2 avril 2025
    //     }
    // ];

    /** @type {{calendarButton: HTMLButtonElement, shown: boolean}} */
    let { devoirs = $bindable([]), calendarButton, shown = $bindable(false) } = $props();

    const today = new Date();
    let selectedDate = $state(today);
    let currentMonth = $state(today.getMonth());
    let currentYear = $state(today.getFullYear());

    const months = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

    function renderCalendar(month, year) {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        const calendarDays = [];

        for (let i = firstDay - 1; i >= 0; i--) {
            calendarDays.push({ day: daysInPrevMonth - i, otherMonth: true });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const currentDateCheck = new Date(year, month, i);
            const hasEvent = devoirs.some(devoir => {
                const devoirDate = devoir.due_date;
                return devoirDate.getDate() === currentDateCheck.getDate() &&
                        devoirDate.getMonth() === currentDateCheck.getMonth() &&
                        devoirDate.getFullYear() === currentDateCheck.getFullYear();
            });
            calendarDays.push({ day: i, today: i === today.getDate() && month === today.getMonth() && year === today.getFullYear(), hasEvent });
        }

        const cellsAdded = firstDay + daysInMonth;
        const nextMonthDays = 42 - cellsAdded;

        for (let i = 1; i <= nextMonthDays; i++) {
            calendarDays.push({ day: i, otherMonth: true });
        }

        return calendarDays;
    }

    function showEventsForDay(date) {
        const eventsForDay = devoirs.filter(devoir => {
            const devoirDate = devoir.due_date;
            return devoirDate.getDate() === date.getDate() &&
                    devoirDate.getMonth() === date.getMonth() &&
                    devoirDate.getFullYear() === date.getFullYear();
        });

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('fr-FR', options);

        return { formattedDate, eventsForDay };
    }

    function compareDateToObj(date1, { year, month, day }) {
        return date1.getFullYear() === year &&
            date1.getMonth() === month &&
            date1.getDate() === day;
    }

    function renderEventsList() {
        const today = new Date();
        const upcomingEvents = devoirs
            .filter(devoir => devoir.due_date >= today)
            .sort((a, b) => a.due_date - b.due_date);

        return upcomingEvents;
    }

    let calendarDays = $derived(renderCalendar(currentMonth, currentYear));
    let eventsList = $derived(renderEventsList());

    onMount(() => {
        calendarButton.addEventListener('click', () => {
            shown = !shown;
        });
    })
</script>

{#if shown}
    <div class="calendar__container" bind:this={self} transition:fade={{ duration: 333 }}>
        <div class="calendar__container__container">
            <div class="calendar__container__header">
                <div class="calendar__container__title">Calendrier des devoirs</div>
                <div
                    role="button" tabindex="0"
                    class="calendar__container__close"
                    onclick={_ => shown = false}
                    onkeydown={e => e.key == 'Enter' || e.key == ' ' ? void this.onclick() : void null}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>
            <div class="calendar__container__nav">
                <button
                    class="calendar__container__nav__btn"
                    onclick={_ => {
                        currentMonth--;
                        if (currentMonth < 0) {
                            currentMonth = 11;
                            currentYear--;
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faChevronLeft} /> Mois précédent
                </button>
                <div class="calendar__container__month-year">{months[currentMonth]} {currentYear}</div>
                <button
                    class="calendar__container__nav__btn"
                    onclick={_ => {
                        currentMonth++;
                        if (currentMonth > 11) {
                            currentMonth = 0;
                            currentYear++;
                        }
                    }}
                >
                    Mois suivant <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
            <div class="calendar__container__grid">
                {#each days as day}
                    <div class="calendar__container__day-header">{day}</div>
                {/each}
                {#each calendarDays as { day, otherMonth, today, hasEvent }}
                    {#if otherMonth}
                        <div class="calendar__container__day other-month {hasEvent ? 'has-event' : ''}">
                            {day}
                        </div>
                    {:else}
                        <div
                            role="button" tabindex="0"
                            class="calendar__container__day {
                                compareDateToObj(selectedDate, {
                                    year: currentYear,
                                    month: currentMonth,
                                    day
                                }) ? 'selected' : '' }
                                { otherMonth ? 'other-month' : '' }
                                { today ? 'today' : '' }
                                { hasEvent ? 'has-event' : '' }
                            }"
                            onclick={_ => {
                                if (otherMonth === undefined) selectedDate = new Date(currentYear, currentMonth, day);
                            }}
                            onkeydown={e => e.key == 'Enter' || e.key == ' ' ? void this.onclick() : void 0}
                        >
                            {day}
                        </div>
                    {/if}
                {/each}
            </div>
            <div class="calendar__container__events">{#if selectedDate}
                {@const _date = selectedDate.toLocaleDateString(
                    'fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                <h3>{_date[0].toUpperCase() + _date.slice(1)}</h3>
                {@const events = showEventsForDay(selectedDate).eventsForDay}
                {#if events.length === 0}
                    <p>C'est calme, trop calme. C'est peut-être le moment de prendre un café&nbsp;!</p>
                {:else}
                    <ul>{#each events as event}
                        <li class="calendar__container__event-item">
                            <h4>
                                {event.title}
                                <small>
                                    - posté par
                                    <span title="en {event.creator_formation}">{event.creator_name}</span>
                                </small></h4>
                            <div>{event.description}</div>
                        </li>
                    {/each}</ul>
                {/if}
            {/if}</div>
        </div>
    </div>
{/if}

<style lang="scss" scoped>
    @use '$lib/globals';

    .calendar__container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        justify-content: center;
        align-items: center;
    }

    .calendar__container__container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        animation: fadeIn 0.3s ease-out;

        &.modal-content {
            width: 80%;
            max-width: 600px;
        }

        &.calendar__container__container {
            width: 80%;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
        }
    }

    .confirmation-modal .modal-content {
        max-width: 400px;
    }

    .modal-header,
    .calendar__container__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        &.modal-header {
            padding-bottom: 10px;
            border-bottom: 1px solid var(--border-color);
        }
    }

    .modal-title,
    .calendar__container__title {
        font-size: 18px;
        font-weight: bold;
    }

    .modal-close,
    .calendar__container__close {
        cursor: pointer;
        font-size: 20px;
    }

    /* Calendar components */
    .calendar__container__nav {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .calendar__container__nav__btn {
        background-color: #f0f0f0;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
    }

    .calendar__container__month-year {
        font-weight: bold;
    }

    .calendar__container__grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 5px;
    }

    .calendar__container__day-header {
        text-align: center;
        font-weight: bold;
        padding: 5px;
        background-color: #f0f0f0;
    }

    .calendar__container__day {
        text-align: center;
        padding: 10px 5px;
        border: 1px solid #ddd;
        border-radius: 5px;
        min-height: 40px;
        position: relative;
        user-select: none;

        &.has-event {
            background-color: #e8f4ff;
            font-weight: bold;
            color: #1a73e8;
            cursor: pointer;
        }

        &.other-month {
            color: #aaa;
            background-color: #f9f9f9;
            cursor: unset;
        }

        &.today {
            border: 2px solid #1a73e8;
        }

        &.selected {
            background-color: #4dabf7;;
            color: #fff;
            font-weight: bold;
        }
    }

    .calendar__container__events {
        h3 {
            padding-top: globals.$sz-xs;
        }
    }

    .calendar__container__event-item {
        padding: 10px;
        background-color: #f9f9f9;
        border-radius: 5px;
        border-left: 4px solid #1a73e8;

        & + & {
            margin-top: 10px;
        }

        h4 {
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
    }
</style>
