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
    let headerIsScrolled = false;
    let ticking = false;

    function applyScrollEffects() {
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        // نستخدم منطقتين مختلفتين للتفعيل والإلغاء (Hysteresis) بدل حد واحد،
        // حتى لا يتذبذب الهيدر عند توقف التمرير قرب نقطة الحد
        if (mainHeader) {
            if (!headerIsScrolled && scrollY > 60) {
                headerIsScrolled = true;
                mainHeader.classList.add('scrolled');
            } else if (headerIsScrolled && scrollY < 25) {
                headerIsScrolled = false;
                mainHeader.classList.remove('scrolled');
            }
        }

        if (scrollProgress) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
            scrollProgress.style.width = progress + '%';
        }

        if (backToTop) {
            backToTop.classList.toggle('show', scrollY > 400);
        }

        ticking = false;
    }

    function handleScrollEffects() {
        // نؤجل التنفيذ إلى الإطار التالي (requestAnimationFrame) لتفادي التكرار
        // المفرط لحدث scroll ومنع أي رجفة بصرية أثناء التمرير
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(applyScrollEffects);
        }
    }

    window.addEventListener('scroll', handleScrollEffects, { passive: true });
    applyScrollEffects();

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- شريط إشعار ملفات تعريف الارتباط ---
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieDecline = document.getElementById('cookie-decline');

    if (cookieBanner) {
        const consent = localStorage.getItem('skyway_cookie_consent');

        if (!consent) {
            // نظهر الشريط بعد لحظة بسيطة حتى لا يتعارض مع شاشة التحميل
            setTimeout(() => cookieBanner.classList.add('show'), 800);
        }

        function hideCookieBanner() {
            cookieBanner.classList.remove('show');
        }

        if (cookieAccept) {
            cookieAccept.addEventListener('click', () => {
                localStorage.setItem('skyway_cookie_consent', 'accepted');
                hideCookieBanner();
            });
        }

        if (cookieDecline) {
            cookieDecline.addEventListener('click', () => {
                localStorage.setItem('skyway_cookie_consent', 'declined');
                hideCookieBanner();
            });
        }
    }

    // --- أكورديون الأسئلة الشائعة (FAQ) ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!question || !answer) return;

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('faq-open');

            // إغلاق باقي الأسئلة المفتوحة (دون المساس بكلاس "active" الخاص بأنيميشن الظهور)
            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove('faq-open');
                    otherItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                }
            });

            if (isOpen) {
                item.classList.remove('faq-open');
                question.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = null;
            } else {
                item.classList.add('faq-open');
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});

