(() => {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-page-link]').forEach((link) => {
        if (link.getAttribute('href') === current) {
            link.classList.add('is-current');
        }
    });
})();

(() => {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
        items.forEach((item) => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.16 });

    items.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index * 0.04, 0.2)}s`;
        observer.observe(item);
    });
})();
