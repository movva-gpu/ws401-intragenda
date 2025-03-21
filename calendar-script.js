document.addEventListener('DOMContentLoaded', function() {
    // Données des devoirs (extraites de votre liste de devoirs)
    const devoirs = [
        {
            title: "Projet HTML/CSS - Site personnel",
            course: "M1106 - Intégration web",
            date: new Date(2025, 2, 20) // 20 mars 2025 (mois indexés à partir de 0)
        },
        {
            title: "Examen JavaScript",
            course: "M2203 - Programmation client",
            date: new Date(2025, 2, 25) // 25 mars 2025
        },
        {
            title: "Projet base de données",
            course: "M3202 - Base de données avancées",
            date: new Date(2025, 3, 2) // 2 avril 2025
        }
    ];

    // Éléments DOM
    const calendarButton = document.getElementById('calendar-button');
    const calendarModal = document.getElementById('calendar-modal');
    const calendarClose = document.getElementById('calendar-close');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const calendarMonthYear = document.getElementById('calendar-month-year');
    const calendarGrid = document.getElementById('calendar-grid');
    const calendarEventsList = document.getElementById('calendar-events-list');

    // Date actuelle pour le calendrier
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Ouvrir le modal du calendrier
    calendarButton.addEventListener('click', function() {
        calendarModal.classList.add('show');
        renderCalendar(currentMonth, currentYear);
        renderEventsList();
    });

    // Fermer le modal du calendrier
    calendarClose.addEventListener('click', function() {
        calendarModal.classList.remove('show');
    });

    // Cliquer à l'extérieur du modal pour fermer
    calendarModal.addEventListener('click', function(e) {
        if (e.target === calendarModal) {
            calendarModal.classList.remove('show');
        }
    });

    // Navigation entre les mois
    prevMonthBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    // Fonction pour générer le calendrier
    function renderCalendar(month, year) {
        // Noms des mois en français
        const months = [
            "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];
        
        // Noms des jours en français
        const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
        
        // Premier jour du mois
        const firstDay = new Date(year, month, 1).getDay();
        
        // Nombre de jours dans le mois
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Date d'aujourd'hui
        const today = new Date();
        
        // Mettre à jour le titre du mois
        calendarMonthYear.textContent = `${months[month]} ${year}`;
        
        // Vider la grille du calendrier
        calendarGrid.innerHTML = '';
        
        // Ajouter les en-têtes des jours
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });
        
        // Ajouter les jours du mois précédent (grisés)
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day other-month';
            dayEl.textContent = daysInPrevMonth - i;
            calendarGrid.appendChild(dayEl);
        }
        
        // Ajouter les jours du mois courant
        for (let i = 1; i <= daysInMonth; i++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.textContent = i;
            
            // Vérifier si c'est aujourd'hui
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayEl.classList.add('today');
            }
            
            // Vérifier s'il y a un événement ce jour-là
            const currentDateCheck = new Date(year, month, i);
            const hasEvent = devoirs.some(devoir => {
                const devoirDate = devoir.date;
                return devoirDate.getDate() === currentDateCheck.getDate() && 
                       devoirDate.getMonth() === currentDateCheck.getMonth() && 
                       devoirDate.getFullYear() === currentDateCheck.getFullYear();
            });
            
            if (hasEvent) {
                dayEl.classList.add('has-event');
                dayEl.addEventListener('click', function() {
                    showEventsForDay(currentDateCheck);
                });
            }
            
            calendarGrid.appendChild(dayEl);
        }
        
        // Calculer le nombre de cellules déjà ajoutées
        const cellsAdded = firstDay + daysInMonth;
        
        // Compléter avec les jours du mois suivant si nécessaire
        const nextMonthDays = 42 - cellsAdded; // 6 semaines x 7 jours = 42 cellules au total
        for (let i = 1; i <= nextMonthDays; i++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day other-month';
            dayEl.textContent = i;
            calendarGrid.appendChild(dayEl);
        }
    }

    // Fonction pour afficher les événements d'un jour spécifique
    function showEventsForDay(date) {
        const eventsForDay = devoirs.filter(devoir => {
            const devoirDate = devoir.date;
            return devoirDate.getDate() === date.getDate() && 
                   devoirDate.getMonth() === date.getMonth() && 
                   devoirDate.getFullYear() === date.getFullYear();
        });

        // Formater la date en français
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('fr-FR', options);
        
        // Mettre à jour la liste des événements
        calendarEventsList.innerHTML = `<h3>Événements du ${formattedDate}</h3>`;
        
        if (eventsForDay.length > 0) {
            eventsForDay.forEach(event => {
                const eventEl = document.createElement('div');
                eventEl.className = 'calendar-event-item';
                eventEl.innerHTML = `
                    <div><strong>${event.title}</strong></div>
                    <div>${event.course}</div>
                `;
                calendarEventsList.appendChild(eventEl);
            });
        } else {
            calendarEventsList.innerHTML += `<div>Aucun événement prévu pour cette date.</div>`;
        }
    }

    // Fonction pour afficher tous les événements à venir
    function renderEventsList() {
        const today = new Date();
        
        // Trier les devoirs par date
        const upcomingEvents = devoirs
            .filter(devoir => devoir.date >= today)
            .sort((a, b) => a.date - b.date);
        
        // Mettre à jour la liste des événements
        calendarEventsList.innerHTML = `<h3>Prochains événements</h3>`;
        
        if (upcomingEvents.length > 0) {
            upcomingEvents.forEach(event => {
                const eventEl = document.createElement('div');
                eventEl.className = 'calendar-event-item';
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = event.date.toLocaleDateString('fr-FR', options);
                eventEl.innerHTML = `
                    <div><strong>${event.title}</strong></div>
                    <div>${event.course}</div>
                    <div><i class="far fa-calendar-alt"></i> ${formattedDate}</div>
                `;
                calendarEventsList.appendChild(eventEl);
            });
        } else {
            calendarEventsList.innerHTML += `<div>Aucun événement à venir.</div>`;
        }
    }
});