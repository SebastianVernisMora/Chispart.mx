// Demo Manager - Sistema avanzado de incrustación de aplicaciones
class DemoManager {
    constructor() {
        this.demos = [
            {
                id: 1,
                title: "E-Commerce Dashboard",
                description: "Explora el panel de administración completo con datos de ejemplo. Incluye gráficos interactivos, gestión de productos y análisis de ventas.",
                url: "https://react-admin-dashboard-demo.vercel.app",
                fallbackUrl: "https://codepen.io/chispart/embed/example-dashboard",
                tech: ["React", "Chart.js", "Material-UI"],
                github: "https://github.com/chispart/ecommerce-dashboard",
                category: "web-app",
                status: "active"
            },
            {
                id: 2,
                title: "Weather App",
                description: "Aplicación del clima con datos en tiempo real. Prueba la búsqueda por ciudad, geolocalización y pronósticos de 7 días.",
                url: "https://weather-app-vanilla-js.netlify.app",
                fallbackUrl: "https://codepen.io/chispart/embed/weather-app",
                tech: ["JavaScript", "OpenWeather API", "CSS3"],
                github: "https://github.com/chispart/weather-app",
                category: "web-app",
                status: "active"
            },
            {
                id: 3,
                title: "Task Manager",
                description: "Gestor de tareas con funcionalidades completas. Crea, edita, organiza y marca tareas como completadas.",
                url: "https://task-manager-vue-demo.vercel.app",
                fallbackUrl: "https://codepen.io/chispart/embed/task-manager",
                tech: ["Vue.js", "Vuex", "LocalStorage"],
                github: "https://github.com/chispart/task-manager",
                category: "productivity",
                status: "active"
            },
            {
                id: 4,
                title: "Portfolio Generator",
                description: "Herramienta para generar portafolios automáticamente. Conecta tu GitHub y genera un sitio web profesional.",
                url: "https://portfolio-generator-tool.vercel.app",
                fallbackUrl: "https://codepen.io/chispart/embed/portfolio-gen",
                tech: ["JavaScript", "GitHub API", "CSS Grid"],
                github: "https://github.com/chispart/portfolio-generator",
                category: "tools",
                status: "active"
            },
            {
                id: 5,
                title: "Chat Bot Interface",
                description: "Interfaz de chatbot con IA integrada. Prueba conversaciones naturales y respuestas contextuales.",
                url: "https://chatbot-interface-demo.netlify.app",
                fallbackUrl: "https://codepen.io/chispart/embed/chatbot-ui",
                tech: ["React", "Socket.io", "OpenAI API"],
                github: "https://github.com/chispart/chatbot-interface",
                category: "ai",
                status: "maintenance"
            },
            {
                id: 6,
                title: "Data Visualization",
                description: "Dashboard interactivo con múltiples tipos de gráficos y análisis de datos en tiempo real.",
                url: "https://data-viz-dashboard.vercel.app",
                fallbackUrl: "https://codepen.io/chispart/embed/data-viz",
                tech: ["D3.js", "Python", "Flask API"],
                github: "https://github.com/chispart/data-visualization",
                category: "analytics",
                status: "active"
            }
        ];

        this.currentDemo = null;
        this.loadTimeout = 10000; // 10 seconds timeout
        this.retryAttempts = 3;
        this.currentAttempt = 0;

        this.init();
    }

    init() {
        this.createDemoInterface();
        this.setupEventListeners();
        this.loadDefaultDemo();
    }

    createDemoInterface() {
        const demoTabs = document.querySelector('.demo-tabs');
        const demoContainer = document.querySelector('.demo-container');

        // Clear existing content
        demoTabs.innerHTML = '';

        // Create category filters
        const categories = [...new Set(this.demos.map(demo => demo.category))];
        const categoryFilter = document.createElement('div');
        categoryFilter.className = 'demo-category-filter';
        categoryFilter.innerHTML = `
            <button class="category-btn active" data-category="all">Todas</button>
            ${categories.map(cat => `
                <button class="category-btn" data-category="${cat}">
                    ${this.getCategoryLabel(cat)}
                </button>
            `).join('')}
        `;

        // Insert category filter before demo tabs
        demoTabs.parentNode.insertBefore(categoryFilter, demoTabs);

        // Create demo tabs
        this.renderDemoTabs();

        // Add enhanced demo container features
        this.enhanceDemoContainer();
    }

    getCategoryLabel(category) {
        const labels = {
            'web-app': 'Web Apps',
            'productivity': 'Productividad',
            'tools': 'Herramientas',
            'ai': 'Inteligencia Artificial',
            'analytics': 'Análisis de Datos'
        };
        return labels[category] || category;
    }

    renderDemoTabs(filterCategory = 'all') {
        const demoTabs = document.querySelector('.demo-tabs');
        const filteredDemos = filterCategory === 'all' 
            ? this.demos 
            : this.demos.filter(demo => demo.category === filterCategory);

        demoTabs.innerHTML = '';

        filteredDemos.forEach((demo, index) => {
            const tab = document.createElement('button');
            tab.className = `demo-tab ${index === 0 ? 'active' : ''}`;
            tab.innerHTML = `
                <span class="demo-tab-title">${demo.title}</span>
                <span class="demo-tab-status ${demo.status}">${this.getStatusLabel(demo.status)}</span>
            `;
            tab.dataset.demoId = demo.id;
            demoTabs.appendChild(tab);
        });
    }

