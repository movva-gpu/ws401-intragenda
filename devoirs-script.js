document.addEventListener('DOMContentLoaded', function() {
    // --------- GESTIONNAIRE DU CALENDRIER ---------
    // Éléments du calendrier
    const calendarModal = document.getElementById('calendar-modal');
    const calendarButton = document.getElementById('calendar-button');
    const calendarClose = document.getElementById('calendar-close');
    const calendarMonthYear = document.getElementById('calendar-month-year');
    const calendarGrid = document.getElementById('calendar-grid');
    const calendarEventsList = document.getElementById('calendar-events-list');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    // Date actuelle
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Événements (données fictives)
    const events = [
        {
            id: 1,
            title: "Projet HTML/CSS - Site personnel",
            date: new Date(2025, 2, 20), // 20 mars 2025
            module: "M1106 - Intégration web",
            priority: "high"
        },
        {
            id: 2,
            title: "Examen JavaScript",
            date: new Date(2025, 2, 25), // 25 mars 2025
            module: "M2203 - Programmation client",
            priority: "medium"
        },
        {
            id: 3,
            title: "Projet base de données",
            date: new Date(2025, 3, 2), // 2 avril 2025
            module: "M3202 - Base de données avancées",
            priority: "low"
        },
        {
            id: 4,
            title: "Analyse UX/UI d'une application mobile",
            date: new Date(2025, 3, 10), // 10 avril 2025
            module: "M4105 - Ergonomie et UX design",
            priority: "medium"
        }
    ];
    
    // Noms des mois en français
    const monthNames = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    
    // Noms des jours en français
    const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    
    // Initialiser le calendrier
    initCalendar();
    
    // Boutons de navigation
    prevMonthBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });
    
    // Initialiser le calendrier
    function initCalendar() {
        updateCalendar();
    }
    
    // Mettre à jour le calendrier
    function updateCalendar() {
        // Mettre à jour le titre du mois et de l'année
        calendarMonthYear.textContent = monthNames[currentMonth] + ' ' + currentYear;
        
        // Vider la grille du calendrier
        calendarGrid.innerHTML = '';
        
        // Créer les entêtes des jours
        const headerRow = document.createElement('div');
        headerRow.className = 'calendar-row header';
        
        dayNames.forEach(day => {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-cell day-header';
            dayCell.textContent = day;
            headerRow.appendChild(dayCell);
        });
        
        calendarGrid.appendChild(headerRow);
        
        // Obtenir le premier jour du mois
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const startingDay = firstDayOfMonth.getDay();
        
        // Obtenir le nombre de jours dans le mois
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Créer les cellules du calendrier
        let date = 1;
        let dayRow = document.createElement('div');
        dayRow.className = 'calendar-row';
        
        // Ajouter les cellules vides pour les jours avant le premier jour du mois
        for (let i = 0; i < startingDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-cell empty';
            dayRow.appendChild(emptyCell);
        }
        
        // Ajouter les cellules pour les jours du mois
        while (date <= daysInMonth) {
            if (dayRow.children.length === 7) {
                calendarGrid.appendChild(dayRow);
                dayRow = document.createElement('div');
                dayRow.className = 'calendar-row';
            }
            
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-cell';
            dayCell.textContent = date;
            
            // Vérifier si la date correspond à aujourd'hui
            const cellDate = new Date(currentYear, currentMonth, date);
            const today = new Date();
            
            if (
                cellDate.getDate() === today.getDate() &&
                cellDate.getMonth() === today.getMonth() &&
                cellDate.getFullYear() === today.getFullYear()
            ) {
                dayCell.classList.add('today');
            }
            
            // Vérifier si la date a des événements
            const dayEvents = events.filter(event => 
                event.date.getDate() === date &&
                event.date.getMonth() === currentMonth &&
                event.date.getFullYear() === currentYear
            );
            
            if (dayEvents.length > 0) {
                dayCell.classList.add('has-events');
                
                // Ajouter un indicateur d'événement
                const eventIndicator = document.createElement('div');
                eventIndicator.className = 'event-indicator';
                
                // Ajouter une classe de priorité si nécessaire
                const highPriorityEvents = dayEvents.filter(event => event.priority === 'high');
                if (highPriorityEvents.length > 0) {
                    eventIndicator.classList.add('priority-high');
                } else if (dayEvents.some(event => event.priority === 'medium')) {
                    eventIndicator.classList.add('priority-medium');
                } else {
                    eventIndicator.classList.add('priority-low');
                }
                
                dayCell.appendChild(eventIndicator);
                
                // Ajouter un tooltip avec les événements
                const tooltip = document.createElement('div');
                tooltip.className = 'event-tooltip';
                
                dayEvents.forEach(event => {
                    const eventItem = document.createElement('div');
                    eventItem.className = 'event-tooltip-item';
                    eventItem.textContent = event.title;
                    tooltip.appendChild(eventItem);
                });
                
                dayCell.appendChild(tooltip);
                
                // Afficher le tooltip au survol
                dayCell.addEventListener('mouseenter', function() {
                    tooltip.style.display = 'block';
                });
                
                dayCell.addEventListener('mouseleave', function() {
                    tooltip.style.display = 'none';
                });
            }
            
            dayRow.appendChild(dayCell);
            date++;
        }
        
        // Ajouter des cellules vides pour compléter la dernière ligne si nécessaire
        while (dayRow.children.length < 7) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-cell empty';
            dayRow.appendChild(emptyCell);
        }
        
        calendarGrid.appendChild(dayRow);
        
        // Mettre à jour la liste des événements
        updateEventsList();
    }
    
    // Mettre à jour la liste des événements
    function updateEventsList() {
        // Vider la liste des événements
        calendarEventsList.innerHTML = '<h3>Prochains événements</h3>';
        
        // Filtrer les événements à venir
        const today = new Date();
        const upcomingEvents = events
            .filter(event => event.date >= today)
            .sort((a, b) => a.date - b.date)
            .slice(0, 5); // Prendre les 5 prochains événements
        
        if (upcomingEvents.length === 0) {
            const noEventsMsg = document.createElement('p');
            noEventsMsg.className = 'no-events-message';
            noEventsMsg.textContent = 'Aucun événement à venir';
            calendarEventsList.appendChild(noEventsMsg);
            return;
        }
        
        // Créer la liste des événements
        const eventsList = document.createElement('div');
        eventsList.className = 'events-list';
        
        upcomingEvents.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item priority-' + event.priority;
            
            const eventDate = document.createElement('div');
            eventDate.className = 'event-date';
            eventDate.textContent = formatDate(event.date);
            
            const eventContent = document.createElement('div');
            eventContent.className = 'event-content';
            
            const eventTitle = document.createElement('div');
            eventTitle.className = 'event-title';
            eventTitle.textContent = event.title;
            
            const eventModule = document.createElement('div');
            eventModule.className = 'event-module';
            eventModule.textContent = event.module;
            
            eventContent.appendChild(eventTitle);
            eventContent.appendChild(eventModule);
            
            eventItem.appendChild(eventDate);
            eventItem.appendChild(eventContent);
            
            eventsList.appendChild(eventItem);
        });
        
        calendarEventsList.appendChild(eventsList);
    }
    
    // Formater une date
    function formatDate(date) {
        const day = date.getDate();
        const month = monthNames[date.getMonth()].substring(0, 3);
        return day + ' ' + month;
    }

    // --------- GESTIONNAIRE DES MODALS ---------
    
    // Modal Calendrier
    calendarButton.addEventListener('click', function() {
        calendarModal.style.display = 'block';
    });
    
    calendarClose.addEventListener('click', function() {
        calendarModal.style.display = 'none';
    });
    
    // Modal Détails du devoir
    const devoirDetailsModal = document.getElementById('devoir-details-modal');
    const devoirDetailsClose = document.getElementById('devoir-details-close');
    const detailButtons = document.querySelectorAll('.btn-details');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const devoirId = this.getAttribute('data-devoir-id');
            openDevoirDetails(devoirId);
        });
    });
    
    devoirDetailsClose.addEventListener('click', function() {
        devoirDetailsModal.style.display = 'none';
    });
    
    function openDevoirDetails(devoirId) {
        // Dans un vrai projet, vous chargeriez les détails du devoir depuis une base de données
        // Ici nous utilisons des données fictives de l'exemple
        
        // Trouver le devoir correspondant à l'ID
        const devoir = events.find(event => event.id === parseInt(devoirId));
        
        if (devoir) {
            // Mettre à jour les détails dans le modal
            document.getElementById('detail-title').textContent = devoir.title;
            document.getElementById('detail-module').textContent = devoir.module;
            document.getElementById('detail-date').textContent = 'Date limite: ' + formatFullDate(devoir.date);
            document.getElementById('detail-priorite').textContent = 'Priorité: ' + 
                (devoir.priority === 'high' ? 'Haute' : 
                 devoir.priority === 'medium' ? 'Moyenne' : 'Basse');
        }
        
        // Afficher le modal
        devoirDetailsModal.style.display = 'block';
    }
    
    function formatFullDate(date) {
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return day + ' ' + month + ' ' + year;
    }
    
    // Modal Notifications
    const notificationButton = document.getElementById('notification-button');
    const notificationsModal = document.getElementById('notifications-modal');
    const notificationsClose = document.getElementById('notifications-close');
    
    notificationButton.addEventListener('click', function() {
        notificationsModal.style.display = 'block';
    });
    
    notificationsClose.addEventListener('click', function() {
        notificationsModal.style.display = 'none';
    });
    
    // --------- GESTIONNAIRE DE FILTRES ET RECHERCHE ---------
    
    // Recherche
    const searchInput = document.getElementById('search-input');
    const devoirItems = document.querySelectorAll('.devoir-item');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        devoirItems.forEach(item => {
            const title = item.querySelector('.devoir-title').textContent.toLowerCase();
            const description = item.querySelector('.devoir-description').textContent.toLowerCase();
            const module = item.querySelector('.devoir-info').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || module.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // Filtres
    const moduleFilter = document.getElementById('module-filter');
    const statusFilter = document.getElementById('status-filter');
    const sortBy = document.getElementById('sort-by');
    const showFavoritesOnly = document.getElementById('show-favorites-only');
    
    function applyFilters() {
        const moduleValue = moduleFilter.value;
        const statusValue = statusFilter.value;
        const sortValue = sortBy.value;
        const showFavorites = showFavoritesOnly.classList.contains('active');
        
        devoirItems.forEach(item => {
            let display = true;
            
            // Filtre par module
            if (moduleValue && !item.querySelector('.devoir-info').textContent.includes(moduleValue)) {
                display = false;
            }
            
            // Filtre par statut
            if (statusValue) {
                const status = item.querySelector('.status-indicator').classList.contains('status-active') ? 'a-faire' : 'termine';
                if (status !== statusValue) {
                    display = false;
                }
            }
            
            // Filtre par favoris
            if (showFavorites && !item.querySelector('.btn-favorite').classList.contains('active')) {
                display = false;
            }
            
            item.style.display = display ? '' : 'none';
        });
        
        // Tri
        const devoirList = document.querySelector('.devoirs-list');
        const devoirItemsArray = Array.from(devoirItems);
        
        if (sortValue === 'date-asc') {
            devoirItemsArray.sort((a, b) => {
                const dateA = new Date(a.querySelector('.devoir-date span').textContent);
                const dateB = new Date(b.querySelector('.devoir-date span').textContent);
                return dateA - dateB;
            });
        } else if (sortValue === 'date-desc') {
            devoirItemsArray.sort((a, b) => {
                const dateA = new Date(a.querySelector('.devoir-date span').textContent);
                const dateB = new Date(b.querySelector('.devoir-date span').textContent);
                return dateB - dateA;
            });
        } else if (sortValue === 'module') {
            devoirItemsArray.sort((a, b) => {
                const moduleA = a.querySelector('.devoir-info').textContent;
                const moduleB = b.querySelector('.devoir-info').textContent;
                return moduleA.localeCompare(moduleB);
            });
        } else if (sortValue === 'priorite') {
            const priorityOrder = { 'priority-high': 1, 'priority-medium': 2, 'priority-low': 3 };
            devoirItemsArray.sort((a, b) => {
                let priorityA = 4;
                let priorityB = 4;
                
                for (const key in priorityOrder) {
                    if (a.classList.contains(key)) priorityA = priorityOrder[key];
                    if (b.classList.contains(key)) priorityB = priorityOrder[key];
                }
                
                return priorityA - priorityB;
            });
        }
        
        // Réinsérer les éléments dans l'ordre de tri
        devoirItemsArray.forEach(item => {
            devoirList.appendChild(item);
        });
    }
    
    moduleFilter.addEventListener('change', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    sortBy.addEventListener('change', applyFilters);
    
    showFavoritesOnly.addEventListener('click', function() {
        this.classList.toggle('active');
        applyFilters();
    });
    
    // --------- FONCTIONNALITÉS DES BOUTONS ---------
    
    // Boutons favoris
    const favoriteButtons = document.querySelectorAll('.btn-favorite');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Changer l'icône du bouton
            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-star"></i>';
            } else {
                this.innerHTML = '<i class="far fa-star"></i>';
            }
        });
    });
    
    // Bouton Partager
    const shareButtons = document.querySelectorAll('.btn-share');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Dans un vrai projet, vous implémenteriez une fonctionnalité de partage
            alert('Fonctionnalité de partage non implémentée dans cette démo');
        });
    });
    
    // Bouton Télécharger
    const downloadButtons = document.querySelectorAll('.btn-download');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Dans un vrai projet, vous implémenteriez une fonctionnalité de téléchargement
            alert('Fonctionnalité de téléchargement non implémentée dans cette démo');
        });
    });
    
    // Fermer les modals quand on clique en dehors
    window.addEventListener('click', function(event) {
        if (event.target === calendarModal) {
            calendarModal.style.display = 'none';
        }
        if (event.target === devoirDetailsModal) {
            devoirDetailsModal.style.display = 'none';
        }
        if (event.target === notificationsModal) {
            notificationsModal.style.display = 'none';
        }
    });
    
    // Mise à jour du slider de progression
    const progressSlider = document.getElementById('progress-slider');
    const progressFill = document.querySelector('.detail-progress .progress-fill');
    const progressText = document.querySelector('.detail-progress .progress-text');
    
    progressSlider.addEventListener('input', function() {
        const value = this.value;
        progressFill.style.width = value + '%';
        progressText.textContent = value + '% terminé';
    });
    
    // Remise du devoir
    const submitButton = document.querySelector('.btn-submit');
    
    submitButton.addEventListener('click', function() {
        const file = document.getElementById('submission-file').files[0];
        const comment = document.getElementById('submission-comment').value;
        
        if (!file) {
            alert('Veuillez sélectionner un fichier');
            return;
        }
        
        // Dans un vrai projet, vous enverriez le fichier à un serveur
        alert('Devoir soumis avec succès !');
        devoirDetailsModal.style.display = 'none';
    });
    
    // Raccourci clavier pour la recherche (Ctrl+K)
    document.addEventListener('keydown', function(event) {
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            searchInput.focus();
        }
    });
});