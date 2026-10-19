document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('.content-section');
    const mainContent = document.querySelector('.main-content');

    // ─── SMOOTH SCROLL NAVIGATION ────────────────────────────────────────────
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                mainContent.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
            // Close mobile sidebar after clicking
            const sidebar = document.getElementById('sidebar');
            if (window.innerWidth <= 900 && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    });

    // ─── SCROLL SPY: update active nav link as user scrolls ──────────────────
    mainContent.addEventListener('scroll', () => {
        const scrollTop = mainContent.scrollTop;
        const viewportHeight = mainContent.clientHeight;
        let currentId = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollTop >= sectionTop - viewportHeight / 3) {
                currentId = section.id;
            }
        });

        if (currentId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // ─── LOGO LINKS → scroll to top ──────────────────────────────────────────
    const logoLinks = document.querySelectorAll('.logo-link');
    logoLinks.forEach(logo => {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // ─── MOBILE MENU TOGGLE ──────────────────────────────────────────────────
    let menuInteracted = false;
    const mobileBtn = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            menuInteracted = true;
            sidebar.classList.toggle('open');
        });
    }

    // Auto-open mobile menu after 5 seconds on initial load
    setTimeout(() => {
        if (!menuInteracted && window.innerWidth <= 900 && sidebar && !sidebar.classList.contains('open')) {
            sidebar.classList.add('open');
        }
    }, 5000);

    // ─── BIO LANGUAGE TOGGLE ─────────────────────────────────────────────────
    const langToggle = document.getElementById('bio-lang-toggle');
    const langOptions = document.querySelectorAll('.lang-option');
    const bioEs = document.getElementById('bio-es');
    const bioEn = document.getElementById('bio-en');

    if (langToggle && bioEs && bioEn) {
        langToggle.addEventListener('click', () => {
            const isEnglish = langToggle.classList.contains('en-active');
            if (isEnglish) {
                langToggle.classList.remove('en-active');
                bioEn.classList.remove('active');
                bioEs.classList.add('active');
                langOptions[0].classList.add('active');
                langOptions[1].classList.remove('active');
            } else {
                langToggle.classList.add('en-active');
                bioEs.classList.remove('active');
                bioEn.classList.add('active');
                langOptions[0].classList.remove('active');
                langOptions[1].classList.add('active');
            }
        });

        langOptions.forEach(option => {
            option.addEventListener('click', function () {
                const lang = this.getAttribute('data-lang');
                if (lang === 'en' && !langToggle.classList.contains('en-active')) {
                    langToggle.click();
                } else if (lang === 'es' && langToggle.classList.contains('en-active')) {
                    langToggle.click();
                }
            });
        });
    }

    // ─── GALLERY SCROLL ANIMATION (IntersectionObserver) ─────────────────────
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        const galleryObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            root: mainContent,
            rootMargin: '0px',
            threshold: 0.1
        });

        galleryItems.forEach(item => galleryObserver.observe(item));
    }

    // ─── LIGHTBOX ────────────────────────────────────────────────────────────
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    let currentImageIndex = 0;
    const imagesArray = Array.from(triggers).map(trigger => trigger.src);

    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImg.src = imagesArray[currentImageIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showNext() {
        currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
        lightboxImg.src = imagesArray[currentImageIndex];
    }

    function showPrev() {
        currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
        lightboxImg.src = imagesArray[currentImageIndex];
    }

    if (lightbox) {
        triggers.forEach((trigger, index) => {
            trigger.addEventListener('click', () => openLightbox(index));
        });

        closeBtn.addEventListener('click', closeLightbox);
        nextBtn.addEventListener('click', showNext);
        prevBtn.addEventListener('click', showPrev);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        });
    }
});
