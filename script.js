document.addEventListener('DOMContentLoaded', () => {
    // Add sticky class to navbar on scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Add subtle reveal animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Stat Counter Animation
    const statElements = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const animateStats = () => {
        if (hasAnimated) return;
        statElements.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const suffix = stat.getAttribute('data-suffix') || '';
            const duration = 1500; // ms
            const stepTime = Math.max(10, Math.floor(duration / target)); 
            // For large numbers, step is bigger
            const increment = target > 1000 ? Math.ceil(target / (duration / 16)) : 1;
            
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format with commas for large numbers
                const formattedNumber = current.toLocaleString('en-IN');
                stat.innerText = formattedNumber + suffix;
            }, target > 1000 ? 16 : stepTime);
        });
        hasAnimated = true;
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (mobileToggle && navbar) {
        mobileToggle.addEventListener('click', () => {
            navbar.classList.toggle('mobile-active');
        });
        
        // Close mobile menu when a link is clicked
        const navLinksList = document.querySelectorAll('.nav-links a');
        navLinksList.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('mobile-active');
            });
        });
    }
});
