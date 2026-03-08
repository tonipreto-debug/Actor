document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('.content-section');

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor scrolling

            // Remove active class from all links and sections
            navLinks.forEach(nav => nav.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Find target section and activate it
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // If on mobile, close sidebar after clicking
            const sidebar = document.getElementById('sidebar');
            if (window.innerWidth <= 900 && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    });

    // Make logo links trigger the INICIO navigation
    const logoLinks = document.querySelectorAll('.logo-link');
    logoLinks.forEach(logo => {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            const inicioLink = document.querySelector('.main-nav a[href="#inicio"]');
            if (inicioLink) {
                inicioLink.click();
            }
        });
    });

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Bio Language Toggle Logic
    const langToggle = document.getElementById('bio-lang-toggle');
    const langOptions = document.querySelectorAll('.lang-option');
    const bioEs = document.getElementById('bio-es');
    const bioEn = document.getElementById('bio-en');

    if (langToggle && bioEs && bioEn) {
        langToggle.addEventListener('click', () => {
            const isEnglish = langToggle.classList.contains('en-active');

            if (isEnglish) {
                // Switch to Spanish
                langToggle.classList.remove('en-active');
                bioEn.classList.remove('active');
                bioEs.classList.add('active');

                langOptions[0].classList.add('active');
                langOptions[1].classList.remove('active');
            } else {
                // Switch to English
                langToggle.classList.add('en-active');
                bioEs.classList.remove('active');
                bioEn.classList.add('active');

                langOptions[0].classList.remove('active');
                langOptions[1].classList.add('active');
            }
        });

        // Allow clicking the text labels "ES" / "EN" to toggle
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

    // Gallery Scroll Animation (Intersection Observer)
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of the image is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class to trigger CSS animation
                    entry.target.classList.add('visible');
                    // Stop observing once it has animated in
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        galleryItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Lightbox Logic
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
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
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
            trigger.addEventListener('click', () => {
                openLightbox(index);
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        nextBtn.addEventListener('click', showNext);
        prevBtn.addEventListener('click', showPrev);

        // Close when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        });
    }
});
