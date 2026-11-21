/**
 * Samarth Patel Portfolio - Interactive Script
 * Features: Dark/Light Mode Toggle, Mobile Menu, Scroll Effects, Contact Form, Toast Alerts, Resume Modal
 * Enhanced: Liquid Glass Effects, Scroll Animations, Mouse Parallax, Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===========================================================================
    // 0. UTILITY FUNCTIONS
    // ===========================================================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Current Year Update
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // ===========================================================================
    // 1. DARK / LIGHT THEME TOGGLE
    // ===========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('samarth_portfolio_theme') ||
                       (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('samarth_portfolio_theme', theme);
        themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';

        // Add a nice transition effect
        themeToggleBtn.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            themeToggleBtn.style.transform = '';
        }, 200);
    }

    // ===========================================================================
    // 2. MOBILE MENU NAVIGATION TOGGLE
    // ===========================================================================
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggleBtn && navMenu) {
        mobileToggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggleBtn.querySelector('i');
            icon.className = navMenu.classList.contains('active') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggleBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }

    // ===========================================================================
    // 3. NAVBAR SCROLL EFFECT
    // ===========================================================================
    const navbar = document.querySelector('.navbar');
    let lastScrollY = 0;
    let ticking = false;

    function updateNavbar() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll direction
        if (scrollY > lastScrollY && scrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });

    // ===========================================================================
    // 4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
    // ===========================================================================
    if (!prefersReducedMotion) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // For text-reveal elements, animate spans
                    if (entry.target.classList.contains('text-reveal')) {
                        animateTextReveal(entry.target);
                    }
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all reveal elements
        document.querySelectorAll('.reveal, .reveal-stagger, .text-reveal').forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // If reduced motion, show everything immediately
        document.querySelectorAll('.reveal, .reveal-stagger, .text-reveal').forEach(el => {
            el.classList.add('active');
        });
    }

    function animateTextReveal(element) {
        const text = element.textContent;
        element.innerHTML = '';

        // Split into words for word-by-word animation
        const words = text.split(' ');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + (index < words.length - 1 ? ' ' : '');
            span.style.transitionDelay = `${index * 0.05}s`;
            element.appendChild(span);
        });

        // Trigger animation
        requestAnimationFrame(() => {
            element.classList.add('active');
        });
    }

    // ===========================================================================
    // 5. MOUSE PARALLAX & MAGNETIC EFFECTS ON CARDS
    // ===========================================================================
    if (!prefersReducedMotion) {
        const liquidCards = document.querySelectorAll('.card-liquid, .project-card, .cert-card, .skill-category, .contact-info, .contact-form-container, .about-card');

        liquidCards.forEach(card => {
            card.addEventListener('mousemove', handleCardMouseMove);
            card.addEventListener('mouseleave', handleCardMouseLeave);
            card.addEventListener('mouseenter', handleCardMouseEnter);
        });

        function handleCardMouseMove(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 35;  // More subtle
            const rotateY = (centerX - x) / 35;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-3px)
                scale(1.005)
            `;
        }

        function handleCardMouseLeave() {
            card.style.transform = '';
            card.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';

            const particles = card.querySelectorAll('.glass-particle');
            particles.forEach(particle => {
                particle.style.transform = '';
                particle.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            });

            const badges = card.querySelectorAll('.floating-badge');
            badges.forEach(badge => {
                badge.style.transform = '';
                badge.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            });

            setTimeout(() => {
                card.style.transition = '';
                particles.forEach(p => p.style.transition = '');
                badges.forEach(b => b.style.transition = '');
            }, 600);
        }

        function handleCardMouseEnter() {
            card.style.transition = 'transform 0.2s ease';
        }
    }

    // ===========================================================================
    // 6. MAGNETIC BUTTONS (Subtle)
    // ===========================================================================
    if (!prefersReducedMotion) {
        const magneticButtons = document.querySelectorAll('.btn-liquid, .contact-pill, .social-btn, .theme-toggle, .copy-btn');

        magneticButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px) scale(1.02)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
                btn.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                setTimeout(() => btn.style.transition = '', 400);
            });

            btn.addEventListener('mousedown', () => {
                btn.style.transform = 'scale(0.97)';
                btn.style.transition = 'transform 0.08s ease';
            });

            btn.addEventListener('mouseup', () => {
                btn.style.transform = '';
                btn.style.transition = 'transform 0.15s ease';
            });
        });
    }

    // ===========================================================================
    // 7. ACTIVE NAV LINK ON SCROLL
    // ===========================================================================
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveSection() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection, { passive: true });

    // ===========================================================================
    // 8. RESUME MODAL PREVIEW
    // ===========================================================================
    const resumeModal = document.getElementById('resume-modal');
    const openResumeBtn = document.getElementById('open-resume-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const closeModalBtn2 = document.getElementById('close-modal-btn-2');

    if (openResumeBtn && resumeModal) {
        openResumeBtn.addEventListener('click', () => {
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Animate modal entrance
            const modalCard = resumeModal.querySelector('.modal-card');
            if (modalCard) {
                modalCard.style.transform = 'scale(0.9) translateY(20px)';
                modalCard.style.opacity = '0';
                requestAnimationFrame(() => {
                    modalCard.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease';
                    modalCard.style.transform = 'scale(1) translateY(0)';
                    modalCard.style.opacity = '1';
                });
            }
        });
    }

    function closeResumeModal() {
        if (resumeModal) {
            const modalCard = resumeModal.querySelector('.modal-card');
            if (modalCard) {
                modalCard.style.transition = 'transform 0.3s ease, opacity 0.2s ease';
                modalCard.style.transform = 'scale(0.9) translateY(20px)';
                modalCard.style.opacity = '0';
            }
            setTimeout(() => {
                resumeModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                if (modalCard) modalCard.style.transition = '';
            }, 300);
        }
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeResumeModal);
    if (closeModalBtn2) closeModalBtn2.addEventListener('click', closeResumeModal);

    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) closeResumeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
            closeResumeModal();
        }
    });

    // ===========================================================================
    // 9. HERO PARALLAX EFFECT (Subtle)
    // ===========================================================================
    if (!prefersReducedMotion) {
        const hero = document.querySelector('.hero');
        const avatarFrame = document.querySelector('.avatar-frame');
        const floatingBadges = document.querySelectorAll('.floating-badge');

        window.addEventListener('mousemove', (e) => {
            if (!hero) return;

            const rect = hero.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) / 60;  // More subtle
            const deltaY = (e.clientY - centerY) / 60;

            if (avatarFrame) {
                avatarFrame.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            }

            floatingBadges.forEach((badge, i) => {
                const speed = (i + 1) * 0.25;  // More subtle
                badge.style.transform = `translate(${deltaX * speed}px, ${deltaY * speed}px)`;
            });
        });

        window.addEventListener('mouseleave', () => {
            if (avatarFrame) {
                avatarFrame.style.transform = '';
                avatarFrame.style.transition = 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                setTimeout(() => avatarFrame.style.transition = '', 1000);
            }
            floatingBadges.forEach(badge => {
                badge.style.transform = '';
                badge.style.transition = 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                setTimeout(() => badge.style.transition = '', 1000);
            });
        });
    }

    // ===========================================================================
    // 10. BUTTON RIPPLE EFFECT (Subtle)
    // ===========================================================================
    document.querySelectorAll('.btn-liquid, .btn, .contact-pill, .social-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(99, 102, 241, 0.15);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-anim 0.4s ease-out;
                pointer-events: none;
                z-index: 0;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 400);
        });
    });

    // Add ripple keyframes if not exists
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple-anim {
                to { transform: scale(2); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // ===========================================================================
    // 11. SMOOTH SCROLL FOR ANCHOR LINKS
    // ===========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navbarHeight = navbar?.offsetHeight || 75;
                const targetPosition = target.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================================================================
    // 12. COPY TO CLIPBOARD (Enhanced with toast)
    // ===========================================================================
    window.copyToClipboard = function(text, message = 'Copied to clipboard!') {
        navigator.clipboard.writeText(text).then(() => {
            showToast(message);
        }).catch(err => {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showToast(message);
            } catch (e) {
                showToast('Failed to copy');
            }
            document.body.removeChild(textArea);
        });
    };

    // ===========================================================================
    // 13. TOAST NOTIFICATION HELPER
    // ===========================================================================
    function showToast(message) {
        const toast = document.getElementById('toast');
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ===========================================================================
    // 14. CONTACT FORM HANDLER
    // ===========================================================================
    window.handleFormSubmit = function(event) {
        event.preventDefault();

        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const subject = document.getElementById('form-subject').value.trim();
        const message = document.getElementById('form-message').value.trim();

        if (!name || !email || !message) {
            showToast('Please fill out all required fields.');
            return;
        }

        // Simulate sending message
        const submitBtn = event.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showToast(`Thank you, ${name}! Your message has been sent successfully.`);
            document.getElementById('contact-form').reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    };

    // ===========================================================================
    // 15. SKILL BAR ANIMATION ON SCROLL
    // ===========================================================================
    if (!prefersReducedMotion) {
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target;
                    const width = progress.style.width;
                    progress.style.width = '0%';
                    requestAnimationFrame(() => {
                        progress.style.transition = 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        progress.style.width = width;
                    });
                    skillObserver.unobserve(progress);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => skillObserver.observe(bar));
    }

    // ===========================================================================
    // 16. CODE RAIN / MATRIX BACKGROUND GENERATOR
    // ===========================================================================
    if (!prefersReducedMotion) {
        initCodeRain();
    }

    function initCodeRain() {
        const codeRainContainer = document.getElementById('code-rain');
        if (!codeRainContainer) return;

        // Programming characters / symbols
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]()<>;:=+*/%&|^~!@#$';
        const codeSnippets = [
            'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
            'class', 'import', 'export', 'async', 'await', 'try', 'catch', 'finally',
            '=>', '==', '===', '!=', '!==', '&&', '||', '??', '?.', '++', '--',
            'console.log', 'document.querySelector', 'addEventListener', 'fetch',
            'Promise', 'async', 'await', 'JSON.parse', 'localStorage', 'map', 'filter',
            'reduce', 'find', 'includes', 'push', 'pop', 'shift', 'unshift',
            'struct', 'class', 'public', 'private', 'protected', 'static', 'void',
            'int', 'float', 'double', 'char', 'bool', 'string', 'vector', 'map',
            'SELECT', 'FROM', 'WHERE', 'JOIN', 'INSERT', 'UPDATE', 'DELETE', 'CREATE',
            'DROP', 'TABLE', 'INDEX', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES'
        ];

        const columns = Math.floor(window.innerWidth / 80);
        const maxColumns = Math.min(columns, 18); // Limit for performance

        for (let i = 0; i < maxColumns; i++) {
            createCodeColumn(codeRainContainer, chars, codeSnippets, i);
        }

        // Recreate on resize (debounced)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                codeRainContainer.innerHTML = '';
                const newColumns = Math.floor(window.innerWidth / 80);
                const newMaxColumns = Math.min(newColumns, 18);
                for (let i = 0; i < newMaxColumns; i++) {
                    createCodeColumn(codeRainContainer, chars, codeSnippets, i);
                }
            }, 300);
        });
    }

    function createCodeColumn(container, chars, snippets, index) {
        const column = document.createElement('div');
        column.className = 'code-rain-column';

        // Random position
        const leftPos = Math.random() * 100;
        column.style.left = `${leftPos}%`;

        // Random animation duration (15-35 seconds)
        const duration = 15 + Math.random() * 20;
        column.style.animationDuration = `${duration}s`;

        // Random delay
        column.style.animationDelay = `${Math.random() * 10}s`;

        // Generate content - mix of snippets and random chars
        let content = '';
        const lines = 15 + Math.floor(Math.random() * 10);
        for (let i = 0; i < lines; i++) {
            if (Math.random() < 0.3) {
                // Use code snippet
                content += snippets[Math.floor(Math.random() * snippets.length)];
            } else {
                // Random chars
                const len = 3 + Math.floor(Math.random() * 8);
                for (let j = 0; j < len; j++) {
                    content += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            content += '\n';
        }
        column.textContent = content;

        // Random font size variation
        column.style.fontSize = `${11 + Math.random() * 4}px`;

        // Random opacity
        column.style.opacity = 0.15 + Math.random() * 0.15;

        container.appendChild(column);
    }

    // ===========================================================================
    // 17. INTERSECTION OBSERVER FOR TIMELINE
    // ===========================================================================
    if (!prefersReducedMotion) {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 150);
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        timelineItems.forEach(item => timelineObserver.observe(item));
    }

    console.log('🚀 Samarth Patel Portfolio - Enhanced with Liquid Glass & Animations loaded!');
});