document.addEventListener('DOMContentLoaded', function() {
    // Données initiales des devoirs
    let devoirs = [
        {
            id: 1,
            title: "Projet HTML/CSS - Site personnel",
            module: "M1106",
            moduleInfo: "Intégration web",
            date: "2025-03-20",
            description: "Création d'un site personnel en HTML/CSS responsive selon les spécifications fournies en cours.",
            priority: "medium",
            status: "active"
        },
        {
            id: 2,
            title: "Examen JavaScript",
            module: "M2203",
            moduleInfo: "Programmation client",
            date: "2025-03-25",
            description: "Examen sur table portant sur JavaScript ES6, les API Web et les frameworks front-end.",
            priority: "high",
            status: "active"
        },
        {
            id: 3,
            title: "Projet base de données",
            module: "M3202",
            moduleInfo: "Base de données avancées",
            date: "2025-04-02",
            description: "Conception et implémentation d'une base de données relationnelle avec optimisation des requêtes.",
            priority: "low",
            status: "active"
        }
    ];

    // Éléments DOM
    const devoirsList = document.getElementById('devoirs-list');
    const btnAddDevoir = document.getElementById('btn-add-devoir');
    const devoirModal = document.getElementById('devoir-modal');
    const modalClose = document.getElementById('modal-close');
    const btnCancel = document.getElementById('btn-cancel');
    const devoirForm = document.getElementById('devoir-form');
    const devoirId = document.getElementById('devoir-id');
    const devoirTitle = document.getElementById('devoir-title');
    const devoirModule = document.getElementById('devoir-module');
    const devoirOtherModule = document.getElementById('devoir-other-module');
    const otherModuleGroup = document.getElementById('other-module-group');
    const devoirDate = document.getElementById('devoir-date');
    const devoirDescription = document.getElementById('devoir-description');
    const devoirPriority = document.getElementById('devoir-priority');
    const devoirStatus = document.getElementById('devoir-status');
    const modalTitle = document.getElementById('modal-title');
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmationClose = document.getElementById('confirmation-close');
    const btnCancelDelete = document.getElementById('btn-cancel-delete');
    const btnConfirmDelete = document.getElementById('btn-confirm-delete');
    const filterModule = document.getElementById('filter-module');
    const filterPriority = document.getElementById('filter-priority');
    const filterStatus = document.getElementById('filter-status');
    const searchInput = document.getElementById('search-input');
    
    // Variables pour la suppression
    let currentDevoirId = null;

    // Initialisation de la page
    loadFromLocalStorage();
    renderDevoirs();
    updateStats();

    // Ajouter un devoir
    btnAddDevoir.addEventListener('click', function() {
        resetForm();
        modalTitle.textContent = 'Ajouter un devoir';
        devoirModal.style.display = 'flex';
    });

    // Fermer le modal
    modalClose.addEventListener('click', function() {
        devoirModal.style.display = 'none';
    });

    // Annuler l'ajout/modification
    btnCancel.addEventListener('click', function() {
        devoirModal.style.display = 'none';
    });

    // Gestion du champ "Autre module"
    devoirModule.addEventListener('change', function() {
        if (this.value === 'other') {
            otherModuleGroup.style.display = 'block';
            devoirOtherModule.required = true;
        } else {
            otherModuleGroup.style.display = 'none';
            devoirOtherModule.required = false;
        }
    });

    // Soumettre le formulaire
    devoirForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const id = devoirId.value ? parseInt(devoirId.value) : generateId();
        let moduleCode = devoirModule.value;
        let moduleInfo = "";
        
        if (moduleCode === 'M1106') {
            moduleInfo = "Intégration web";
        } else if (moduleCode === 'M2203') {
            moduleInfo = "Programmation client";
        } else if (moduleCode === 'M3202') {
            moduleInfo = "Base de données avancées";
        } else if (moduleCode === 'other') {
            moduleCode = devoirOtherModule.value.split(' - ')[0];
            moduleInfo = devoirOtherModule.value.split(' - ')[1] || '';
        }
        
        const devoir = {
            id: id,
            title: devoirTitle.value,
            module: moduleCode,
            moduleInfo: moduleInfo,
            date: devoirDate.value,
            description: devoirDescription.value,
            priority: devoirPriority.value,
            status: devoirStatus.value
        };
        
        if (devoirId.value) {
            // Modification d'un devoir existant
            const index = devoirs.findIndex(d => d.id === parseInt(devoirId.value));
            if (index !== -1) {
                devoirs[index] = devoir;
            }
        } else {
            // Ajout d'un nouveau devoir
            devoirs.push(devoir);
        }
        
        devoirModal.style.display = 'none';
        renderDevoirs();
        updateStats();
        saveToLocalStorage();
    });

    // Fermer le modal de confirmation
    confirmationClose.addEventListener('click', function() {
        confirmationModal.style.display = 'none';
    });

    // Annuler la suppression
    btnCancelDelete.addEventListener('click', function() {
        confirmationModal.style.display = 'none';
    });

    // Confirmer la suppression
    btnConfirmDelete.addEventListener('click', function() {
        if (currentDevoirId) {
            devoirs = devoirs.filter(d => d.id !== currentDevoirId);
            renderDevoirs();
            updateStats();
            saveToLocalStorage();
        }
        confirmationModal.style.display = 'none';
    });

    // Filtres
    filterModule.addEventListener('change', applyFilters);
    filterPriority.addEventListener('change', applyFilters);
    filterStatus.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);

    // Fonction pour générer un ID unique
    function generateId() {
        return Math.max(0, ...devoirs.map(d => d.id)) + 1;
    }

    // Fonction pour réinitialiser le formulaire
    function resetForm() {
        devoirId.value = '';
        devoirTitle.value = '';
        devoirModule.value = 'M1106';
        devoirOtherModule.value = '';
        otherModuleGroup.style.display = 'none';
        devoirDate.value = '';
        devoirDescription.value = '';
        devoirPriority.value = 'medium';
        devoirStatus.value = 'active';
    }

    // Fonction pour modifier un devoir
    function editDevoir(id) {
        const devoir = devoirs.find(d => d.id === id);
        if (!devoir) return;
        
        devoirId.value = devoir.id;
        devoirTitle.value = devoir.title;
        
        if (['M1106', 'M2203', 'M3202'].includes(devoir.module)) {
            devoirModule.value = devoir.module;
            otherModuleGroup.style.display = 'none';
        } else {
            devoirModule.value = 'other';
            devoirOtherModule.value = `${devoir.module} - ${devoir.moduleInfo}`;
            otherModuleGroup.style.display = 'block';
        }
        
        devoirDate.value = devoir.date;
        devoirDescription.value = devoir.description;
        devoirPriority.value = devoir.priority;
        devoirStatus.value = devoir.status;
        
        modalTitle.textContent = 'Modifier un devoir';
        devoirModal.style.display = 'flex';
    }

    // Fonction pour supprimer un devoir
    function deleteDevoir(id) {
        currentDevoirId = id;
        confirmationModal.style.display = 'flex';
    }

    // Fonction pour afficher les devoirs
    function renderDevoirs() {
        let filteredDevoirs = [...devoirs];
        
        // Appliquer les filtres
        filteredDevoirs = applyFiltersToData(filteredDevoirs);
        
        // Trier par date
        filteredDevoirs.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        devoirsList.innerHTML = '';
        
        if (filteredDevoirs.length === 0) {
            devoirsList.innerHTML = `
                <div style="padding: 20px; text-align: center; color: #777;">
                    Aucun devoir trouvé. Ajoutez-en un nouveau ou modifiez vos filtres.
                </div>
            `;
            return;
        }
        
        filteredDevoirs.forEach(devoir => {
            const formattedDate = new Date(devoir.date).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
            
            const statusClass = devoir.status === 'active' ? 'status-active' : 'status-draft';
            const priorityClass = `priority-${devoir.priority}`;
            
            const devoirElement = document.createElement('div');
            devoirElement.className = `devoir-item ${priorityClass}`;
            devoirElement.innerHTML = `
                <div>
                    <div class="devoir-title">
                        ${devoir.title}
                        ${devoir.priority === 'high' ? '<span class="tag important">Important</span>' : ''}
                        <span class="status-indicator ${statusClass}"></span>
                    </div>
                    <div class="devoir-info">${devoir.module} - ${devoir.moduleInfo}</div>
                    ${devoir.description ? `<div style="font-size: 13px; color: #555; margin-top: 5px;">${devoir.description}</div>` : ''}
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div class="devoir-date">
                        <i class="far fa-calendar-alt"></i>
                        <span>${formattedDate}</span>
                    </div>
                    <div class="devoir-actions">
                        <button class="btn-edit" data-id="${devoir.id}" title="Modifier">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-delete" data-id="${devoir.id}" title="Supprimer">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `;
            
            devoirsList.appendChild(devoirElement);
            
            // Ajouter les événements aux boutons
            devoirElement.querySelector('.btn-edit').addEventListener('click', function() {
                editDevoir(parseInt(this.dataset.id));
            });
            
            devoirElement.querySelector('.btn-delete').addEventListener('click', function() {
                deleteDevoir(parseInt(this.dataset.id));
            });
        });
    }

    // Fonction pour appliquer les filtres
    function applyFilters() {
        renderDevoirs();
    }

    // Fonction pour appliquer les filtres aux données
    function applyFiltersToData(data) {
        const moduleFilter = filterModule.value;
        const priorityFilter = filterPriority.value;
        const statusFilter = filterStatus.value;
        const searchTerm = searchInput.value.toLowerCase();
        
        return data.filter(devoir => {
            // Filtre par module
            if (moduleFilter && devoir.module !== moduleFilter) return false;
            
            // Filtre par priorité
            if (priorityFilter && devoir.priority !== priorityFilter) return false;
            
            // Filtre par statut
            if (statusFilter && devoir.status !== statusFilter) return false;
            
            // Filtre par recherche
            if (searchTerm) {
                const matchesSearch = 
                    devoir.title.toLowerCase().includes(searchTerm) ||
                    devoir.module.toLowerCase().includes(searchTerm) ||
                    devoir.moduleInfo.toLowerCase().includes(searchTerm) ||
                    devoir.description.toLowerCase().includes(searchTerm);
                
                if (!matchesSearch) return false;
            }
            
            return true;
        });
    }

    // Fonction pour mettre à jour les statistiques
    function updateStats() {
        const totalDevoirs = devoirs.length;
        
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        const devoirsCeMois = devoirs.filter(devoir => {
            const devoirDate = new Date(devoir.date);
            return devoirDate.getMonth() === currentMonth && devoirDate.getFullYear() === currentYear;
        }).length;
        
        const devoirsPrioritaires = devoirs.filter(devoir => devoir.priority === 'high').length;
        
        const devoirsCompletes = devoirs.filter(devoir => {
            const devoirDate = new Date(devoir.date);
            return devoirDate < currentDate && devoir.status === 'active';
        }).length;
        
        // Mettre à jour les éléments DOM des statistiques
        document.getElementById('total-devoirs').textContent = totalDevoirs;
        document.getElementById('devoirs-ce-mois').textContent = devoirsCeMois;
        document.getElementById('devoirs-prioritaires').textContent = devoirsPrioritaires;
        document.getElementById('devoirs-completes').textContent = devoirsCompletes;
    }
    
    // Fonction pour sauvegarder les devoirs dans le localStorage
    function saveToLocalStorage() {
        localStorage.setItem('devoirs', JSON.stringify(devoirs));
    }
    
    // Fonction pour charger les devoirs depuis le localStorage
    function loadFromLocalStorage() {
        const savedDevoirs = localStorage.getItem('devoirs');
        if (savedDevoirs) {
            devoirs = JSON.parse(savedDevoirs);
        }
    }
    
    // Raccourci clavier pour la recherche (Ctrl+K)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
    
    // Initialisation des dates pour les nouveaux devoirs
    const today = new Date().toISOString().split('T')[0];
    devoirDate.setAttribute('min', today);
    
    // Aide-mémoire pour les valeurs du formulaire quand on ferme accidentellement
    let tempFormData = {};
    
    window.addEventListener('beforeunload', function() {
        if (devoirTitle.value || devoirDescription.value) {
            tempFormData = {
                title: devoirTitle.value,
                module: devoirModule.value,
                otherModule: devoirOtherModule.value,
                date: devoirDate.value,
                description: devoirDescription.value,
                priority: devoirPriority.value,
                status: devoirStatus.value
            };
            sessionStorage.setItem('tempFormData', JSON.stringify(tempFormData));
        } else {
            sessionStorage.removeItem('tempFormData');
        }
    });
    
    // Restaurer les données temporaires du formulaire
    const savedFormData = sessionStorage.getItem('tempFormData');
    if (savedFormData) {
        tempFormData = JSON.parse(savedFormData);
        const restoreForm = confirm('Voulez-vous restaurer le formulaire non soumis ?');
        if (restoreForm) {
            devoirTitle.value = tempFormData.title || '';
            devoirModule.value = tempFormData.module || 'M1106';
            devoirOtherModule.value = tempFormData.otherModule || '';
            devoirDate.value = tempFormData.date || '';
            devoirDescription.value = tempFormData.description || '';
            devoirPriority.value = tempFormData.priority || 'medium';
            devoirStatus.value = tempFormData.status || 'active';
            
            if (devoirModule.value === 'other') {
                otherModuleGroup.style.display = 'block';
            }
            
            modalTitle.textContent = 'Ajouter un devoir';
            devoirModal.style.display = 'flex';
        }
        sessionStorage.removeItem('tempFormData');
    }
});