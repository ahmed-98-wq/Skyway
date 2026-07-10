// main.js - ملف جافاسكريبت الرئيسي للمشروع

document.addEventListener('DOMContentLoaded', () => {
    console.log('الموقع جاهز!');

    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    if (!hamburger || !navLinks) {
        return;
    }

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
});
