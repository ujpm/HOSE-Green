// Campaigns page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true
    });
    
    loadCampaigns();
    setupFilters();
});

const campaigns = [
    {
        id: 1,
        title: "Global Tree Planting Initiative",
        description: "Join our ambitious mission to plant trees worldwide. Every tree counts in our fight against climate change.",
        image: "../assets/images/campaigns/tree-planting.jpeg",
        participants: 1500,
        points: 500,
        category: "Conservation",
        difficulty: "Medium",
        duration: "Ongoing",
        progress: 65,
        location: "Cape Town"
    },
    {
        id: 2,
        title: "Ocean Cleanup Movement",
        description: "Help us remove plastic waste from our oceans and protect marine ecosystems for future generations.",
        image: "../assets/images/campaigns/ocean-cleanup.jpeg",
        participants: 850,
        points: 400,
        category: "Conservation",
        difficulty: "Medium",
        duration: "6 months",
        progress: 45,
        location: "Durban Coast"
    },
    {
        id: 3,
        title: "Environmental Education Program",
        description: "Educate communities about sustainable practices and environmental conservation through workshops.",
        image: "../assets/images/campaigns/eco-education.jpeg",
        participants: 320,
        points: 300,
        category: "Education",
        difficulty: "Easy",
        duration: "3 months",
        progress: 80,
        location: "Johannesburg"
    },
    {
        id: 4,
        title: "Community Gardens Project",
        description: "Create and maintain sustainable community gardens to promote local food production.",
        image: "../assets/images/campaigns/community-garden.jpeg",
        participants: 245,
        points: 350,
        category: "Community",
        difficulty: "Easy",
        duration: "Ongoing",
        progress: 30,
        location: "Pretoria"
    },
    {
        id: 5,
        title: "Renewable Energy Initiative",
        description: "Support the transition to renewable energy sources by implementing solar solutions.",
        image: "../assets/images/campaigns/renewable-energy.jpeg",
        participants: 180,
        points: 450,
        category: "Innovation",
        difficulty: "Hard",
        duration: "12 months",
        progress: 25,
        location: "Port Elizabeth"
    },
    {
        id: 6,
        title: "Wildlife Conservation Project",
        description: "Protect and monitor local wildlife through community-led conservation efforts.",
        image: "../assets/images/campaigns/wildlife.jpeg",
        participants: 290,
        points: 400,
        category: "Conservation",
        difficulty: "Medium",
        duration: "Ongoing",
        progress: 55,
        location: "Kruger National Park"
    },
    {
        id: 7,
        title: "Green Schools Program",
        description: "Transform schools into environmentally conscious spaces through sustainable practices.",
        image: "../assets/images/campaigns/green-schools.jpeg",
        participants: 420,
        points: 350,
        category: "Education",
        difficulty: "Easy",
        duration: "Academic Year",
        progress: 70,
        location: "Bloemfontein"
    },
    {
        id: 8,
        title: "Smart Water Management",
        description: "Implement innovative water conservation technologies in water-scarce communities.",
        image: "../assets/images/campaigns/water-management.jpeg",
        participants: 310,
        points: 400,
        category: "Innovation",
        difficulty: "Medium",
        duration: "9 months",
        progress: 40,
        location: "Western Cape"
    },
    {
        id: 9,
        title: "Digital Environmental Summit",
        description: "Join our virtual summit to learn from environmental experts and share sustainable solutions.",
        image: "../assets/images/campaigns/digital-summit.jpeg",
        participants: 2800,
        points: 250,
        category: "Online",
        difficulty: "Easy",
        duration: "2 days",
        progress: 0,
        location: "Virtual Event"
    },
    {
        id: 10,
        title: "Eco-Challenge Series",
        description: "Participate in monthly online challenges to reduce your carbon footprint and live more sustainably.",
        image: "../assets/images/campaigns/eco-challenge.jpeg",
        participants: 1500,
        points: 300,
        category: "Online",
        difficulty: "Medium",
        duration: "Monthly",
        progress: 35,
        location: "Virtual"
    },
    {
        id: 11,
        title: "Green Tech Hackathon",
        description: "Collaborate online to develop innovative solutions for environmental challenges.",
        image: "../assets/images/campaigns/hackathon.jpeg",
        participants: 450,
        points: 500,
        category: "Online",
        difficulty: "Hard",
        duration: "48 hours",
        progress: 0,
        location: "Virtual Event"
    },
    {
        id: 12,
        title: "Environmental Photography Contest",
        description: "Share your environmental stories through photography and raise awareness globally.",
        image: "../assets/images/campaigns/photo-contest.jpeg",
        participants: 890,
        points: 200,
        category: "Online",
        difficulty: "Easy",
        duration: "1 month",
        progress: 60,
        location: "Virtual"
    }
];

