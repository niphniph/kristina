/**
 * Kristina Tevzadze - Executive Portfolio Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation & Active Section Highlighting
    const navbar = document.getElementById('topNav');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id], footer[id]');

    window.addEventListener('scroll', () => {
        // Add navbar background opacity on scroll
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active nav link based on scroll position
        let currentSection = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // 2. Mobile Drawer Navigation Toggle
    const menuToggle = document.getElementById('menuToggle');
    const drawerClose = document.getElementById('drawerClose');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function openDrawer() {
        mobileDrawer.classList.add('active');
        drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('active');
        drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle) menuToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // 3. Work Experience Timeline Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            timelineItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // 4. Role Highlights Expand / Collapse
    const expandBtns = document.querySelectorAll('.timeline-expand-btn');

    expandBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.timeline-card');
            const details = card.querySelector('.timeline-details');
            const expandText = btn.querySelector('.expand-text');

            const isOpen = details.classList.contains('open');

            if (isOpen) {
                details.classList.remove('open');
                btn.classList.remove('active');
                if (expandText) expandText.textContent = 'View Role Highlights';
            } else {
                details.classList.add('open');
                btn.classList.add('active');
                if (expandText) expandText.textContent = 'Hide Role Highlights';
            }
        });
    });

    // 5. Stat Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateStats() {
        const statsSection = document.querySelector('.stats-banner');
        if (!statsSection) return;

        const sectionTop = statsSection.offsetTop;
        const windowHeight = window.innerHeight;

        if (!animated && window.scrollY + windowHeight > sectionTop + 50) {
            animated = true;

            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'), 10);
                const suffix = stat.getAttribute('data-suffix') || '';
                let current = 0;
                const increment = Math.ceil(target / 40);
                const duration = 1200;
                const stepTime = duration / (target / increment);

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = `${current}${suffix}`;
                }, stepTime);
            });
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats(); // Run once on load if visible

    // 6. Contact Modal & Toast Handling
    const openModalBtns = document.querySelectorAll('.open-contact-modal');
    const contactModal = document.getElementById('contactModal');
    const modalClose = document.getElementById('modalClose');
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    function openModal() {
        if (contactModal) contactModal.classList.add('active');
    }

    function closeModal() {
        if (contactModal) contactModal.classList.remove('active');
    }

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) closeModal();
        });
    }

    function showToast(message) {
        if (!toast) return;
        const toastMsg = toast.querySelector('.toast-message');
        if (toastMsg) toastMsg.textContent = message;

        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            closeModal();
            contactForm.reset();
            showToast('Thank you! Your message has been sent successfully.');
        });
    }
});
