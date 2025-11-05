// Particle Animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll animations observer
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

// Observe project cards with staggered animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe award cards with staggered animation
const awardCards = document.querySelectorAll('.award-card');
awardCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Certificate Modal
const modal = document.getElementById('certificateModal');
const modalImg = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');

console.log('Modal elements:', { modal, modalImg, modalClose }); // Debug log

// Close modal functions
function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        console.log('Modal closed'); // Debug log
    }
}

// Add click event to all award images - needs to wait for DOM
function initializeCertificateModal() {
    const wrappers = document.querySelectorAll('.award-image-wrapper');
    console.log('Found award wrappers:', wrappers.length); // Debug log
    
    wrappers.forEach((wrapper, index) => {
        wrapper.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Award clicked:', index); // Debug log
            
            const img = this.querySelector('img');
            console.log('Image found:', img, 'Source:', img?.src); // Debug log
            
            if (img && img.src && modal && modalImg) {
                modal.classList.add('active');
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                document.body.style.overflow = 'hidden';
                console.log('Modal should be visible now'); // Debug log
            } else {
                console.log('Missing elements or image source'); // Debug log
            }
        });
    });
}

// Initialize modal after DOM is loaded
initializeCertificateModal();

// Close modal on X click
if (modalClose) {
    modalClose.addEventListener('click', function(e) {
        e.stopPropagation();
        closeModal();
    });
}

// Close modal on background click
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
    }
});

// Back to top button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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

// Initialize particles on load
window.addEventListener('load', createParticles);