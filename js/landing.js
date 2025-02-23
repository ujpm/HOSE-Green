document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with updated settings
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Typing Effect
    new Typed('#typed-text', {
        strings: [
            'Join the Green Revolution',
            'Make a Difference Today',
            'Create Sustainable Change',
            'Build a Better Future'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: false
    });

    // Floating Objects Animation
    const floatItems = document.querySelectorAll('.float-item');
    floatItems.forEach(item => {
        gsap.to(item, {
            y: 'random(-20, 20)',
            x: 'random(-20, 20)',
            rotation: 'random(-10, 10)',
            duration: 'random(2, 4)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });

    // 3D Text Effect
    const text = document.querySelector('.animated-text');
    if (text) {
        text.innerHTML = text.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        
        const letters = document.querySelectorAll('.letter');
        letters.forEach(letter => {
            letter.addEventListener('mouseover', () => {
                gsap.to(letter, {
                    z: 50,
                    rotationX: 20,
                    rotationY: 20,
                    duration: 0.3
                });
            });
            
            letter.addEventListener('mouseout', () => {
                gsap.to(letter, {
                    z: 0,
                    rotationX: 0,
                    rotationY: 0,
                    duration: 0.3
                });
            });
        });
    }

    // Particle Background
    const particleCanvas = document.createElement('canvas');
    particleCanvas.id = 'particle-canvas';
    document.querySelector('.hero').prepend(particleCanvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: particleCanvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0xffffff,
        transparent: true,
        opacity: 0.5
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    camera.position.z = 3;

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounter = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounter, 1);
            } else {
                counter.innerText = target;
            }
        });
    };

    // Parallax effect
    const parallaxSections = document.querySelectorAll('.parallax-section');
    window.addEventListener('scroll', () => {
        parallaxSections.forEach(section => {
            const bg = section.querySelector('.parallax-bg');
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            bg.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.classList.add('ripple');
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const circle = document.createElement('div');
            circle.classList.add('ripple-effect');
            circle.style.left = `${x}px`;
            circle.style.top = `${y}px`;
            
            this.appendChild(circle);
            setTimeout(() => circle.remove(), 1000);
        });
    });

    // Enhanced 3D card effect
    const cards = document.querySelectorAll('.card-3d-wrap');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            
            const dx = x - xc;
            const dy = y - yc;
            
            const wrapper = this.querySelector('.card-3d-wrapper');
            wrapper.style.transform = `
                rotateY(${dx / 10}deg) 
                rotateX(${-dy / 10}deg) 
                translateZ(50px)
            `;
        });

        card.addEventListener('mouseleave', function() {
            const wrapper = this.querySelector('.card-3d-wrapper');
            wrapper.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
        });
    });

    // Start observing elements for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('counter-section')) {
                    animateCounter();
                }
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Stats Counter Animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.round(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };

            updateCount();
        });
    }

    // Intersection Observer for Stats
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // Particle Background Effect
    const createParticles = () => {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random size
            const size = Math.random() * 5 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random animation duration
            particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
            
            particlesContainer.appendChild(particle);
        }
    };

    // Testimonials Slider
    class TestimonialsSlider {
        constructor() {
            this.slider = document.querySelector('.testimonials-slider');
            if (!this.slider) return;

            this.slides = this.slider.querySelectorAll('.testimonial-card');
            this.currentSlide = 0;
            this.slideInterval = 5000;

            this.initSlider();
        }

        initSlider() {
            setInterval(() => this.nextSlide(), this.slideInterval);
        }

        nextSlide() {
            this.slides[this.currentSlide].style.opacity = '0';
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.slides[this.currentSlide].style.opacity = '1';
        }
    }

    // Impact Map Animation
    class ImpactMap {
        constructor() {
            this.map = document.querySelector('.impact-map');
            if (!this.map) return;

            this.points = [
                { lat: 40.7128, lng: -74.0060 }, // New York
                { lat: 51.5074, lng: -0.1278 },  // London
                { lat: 35.6762, lng: 139.6503 }, // Tokyo
                { lat: -33.8688, lng: 151.2093 }, // Sydney
                { lat: -1.2921, lng: 36.8219 }   // Nairobi
            ];

            this.initMap();
        }

        initMap() {
            this.points.forEach(point => {
                const marker = document.createElement('div');
                marker.className = 'impact-point';
                marker.style.left = this.lngToX(point.lng) + '%';
                marker.style.top = this.latToY(point.lat) + '%';
                this.map.appendChild(marker);
            });
        }

        lngToX(lng) {
            return ((lng + 180) / 360) * 100;
        }

        latToY(lat) {
            return ((lat * -1 + 90) / 180) * 100;
        }
    }

    // Initialize everything when DOM is loaded
    createParticles();
    new TestimonialsSlider();
    new ImpactMap();

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero-section');
        if (!hero) return;

        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    // Initialize Typed.js
    const typed = new Typed('#typed-text', {
        strings: [
            'Join the Green Revolution',
            'Make a Difference',
            'Save Our Planet',
            'Build Sustainable Communities'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    // Impact Carousel
    const impactCarousel = {
        currentSlide: 0,
        slides: document.querySelectorAll('.impact-slide'),
        controls: document.querySelectorAll('.impact-control'),
        autoPlayInterval: null,

        init() {
            this.showSlide(0);
            this.setupControls();
            this.startAutoPlay();
        },

        showSlide(index) {
            // Remove active class from all slides and controls
            this.slides.forEach(slide => {
                slide.classList.remove('active', 'previous');
            });
            this.controls.forEach(control => {
                control.classList.remove('active');
            });

            // Add previous class to current slide
            if (this.currentSlide !== index) {
                this.slides[this.currentSlide].classList.add('previous');
            }

            // Update current slide and add active class
            this.currentSlide = index;
            this.slides[index].classList.add('active');
            this.controls[index].classList.add('active');
        },

        setupControls() {
            this.controls.forEach((control, index) => {
                control.addEventListener('click', () => {
                    this.showSlide(index);
                    this.restartAutoPlay();
                });
            });
        },

        startAutoPlay() {
            this.autoPlayInterval = setInterval(() => {
                const nextSlide = (this.currentSlide + 1) % this.slides.length;
                this.showSlide(nextSlide);
            }, 5000);
        },

        restartAutoPlay() {
            clearInterval(this.autoPlayInterval);
            this.startAutoPlay();
        }
    };

    // Initialize impact carousel
    impactCarousel.init();

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
});
