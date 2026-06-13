function showConvention(slug) {
    console.log("Études - Affichage convention:", slug);
    document.querySelectorAll('.convention-section').forEach(el => {
        el.classList.remove('active');
        el.classList.add('hidden');
    });
    document.querySelectorAll('.conv-btn-side').forEach(el => el.classList.remove('active'));
    
    const target = document.getElementById('conv-' + slug);
    const btn = document.querySelector(`.conv-btn-side[data-conv="${slug}"]`);
    
    if (target) {
        console.log("Études - Section cible trouvée");
        target.classList.remove('hidden');
        target.classList.add('active');
    } else {
        console.error("Études - Section cible NON trouvée:", 'conv-' + slug);
    }
    if (btn) btn.classList.add('active');
    
    // Update URL without reload
    const url = new URL(window.location);
    url.searchParams.set('convention', slug);
    window.history.pushState({}, '', url);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Études - Script chargé");
    // Add click listeners to buttons
    const btns = document.querySelectorAll('.conv-btn-side');
    console.log("Études - Nombre de boutons trouvés:", btns.length);
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const slug = btn.getAttribute('data-conv');
            showConvention(slug);
        });
    });

    // Handle initial state from URL
    const params = new URLSearchParams(window.location.search);
    const conv = params.get('convention');
    if (conv && document.getElementById('conv-' + conv)) {
        console.log("Études - Convention initiale (URL):", conv);
        showConvention(conv);
    }
});
