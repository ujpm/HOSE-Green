// Components handler
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('../components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            initializeNavigation();
        })
        .catch(error => {
            console.error('Error loading header:', error);
            document.getElementById('header-placeholder').innerHTML = createDefaultHeader();
        });

    // Load footer
    fetch('../components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            document.getElementById('footer-placeholder').innerHTML = createDefaultFooter();
        });
});

function createDefaultHeader() {
    return `
    <header class="header">
        <nav class="navbar">
            <a href="../index.html" class="nav-logo">HOSE</a>
            <ul class="nav-menu">
                <li><a href="../pages/campaigns.html" class="nav-link">Campaigns</a></li>
                <li><a href="../pages/communities.html" class="nav-link">Communities</a></li>
                <li><a href="../pages/rewards.html" class="nav-link">Rewards</a></li>
            </ul>
            <div class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </nav>
    </header>`;
}

function createDefaultFooter() {
    return `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>HOSE</h3>
                    <p>Making environmental action accessible and rewarding.</p>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="../pages/campaigns.html">Campaigns</a></li>
                        <li><a href="../pages/communities.html">Communities</a></li>
                        <li><a href="../pages/rewards.html">Rewards</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 HOSE. All rights reserved.</p>
            </div>
        </div>
    </footer>`;
}

function initializeNavigation() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Set active nav link based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}
