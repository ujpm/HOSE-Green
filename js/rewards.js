// Constants for reusable values
const GRID_CLASSES = {
    rewards: 'rewards-grid',
    featured: 'featured-rewards'
};

const CARD_CLASSES = {
    reward: 'reward-card',
    featured: 'featured-badge'
};

// Rewards page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true
    });
    
    loadRewards();
    setupFilters();
    setupUserProfile();
    loadFeaturedRewards();
    setupRedeemables();
});

const userProfile = {
    points: 35000,
    level: 12,
    badges: 8,
    achievements: 15,
    redeemHistory: []
};

const rewards = [
    {
        id: 1,
        title: "Tree Planter Badge",
        description: "Plant 10 trees to earn this prestigious badge and show your commitment to reforestation.",
        icon: "🌳",
        points: 1000,
        progress: 60,
        category: "Badge",
        requirements: ["Plant 10 trees", "Document growth for 1 month"],
        featured: true,
        image: "../assets/images/rewards/tree-planter.jpg"
    },
    {
        id: 2,
        title: "Community Leader",
        description: "Lead environmental initiatives in your community and inspire others to take action.",
        icon: "👑",
        points: 5000,
        progress: 30,
        category: "Role",
        requirements: ["Complete 5 campaigns", "Mentor 3 new members"],
        featured: true,
        image: "../assets/images/rewards/community-leader.jpg"
    },
    {
        id: 3,
        title: "Carbon Reducer",
        description: "Make a significant impact by reducing your carbon footprint through sustainable practices.",
        icon: "🌱",
        points: 2000,
        progress: 45,
        category: "Achievement",
        requirements: ["Track carbon for 3 months", "Reduce by 20%"],
        image: "../assets/images/rewards/carbon-reducer.jpg"
    },
    {
        id: 4,
        title: "Water Guardian",
        description: "Protect and conserve water resources through active participation in water-saving initiatives.",
        icon: "💧",
        points: 1500,
        progress: 75,
        category: "Badge",
        requirements: ["Save 1000L of water", "Fix 3 water leaks"],
        image: "../assets/images/rewards/water-guardian.jpg"
    },
    {
        id: 5,
        title: "Eco Innovator",
        description: "Create innovative solutions for environmental challenges in your community.",
        icon: "💡",
        points: 3000,
        progress: 20,
        category: "Role",
        requirements: ["Propose 2 eco solutions", "Implement 1 solution"],
        featured: true,
        image: "../assets/images/rewards/eco-innovator.jpg"
    },
    {
        id: 6,
        title: "Waste Warrior",
        description: "Champion waste reduction and recycling initiatives in your area.",
        icon: "♻️",
        points: 1800,
        progress: 90,
        category: "Achievement",
        requirements: ["Reduce waste by 30%", "Start composting"],
        image: "../assets/images/rewards/waste-warrior.jpg"
    },
    {
        id: 7,
        title: "Energy Saver",
        description: "Lead by example in energy conservation and renewable energy adoption.",
        icon: "⚡",
        points: 2500,
        progress: 55,
        category: "Badge",
        requirements: ["Reduce energy use by 25%", "Install solar panels"],
        image: "../assets/images/rewards/energy-saver.jpg"
    },
    {
        id: 8,
        title: "Wildlife Protector",
        description: "Contribute to the protection and conservation of local wildlife.",
        icon: "🦁",
        points: 4000,
        progress: 15,
        category: "Role",
        requirements: ["Document local wildlife", "Create protection plan"],
        image: "../assets/images/rewards/wildlife-protector.jpg"
    }
];

