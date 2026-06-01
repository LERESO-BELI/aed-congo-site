function showConvention(slug) {
    document.querySelectorAll('.convention-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.convention-section').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.conv-btn').forEach(el => el.classList.remove('active'));
    
    const target = document.getElementById('conv-' + slug);
    const btn = document.querySelector(`[data-conv="${slug}"]`);
    
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
    }
    if (btn) btn.classList.add('active');
    
    // Update URL without reload
    const url = new URL(window.location);
    url.searchParams.set('convention', slug);
    window.history.pushState({}, '', url);
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const conv = params.get('convention');
    if (conv && document.getElementById('conv-' + conv)) {
        showConvention(conv);
    }
});
