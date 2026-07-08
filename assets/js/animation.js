// assets/js/animation.js

document.addEventListener('DOMContentLoaded', () => {
    // هذه هي الدالة التي طلبتها
    function revealOnScroll() {
        var reveals = document.querySelectorAll('.reveal');

        for (var i = 0; i < reveals.length; i++) {
            var windowheight = window.innerHeight;
            var revealtop = reveals[i].getBoundingClientRect().top;
            var revealpoint = 150;

            if (revealtop < windowheight - revealpoint) {
                reveals[i].classList.add('active');
            } else {
                reveals[i].classList.remove('active');
            }
        }
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // استدعاء الدالة عند تحميل الصفحة لإظهار العناصر المرئية بالفعل

    // --- منطق السلايدر التلقائي لمعرض الصور على الموبايل ---
    const gallery = document.querySelector('.gallery-grid');
    // نتأكد أننا على شاشة موبايل قبل تشغيل الكود
    if (gallery && window.innerWidth <= 768) {
        let scrollInterval;

        const startAutoScroll = () => {
            scrollInterval = setInterval(() => {
                // إذا كان المستخدم في نهاية السلايدر، ارجع للبداية
                // نضيف 10 بكسل كهامش أمان للتأكد من الوصول للنهاية
                if (gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 10) {
                    gallery.scrollTo({ left: 0, behavior: 'auto' }); // تغيير لجعل العودة فورية
                } else {
                    // تحرك بمقدار عرض صورة واحدة (90% من عرض الشاشة)
                    gallery.scrollBy({ left: gallery.clientWidth * 0.9, behavior: 'smooth' });
                }
            }, 3000); // تغيير الصورة كل 3 ثواني
        };

        const stopAutoScroll = () => {
            clearInterval(scrollInterval);
        };

        gallery.addEventListener('touchstart', stopAutoScroll); // إيقاف التمرير عند بدء اللمس
        gallery.addEventListener('touchend', startAutoScroll);   // استئناف التمرير عند انتهاء اللمس
        startAutoScroll(); // بدء التمرير التلقائي عند تحميل الصفحة
    }
});