// main.js - ملف جافاسكريبت الرئيسي للمشروع

document.addEventListener('DOMContentLoaded', () => {
    console.log('الموقع جاهز!');

    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    function closeMenu() {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }

    hamburger.addEventListener('click', () => {
        // تفعيل/إلغاء تفعيل القائمة
        navLinks.classList.toggle('active');
        // تفعيل/إلغاء تفعيل شكل أيقونة الإغلاق (X)
        hamburger.classList.toggle('active');
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
