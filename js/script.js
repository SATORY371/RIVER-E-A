/**
 * RIVER EXPLORA - Interactive Features
 * Mobile Menu, Scroll Animations, Header Effects
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Header Scroll Effect ---
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle hamburger animation
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileToggle.classList.contains('active')) {
                spans[0].style.transform = 'translateY(8px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // --- 3. Mobile Dropdown Toggle ---
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    
    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                // We toggle the active class on mobile for the child dropdown
                item.classList.toggle('active');
                
                // If it's a link parent and we don't want it to jump yet
                // e.preventDefault(); 
            }
        });
    });

    // --- 4. Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // stop observing after animation is triggered
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Initial items in Hero
    document.querySelectorAll('.animate-up').forEach(item => {
        item.classList.add('active'); // Hero animations start on load
    });

    // Other items observe
    document.querySelectorAll('.animate-scroll').forEach(item => {
        // Observer adds .active class
        observer.observe(item);
    });

    // --- 5. Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    mobileToggle.click();
                }
            }
        });
    });

    // --- 6. Clean URL from 'index.html' or empty '#' ---
    const cleanURL = () => {
        const url = window.location.href;
        if (url.includes('index.html') || url.endsWith('#')) {
            const cleanUrl = url.replace('index.html', '').replace(/#$/, '');
            window.history.replaceState({}, document.title, cleanUrl);
        }
    };
    cleanURL();

});
