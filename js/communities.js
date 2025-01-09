// Communities page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true
    });
    
    loadCommunities();
    setupFilters();
    setupSearch();
    loadFeaturedCommunities();
});

const communities = [
    {
        id: 1,
        name: "Green Warriors",
        members: 3500,
        description: "A community dedicated to environmental conservation and sustainable living practices in South Africa.",
        category: "Conservation",
        activities: 120,
        location: "Cape Town",
        image: "../assets/images/communities/green-warriors.jpeg",
        avatar: "../assets/images/communities/avatars/green-warriors.png",
        featured: true
    },
    {
        id: 2,
        name: "Eco Educators",
        members: 2800,
        description: "Sharing knowledge and resources about environmental education with schools and communities.",
        category: "Education",
        activities: 85,
        location: "Johannesburg",
        image: "../assets/images/communities/eco-educators.jpeg",
        avatar: "../assets/images/communities/avatars/eco-educators.png"
    },
    {
        id: 3,
        name: "Urban Farmers",
        members: 1900,
        description: "Growing food and creating green spaces in urban environments to promote sustainable agriculture.",
        category: "Agriculture",
        activities: 95,
        location: "Pretoria",
        image: "../assets/images/communities/urban-farmers.jpeg",
        avatar: "../assets/images/communities/avatars/urban-farmers.png",
        featured: true
    },
    {
        id: 4,
        name: "Tech4Green",
        members: 1200,
        description: "Leveraging technology and innovation to solve environmental challenges and promote sustainability.",
        category: "Innovation",
        activities: 45,
        location: "Durban",
        image: "../assets/images/communities/tech4green.jpeg",
        avatar: "../assets/images/communities/avatars/tech4green.png"
    },
    {
        id: 5,
        name: "City Planters",
        members: 850,
        description: "Transforming urban spaces into green havens through community-driven planting initiatives.",
        category: "Urban",
        activities: 60,
        location: "Port Elizabeth",
        image: "../assets/images/communities/city-planters.jpeg",
        avatar: "../assets/images/communities/avatars/city-planters.png"
    },
    {
        id: 6,
        name: "Wildlife Guardians",
        members: 2100,
        description: "Protecting and preserving South African wildlife through education and conservation efforts.",
        category: "Conservation",
        activities: 75,
        location: "Kruger National Park",
        image: "../assets/images/communities/wildlife-guardians.jpeg",
        avatar: "../assets/images/communities/avatars/wildlife-guardians.png",
        featured: true
    },
    {
        id: 7,
        name: "Green Schools Network",
        members: 1600,
        description: "Connecting schools committed to environmental education and sustainable practices.",
        category: "Education",
        activities: 110,
        location: "Bloemfontein",
        image: "../assets/images/communities/green-schools.jpeg",
        avatar: "../assets/images/communities/avatars/green-schools.png"
    },
    {
        id: 8,
        name: "Sustainable Farmers",
        members: 1400,
        description: "Promoting sustainable farming practices and supporting local agricultural initiatives.",
        category: "Agriculture",
        activities: 65,
        location: "Stellenbosch",
        image: "../assets/images/communities/sustainable-farmers.jpeg",
        avatar: "../assets/images/communities/avatars/sustainable-farmers.png"
    }
];

