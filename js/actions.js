document.addEventListener('DOMContentLoaded', () => {
    console.log("Actions - Script chargé");
    const btns = document.querySelectorAll('.tab-btn');
    console.log("Actions - Nombre d'onglets trouvés:", btns.length);
    
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            console.log("Actions - Clic onglet:", tabId);
            
            // Update Buttons
            document.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            
            // Update Panels
            document.querySelectorAll('.tab-content').forEach(c => {
                c.classList.add('hidden');
                c.classList.remove('active');
            });
            const target = document.getElementById('tab-' + tabId);
            if (target) {
                console.log("Actions - Panneau cible trouvé");
                target.classList.remove('hidden');
                target.classList.add('active');
            } else {
                console.error("Actions - Panneau cible NON trouvé:", 'tab-' + tabId);
            }
        });
    });
});
