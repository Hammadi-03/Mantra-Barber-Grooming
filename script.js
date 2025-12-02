// Language Management
const LANGUAGES = {
    en: 'en',
    id: 'id'
};

let currentLanguage = localStorage.getItem('language') || 'en';
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize language and theme on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    initializeTheme();
    setCurrentYear();
});

// Initialize Language
function initializeLanguage() {
    setLanguage(currentLanguage);
}

// Set Language
function setLanguage(lang) {
    if (lang !== 'en' && lang !== 'id') return;
    
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-en][data-id]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            el.textContent = text;
        }
    });
    
    // Update input placeholders
    document.querySelectorAll('[data-en-placeholder][data-id-placeholder]').forEach(el => {
        const placeholder = el.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) {
            el.placeholder = placeholder;
        }
    });
    
    // Update select options
    document.querySelectorAll('option[data-en][data-id]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            el.textContent = text;
        }
    });
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update page title
    const titleEl = document.querySelector('title');
    if (titleEl) {
        const titleText = titleEl.getAttribute(`data-${lang}`);
        if (titleText) {
            titleEl.textContent = titleText;
        }
    }
}

// Language switcher event listeners
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
    });
});

// Theme Management
function initializeTheme() {
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('sun');
    } else {
        document.documentElement.removeAttribute('data-theme');
        updateThemeIcon('moon');
    }
}

function toggleTheme() {
    if (currentTheme === 'light') {
        currentTheme = 'dark';
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('sun');
    } else {
        currentTheme = 'light';
        document.documentElement.removeAttribute('data-theme');
        updateThemeIcon('moon');
    }
    localStorage.setItem('theme', currentTheme);
}

function updateThemeIcon(icon) {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = `<i class="fas fa-${icon}"></i>`;
    }
}

// Theme toggle button event listener
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    if (hamburger) hamburger.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
}));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
const appointmentForm = document.getElementById('appointmentForm');
if(appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show localized alert
        const alertMessage = currentLanguage === 'en' 
            ? 'Appointment request submitted! We will contact you shortly to confirm.'
            : 'Permintaan janji temu telah dikirim! Kami akan menghubungi Anda segera untuk konfirmasi.';
        
        alert(alertMessage);
        this.reset();
        
        // You could add AJAX submission here:
        /*
        fetch('/book-appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert('Appointment booked successfully!');
            appointmentForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your request.');
        });
        */
    });
}

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(18, 18, 18, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Gallery Lightbox (simple version)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const imgUrl = this.style.backgroundImage
            .replace('url("', '')
            .replace('")', '');
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            cursor: pointer;
        `;
        
        const img = document.createElement('img');
        img.src = imgUrl;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border: 3px solid var(--primary-gold);
            border-radius: 8px;
        `;
        
        lightbox.appendChild(img);
        document.body.appendChild(lightbox);
        
        // Close lightbox on click
        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
        
        // Close on ESC key
        document.addEventListener('keydown', function closeOnEsc(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(lightbox);
                document.removeEventListener('keydown', closeOnEsc);
            }
        });
    });
});

// Current year in footer
function setCurrentYear() {
    const yearSpan = document.querySelector('.current-year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .review-card, .gallery-item').forEach(el => {
    observer.observe(el);
});
