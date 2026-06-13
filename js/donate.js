// ── Configuration Init
let S = { type:'p', amount:50, pay:'card' };

// Vérification de la présence de Stripe avant initialisation
let stripe, elements, card;
const form = document.getElementById('donForm');

if (form && typeof Stripe !== 'undefined') {
    stripe = Stripe(form.dataset.stripeKey);
    elements = stripe.elements();
    card = elements.create('card', {
        style: {
            base: { fontSize: '16px', color: '#1a2410', fontFamily: 'Inter, sans-serif' }
        }
    });
    card.mount('#card-element');
}

// ── Tab Management (Ponctuel vs Mensuel)
window.switchTab = function(t) {
    S.type = t;
    document.querySelectorAll('.don-tab').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + t).classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(p => p.classList.remove('active'));
    document.getElementById('panel-' + t).classList.add('active');
    
    // Reset amount to default for that tab
    S.amount = (t === 'p') ? 50 : 10;
    updateRecap();
};

window.selAmt = function(btn, t) {
    S.amount = parseInt(btn.dataset.a);
    document.querySelectorAll(`#panel-${t} .amount-btn`).forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    updateRecap();
};

window.freeAmt = function(t) {
    const val = parseInt(document.getElementById('libre-' + t).value);
    if (val > 0) {
        S.amount = val;
        document.querySelectorAll(`#panel-${t} .amount-btn`).forEach(b => b.classList.remove('selected'));
        updateRecap();
    }
};

function updateRecap() {
    const rAmt = document.getElementById('r-amt');
    const rFiscal = document.getElementById('r-fiscal');
    if (rAmt) rAmt.textContent = S.amount;
    if (rFiscal) {
        let ded = Math.round(S.amount * 0.66);
        rFiscal.textContent = `soit ${S.amount - ded} € après déduction fiscale`;
    }
}

// ── Payment Method Selection
window.switchPay = function(m) {
    S.pay = m;
    document.querySelectorAll('.pay-tab').forEach(b => b.classList.remove('active'));
    document.getElementById('pt-' + m).classList.add('active');
    
    document.querySelectorAll('.pay-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('pp-' + m).classList.add('active');
    
    const subBtn = document.getElementById('sub-btn');
    if (subBtn) subBtn.style.display = (m === 'card') ? 'block' : 'none';
};

// ── Form Submission
if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Reset errors
        document.querySelectorAll('.err-msg').forEach(el => el.style.display = 'none');
        const cardErrors = document.getElementById('card-errors');
        if (cardErrors) cardErrors.textContent = '';
        
        if (!document.getElementById('consent_rgpd').checked) {
            alert("Veuillez accepter le traitement de vos données pour l'émission du reçu fiscal.");
            return;
        }

        if (S.amount < 5) {
            alert("Le montant minimum du don est de 5 €.");
            return;
        }

        const btn = document.getElementById('sub-btn');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Traitement en cours...';

        // 1. Create PaymentMethod
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: card,
            billing_details: {
                name: `${document.getElementById('prenom').value} ${document.getElementById('nom').value}`,
                email: document.getElementById('email').value,
                address: {
                    line1: document.getElementById('adresse').value,
                    postal_code: document.getElementById('cp').value,
                    city: document.getElementById('ville').value,
                    country: document.getElementById('pays').value
                }
            }
        });

        if (error) {
            if (cardErrors) cardErrors.textContent = error.message;
            btn.disabled = false;
            btn.textContent = originalText;
            return;
        }

        // 2. Log submission via Web3Forms (previously PHP)
        const formData = new FormData(this);
        formData.append('access_key', 'e6722875-71d5-4d02-bd98-9f36e7568782');
        formData.append('subject', 'Nouveau Don — AED Congo');
        formData.append('stripe_payment_method', paymentMethod.id);
        formData.append('amount', S.amount);
        formData.append('type', S.type);

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        })
        .then(() => {
            form.style.display = 'none';
            const successBox = document.querySelector('.form-success-box');
            if (successBox) successBox.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch((err) => {
            console.error(err);
            alert("Une erreur s'est produite. Votre don a été traité par Stripe mais l'enregistrement a échoué. Veuillez nous contacter.");
            btn.disabled = false;
            btn.textContent = originalText;
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateRecap();

    // Event listeners for tabs and buttons (CSP Compliance)
    document.querySelectorAll('[data-don-tab]').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.donTab));
    });
    
    document.querySelectorAll('[data-amt]').forEach(btn => {
        btn.addEventListener('click', () => {
            const panel = btn.closest('.tab-content');
            const t = panel.id === 'panel-p' ? 'p' : 'm';
            selAmt(btn, t);
        });
    });
    
    document.querySelectorAll('[data-pay-tab]').forEach(btn => {
        btn.addEventListener('click', () => switchPay(btn.dataset.payTab));
    });
    
    document.querySelectorAll('[data-free-amt]').forEach(input => {
        input.addEventListener('input', () => freeAmt(input.dataset.freeAmt));
    });
});
