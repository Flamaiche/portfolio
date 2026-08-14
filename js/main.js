(function () {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    document.documentElement.classList.add('js');

    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        reveals.forEach(function (el) { io.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add('visible'); });
    }

    var topBtn = document.createElement('button');
    topBtn.className = 'back-to-top';
    topBtn.setAttribute('aria-label', 'Retour en haut');
    topBtn.innerHTML = '&uarr;';
    document.body.appendChild(topBtn);
    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) topBtn.classList.add('show');
        else topBtn.classList.remove('show');
    }, { passive: true });
    topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    var filterButtons = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('.projects .card');
    var activeLanguage = null;
    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var language = button.dataset.language;
            if (activeLanguage === language) {
                cards.forEach(function (card) { card.style.display = ''; });
                activeLanguage = null;
                filterButtons.forEach(function (b) { b.classList.remove('active'); });
            } else {
                activeLanguage = language;
                cards.forEach(function (card) {
                    card.style.display = card.classList.contains(language) ? '' : 'none';
                });
                filterButtons.forEach(function (b) { b.classList.remove('active'); });
                button.classList.add('active');
            }
        });
    });

    document.querySelectorAll('.card-front').forEach(function (front) {
        var img = front.querySelector('img');
        if (!img || img.alt === '') return;
        var label = document.createElement('span');
        label.className = 'card-label';
        label.textContent = img.alt;
        front.appendChild(label);
    });

    var lb = document.getElementById('lightbox');
    var lbImg = document.getElementById('lightboxImg');
    var lbCaption = document.getElementById('lightboxCaption');
    var lbClose = document.querySelector('.lightbox-close');
    if (lb) {
        function closeLb() { lb.classList.remove('show'); }
        document.querySelectorAll('.js-lightbox').forEach(function (img) {
            img.addEventListener('click', function () {
                lbImg.src = img.currentSrc || img.src;
                lbImg.alt = img.alt || '';
                lbCaption.textContent = img.alt || '';
                lb.classList.add('show');
            });
        });
        if (lbClose) lbClose.addEventListener('click', closeLb);
        lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
    }
})();
