# Guide de Configuration DNS : AED Congo (Infomaniak -> Netlify)

Ce document récapitule les étapes pour faire pointer votre domaine **aed-congo.org** (acheté chez Infomaniak) vers votre site hébergé sur **Netlify**.

---

## Étape 1 : Récupérer les informations sur Netlify

1. Connectez-vous à votre tableau de bord [Netlify](https://app.netlify.com/).
2. Allez dans **Site configuration** > **Domain management**.
3. Cliquez sur le bouton **Add custom domain**.
4. Saisissez votre domaine : `aed-congo.org`.
5. Netlify affichera un message "Awaiting External DNS". Cliquez dessus pour voir les instructions. 
   - Notez bien votre adresse Netlify (ex: `nom-du-site.netlify.app`).

---

## Étape 2 : Configuration dans le Manager Infomaniak

1. Connectez-vous à votre [Manager Infomaniak](https://manager.infomaniak.com/).
2. Allez dans la section **Domaine** et sélectionnez `aed-congo.org`.
3. Dans le menu latéral gauche, cliquez sur **Zone DNS**.

### A. Configuration du domaine principal (Root)
L'objectif est de faire pointer `aed-congo.org` vers l'IP de Netlify.
- Trouvez l'enregistrement de type **A**.
- Modifiez-le (ou créez-le s'il n'existe pas) avec les paramètres suivants :
  - **Source/Hôte** : (laisser vide ou mettre `@`)
  - **Type** : `A`
  - **Cible/Valeur** : `75.2.60.5`
- Cliquez sur **Enregistrer**.

### B. Configuration du sous-domaine WWW
L'objectif est de faire pointer `www.aed-congo.org` vers votre lien Netlify.
- Trouvez l'enregistrement de type **CNAME** pour l'hôte `www`.
- Modifiez-le (ou créez-le) avec les paramètres suivants :
  - **Source/Hôte** : `www`
  - **Type** : `CNAME`
  - **Cible/Valeur** : `votre-nom-de-site.netlify.app` (l'adresse notée à l'étape 1).
- Cliquez sur **Enregistrer**.

---

## Étape 3 : Vérification et Sécurité (SSL)

1. **Attente** : La propagation DNS peut prendre de quelques minutes à 24 heures.
2. **Vérification Netlify** : Retournez dans l'onglet **Domain management** de Netlify. Cliquez sur le bouton **Verify DNS configuration** ou actualisez la page.
3. **Activation du HTTPS (SSL)** : Une fois le DNS validé, Netlify activera automatiquement un certificat SSL gratuit Let's Encrypt. 
   - Si ce n'est pas automatique, faites défiler la page jusqu'à la section **HTTPS** et cliquez sur **Verify DNS configuration**.

---

## Rappels Importants
- **Emails** : Ne modifiez **JAMAIS** les enregistrements de type **MX**. Cela couperait la réception de vos emails Infomaniak.
- **Variables d'environnement** : N'oubliez pas d'ajouter votre `STRIPE_SECRET_KEY` dans les réglages Netlify (**Site configuration** > **Environment variables**) pour que les dons fonctionnent.

---
*Document généré le 3 juin 2026 par votre assistant de déploiement.*
