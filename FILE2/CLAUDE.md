# CLAUDE.md — AED Congo Website
> Guide de référence technique pour les sessions Claude et les nouveaux contributeurs.
> Dernière mise à jour : 2025

---

## 1. Contexte du projet

**AED Congo** (Action pour l'Environnement et le Développement) est une ONG basée à Brazzaville, République du Congo, fondée par **Dr LOUBAKI Eugène**. Son site vitrine présente ses missions de protection de la biodiversité, ses études environnementales et ses actions de sensibilisation.

| Champ | Valeur |
|---|---|
| URL de production | https://aed-congo.netlify.app/ |
| Hébergeur | Netlify (déploiement statique) |
| Langue du site | Français (fr-CG) |
| Région géographique | Brazzaville (CG-BZV) |
| Stack technique | HTML5 · CSS3 · Vanilla JavaScript (ES6+) |
| Aucun framework JS | React, Vue, Angular : **non utilisés** |
| Aucun bundler | Webpack, Vite, Parcel : **non utilisés** |

---

## 2. Structure du projet

```
aed-congo/
│
├── aed_main_page.html          # Page d'accueil (équivaut à index.html)
├── aed_studies_improved.html   # Page Travaux & Études
├── nos-actions.html            # Page Nos Actions (projets terrain)
├── page-nous-soutenir.html     # Page Nous Soutenir (dons)
│
├── images/                     # Assets locaux (photos de terrain)
│   ├── equipe.jpg
│   ├── congres1.jpg
│   ├── conference1.jpg
│   └── parisvillage.jpg
│
├── favicon.ico                 # Favicon principal
├── favicon-32x32.png
├── favicon-16x16.png
│
├── sitemap.xml                 # Sitemap SEO (déclaré dans robots.txt)
├── robots.txt                  # Directives pour les crawlers
└── .htaccess                   # En-têtes de sécurité Apache + redirection HTTPS
```

### Rôle de chaque page

| Fichier | Section navigation | Contenu principal |
|---|---|---|
| `aed_main_page.html` | Accueil | Hero, À propos, Conventions, Galerie, Contact |
| `aed_studies_improved.html` | Études | Études environnementales, partenaires, publications |
| `nos-actions.html` | Nos Actions | Projets terrain, sensibilisation, témoignages |
| `page-nous-soutenir.html` | Nous Soutenir | Formulaire de don, niveaux de soutien |

---

## 3. Design System & Variables CSS

Chaque page déclare ses propres variables CSS dans `:root`. Les valeurs **de référence** (à respecter sur toutes les pages) sont :

```css
:root {
  /* Couleurs principales */
  --primary:        #2d5016;   /* Vert foncé — titres, liens actifs, bordures logo */
  --primary-dark:   #1e3a0e;   /* Vert très foncé — hover boutons primaires */
  --secondary:      #6b9e3e;   /* Vert moyen — CTA, icônes, hover nav */
  --accent:         #d4a017;   /* Or/Jaune — mise en valeur, badges */

  /* Texte */
  --text-primary:   #1a1a2e;   /* Texte principal */
  --text-secondary: #666;      /* Texte secondaire, nav par défaut */
  --text-muted:     #7a8a6a;   /* Texte discret */

  /* Fonds */
  --bg-white:       #fff;
  --bg-light:       #f7f8fa;   /* Fond général de page */
  --bg-green-pale:  #eaf2de;   /* Hover nav, badges */

  /* Bordures & Ombres */
  --border:         #e0e4e8;
  --shadow:         0 2px 8px rgba(0,0,0,0.1);
  --shadow-md:      0 6px 24px rgba(45,80,22,.14);
  --shadow-lg:      0 16px 48px rgba(45,80,22,.18);

  /* Géométrie */
  --radius:         12px;
  --radius-sm:      8px;
}
```

> ⚠️ **Incohérence connue :** `aed_main_page.html` utilise `--border-color` et `--shadow-md` avec des noms différents des autres pages. Lors de toute modification, aligner sur les noms ci-dessus (`--border`, `--shadow-md`).

---

## 4. Typographie

| Famille | Usage | Import |
|---|---|---|
| **Inter** (300–800) | Corps de texte, navigation, UI | Google Fonts |
| **Playfair Display** (700, 900) | Titres de sections héroïques (main, studies) | Google Fonts |
| **Lora** (400, 600, 700) | Titres sur `page-nous-soutenir.html` | Google Fonts |

**Règle :** Toujours utiliser `font-size: clamp(min, vw, max)` pour les titres principaux afin de garantir la fluidité responsive.

```css
/* Exemple standard */
.section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--primary);
}
```

---

## 5. Mise en page & Grille

### Conteneur principal
```css
.container {
  max-width: 1200px;   /* ou 1160px sur page-nous-soutenir */
  margin: 0 auto;
  padding: 0 24px;
}
```

### Breakpoint mobile unique
```css
@media (max-width: 768px) {
  /* Empiler toutes les grilles en colonne unique */
  .about-grid,
  .contact-grid,
  .cards-grid,
  .content-grid { grid-template-columns: 1fr; }

  /* Navigation */
  .header-content, .nav-container { flex-direction: column; gap: 16px; }
  nav ul { flex-wrap: wrap; justify-content: center; gap: 12px; }
}
```

### Grilles réutilisables

| Classe | Usage | Colonnes |
|---|---|---|
| `.cards-grid` | Grille de cartes thématiques | `repeat(auto-fill, minmax(260px, 1fr))` |
| `.content-grid` | Grille de conventions/études | `repeat(auto-fill, minmax(280px, 1fr))` |
| `.about-grid` | Section À propos (2 col) | `1fr 1fr` |
| `.contact-grid` | Section Contact (2 col) | `1fr 1fr` |
| `.don-layout` | Page dons (main + sidebar) | `1fr 330px` |

---

## 6. Composants UI récurrents

### Header (identique sur toutes les pages)
```html
<header>
  <div class="container">
    <div class="header-content">
      <a href="aed_main_page.html" class="logo">
        <div class="logo-image">
          <img src="images/logo.jpg" alt="AED Congo Logo">
        </div>
        <div class="logo-text">
          <h1>AED Congo</h1>
          <p>Action sur l'Environnement et le Développement</p>
        </div>
      </a>
      <div class="nav-container">
        <nav>
          <ul>
            <li><a href="aed_main_page.html">Accueil</a></li>
            <li><a href="nos-actions.html">Nos Actions</a></li>
            <li><a href="aed_studies_improved.html">Études</a></li>
            <li><a href="page-nous-soutenir.html">Nous Soutenir</a></li>
          </ul>
        </nav>
        <div class="header-social"><!-- Icônes SVG Facebook, LinkedIn --></div>
      </div>
    </div>
  </div>
</header>
```

### Boutons
```css
/* Bouton principal (CTA vert) */
.btn-primary { background: var(--secondary); color: white; }
.btn-primary:hover { background: var(--primary); }

/* Bouton outline (sur fond sombre) */
.btn-outline { background: transparent; color: white; border: 1.5px solid white; }
.btn-outline:hover { background: white; color: var(--primary); }

/* Bouton lien (mini, inline dans cartes) */
.btn-link { background: var(--secondary); color: white; padding: 8px 16px; font-size: 13px; }
.btn-link:hover { background: var(--primary); }
```

### Carte standard
```html
<div class="card">
  <div class="card-icon">
    <svg><!-- icône SVG stroke --></svg>
  </div>
  <h3>Titre de la carte</h3>
  <p>Description courte.</p>
</div>
```

### Section standard
```html
<section class="section-white"> <!-- ou section-light -->
  <div class="container">
    <div class="section-header">
      <div class="section-label">Étiquette</div>
      <h2 class="section-title">Titre principal</h2>
      <p class="section-description">Description optionnelle.</p>
    </div>
    <!-- Contenu -->
  </div>
</section>
```

---

## 7. Normes de codage

### HTML
- Toujours déclarer `<!DOCTYPE html>` et `<html lang="fr">`.
- L'attribut `charset` doit être `UTF-8`.
- Chaque page inclut l'ensemble complet des balises méta SEO (voir section 9).
- Les images doivent toujours avoir un attribut `alt` descriptif et pertinent.
- Utiliser `loading="lazy"` sur toutes les images hors viewport initial.
- Les icônes sont rendues en **SVG inline** (pas de bibliothèque d'icônes externe).
- Ne jamais utiliser `<form>` sans validation côté client associée.

### CSS
- **Tout le CSS est inline dans `<style>`** dans le `<head>` de chaque page (pas de fichier `.css` externe).
- Utiliser les variables CSS `var(--nom)` pour toutes les couleurs, ombres et rayons.
- Ordre des propriétés dans les règles CSS : positionnement → display/flex/grid → dimensions → spacing → typographie → couleur → effets → transition.
- Éviter `!important` sauf pour les utilitaires de reset critiques.
- Les commentaires de section CSS utilisent le format décoratif :
  ```css
  /* ════════════════════════════════════════════════════
     NOM DE LA SECTION
     ════════════════════════════════════════════════════ */
  ```
- ⛔ **Ne pas mélanger les commentaires HTML `<!-- -->` dans les blocs CSS** (bug présent dans `nos-actions.html` et `aed_studies_improved.html` à corriger).

### JavaScript
- Vanilla ES6+ uniquement (pas de jQuery, pas de framework).
- Tout le JS est placé en fin de `<body>`, dans des balises `<script>`.
- **Protection XSS obligatoire** : toujours passer les données utilisateur dans `escapeHtml()` avant injection dans le DOM. La fonction canonique est :
  ```javascript
  function escapeHtml(text) {
    const map = { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;' };
    return String(text).replace(/[&<>"']/g, m => map[m]);
  }
  ```
  > ⚠️ Cette fonction est dupliquée dans `aed_main_page.html` — elle ne doit être déclarée **qu'une seule fois** par page.
- Utiliser `textContent` (pas `innerHTML`) pour insérer du texte non-HTML.
- Éviter `eval()` et `document.write()` absolument.
- Les données de galerie et les configurations statiques sont déclarées sous forme de tableaux d'objets en haut du bloc `<script>`.

---

## 8. Sécurité

### En-têtes HTTP (`.htaccess`)
Toujours conserver ces en-têtes dans `.htaccess` :

| En-tête | Valeur | Objectif |
|---|---|---|
| `X-Frame-Options` | `SAMEORIGIN` | Anti-clickjacking |
| `X-XSS-Protection` | `1; mode=block` | Protection XSS navigateur |
| `X-Content-Type-Options` | `nosniff` | Anti-MIME sniffing |
| `Content-Security-Policy` | voir `.htaccess` | Sources autorisées |
| `Strict-Transport-Security` | `max-age=31536000` | Forcer HTTPS |

### CSP — Domaines autorisés
```
default-src 'self'
  https://cdnjs.cloudflare.com
  https://fonts.googleapis.com
  https://fonts.gstatic.com
  https://images.unsplash.com;
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
```
> Si une nouvelle ressource externe est ajoutée (ex : une CDN), son domaine **doit être ajouté** à la CSP.

### Formulaires
- Validation client obligatoire avant soumission (nom ≥ 2 car., email regex, message ≥ 10 car.).
- Toutes les entrées doivent être nettoyées avec `escapeHtml()`.
- Ne jamais afficher directement `innerHTML = inputValue`.

---

## 9. SEO — Balises méta standard (à reproduire sur chaque page)

```html
<!-- SEO ESSENTIELS -->
<meta name="description" content="[Description unique de la page, 150-160 car.]">
<meta name="keywords" content="AED Congo, environnement Congo, développement durable Brazzaville, ...">
<meta name="author" content="AED Congo - Dr LOUBAKI Eugène">
<meta name="robots" content="index, follow">
<meta name="language" content="fr">
<meta name="geo.region" content="CG-BZV">
<meta name="geo.placename" content="Brazzaville">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://aed-congo.netlify.app/[nom-de-page].html">
<meta property="og:title" content="[Titre de page] — AED Congo">
<meta property="og:description" content="[Description OG]">
<meta property="og:image" content="https://i.imgur.com/RYvENCb.jpg">
<meta property="og:locale" content="fr_CG">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Titre] — AED Congo">
<meta name="twitter:description" content="[Description]">
<meta name="twitter:image" content="https://i.imgur.com/RYvENCb.jpg">

<!-- Canonical -->
<link rel="canonical" href="https://aed-congo.netlify.app/[nom-de-page].html">
```

---

## 10. Performance

- **Preconnect** Google Fonts déclaré en début de `<head>` sur toutes les pages :
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ```
- Images locales stockées dans `/images/`, images externes via Unsplash ou Imgur.
- Galerie photo utilise `loading="lazy"` sur tous les éléments non visibles au chargement.
- **Google Analytics** : ID placeholder `G-XXXXX` à remplacer par le vrai ID de propriété avant mise en production.
- Le slideshow automatique s'arrête sur `hover` (`animation-play-state: paused`) pour respecter l'accessibilité.

---

## 11. Accessibilité

- Les rôles ARIA sont utilisés : `role="contentinfo"` sur `<footer>`, `role="dialog"` sur la lightbox, `role="alert"` sur les messages de formulaire.
- `aria-label` sur tous les boutons sans texte visible (fermer lightbox, navigation galerie).
- `aria-live="polite"` sur les compteurs dynamiques de la lightbox.
- Navigation clavier implémentée sur la lightbox : `ArrowLeft`, `ArrowRight`, `Escape`.
- Lien d'évitement (`skip-link`) présent sur `page-nous-soutenir.html` — **à ajouter sur toutes les pages**.
- Focus visible stylisé sur `page-nous-soutenir.html` avec `outline: 3px solid var(--secondary)` — **à standardiser** sur toutes les pages.

---

## 12. Conventions de nommage

### Fichiers
| Type | Convention | Exemple |
|---|---|---|
| Pages HTML | `kebab-case` ou `snake_case` | `nos-actions.html`, `aed_studies_improved.html` |
| Images | `kebab-case` descriptif | `congres1.jpg`, `parisvillage.jpg` |
| Config serveur | Standard système | `.htaccess`, `robots.txt`, `sitemap.xml` |

> ⚠️ **Incohérence connue :** Le projet mélange `kebab-case` (`nos-actions.html`) et `snake_case` (`aed_main_page.html`). Préférer **`kebab-case`** pour les nouveaux fichiers.

### Classes CSS

| Préfixe | Usage |
|---|---|
| `.section-*` | Éléments de structure de section (`.section-title`, `.section-label`) |
| `.card*` | Composants carte (`.card`, `.card-icon`, `.card-hover`) |
| `.btn-*` | Variantes de boutons (`.btn-primary`, `.btn-outline`, `.btn-link`) |
| `.header-*` | Composants du header (`.header-content`, `.header-social`) |
| `.logo-*` | Sous-éléments du logo (`.logo-image`, `.logo-text`) |
| `.contact-*` | Éléments de la section contact |
| `.form-*` | Éléments de formulaire (`.form-group`, `.form-error`) |
| `.lightbox-*` | Composants de la visionneuse |
| `.hero-*` | Éléments de la section hero |
| `.footer-*` | Éléments du pied de page |

### IDs JavaScript
Les IDs utilisés comme hooks JS sont en `camelCase` :
```
#lightbox, #lightboxImg, #lightboxCaption, #lightboxCounter
#slideshowTrack
#formSuccess, #formError
#nameError, #emailError, #messageError
```

### Variables JavaScript
```javascript
// camelCase pour les variables
const galleryImages = [...];
let currentLightboxIndex = 0;

// PascalCase pour les "constructeurs" (non utilisés actuellement)
// SCREAMING_SNAKE_CASE pour les constantes globales de configuration
const MAX_MESSAGE_LENGTH = 500;
```

---

## 13. Bugs connus & dettes techniques

| # | Fichier | Problème | Priorité |
|---|---|---|---|
| 1 | `aed_main_page.html` | `escapeHtml()` définie deux fois dans le même fichier | 🔴 Haute |
| 2 | `aed_main_page.html` | Bloc `header {}` déclaré deux fois en CSS | 🟡 Moyenne |
| 3 | `nos-actions.html`, `aed_studies_improved.html` | Commentaires HTML `<!-- -->` dans des blocs CSS (syntaxe invalide) | 🔴 Haute |
| 4 | `aed_main_page.html` | Variables CSS inconsistantes (`--border-color` au lieu de `--border`, `--shadow-md` redéfinie différemment) | 🟡 Moyenne |
| 5 | `sitemap.xml` | URL `votre-site.com` non remplacée par `aed-congo.netlify.app` | 🔴 Haute |
| 6 | `aed_main_page.html` | ID Google Analytics `G-XXXXX` — placeholder non remplacé | 🔴 Haute |
| 7 | `robots.txt` | `aed_main_page.html` est désindexée alors que c'est la page d'accueil | 🔴 Haute |
| 8 | Toutes pages | Absence de hamburger menu mobile fonctionnel (sauf `page-nous-soutenir.html`) | 🟡 Moyenne |
| 9 | Toutes pages (sauf soutenir) | `skip-link` absent — accessibilité incomplète | 🟠 Basse |
| 10 | `aed_main_page.html` | `<meta name="description">` déclarée deux fois | 🟡 Moyenne |

---

## 14. Déploiement

- **Hébergeur :** Netlify (déploiement depuis Git ou drag-and-drop)
- **HTTPS :** Forcé via `.htaccess` + Netlify (double couche)
- **Domaine :** `aed-congo.netlify.app` (domaine Netlify par défaut)
- Aucun processus de build — les fichiers sont déployés tels quels (site statique pur)
- Le fichier `.htaccess` s'applique si Netlify est configuré avec Apache, sinon utiliser `netlify.toml` pour les en-têtes HTTP

### Checklist avant déploiement
```
[ ] Remplacer G-XXXXX par le vrai ID Google Analytics
[ ] Corriger l'URL dans sitemap.xml
[ ] Corriger robots.txt (retirer l'exclusion de aed_main_page.html)
[ ] Vérifier que toutes les images locales existent dans /images/
[ ] Tester le formulaire de contact
[ ] Valider le HTML de chaque page (validator.w3.org)
```

---

## 15. Instructions pour Claude

Quand tu travailles sur ce projet :

1. **Pas de framework** — tout code produit doit être du HTML/CSS/JS natif.
2. **CSS inline** — les styles vont dans `<style>` dans le `<head>`, jamais dans un fichier externe.
3. **Respecter le design system** — utiliser exclusivement les variables CSS définies en section 3.
4. **XSS** — tout contenu dynamique injecté dans le DOM doit passer par `escapeHtml()`.
5. **Langue** — tout le contenu visible est en **français**.
6. **Cohérence navigation** — tout ajout de page doit être reflété dans le menu `<nav>` de **toutes** les pages existantes.
7. **SEO** — toute nouvelle page doit inclure le bloc méta complet de la section 9 avec des valeurs uniques.
8. **Responsive** — tester à 768px (breakpoint unique).
9. **Priorité corrections** — avant d'ajouter des fonctionnalités, résoudre les bugs #1, #5, #6, #7 du tableau section 13.
10. **Images** — si une image externe est ajoutée, son domaine hôte doit être ajouté à la CSP dans `.htaccess`.
