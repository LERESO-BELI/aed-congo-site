// Année de copyright dynamique
document.querySelectorAll('.copyright-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
});

// Hamburger menu mobile
(function () {
    var btn = document.getElementById('hamburger');
    var nav = document.getElementById('navMain');
    if (!btn || !nav) return;
    btn.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        btn.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', String(open));
    });
})();

// Gestion des Cookies
function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    var banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'none';
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
    }
}

function rejectCookies() {
    localStorage.setItem('cookiesAccepted', 'false');
    var banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'none';
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'analytics_storage': 'denied'
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var consent = localStorage.getItem('cookiesAccepted');
    var banner = document.getElementById('cookieBanner');
    if (banner) {
        if (!consent) {
            banner.style.display = 'block';
        } else if (consent === 'true') {
            if (typeof gtag === 'function') {
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
            }
        }
    }
});
