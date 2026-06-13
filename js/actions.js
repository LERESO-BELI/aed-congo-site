document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Update Buttons
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        
        // Update Panels
        document.querySelectorAll('.main-content > .tab-content').forEach(c => {
            c.classList.add('hidden');
            c.classList.remove('active');
        });
        const target = document.getElementById('tab-' + tabId);
        if (target) {
            target.classList.remove('hidden');
            target.classList.add('active');
        }
    });
});