function loadCampaigns(filter = 'all') {
    const campaignsGrid = document.querySelector('.campaigns-grid');
    if (!campaignsGrid) return;

    campaignsGrid.innerHTML = ''; // Clear existing campaigns

    const filteredCampaigns = filter === 'all' 
        ? campaigns 
        : campaigns.filter(campaign => campaign.category === filter);

    if (filteredCampaigns.length === 0) {
        campaignsGrid.innerHTML = `
            <div class="no-campaigns">
                <i class="fas fa-search"></i>
                <h3>No campaigns found</h3>
                <p>Try selecting a different category or check back later.</p>
            </div>
        `;
        return;
    }

    filteredCampaigns.forEach(campaign => {
        const campaignCard = createCampaignCard(campaign);
        campaignsGrid.appendChild(campaignCard);
    });
}

function createCampaignCard(campaign) {
    const card = document.createElement('div');
    card.className = 'campaign-card';
    card.setAttribute('data-aos', 'fade-up');
    
    card.innerHTML = `
        <div class="campaign-image">
            <img src="${campaign.image}" alt="${campaign.title}">
            <div class="campaign-category">
                <i class="${getCategoryIcon(campaign.category)}"></i>
                ${campaign.category}
            </div>
        </div>
        <div class="campaign-content">
            <h3>${campaign.title}</h3>
            <p>${campaign.description}</p>
            <div class="campaign-progress">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${campaign.progress}%"></div>
                </div>
                <span class="progress-text">${campaign.progress}% Complete</span>
            </div>
            <div class="campaign-meta">
                <span><i class="fas fa-users"></i> ${campaign.participants.toLocaleString()} Participants</span>
                <span><i class="fas fa-star"></i> ${campaign.points} Points</span>
            </div>
            <div class="campaign-details">
                <span><i class="fas fa-clock"></i> ${campaign.duration}</span>
                <span><i class="fas fa-signal"></i> ${campaign.difficulty}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${campaign.location}</span>
            </div>
            <button class="btn btn-primary mt-3" onclick="joinCampaign(${campaign.id})">
                <i class="fas fa-hand-holding-heart"></i>
                Join Campaign
            </button>
        </div>
    `;
    
    return card;
}

function getCategoryIcon(category) {
    const icons = {
        'Conservation': 'fas fa-tree',
        'Education': 'fas fa-graduation-cap',
        'Community': 'fas fa-users',
        'Innovation': 'fas fa-lightbulb',
        'Online': 'fas fa-globe'
    };
    return icons[category] || 'fas fa-globe';
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Load filtered campaigns
            loadCampaigns(button.getAttribute('data-filter'));
        });
    });
}

function joinCampaign(campaignId) {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    // Show join confirmation modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'joinCampaignModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Join ${campaign.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p>You're about to join this campaign! By joining, you commit to:</p>
                    <ul>
                        <li>Actively participate in campaign activities</li>
                        <li>Follow campaign guidelines and best practices</li>
                        <li>Share your progress with the community</li>
                    </ul>
                    <p>You'll earn ${campaign.points} points upon successful completion.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="confirmJoin(${campaignId})">
                        <i class="fas fa-check"></i> Confirm Join
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Clean up modal after it's hidden
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}

function confirmJoin(campaignId) {
    // TODO: Implement actual campaign joining logic with backend
    const modal = bootstrap.Modal.getInstance(document.getElementById('joinCampaignModal'));
    modal.hide();
    
    // Show success message
    const toast = document.createElement('div');
    toast.className = 'toast-notification success';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Successfully joined the campaign! Check your email for next steps.</p>
    `;
    document.body.appendChild(toast);
    
    // Remove toast after animation
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
