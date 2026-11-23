(function () {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    document.documentElement.classList.add('js');

    var reveals = document.querySelectorAll('.reveal');
    function showAll() {
        reveals.forEach(function (el) { el.classList.add('visible'); });
    }
    try {
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
            showAll();
        }
    } catch {
        showAll();
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

    var filterButtons = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('.projects .card');
    var activeLanguage = null;

    var lb = document.getElementById('lightbox');
    var lbImg = document.getElementById('lightboxImg');
    var lbCaption = document.getElementById('lightboxCaption');

    function openLightbox(el) {
        if (!lb || !lbImg) return;
        lbImg.src = el.currentSrc || el.src || el.getAttribute('data-src');
        lbImg.alt = el.alt || el.getAttribute('data-alt') || '';
        if (lbCaption) lbCaption.textContent = lbImg.alt || '';
        lb.classList.add('show');
    }

    function closeLb() {
        if (lb) lb.classList.remove('show');
    }

    document.querySelectorAll('.card-front').forEach(function (front) {
        var img = front.querySelector('img');
        if (!img || img.alt === '') return;

        var label = document.createElement('span');
        label.className = 'card-label';
        label.textContent = img.alt;
        front.appendChild(label);

        var zoom = document.createElement('button');
        zoom.className = 'card-zoom';
        zoom.type = 'button';
        zoom.setAttribute('aria-label', 'Agrandir l\'image de ' + img.alt);
        zoom.setAttribute('data-src', img.currentSrc || img.src);
        zoom.setAttribute('data-alt', img.alt || '');
        zoom.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
        front.appendChild(zoom);
    });

    document.addEventListener('click', function (e) {
        var target = e.target;

        var filterButton = target.closest('.filter-btn');
        if (filterButton) {
            var language = filterButton.dataset.language;
            activeLanguage = activeLanguage === language ? null : language;
            filterButtons.forEach(function (b) {
                b.classList.toggle('active', b === filterButton && activeLanguage !== null);
            });
            cards.forEach(function (card) {
                card.classList.toggle('hidden', activeLanguage !== null && !card.classList.contains(activeLanguage));
            });
            return;
        }

        if (target.closest('.back-to-top')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        var zoom = target.closest('.card-zoom');
        if (zoom) {
            openLightbox(zoom);
            return;
        }

        var preview = target.closest('.js-lightbox');
        if (preview) {
            openLightbox(preview);
            return;
        }

        if (target.closest('.lightbox-close') || target === lb) {
            closeLb();
            return;
        }

        var card = target.closest('.card');
        if (card && !target.closest('a')) card.classList.toggle('flipped');
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeLb();
            return;
        }
        if (e.key !== 'Enter' && e.key !== ' ') return;
        if (e.target.closest('button, a')) return;
        var card = e.target.closest('.card');
        if (card) {
            e.preventDefault();
            card.classList.toggle('flipped');
        }
    });

    cards.forEach(function (card) {
        card.setAttribute('tabindex', '0');
    });
})();
