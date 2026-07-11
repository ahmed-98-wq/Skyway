// main.js - ملف جافاسكريبت الرئيسي للمشروع

document.addEventListener('DOMContentLoaded', () => {
    console.log('الموقع جاهز!');

    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
        function setMenuState(isOpen) {
            navLinks.classList.toggle('active', isOpen);
            hamburger.classList.toggle('active', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
            hamburger.setAttribute('aria-label', isOpen ? 'إغلاق قائمة التنقل' : 'فتح قائمة التنقل');
        }

        function closeMenu() {
            setMenuState(false);
        }

        hamburger.addEventListener('click', () => {
            // تفعيل/إلغاء تفعيل القائمة
            setMenuState(!navLinks.classList.contains('active'));
        });

        // إغلاق القائمة عند النقر على أحد الروابط
        links.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', (event) => {
            // تحقق مما إذا كانت القائمة مفتوحة والنقر لم يكن على القائمة أو على أيقونة الهمبرغر
            if (navLinks.classList.contains('active') && !navLinks.contains(event.target) && !hamburger.contains(event.target)) {
                closeMenu();
            }
        });
    }

    // --- إخفاء شاشة التحميل (Preloader) بعد جاهزية الصفحة ---
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('loaded');
            setTimeout(() => preloader.remove(), 700);
        });
    }

    // --- تصغير شريط التنقل، شريط تقدم التمرير، وزر العودة للأعلى ---
    const mainHeader = document.querySelector('.main-header');
    const scrollProgress = document.querySelector('.scroll-progress');
    const backToTop = document.querySelector('.back-to-top');

    function handleScrollEffects() {
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        if (mainHeader) {
            mainHeader.classList.toggle('scrolled', scrollY > 30);
        }

        if (scrollProgress) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
            scrollProgress.style.width = progress + '%';
        }

        if (backToTop) {
            backToTop.classList.toggle('show', scrollY > 400);
        }
    }

    window.addEventListener('scroll', handleScrollEffects, { passive: true });
    handleScrollEffects();

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

