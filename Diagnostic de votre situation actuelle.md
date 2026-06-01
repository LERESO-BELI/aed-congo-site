Diagnostic de votre situation actuelle
La bonne nouvelle : vous avez déjà le meilleur stack possible pour budget zéro. Eleventy 3 + Netlify est exactement ce qu'on utiliserait en 2025 pour une ONG internationale. Pas de migration nécessaire — seulement des optimisations.

Option 1 — Rester sur Netlify (recommandée)
C'est votre stack actuel, et il faut le garder. Netlify vous donne gratuitement ce que des agences facturent plusieurs centaines d'euros par an :

Votre netlify.toml est déjà configuré avec les headers de sécurité, les redirections, la minification CSS/JS/HTML et le cache des assets. C'est du travail professionnel.
Le formulaire de contact via data-netlify="true" dans index.njk fonctionne sans backend.
HTTPS automatique, CDN mondial, déploiement continu depuis Git.

Pour le domaine (c'est l'unique point bloquant) :
Solution A — TechSoup (la plus crédible) : TechSoup est un programme qui offre des logiciels et services aux ONG. Via leur partenariat avec Public Interest Registry, les associations environnementales peuvent obtenir un domaine .org gratuit ou à 10-15 € par an maximum. Avec votre statut d'ONG congolaise reconnue, postulez sur techsoup.org. Un domaine aed-congo.org pointe ensuite vers Netlify via un simple CNAME — c'est 20 minutes de configuration dans le tableau de bord Netlify.
Solution B — eu.org (gratuit à vie) : eu.org délivre des sous-domaines gratuits aux organisations non commerciales depuis 1996. Vous obtenez aed-congo.eu.org. C'est légèrement moins "premium" qu'un .org mais totalement gratuit et permanent. Délai d'approbation : 1 à 3 mois, car traitement manuel.
Solution C — Sous-domaine Netlify immédiat : Si vous devez être en ligne maintenant, aed-congo.netlify.app est opérationnel aujourd'hui. C'est déjà du HTTPS, indexable par Google, et parfaitement professionnel pour les partenaires institutionnels.

Option 2 — GitHub Pages (alternative)
C'est une option viable mais inférieure à votre setup actuel. GitHub Pages héberge des sites statiques gratuitement, vous auriez aedcongo.github.io. Le problème : vous perdez les Netlify Forms (votre formulaire de contact ne fonctionnerait plus sans backend), les redirections configurées dans netlify.toml, et les headers de sécurité HTTP. Il faudrait réécrire toute cette configuration. À n'envisager que si Netlify fermait.

Option 3 — Cloudflare Pages
Cloudflare Pages est une alternative intéressante si la vitesse en Afrique subsaharienne devient une priorité. Cloudflare possède le réseau CDN le plus dense du continent africain, ce qui améliore les temps de chargement depuis Brazzaville et les capitales régionales. La migration depuis Netlify est simple (même build command : eleventy), mais vous perdez les Netlify Forms et devez configurer Cloudflare Workers pour le formulaire.

Bugs à corriger en priorité
En lisant votre code, j'ai identifié quatre problèmes concrets :
1. Liens internes cassés — Dans index.njk, vos liens pointent vers /etudes.html, /actions.html et /nous-soutenir.html. Or Eleventy 3 génère des URLs propres : /etudes/, /actions/, /nous-soutenir/. Ces liens donnent des 404 en production. Remplacez partout .html par / dans vos .njk.
2. Attribut lang manquant sur <html> — Votre layout de base (_includes/layouts/base.njk) doit avoir <html lang="fr">. C'est obligatoire pour l'accessibilité (RGAA/WCAG), le SEO, et les lecteurs d'écran. C'est aussi ce que vérifient les partenaires institutionnels de l'ONU.
3. unsafe-inline dans la CSP — Votre netlify.toml a un bon header CSP, mais script-src 'self' 'unsafe-inline' annule une partie de la protection. Le JavaScript inline de index.njk (le bloc {% set scripts %}) devrait être externalisé dans un fichier /js/main.js. Cela permettrait de remplacer 'unsafe-inline' par un hash SHA256 spécifique.
4. Sitemap manuel — Vous faites un passthrough d'un sitemap.xml statique. À chaque nouvelle page, vous devez le mettre à jour manuellement. Installez @11ty/eleventy-plugin-sitemap pour le générer automatiquement à chaque build.

SEO international — actions à fort impact, coût zéro
Ajoutez ce bloc JSON-LD dans votre layout de base, entre les balises <head>. C'est ce que Google, mais aussi les moteurs de recherche des Nations Unies et de l'UNEP, utilisent pour indexer les organisations :
html<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "AED Congo",
  "alternateName": "Action pour l'Environnement et le Développement",
  "url": "https://aed-congo.org",
  "description": "ONG travaillant sur l'environnement et le développement durable en République du Congo",
  "foundingDate": "2015",
  "areaServed": "CD",
  "email": "aedcongo2015@gmail.com",
  "sameAs": []
}
</script>
Inscrivez ensuite votre site sur Google Search Console (gratuit), Bing Webmaster Tools (gratuit), et soumettez-le à l'annuaire Wango.org (répertoire mondial des ONG environnementales) et à NGO Explorer de l'OCDE. Ce sont des backlinks de haute autorité qui n'ont aucun équivalent payant.

Résumé par ordre de priorité
La séquence idéale est : corriger les 4 bugs ce week-end (30 minutes de travail), puis soumettre un dossier TechSoup pour le .org gratuit. Pendant l'attente (2-4 semaines), le site tourne sur aed-congo.netlify.app sans aucun problème. Ajoutez le JSON-LD et inscrivez le site sur Search Console dès maintenant pour commencer l'indexation internationale.