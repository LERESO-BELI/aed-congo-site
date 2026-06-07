# Configuration Cloudflare Pages pour AED Congo

## Pourquoi ce changement ?
Netlify limite les déploiements à 300 minutes par mois. Cloudflare Pages offre des **minutes de build ILLIMITÉES**, ce qui est idéal pour les membres de l'association qui souhaitent faire de nombreuses modifications via Sveltia CMS sans risquer de bloquer le site.

## 1. Configuration sur le tableau de bord Cloudflare

1.  Connectez-vous à [dash.cloudflare.com](https://dash.cloudflare.com/).
2.  Allez dans **Workers & Pages** > **Pages** > **Connect to Git**.
3.  Sélectionnez votre dépôt GitHub : `aed-congo-site`.
4.  Configurez les paramètres de build suivants :
    *   **Framework preset** : `Eleventy`
    *   **Build command** : `npm run build`
    *   **Build output directory** : `_site`
    *   **Root directory** : (laisser vide)
5.  Cliquez sur **Environment variables** et ajoutez :
    *   `WEB3FORMS_KEY` = `e6722875-71d5-4d02-bd98-9f36e7568782`
    *   `NODE_VERSION` = `20`

## 2. Configuration des Redirections (Fichier `_redirects`)

Cloudflare Pages utilise un fichier `_redirects` pour les redirections (similaire à Netlify).

## 3. Configuration du CMS

Sveltia CMS continuera de fonctionner sur `https://aed-congo.org/admin/` car il communique directement avec GitHub. L'hébergeur (Netlify ou Cloudflare) n'est que la "vitrine" finale.

## 4. DNS (Dernière étape)

Une fois que Cloudflare aura généré votre URL (ex: `aed-congo-site.pages.dev`), vous pourrez l'associer à votre domaine `aed-congo.org` via l'onglet **Custom Domains**.