const redeemables = [
    {
        id: 'cash-100',
        title: "R100 Cash Reward",
        description: "Convert your green points into real cash rewards!",
        category: "Cash",
        points: 10000,
        value: "R100",
        image: "../assets/images/rewards/cash-reward.jpg",
        icon: "💵",
        featured: true
    },
    {
        id: 'cash-500',
        title: "R500 Cash Reward",
        description: "Get a bigger cash reward for your environmental efforts!",
        category: "Cash",
        points: 45000,
        value: "R500",
        image: "../assets/images/rewards/cash-reward-large.jpg",
        icon: "💰"
    },
    {
        id: 'movie-ticket',
        title: "Movie Ticket",
        description: "Enjoy a movie at any Ster-Kinekor cinema!",
        category: "Entertainment",
        points: 8000,
        value: "1 Ticket",
        image: "../assets/images/rewards/movie-ticket.jpg",
        icon: "🎬",
        featured: true
    },
    {
        id: 'concert-ticket',
        title: "Concert Ticket",
        description: "Get access to selected environmental awareness concerts!",
        category: "Entertainment",
        points: 15000,
        value: "1 Ticket",
        image: "../assets/images/rewards/concert-ticket.jpg",
        icon: "🎵"
    },
    {
        id: 'gift-card-checkers',
        title: "Checkers Gift Card",
        description: "R200 gift card for eco-friendly shopping at Checkers!",
        category: "Gift Cards",
        points: 18000,
        value: "R200",
        image: "../assets/images/rewards/checkers-card.jpg",
        icon: "🛒",
        featured: true
    },
    {
        id: 'gift-card-woolworths',
        title: "Woolworths Gift Card",
        description: "R300 gift card for sustainable shopping at Woolworths!",
        category: "Gift Cards",
        points: 25000,
        value: "R300",
        image: "../assets/images/rewards/woolworths-card.jpg",
        icon: "🏪"
    },
    {
        id: 'eco-bike',
        title: "Eco-Friendly Bicycle",
        description: "Premium bicycle for sustainable transportation!",
        category: "Sustainable Transport",
        points: 100000,
        value: "1 Bicycle",
        image: "../assets/images/rewards/eco-bike.jpg",
        icon: "🚲",
        featured: true
    },
    {
        id: 'solar-charger',
        title: "Solar Power Bank",
        description: "Charge your devices using solar energy!",
        category: "Eco Gadgets",
        points: 12000,
        value: "1 Device",
        image: "../assets/images/rewards/solar-charger.jpg",
        icon: "🔋"
    },
    {
        id: 'surprise-box',
        title: "Eco Surprise Box",
        description: "Mystery box filled with sustainable products!",
        category: "Surprise",
        points: 20000,
        value: "1 Box",
        image: "../assets/images/rewards/surprise-box.jpg",
        icon: "🎁",
        featured: true
    }
];

function loadRewards(filter = 'all') {
    const rewardsGrid = document.querySelector(`.${GRID_CLASSES.rewards}`);
    if (!rewardsGrid) return;

    rewardsGrid.innerHTML = '';
    
    const filteredRewards = filter === 'all' 
        ? rewards 
        : rewards.filter(reward => reward.category === filter);

    filteredRewards.forEach(reward => {
        const rewardCard = createRewardCard(reward);
        rewardsGrid.appendChild(rewardCard);
    });
}

function createRewardCard(reward) {
    const card = document.createElement('div');
    card.className = CARD_CLASSES.reward;
    card.setAttribute('data-aos', 'fade-up');
    
    card.innerHTML = `
        <div class="reward-header">
            <img src="${reward.image}" alt="${reward.title}" class="reward-image">
            <div class="reward-icon">
                <span>${reward.icon}</span>
            </div>
            ${reward.featured ? `<div class="${CARD_CLASSES.featured}">Featured</div>` : ''}
        </div>
        <div class="reward-content">
            <h3 class="reward-title">${reward.title}</h3>
            <div class="reward-category">
                <i class="${getCategoryIcon(reward.category)}"></i>
                ${reward.category}
            </div>
            <p class="reward-description">${reward.description}</p>
            <div class="reward-progress">
                <div class="progress-label">
                    <span>Progress</span>
                    <span>${reward.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${reward.progress}%"></div>
                </div>
            </div>
            <div class="reward-requirements">
                <h4>Requirements:</h4>
                <ul>
                    ${reward.requirements.map(req => `
                        <li>
                            <i class="fas ${reward.progress >= 100 ? 'fa-check-circle text-success' : 'fa-circle'}"></i>
                            ${req}
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="reward-footer">
                <div class="points-required">
                    <i class="fas fa-star"></i>
                    ${reward.points} points
                </div>
                <button class="btn ${reward.progress >= 100 ? 'btn-primary' : 'btn-secondary'}" 
                        onclick="claimReward(${reward.id})"
                        ${reward.progress < 100 ? 'disabled' : ''}>
                    <i class="fas ${reward.progress >= 100 ? 'fa-award' : 'fa-lock'}"></i>
                    ${reward.progress >= 100 ? 'Claim Reward' : 'In Progress'}
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function getCategoryIcon(category) {
    const icons = {
        'Badge': 'fas fa-certificate',
        'Role': 'fas fa-user-shield',
        'Achievement': 'fas fa-trophy',
        'Cash': 'fas fa-money-bill-wave',
        'Entertainment': 'fas fa-ticket-alt',
        'Gift Cards': 'fas fa-gift',
        'Sustainable Transport': 'fas fa-bicycle',
        'Eco Gadgets': 'fas fa-solar-panel',
        'Surprise': 'fas fa-box-open'
    };
    return icons[category] || 'fas fa-award';
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadRewards(button.getAttribute('data-filter'));
        });
    });
}

