document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
        reveals.forEach((element) => element.classList.add('active'));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        reveals.forEach((element) => observer.observe(element));
    }

    const gallery = document.querySelector('.gallery-grid');
    if (!gallery || reduceMotion) return;

    const slides = Array.from(gallery.querySelectorAll('img'));
    if (slides.length < 2) return;

    const lastClone = slides[slides.length - 1].cloneNode(true);
    const firstClone = slides[0].cloneNode(true);
    [lastClone, firstClone].forEach((clone) => {
        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('alt', '');
        clone.removeAttribute('id');
    });
    gallery.prepend(lastClone);
    gallery.append(firstClone);

    const originalFirst = slides[0];
    const originalLast = slides[slides.length - 1];
    let autoScroll;
    let settleTimer;
    let isResetting = false;

    const positionAtFirstSlide = () => {
        gallery.scrollLeft = originalFirst.offsetLeft;
    };

    const getStep = () => originalFirst.offsetLeft - lastClone.offsetLeft;

    const normalizeLoop = () => {
        if (isResetting) return;
        const tolerance = 3;
        if (gallery.scrollLeft <= lastClone.offsetLeft + tolerance) {
            isResetting = true;
            gallery.scrollLeft = originalLast.offsetLeft;
            isResetting = false;
        } else if (gallery.scrollLeft >= firstClone.offsetLeft - tolerance) {
            isResetting = true;
            gallery.scrollLeft = originalFirst.offsetLeft;
            isResetting = false;
        }
    };

    const stopAutoScroll = () => {
        window.clearInterval(autoScroll);
        autoScroll = undefined;
    };

    const startAutoScroll = () => {
        if (autoScroll) return;
        autoScroll = window.setInterval(() => {
            gallery.scrollBy({ left: getStep(), behavior: 'smooth' });
        }, 3200);
    };

    requestAnimationFrame(() => {
        positionAtFirstSlide();
        startAutoScroll();
    });

    gallery.addEventListener('scroll', () => {
        window.clearTimeout(settleTimer);
        settleTimer = window.setTimeout(normalizeLoop, 120);
    }, { passive: true });

    gallery.addEventListener('wheel', (event) => {
        if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
        event.preventDefault();
        gallery.scrollLeft += event.deltaY;
    }, { passive: false });

    gallery.addEventListener('pointerdown', stopAutoScroll);
    gallery.addEventListener('pointerup', startAutoScroll);
    gallery.addEventListener('pointercancel', startAutoScroll);
    gallery.addEventListener('mouseenter', stopAutoScroll);
    gallery.addEventListener('mouseleave', startAutoScroll);
    gallery.addEventListener('focusin', stopAutoScroll);
    gallery.addEventListener('focusout', startAutoScroll);

    window.addEventListener('resize', () => {
        window.clearTimeout(settleTimer);
        settleTimer = window.setTimeout(positionAtFirstSlide, 150);
    });
});