function loadCommunities(filter = 'all') {
    const communitiesGrid = document.querySelector('.communities-grid');
    const noResults = document.querySelector('.no-results');
    if (!communitiesGrid) return;

    communitiesGrid.innerHTML = '';

    const filteredCommunities = filter === 'all' 
        ? communities 
        : communities.filter(community => community.category === filter);

    if (filteredCommunities.length === 0) {
        communitiesGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    communitiesGrid.style.display = 'grid';
    noResults.style.display = 'none';

    filteredCommunities.forEach(community => {
        const communityCard = createCommunityCard(community);
        communitiesGrid.appendChild(communityCard);
    });
}

function createCommunityCard(community) {
    const card = document.createElement('div');
    card.className = 'community-card';
    
    card.innerHTML = `
        <div class="community-header">
            <img src="${community.image}" alt="${community.name}" class="community-cover">
            <img src="${community.avatar}" alt="${community.name}" class="community-avatar">
        </div>
        <div class="community-content">
            <h3 class="community-title">${community.name}</h3>
            <div class="community-category">
                <i class="${getCategoryIcon(community.category)}"></i>
                ${community.category}
            </div>
            <p class="community-description">${community.description}</p>
            <div class="community-stats">
                <div class="stat-item">
                    <span class="stat-value">${community.members.toLocaleString()}</span>
                    <span class="stat-label">Members</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${community.activities}</span>
                    <span class="stat-label">Activities</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${community.location}</span>
                    <span class="stat-label">Location</span>
                </div>
            </div>
            <div class="community-actions">
                <button class="btn btn-outline-primary" onclick="previewCommunity(${community.id})">
                    <i class="fas fa-info-circle"></i>
                    Preview
                </button>
                <button class="btn btn-primary" onclick="joinCommunity(${community.id})">
                    <i class="fas fa-user-plus"></i>
                    Join
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function getCategoryIcon(category) {
    const icons = {
        'Conservation': 'fas fa-tree',
        'Education': 'fas fa-graduation-cap',
        'Agriculture': 'fas fa-seedling',
        'Innovation': 'fas fa-lightbulb',
        'Urban': 'fas fa-city'
    };
    return icons[category] || 'fas fa-users';
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadCommunities(button.getAttribute('data-filter'));
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('communitySearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', debounce(() => {
        const searchTerm = searchInput.value.toLowerCase();
        const communitiesGrid = document.querySelector('.communities-grid');
        const noResults = document.querySelector('.no-results');

        if (!searchTerm) {
            loadCommunities('all');
            return;
        }

        const filteredCommunities = communities.filter(community => 
            community.name.toLowerCase().includes(searchTerm) ||
            community.description.toLowerCase().includes(searchTerm) ||
            community.location.toLowerCase().includes(searchTerm) ||
            community.category.toLowerCase().includes(searchTerm)
        );

        communitiesGrid.innerHTML = '';

        if (filteredCommunities.length === 0) {
            communitiesGrid.style.display = 'none';
            noResults.style.display = 'block';
            return;
        }

        communitiesGrid.style.display = 'grid';
        noResults.style.display = 'none';

        filteredCommunities.forEach(community => {
            const communityCard = createCommunityCard(community);
            communitiesGrid.appendChild(communityCard);
        });
    }, 300));
}

function loadFeaturedCommunities() {
    const featuredContainer = document.querySelector('.featured-communities');
    if (!featuredContainer) return;

    const featuredCommunities = communities.filter(community => community.featured);
    featuredCommunities.forEach(community => {
        const communityCard = createCommunityCard(community);
        featuredContainer.appendChild(communityCard);
    });
}

function joinCommunity(communityId) {
    const community = communities.find(c => c.id === communityId);
    if (!community) return;

    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'joinCommunityModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Join ${community.name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="community-preview">
                        <img src="${community.image}" alt="${community.name}" class="img-fluid rounded mb-3">
                        <div class="community-info mb-4">
                            <h6>About this community:</h6>
                            <p>${community.description}</p>
                            <div class="location mt-2">
                                <i class="fas fa-map-marker-alt"></i> ${community.location}
                            </div>
                        </div>
                        <div class="commitment-list">
                            <h6>As a member, you'll be able to:</h6>
                            <ul class="list-unstyled">
                                <li><i class="fas fa-check-circle text-success"></i> Participate in community activities</li>
                                <li><i class="fas fa-check-circle text-success"></i> Connect with other members</li>
                                <li><i class="fas fa-check-circle text-success"></i> Access exclusive resources</li>
                                <li><i class="fas fa-check-circle text-success"></i> Contribute to local initiatives</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button type="button" class="btn btn-primary" onclick="confirmJoin(${communityId})">
                        <i class="fas fa-check"></i> Confirm Join
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}

function confirmJoin(communityId) {
    const modal = bootstrap.Modal.getInstance(document.getElementById('joinCommunityModal'));
    modal.hide();
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification success';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Successfully joined the community! Check your email for next steps.</p>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function previewCommunity(communityId) {
    const community = communities.find(c => c.id === communityId);
    if (!community) return;

    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'previewCommunityModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${community.name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="community-preview">
                        <img src="${community.image}" alt="${community.name}" class="img-fluid rounded mb-4">
                        <div class="row">
                            <div class="col-md-8">
                                <h6>About</h6>
                                <p>${community.description}</p>
                                <div class="community-details mt-4">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <h6>Location</h6>
                                            <p><i class="fas fa-map-marker-alt"></i> ${community.location}</p>
                                        </div>
                                        <div class="col-sm-6">
                                            <h6>Category</h6>
                                            <p><i class="${getCategoryIcon(community.category)}"></i> ${community.category}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="community-stats-card">
                                    <h6>Community Stats</h6>
                                    <ul class="list-unstyled">
                                        <li>
                                            <i class="fas fa-users"></i>
                                            <strong>${community.members.toLocaleString()}</strong> Members
                                        </li>
                                        <li>
                                            <i class="fas fa-calendar-check"></i>
                                            <strong>${community.activities}</strong> Activities
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="joinCommunity(${communityId}); this.closest('.modal').querySelector('.btn-close').click();">
                        <i class="fas fa-user-plus"></i> Join Community
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
