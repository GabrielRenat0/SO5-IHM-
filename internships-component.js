class Internships extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.loadData();
    }

    async loadData() {
        try {
            const response = await fetch("internships.json");
            const internships = await response.json();
            this.render(internships);
        } catch (error) {
            console.error("Erro ao carregar os dados dos estágios:", error);
        }
    }

    render(internships) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "internships-component.css";
        this.shadowRoot.appendChild(link);

        const linkBootstrap = document.createElement("link");
        linkBootstrap.rel = "stylesheet";
        linkBootstrap.href = "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css";
        this.shadowRoot.appendChild(linkBootstrap);

        this.shadowRoot.innerHTML += `
        <section id="internships">
            <div class="search-container">
                <input type="text" id="searchInput" placeholder="Buscar estágios...">
                <button id="searchButton"><i class="bi bi-search"></i></button>
            </div>
            <div class="filter-container">
                <select id="locationFilter">
                    <option value="">Todos os locais</option>
                    <option value="São Paulo/SP">São Paulo/SP</option>
                    <option value="Santa Rita do Sapucaí/MG">Santa Rita/MG</option>
                    <option value="Remoto">Remoto</option>
                </select>
                <select id="modalityFilter">
                    <option value="">Todas modalidades</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Híbrido">Híbrido</option>
                    <option value="Remoto">Remoto</option>
                </select>
            </div>
            <div class="internships-list">
                ${internships.map(internship => `
                    <div class="internship-card" data-id="${internship.id}">
                        <div class="internship-header">
                            <h3>${internship.cargo}</h3>
                            <span class="company">${internship.empresa}</span>
                            <div class="location-modality">
                                <span><i class="bi bi-geo-alt-fill"></i> ${internship.local}</span>
                                <span><i class="bi bi-laptop"></i> ${internship.modalidade}</span>
                            </div>
                        </div>
                        <div class="internship-details">
                            <p><strong>Descrição:</strong> ${internship.descricao}</p>
                            <p><strong>Requisitos:</strong> ${internship.requisitos}</p>
                            <div class="salary-deadline">
                                <span><i class="bi bi-cash-stack"></i> ${internship.salario}</span>
                                <span><i class="bi bi-calendar-check"></i> Inscrições até ${internship.prazo_inscricao}</span>
                            </div>
                        </div>
                        <div class="internship-footer">
                            <span class="publication-date">Publicado em ${internship.data_publicacao}</span>
                            <a href="${internship.link}" target="_blank" class="apply-button">Candidatar-se</a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
        `;

        // Adiciona event listeners para busca e filtros
        this.addEventListeners();
    }

    addEventListeners() {
        const searchInput = this.shadowRoot.getElementById('searchInput');
        const searchButton = this.shadowRoot.getElementById('searchButton');
        const locationFilter = this.shadowRoot.getElementById('locationFilter');
        const modalityFilter = this.shadowRoot.getElementById('modalityFilter');

        const searchFunction = () => {
            const searchTerm = searchInput.value.toLowerCase();
            const location = locationFilter.value;
            const modality = modalityFilter.value;
            
            const cards = this.shadowRoot.querySelectorAll('.internship-card');
            
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const company = card.querySelector('.company').textContent.toLowerCase();
                const cardLocation = card.querySelector('.location-modality span:nth-child(1)').textContent;
                const cardModality = card.querySelector('.location-modality span:nth-child(2)').textContent;
                
                const matchesSearch = title.includes(searchTerm) || company.includes(searchTerm);
                const matchesLocation = location === '' || cardLocation.includes(location);
                const matchesModality = modality === '' || cardModality.includes(modality);
                
                if (matchesSearch && matchesLocation && matchesModality) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        };

        searchButton.addEventListener('click', searchFunction);
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') searchFunction();
        });
        locationFilter.addEventListener('change', searchFunction);
        modalityFilter.addEventListener('change', searchFunction);
    }
}

customElements.define("internships-component", Internships);