// Global variables
let currentTheme = 'dark';

// DOM elements
const cursorFollower = document.querySelector('.cursor-follower');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCursor();
    initializeAnimations();
    initializeHero();
    initializeExperience();
    initializeContactForm();
    initializeScrollEffects();
    initializeFooterMenu();
});


// Navigation and theme functions removed

// Custom Cursor - Optimized for performance
function initializeCursor() {
    if (!cursorFollower || window.innerWidth <= 768) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    // Throttled mouse move handler
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation using requestAnimationFrame
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursorFollower.style.left = cursorX + 'px';
        cursorFollower.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .project-link, .social-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'scale(1.5)';
            cursorFollower.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.backgroundColor = 'transparent';
        });
    });
}

// Scroll Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.project-card, .analytics-card, .blog-card, .about-text, .about-image, .experience-content'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Hero Section
function initializeHero() {
    // Matrix background effect
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Optimized matrix rain effect
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    let animationId;

    for (let x = 0; x < columns; x++) {
        drops[x] = Math.floor(Math.random() * canvas.height / fontSize);
    }

    function drawMatrix() {
        // Clear canvas with fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        
        animationId = requestAnimationFrame(drawMatrix);
    }

    // Start animation only if canvas is visible
    if (canvas.offsetParent !== null) {
        drawMatrix();
    }

    // Optimized typing effect for code
    const codeText = `class Developer:
    def __init__(self):
        self.name = "Rafid Sadik"
        self.role = "Programmer"
        self.skills = ["Python", "JavaScript", "React"]
        self.passion = "Programmer, Entrepreneur"
    
    def create_solutions(self):
        return "Building the future, one line at a time"`;

    function typeCode() {
        const codeElement = document.getElementById('typing-code');
        if (!codeElement) return;
        
        let i = 0;
        
        function type() {
            if (i < codeText.length) {
                codeElement.textContent += codeText.charAt(i);
                i++;
                setTimeout(type, 30); // Faster typing
            }
        }
        
        // Start typing after a short delay
        setTimeout(type, 500);
    }

    // Counter animation for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 200;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 10);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    function startHeroAnimations() {
        typeCode();
        setTimeout(animateCounters, 1000);
    }

    // Start animations immediately
    startHeroAnimations();
}

// Experience Section
function initializeExperience() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}


// Contact Form
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<span>Sending...</span>';
            submitButton.disabled = true;
            
            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                submitButton.innerHTML = '<span>Message Sent!</span>';
                submitButton.style.backgroundColor = '#64ffda';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                }, 3000);
                
            } catch (error) {
                // Show error message
                submitButton.innerHTML = '<span>Error! Try Again</span>';
                submitButton.style.backgroundColor = '#f57dff';
                
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                }, 3000);
            }
        });
    }
}

// Scroll Effects
function initializeScrollEffects() {
    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility Functions
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

// Performance optimization
const debouncedResize = debounce(() => {
    // Handle resize events
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}, 250);

window.addEventListener('resize', debouncedResize);

// Intersection Observer for performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.experience-content, .contact-form-container, .social-links'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Escape key functionality removed
    }
});

// Footer menu / Theme toggle (text-only)
function initializeFooterMenu() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    // load saved theme
    const saved = localStorage.getItem('theme');
   if (saved === 'light') {
        document.body.classList.add('light-theme');
        currentTheme = 'light';
    }

    updateToggleText();

    toggle.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        currentTheme = isLight ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        updateToggleText();
    });

    function updateToggleText() {
        toggle.textContent = 'Theme: ' + (currentTheme === 'light' ? 'Light' : 'Dark');
    }
}