function setupUserProfile() {
    const header = document.querySelector('.page-header .container');
    if (!header) return;

    const profileStats = document.createElement('div');
    profileStats.className = 'user-profile-stats';
    profileStats.innerHTML = `
        <div class="stat">
            <i class="fas fa-star"></i>
            <span class="value">${userProfile.points.toLocaleString()}</span>
            <span class="label">Points</span>
        </div>
        <div class="stat">
            <i class="fas fa-layer-group"></i>
            <span class="value">${userProfile.level}</span>
            <span class="label">Level</span>
        </div>
        <div class="stat">
            <i class="fas fa-certificate"></i>
            <span class="value">${userProfile.badges}</span>
            <span class="label">Badges</span>
        </div>
        <div class="stat">
            <i class="fas fa-trophy"></i>
            <span class="value">${userProfile.achievements}</span>
            <span class="label">Achievements</span>
        </div>
    `;

    header.appendChild(profileStats);
}

function loadFeaturedRewards() {
    const featuredContainer = document.querySelector(`.${GRID_CLASSES.featured}`);
    if (!featuredContainer) return;

    const featuredRewards = rewards.filter(reward => reward.featured);
    featuredRewards.forEach(reward => {
        const rewardCard = createRewardCard(reward);
        featuredContainer.appendChild(rewardCard);
    });
}

