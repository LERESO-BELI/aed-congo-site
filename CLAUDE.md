# CLAUDE.md — Guide de Développement AED Congo

## 🌐 Contexte Technique
Site internet de l'association **AED Congo** (Action pour l'Environnement et le Développement). Le projet vise une visibilité internationale, hébergé sur un serveur Apache/PHP.

- **Framework :** [Eleventy 3.0](https://www.11ty.dev/) (SSG)
- **Hébergement :** Infomaniak (Serveur Cloud/Web)
- **URL Officielle :** https://aed-congo.org
- **Serveur :** Apache avec support PHP (pour les formulaires)
- **CMS :** Decap CMS (Git-based, via `/admin`)
- **Design :** Vanilla CSS (Architecture modulaire)

## 📁 Structure du Projet
- `_data/` : Données globales (JSON/JS) pour le contenu dynamique.
- `_includes/` : Partiels HTML et layouts Nunjucks (`.njk`).
- `css/` : Fichiers de styles publics.
- `js/` : Scripts publics.
- `.htaccess` : Configuration Apache (HTTPS, URLs propres, Sécurité).
- `contact.php` : Script PHP pour l'envoi des emails de contact.
- `.eleventy.js` : Configuration du générateur.

## 📜 Normes de Codage & Conventions

### 1. HTML / Nunjucks
- Utiliser la sémantique HTML5 (`main`, `section`, `article`, `aside`).
- **Accessibilité (A11y) :** Attributs `aria-label` sur les boutons, contrastes élevés, navigation clavier préservée.
- **Template Engine :** Nunjucks (`.njk`) pour la logique.

### 2. CSS
- **Variables :** Définies dans `:root`.
- **Externalisation :** Pas de styles en ligne.

### 3. JavaScript
- **Vanilla JS uniquement.**
- **Soumission Formulaire :** Utilise `fetch()` vers `/contact.php`.

## 🚀 Workflow de Déploiement
1. Générer le site localement : `npm run build`.
2. Se connecter au serveur Infomaniak via FTP/SFTP (ex: FileZilla).
3. Transférer le contenu du dossier `_site/` vers le dossier racine du serveur (souvent `/web` ou `/public_html`).

## 🛠 Commandes Utiles
- `npm start` : Lancer le serveur de développement local.
- `npm run build` : Générer le site statique final.