    getStatusLabel(status) {
        const labels = {
            'active': '🟢',
            'maintenance': '🟡',
            'offline': '🔴'
        };
        return labels[status] || '⚪';
    }

    enhanceDemoContainer() {
        const demoFrameWrapper = document.querySelector('.demo-frame-wrapper');
        
        // Add enhanced loading indicator
        const enhancedLoading = document.createElement('div');
        enhancedLoading.className = 'demo-enhanced-loading';
        enhancedLoading.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner-enhanced"></div>
                <h3 class="loading-title">Cargando aplicación...</h3>
                <p class="loading-message">Conectando con el servidor remoto</p>
                <div class="loading-progress">
                    <div class="progress-bar"></div>
                </div>
                <button class="loading-cancel" style="display: none;">Cancelar</button>
            </div>
        `;

        // Add error fallback
        const errorFallback = document.createElement('div');
        errorFallback.className = 'demo-error-fallback';
        errorFallback.style.display = 'none';
        errorFallback.innerHTML = `
            <div class="error-content">
                <div class="error-icon">⚠️</div>
                <h3 class="error-title">No se pudo cargar la aplicación</h3>
                <p class="error-message">La aplicación remota no está disponible en este momento.</p>
                <div class="error-actions">
                    <button class="btn-retry">Reintentar</button>
                    <button class="btn-fallback">Ver versión alternativa</button>
                    <button class="btn-github">Ver código fuente</button>
                </div>
            </div>
        `;

        // Add fullscreen controls
        const fullscreenControls = document.createElement('div');
        fullscreenControls.className = 'demo-controls';
        fullscreenControls.innerHTML = `
            <button class="control-btn fullscreen-btn" title="Pantalla completa">⛶</button>
            <button class="control-btn refresh-btn" title="Recargar">↻</button>
            <button class="control-btn external-btn" title="Abrir en nueva pestaña">↗</button>
        `;

        demoFrameWrapper.appendChild(enhancedLoading);
        demoFrameWrapper.appendChild(errorFallback);
        demoFrameWrapper.appendChild(fullscreenControls);
    }

    setupEventListeners() {
        // Demo tab clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.demo-tab')) {
                const tab = e.target.closest('.demo-tab');
                const demoId = parseInt(tab.dataset.demoId);
                this.loadDemo(demoId);
            }
        });

        // Category filter clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-btn')) {
                const category = e.target.dataset.category;
                
                // Update active category
                document.querySelectorAll('.category-btn').forEach(btn => 
                    btn.classList.remove('active')
                );
                e.target.classList.add('active');
                
                // Filter demos
                this.renderDemoTabs(category);
            }
        });

        // Control buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('fullscreen-btn')) {
                this.toggleFullscreen();
            } else if (e.target.classList.contains('refresh-btn')) {
                this.refreshCurrentDemo();
            } else if (e.target.classList.contains('external-btn')) {
                this.openInNewTab();
            } else if (e.target.classList.contains('btn-retry')) {
                this.retryCurrentDemo();
            } else if (e.target.classList.contains('btn-fallback')) {
                this.loadFallbackDemo();
            } else if (e.target.classList.contains('btn-github')) {
                this.openGitHub();
            }
        });
    }

    async loadDemo(demoId) {
        const demo = this.demos.find(d => d.id === demoId);
        if (!demo) return;

        this.currentDemo = demo;
        this.currentAttempt = 0;

        // Update active tab
        document.querySelectorAll('.demo-tab').forEach(tab => {
            tab.classList.remove('active');
            if (parseInt(tab.dataset.demoId) === demoId) {
                tab.classList.add('active');
            }
        });

        // Update demo info
        this.updateDemoInfo(demo);

        // Show loading
        this.showLoading();

        // Hide error if visible
        document.querySelector('.demo-error-fallback').style.display = 'none';

        try {
            await this.loadDemoFrame(demo.url);
        } catch (error) {
            console.error('Error loading demo:', error);
            this.handleDemoError();
        }
    }

    async loadDemoFrame(url) {
        return new Promise((resolve, reject) => {
            const iframe = document.getElementById('demo-frame');
            const loading = document.querySelector('.demo-enhanced-loading');
            const progressBar = loading.querySelector('.progress-bar');
            
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress > 90) progress = 90;
                progressBar.style.width = `${progress}%`;
            }, 200);

            const timeout = setTimeout(() => {
                clearInterval(progressInterval);
                iframe.onload = null;
                iframe.onerror = null;
                reject(new Error('Timeout loading demo'));
            }, this.loadTimeout);

            iframe.onload = () => {
                clearTimeout(timeout);
                clearInterval(progressInterval);
                progressBar.style.width = '100%';
                
                setTimeout(() => {
                    this.hideLoading();
                    this.showDemo();
                    resolve();
                }, 500);
            };

            iframe.onerror = () => {
                clearTimeout(timeout);
                clearInterval(progressInterval);
                reject(new Error('Error loading iframe'));
            };

            // Check if URL is accessible
            this.checkUrlAccessibility(url).then(accessible => {
                if (accessible) {
                    iframe.src = url;
                } else {
                    throw new Error('URL not accessible');
                }
            }).catch(reject);
        });
    }

    async checkUrlAccessibility(url) {
        try {
            const response = await fetch(url, { 
                method: 'HEAD', 
                mode: 'no-cors',
                timeout: 5000 
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    updateDemoInfo(demo) {
        const demoTitle = document.querySelector('.demo-title');
        const demoDescription = document.querySelector('.demo-description');
        const demoTechStack = document.querySelector('.demo-tech-stack');
        const demoLinks = document.querySelector('.demo-links');

        demoTitle.textContent = demo.title;
        demoDescription.textContent = demo.description;
        
        demoTechStack.innerHTML = `
            <h4>Tecnologías utilizadas:</h4>
            <div class="tech-stack-grid">
                ${demo.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        `;

        demoLinks.innerHTML = `
            <a href="${demo.url}" class="demo-link primary" target="_blank">
                <span>↗</span> Abrir en Nueva Pestaña
            </a>
            <a href="${demo.github}" class="demo-link secondary" target="_blank">
                <span>📁</span> Ver Código Fuente
            </a>
        `;
    }

    showLoading() {
        const loading = document.querySelector('.demo-enhanced-loading');
        const iframe = document.getElementById('demo-frame');
        
        loading.style.display = 'flex';
        iframe.style.opacity = '0';
        
        // Animate loading message
        const messages = [
            'Conectando con el servidor remoto...',
            'Cargando recursos de la aplicación...',
            'Inicializando interfaz de usuario...',
            'Preparando demo interactiva...'
        ];
        
        let messageIndex = 0;
        const messageElement = loading.querySelector('.loading-message');
        
        const messageInterval = setInterval(() => {
            messageElement.textContent = messages[messageIndex];
            messageIndex = (messageIndex + 1) % messages.length;
        }, 2000);
        
        // Store interval to clear later
        loading.dataset.messageInterval = messageInterval;
    }

    hideLoading() {
        const loading = document.querySelector('.demo-enhanced-loading');
        const messageInterval = loading.dataset.messageInterval;
        
        if (messageInterval) {
            clearInterval(parseInt(messageInterval));
        }
        
        loading.style.display = 'none';
    }

    showDemo() {
        const iframe = document.getElementById('demo-frame');
        iframe.style.opacity = '1';
    }

    handleDemoError() {
        this.hideLoading();
        
        const errorFallback = document.querySelector('.demo-error-fallback');
        const iframe = document.getElementById('demo-frame');
        
        errorFallback.style.display = 'flex';
        iframe.style.opacity = '0';
        
        // Update error message based on demo status
        const errorMessage = errorFallback.querySelector('.error-message');
        if (this.currentDemo.status === 'maintenance') {
            errorMessage.textContent = 'Esta aplicación está en mantenimiento. Intenta más tarde o prueba la versión alternativa.';
        } else {
            errorMessage.textContent = 'La aplicación remota no está disponible en este momento. Puedes ver el código fuente o probar la versión alternativa.';
        }
    }

    async retryCurrentDemo() {
        if (this.currentAttempt < this.retryAttempts) {
            this.currentAttempt++;
            await this.loadDemo(this.currentDemo.id);
        } else {
            this.loadFallbackDemo();
        }
    }

    loadFallbackDemo() {
        if (this.currentDemo && this.currentDemo.fallbackUrl) {
            const iframe = document.getElementById('demo-frame');
            iframe.src = this.currentDemo.fallbackUrl;
            
            document.querySelector('.demo-error-fallback').style.display = 'none';
            this.showLoading();
            
            setTimeout(() => {
                this.hideLoading();
                this.showDemo();
            }, 2000);
        }
    }

    refreshCurrentDemo() {
        if (this.currentDemo) {
            this.loadDemo(this.currentDemo.id);
        }
    }

    toggleFullscreen() {
        const demoContainer = document.querySelector('.demo-container');
        
        if (!document.fullscreenElement) {
            demoContainer.requestFullscreen().catch(err => {
                console.error('Error entering fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    openInNewTab() {
        if (this.currentDemo) {
            window.open(this.currentDemo.url, '_blank');
        }
    }

    openGitHub() {
        if (this.currentDemo) {
            window.open(this.currentDemo.github, '_blank');
        }
    }

    loadDefaultDemo() {
        if (this.demos.length > 0) {
            setTimeout(() => {
                this.loadDemo(this.demos[0].id);
            }, 1000);
        }
    }
}

// Initialize Demo Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're on a page with demo elements
    if (document.querySelector('.demo-tabs')) {
        window.demoManager = new DemoManager();
    }
});