function claimReward(rewardId) {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return;

    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'claimRewardModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Claim ${reward.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="reward-preview">
                        <div class="reward-preview-header">
                            <img src="${reward.image}" alt="${reward.title}" class="img-fluid rounded">
                            <div class="reward-icon-large">${reward.icon}</div>
                        </div>
                        <div class="reward-info mt-4">
                            <h6>Congratulations!</h6>
                            <p>You've completed all requirements for the ${reward.title}:</p>
                            <ul class="requirements-list">
                                ${reward.requirements.map(req => `
                                    <li class="completed">
                                        <i class="fas fa-check-circle text-success"></i>
                                        ${req}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="points-summary mt-4">
                            <div class="points-item">
                                <i class="fas fa-star"></i>
                                <span>${reward.points} points will be added to your profile</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button type="button" class="btn btn-primary" onclick="confirmClaim(${rewardId})">
                        <i class="fas fa-check"></i> Claim Reward
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

function confirmClaim(rewardId) {
    const modal = bootstrap.Modal.getInstance(document.getElementById('claimRewardModal'));
    modal.hide();
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification success';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Congratulations! You've earned a new reward! Check your profile to see it.</p>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);

    // Update user profile
    userProfile.points += rewards.find(r => r.id === rewardId).points;
    setupUserProfile();
}

function setupRedeemables() {
    const redeemablesSection = document.createElement('section');
    redeemablesSection.className = 'redeemables-section';
    redeemablesSection.innerHTML = `
        <div class="container">
            <h2 class="section-title">Redeem Your Points</h2>
            <p class="section-description">Convert your green points into amazing rewards!</p>
            
            <div class="filters mt-3 mb-3">
                <button class="btn btn-secondary active" data-filter="all">All Rewards</button>
                <button class="btn btn-secondary" data-filter="Cash">Cash Rewards</button>
                <button class="btn btn-secondary" data-filter="Entertainment">Entertainment</button>
                <button class="btn btn-secondary" data-filter="Gift Cards">Gift Cards</button>
                <button class="btn btn-secondary" data-filter="Sustainable Transport">Transport</button>
                <button class="btn btn-secondary" data-filter="Eco Gadgets">Gadgets</button>
                <button class="btn btn-secondary" data-filter="Surprise">Surprise</button>
            </div>

            <div class="redeemables-grid"></div>
        </div>
    `;

    const mainContent = document.querySelector('.page-content');
    const existingRewardsSection = document.querySelector('.rewards-section');
    mainContent.insertBefore(redeemablesSection, existingRewardsSection);

    loadRedeemables();
    setupRedeemableFilters();
}

function loadRedeemables(filter = 'all') {
    const redeemablesGrid = document.querySelector('.redeemables-grid');
    if (!redeemablesGrid) return;

    redeemablesGrid.innerHTML = '';
    
    const filteredRedeemables = filter === 'all' 
        ? redeemables 
        : redeemables.filter(item => item.category === filter);

    filteredRedeemables.forEach(item => {
        const card = createRedeemableCard(item);
        redeemablesGrid.appendChild(card);
    });
}

function createRedeemableCard(item) {
    const card = document.createElement('div');
    card.className = 'redeemable-card';
    card.setAttribute('data-aos', 'fade-up');
    
    const canRedeem = userProfile.points >= item.points;
    
    card.innerHTML = `
        <div class="redeemable-header">
            <img src="${item.image}" alt="${item.title}" class="redeemable-image">
            <div class="redeemable-icon">
                <span>${item.icon}</span>
            </div>
            ${item.featured ? '<div class="featured-badge">Featured</div>' : ''}
        </div>
        <div class="redeemable-content">
            <h3 class="redeemable-title">${item.title}</h3>
            <div class="redeemable-category">
                <i class="${getCategoryIcon(item.category)}"></i>
                ${item.category}
            </div>
            <p class="redeemable-description">${item.description}</p>
            <div class="redeemable-value">
                <i class="fas fa-tag"></i>
                <span>Value: ${item.value}</span>
            </div>
            <div class="redeemable-points">
                <i class="fas fa-star"></i>
                <span>${item.points.toLocaleString()} points</span>
            </div>
            <div class="redeemable-footer">
                ${canRedeem ? `
                    <button class="btn btn-primary" onclick="redeemItem('${item.id}')">
                        <i class="fas fa-gift"></i> Redeem Now
                    </button>
                ` : `
                    <button class="btn btn-secondary" disabled>
                        <i class="fas fa-lock"></i> ${(item.points - userProfile.points).toLocaleString()} more points needed
                    </button>
                `}
            </div>
        </div>
    `;
    
    return card;
}

function setupRedeemableFilters() {
    const filterButtons = document.querySelectorAll('.redeemables-section .filters [data-filter]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadRedeemables(button.getAttribute('data-filter'));
        });
    });
}

function redeemItem(itemId) {
    const item = redeemables.find(r => r.id === itemId);
    if (!item) return;

    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'redeemItemModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Redeem ${item.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="redeem-preview">
                        <div class="redeem-preview-header">
                            <img src="${item.image}" alt="${item.title}" class="img-fluid rounded">
                            <div class="redeem-icon-large">${item.icon}</div>
                        </div>
                        <div class="redeem-info mt-4">
                            <h6>Confirm Redemption</h6>
                            <p>You're about to redeem:</p>
                            <ul class="redeem-details">
                                <li>
                                    <i class="fas fa-gift"></i>
                                    <strong>${item.title}</strong>
                                </li>
                                <li>
                                    <i class="fas fa-tag"></i>
                                    Value: ${item.value}
                                </li>
                                <li>
                                    <i class="fas fa-star"></i>
                                    Cost: ${item.points.toLocaleString()} points
                                </li>
                            </ul>
                            <div class="points-balance mt-3">
                                <p>Your points after redemption: <strong>${(userProfile.points - item.points).toLocaleString()}</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button type="button" class="btn btn-primary" onclick="confirmRedeem('${itemId}')">
                        <i class="fas fa-check"></i> Confirm Redemption
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

function confirmRedeem(itemId) {
    const item = redeemables.find(r => r.id === itemId);
    if (!item) return;

    const modal = bootstrap.Modal.getInstance(document.getElementById('redeemItemModal'));
    modal.hide();
    
    // Update user profile
    userProfile.points -= item.points;
    userProfile.redeemHistory.push({
        itemId,
        redeemedAt: new Date(),
        points: item.points
    });
    
    // Update UI
    setupUserProfile();
    loadRedeemables();
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification success';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Successfully redeemed ${item.title}! Check your email for redemption instructions.</p>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
