document.addEventListener('DOMContentLoaded', function() {
    // Référence aux éléments du DOM
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const searchInput = document.getElementById('searchInput');
    const notificationButton = document.getElementById('notification-button');
    const notificationsModal = document.getElementById('notifications-modal');
    const notificationsClose = document.getElementById('notifications-close');
    const markAllReadBtn = document.getElementById('mark-all-read');
    const notificationsList = document.getElementById('notifications-list');
    const notificationCount = document.getElementById('notificationCount');
    
    // Données de test pour les notifications
    const notifications = [
        {
            id: 1, 
            title: 'Nouveau devoir disponible', 
            message: 'Projet PHP - MVC a été ajouté au module M2202',
            time: 'Il y a 2 heures',
            read: false,
            icon: 'fas fa-book'
        },
        {
            id: 2, 
            title: 'Date limite approchante', 
            message: 'Examen JavaScript - M2203 arrive à échéance dans 3 jours',
            time: 'Il y a 1 jour',
            read: false,
            icon: 'fas fa-exclamation-circle'
        },
        {
            id: 3, 
            title: 'Note publiée', 
            message: 'Votre note pour le TP Base de données est disponible',
            time: 'Il y a 2 jours',
            read: false,
            icon: 'fas fa-chart-bar'
        }
    ];
    
    // Toggle du menu latéral
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('sidebar-expanded');
    });
    
    // Fonction de recherche
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.toLowerCase();
            console.log('Recherche:', searchTerm);
            // Implémenter la logique de recherche ici
            searchElements(searchTerm);
        }
    });
    
    // Fonction pour rechercher des éléments dans la page
    function searchElements(term) {
        const devoirItems = document.querySelectorAll('.devoir-item');
        const activityItems = document.querySelectorAll('.activity-item');
        
        if (term === '') {
            // Réinitialiser l'affichage si la recherche est vide
            devoirItems.forEach(item => item.style.display = 'flex');
            activityItems.forEach(item => item.style.display = 'flex');
            return;
        }
        
        // Filtrer les devoirs
        devoirItems.forEach(item => {
            const title = item.querySelector('.devoir-title').textContent.toLowerCase();
            const info = item.querySelector('.devoir-info').textContent.toLowerCase();
            
            if (title.includes(term) || info.includes(term)) {
                item.style.display = 'flex';
                item.style.backgroundColor = '#f0f7ff'; // Mettre en évidence les résultats
                setTimeout(() => {
                    item.style.backgroundColor = '';
                }, 3000); // Revenir à la normale après 3 secondes
            } else {
                item.style.display = 'none';
            }
        });
        
        // Filtrer les activités
        activityItems.forEach(item => {
            const title = item.querySelector('.activity-title').textContent.toLowerCase();
            const info = item.querySelector('.activity-info').textContent.toLowerCase();
            
            if (title.includes(term) || info.includes(term)) {
                item.style.display = 'flex';
                item.style.backgroundColor = '#f0f7ff'; // Mettre en évidence les résultats
                setTimeout(() => {
                    item.style.backgroundColor = '';
                }, 3000); // Revenir à la normale après 3 secondes
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Gestion des notifications
    notificationButton.addEventListener('click', function() {
        notificationsModal.classList.add('show');
        renderNotifications();
    });
    
    notificationsClose.addEventListener('click', function() {
        notificationsModal.classList.remove('show');
    });
    
    // Fermer la modale des notifications en cliquant en dehors
    window.addEventListener('click', function(event) {
        if (event.target === notificationsModal) {
            notificationsModal.classList.remove('show');
        }
    });
    
    // Marquer toutes les notifications comme lues
    markAllReadBtn.addEventListener('click', function() {
        notifications.forEach(notification => {
            notification.read = true;
        });
        renderNotifications();
        updateNotificationCount();
    });
    
    // Fonction pour rendre les notifications dans la modale
    function renderNotifications() {
        notificationsList.innerHTML = '';
        
        if (notifications.length === 0) {
            notificationsList.innerHTML = '<div class="empty-state">Pas de notifications</div>';
            return;
        }
        
        notifications.forEach(notification => {
            const notificationEl = document.createElement('div');
            notificationEl.className = `notification-item ${!notification.read ? 'unread' : ''}`;
            
            notificationEl.innerHTML = `
                <div class="notification-icon">
                    <i class="${notification.icon}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-time">${notification.time}</div>
                </div>
            `;
            
            // Gestion des clics sur les notifications individuelles
            notificationEl.addEventListener('click', function() {
                notification.read = true;
                renderNotifications();
                updateNotificationCount();
            });
            
            notificationsList.appendChild(notificationEl);
        });
    }
    
    // Mettre à jour le compteur de notifications
    function updateNotificationCount() {
        const unreadCount = notifications.filter(n => !n.read).length;
        
        if (unreadCount === 0) {
            notificationCount.style.display = 'none';
        } else {
            notificationCount.style.display = 'flex';
            notificationCount.textContent = unreadCount;
        }
    }
    
    // Toggle du mode sombre
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'icon';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.title = 'Basculer en mode sombre';
    darkModeToggle.id = 'dark-mode-toggle';
    
    // Ajouter le bouton de mode sombre à header-tools, avant le dernier élément
    const headerTools = document.querySelector('.header-tools');
    headerTools.insertBefore(darkModeToggle, headerTools.lastElementChild);
    
    // Gérer le clic sur le bouton de mode sombre
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Sauvegarder la préférence dans localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Vérifier les préférences utilisateur au chargement
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Mettre à jour les statistiques avec des données fictives
    function updateStats() {
        const activeTasks = document.getElementById('activeTasks');
        const completedTasks = document.getElementById('completedTasks');
        const upcomingDeadlines = document.getElementById('upcomingDeadlines');
        const averageProgress = document.getElementById('averageProgress');
        
        // Simulation de données variables pour l'animation
        const active = 3;
        const completed = 12;
        const upcoming = 2;
        const avgProgress = 78;
        
        // Animation des chiffres
        animateValue(activeTasks, 0, active, 1000);
        animateValue(completedTasks, 0, completed, 1000);
        animateValue(upcomingDeadlines, 0, upcoming, 1000);
        animateValue(averageProgress, 0, avgProgress, 1000, '%');
    }
    
    // Fonction pour animer un compteur
    function animateValue(element, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Raccourci clavier pour ouvrir la recherche
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
    
    // Initialisation
    updateNotificationCount();
    updateStats();
});