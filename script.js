// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animate skill cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill categories and project cards
document.querySelectorAll('.skill-category, .project-card, .education-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease';
    observer.observe(el);
});

// Mobile menu toggle
const navBrand = document.querySelector('.nav-brand');
const navLinks_element = document.querySelector('.nav-links');

// Nav toggle button
const navToggle = document.querySelector('.nav-toggle');

if (navToggle && navLinks_element) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        navLinks_element.classList.toggle('open');

        // animate hamburger to X
        navToggle.classList.toggle('open');
    });

    // Close menu when a link is clicked (mobile)
    navLinks_element.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks_element.classList.contains('open')) {
                navLinks_element.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('open');
            }
        });
    });
}

// Counter animation for stats
const stats = document.querySelectorAll('.stat h3');
const statsSection = document.querySelector('.about-stats');

function animateCounters() {
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.ceil(current) + '+';
            }
        }, 30);
    });
}

// Trigger animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add smooth transition on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Prevent navigation link styling issues
document.addEventListener('DOMContentLoaded', () => {
    const activeNav = document.querySelector('.nav-links a[href="#home"]');
    if (activeNav) {
        activeNav.classList.add('active');
    }
});