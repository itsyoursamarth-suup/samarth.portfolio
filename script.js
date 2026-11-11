/**
 * Samarth Patel Portfolio - Interactive Script
 * Features: Dark/Light Mode Toggle, Mobile Menu, Scroll Effects, Contact Form, Toast Alerts, Resume Modal
 */

document.addEventListener('DOMContentLoaded', () => {
    // Current Year Update
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // --------------------------------------------------------------------------
    // 1. Dark / Light Theme Toggle
    // --------------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // Check localStorage or system preference
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
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }

    // --------------------------------------------------------------------------
    // 2. Mobile Menu Navigation Toggle
    // --------------------------------------------------------------------------
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggleBtn && navMenu) {
        mobileToggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggleBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggleBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }

    // --------------------------------------------------------------------------
    // 3. Active Nav Link on Scroll
    // --------------------------------------------------------------------------
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

    window.addEventListener('scroll', highlightActiveSection);

    // --------------------------------------------------------------------------
    // 4. Resume Modal Preview
    // --------------------------------------------------------------------------
    const resumeModal = document.getElementById('resume-modal');
    const openResumeBtn = document.getElementById('open-resume-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const closeModalBtn2 = document.getElementById('close-modal-btn-2');

    if (openResumeBtn && resumeModal) {
        openResumeBtn.addEventListener('click', () => {
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }

    function closeResumeModal() {
        if (resumeModal) {
            resumeModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeResumeModal);
    if (closeModalBtn2) closeModalBtn2.addEventListener('click', closeResumeModal);

    // Close on click outside modal content
    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                closeResumeModal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
            closeResumeModal();
        }
    });
});

// --------------------------------------------------------------------------
// 5. Global Clipboard Copy Function
// --------------------------------------------------------------------------
function copyToClipboard(text, message = 'Copied to clipboard!') {
    navigator.clipboard.writeText(text).then(() => {
        showToast(message);
    }).catch(err => {
        // Fallback for legacy browsers
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
}

// --------------------------------------------------------------------------
// 6. Toast Notification Helper
// --------------------------------------------------------------------------
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// --------------------------------------------------------------------------
// 7. Contact Form Handler Simulation
// --------------------------------------------------------------------------
function handleFormSubmit(event) {
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
    showToast(`Thank you, ${name}! Your message has been sent successfully.`);

    // Reset form
    document.getElementById('contact-form').reset();
}
