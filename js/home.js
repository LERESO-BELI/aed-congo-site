// ── Galerie de photos ──
let galleryImages = [
    { src: '/images/equipe.jpg',      caption: 'Atelier de Sensibilisation' },
    { src: '/images/congres1.jpg',     caption: 'Formation des communautés locales' },
    { src: '/images/conference1.jpg',  caption: 'Conférence environnementale' },
    { src: '/images/parisvillage.jpg', caption: 'Sensibilisation environnementale' },
    { src: '/images/hero.jpg', caption: 'Conservation des forêts' }
];

// Tentative de récupération des données dynamiques
const jsonData = document.getElementById('slideshow-data');
if (jsonData) {
    try {
        const customImages = JSON.parse(jsonData.textContent.trim());
        if (customImages && Array.isArray(customImages) && customImages.length > 0) {
            galleryImages = customImages.map(img => ({
                src: img.src.startsWith('/') ? img.src : '/' + img.src,
                caption: img.caption || ''
            }));
        }
    } catch (e) {
        console.error("Erreur lors de la lecture des données du diaporama:", e);
    }
}

let currentLightboxIndex = 0;

// ── Slideshow ──
function initSlideshow() {
    const track = document.getElementById('slideshowTrack');
    if (!track) return;
    
    // Ajout d'un bouton Pause/Play pour l'accessibilité
    const container = track.parentElement;
    const pauseBtn = document.createElement('button');
    pauseBtn.className = 'slideshow-toggle';
    pauseBtn.innerHTML = '<span>⏸</span> Pause';
    pauseBtn.setAttribute('aria-label', 'Mettre en pause le diaporama');
    pauseBtn.style.cssText = 'position:absolute; bottom:10px; right:10px; z-index:10; background:rgba(0,0,0,0.5); color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer; font-size:12px;';
    
    pauseBtn.onclick = () => {
        const isPaused = track.style.animationPlayState === 'paused';
        track.style.animationPlayState = isPaused ? 'running' : 'paused';
        pauseBtn.innerHTML = isPaused ? '<span>⏸</span> Pause' : '<span>▶️</span> Play';
        pauseBtn.setAttribute('aria-label', isPaused ? 'Mettre en pause le diaporama' : 'Démarrer le diaporama');
    };
    container.appendChild(pauseBtn);

    const allImages = [...galleryImages, ...galleryImages];
    allImages.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide-item';
        slide.onclick = () => openLightbox(index % galleryImages.length);
        const imgEl = document.createElement('img');
        imgEl.src = img.src;
        imgEl.alt = img.caption;
        imgEl.loading = 'lazy';
        const caption = document.createElement('div');
        caption.className = 'slide-caption';
        caption.textContent = img.caption;
        slide.appendChild(imgEl);
        slide.appendChild(caption);
        track.appendChild(slide);
    });
}

// ── Lightbox ──
function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus trap simple: mettre le focus sur le bouton fermer
        setTimeout(() => {
            const closeBtn = lightbox.querySelector('.lightbox-close');
            if (closeBtn) closeBtn.focus();
        }, 100);
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function changeLightboxImage(direction) {
    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) currentLightboxIndex = galleryImages.length - 1;
    else if (currentLightboxIndex >= galleryImages.length) currentLightboxIndex = 0;
    updateLightbox();
}

function updateLightbox() {
    const img = galleryImages[currentLightboxIndex];
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    if (lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.caption;
    }
    if (lightboxCaption) lightboxCaption.textContent = img.caption;
    if (lightboxCounter) lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${galleryImages.length}`;
}

document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft')  changeLightboxImage(-1);
        if (e.key === 'ArrowRight') changeLightboxImage(1);
        if (e.key === 'Escape')     closeLightbox();
    }
});

document.addEventListener('DOMContentLoaded', initSlideshow);
