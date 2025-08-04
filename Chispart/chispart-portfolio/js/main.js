// Datos de proyectos
const projects = [
    {
        id: 1,
        title: "Sistema de Gestión Comercial",
        description: "Solución integral para automatizar procesos de ventas, inventario y facturación, optimizando la gestión comercial completa.",
        category: "web",
        tech: ["Automatización", "Gestión", "Integración"],
        demoUrl: "https://example-ecommerce-demo.vercel.app",
        codeUrl: "https://github.com/chispart/ecommerce-dashboard",
        image: "assets/images/projects/gestion-comercial.png"
    },
    {
        id: 2,
        title: "API de Integración Empresarial",
        description: "Solución robusta para conectar sistemas empresariales existentes y automatizar flujos de trabajo complejos.",
        category: "api",
        tech: ["Integración", "APIs", "Automatización"],
        demoUrl: "https://task-api-demo.herokuapp.com",
        codeUrl: "https://github.com/chispart/task-manager-api",
        image: "assets/images/projects/api-integracion.png"
    },
    {
        id: 3,
        title: "App de Consulta Inteligente",
        description: "Aplicación móvil que proporciona información en tiempo real con geolocalización y análisis predictivo.",
        category: "mobile",
        tech: ["Consulta", "Tiempo Real", "Análisis"],
        demoUrl: "https://weather-app-demo.netlify.app",
        codeUrl: "https://github.com/chispart/weather-app",
        image: "assets/images/projects/app-consulta.png"
    },
    {
        id: 4,
        title: "Herramienta de Optimización",
        description: "Solución para optimizar y validar procesos empresariales, mejorando la eficiencia operativa.",
        category: "tools",
        tech: ["Optimización", "Validación", "Eficiencia"],
        demoUrl: null,
        codeUrl: "https://github.com/chispart/code-formatter",
        image: "assets/images/projects/herramienta-optimizacion.png"
    },
    {
        id: 5,
        title: "Generador de Presencia Digital",
        description: "Solución automatizada para crear presencia digital profesional a partir de datos empresariales.",
        category: "web",
        tech: ["Presencia Digital", "Automatización", "Branding"],
        demoUrl: "https://portfolio-gen-demo.vercel.app",
        codeUrl: "https://github.com/chispart/portfolio-generator",
        image: "assets/images/projects/presencia-digital.png"
    },
    {
        id: 6,
        title: "Sistema de Comunicación Inteligente",
        description: "Solución de comunicación automatizada con procesamiento inteligente de consultas y respuestas contextuales.",
        category: "api",
        tech: ["Comunicación", "IA", "Automatización"],
        demoUrl: "https://chatbot-api-demo.herokuapp.com",
        codeUrl: "https://github.com/chispart/chatbot-api",
        image: "assets/images/projects/comunicacion-inteligente.png"
    }
];

// Variables globales
let currentFilter = 'all';

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    renderProjects();
    initContactForm();
    initScrollAnimations();
});

// Navegación
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.remove('active'));
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Renderizar proyectos
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Render project cards
    function displayProjects(projectsToShow = projects) {
        projectsGrid.innerHTML = '';
        
        projectsToShow.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });

        // Animate cards
        setTimeout(() => {
            const cards = document.querySelectorAll('.project-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                }, index * 100);
            });
        }, 100);
    }

    // Create project card
    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = `project-card ${project.category}`;
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.demoUrl ? `<a href="${project.demoUrl}" class="project-link link-demo" target="_blank" rel="noopener noreferrer">Ver Demo</a>` : ''}
                    <a href="${project.codeUrl}" class="project-link link-code" target="_blank" rel="noopener noreferrer">Ver Código</a>
                </div>
            </div>
        `;
        return card;
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter projects
            const filter = this.getAttribute('data-filter');
            currentFilter = filter;

            if (filter === 'all') {
                displayProjects(projects);
            } else {
                const filteredProjects = projects.filter(project => project.category === filter);
                displayProjects(filteredProjects);
            }
        });
    });

    // Initial render
    displayProjects();
}

// Formulario de contacto
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Por favor, completa todos los campos.', 'error');
            return;
        }

        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        setTimeout(() => {
            showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Notificaciones
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--pastel-green)' : type === 'error' ? 'var(--pastel-pink)' : 'var(--pastel-blue)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;

    // Add to document
    document.body.appendChild(notification);

    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Animaciones de scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToAnimate = document.querySelectorAll('.section-header, .project-card, .contact-item, .stat-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Utility functions
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

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;

document.head.appendChild(notificationStyles);