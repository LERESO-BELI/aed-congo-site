<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Rapport d'Audit Technique — AED Congo</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Sora:wght@400;500;600;700;800&display=swap');

  :root {
    --ink: #0e1117;
    --ink-light: #3a4050;
    --ink-muted: #6b7280;
    --paper: #f8f7f4;
    --white: #ffffff;
    --border: #e2e0db;
    --critical: #c0392b;
    --critical-bg: #fdf2f2;
    --critical-border: #f5c6c6;
    --important: #d97706;
    --important-bg: #fffbf0;
    --important-border: #fde8b3;
    --desirable: #2563eb;
    --desirable-bg: #eff6ff;
    --desirable-border: #bfdbfe;
    --positive: #15803d;
    --positive-bg: #f0fdf4;
    --positive-border: #bbf7d0;
    --accent: #1e293b;
    --mono: 'IBM Plex Mono', monospace;
    --sans: 'Sora', sans-serif;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { font-size: 15px; scroll-behavior: smooth; }
  body {
    font-family: var(--sans);
    background: var(--paper);
    color: var(--ink);
    line-height: 1.7;
  }

  /* ── COVER ── */
  .cover {
    background: var(--accent);
    color: white;
    padding: 60px 48px 52px;
    border-bottom: 4px solid #475569;
  }
  .cover-tag {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #94a3b8;
    margin-bottom: 20px;
  }
  .cover h1 {
    font-size: 2.6rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 12px;
  }
  .cover h1 span { color: #64748b; }
  .cover-subtitle {
    font-size: 1.05rem;
    color: #94a3b8;
    margin-bottom: 40px;
    max-width: 620px;
  }
  .cover-meta {
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
  }
  .cover-meta-item { font-size: 13px; }
  .cover-meta-item .label { color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 3px; }
  .cover-meta-item .value { color: #e2e8f0; font-weight: 600; font-family: var(--mono); }

  /* ── LAYOUT ── */
  .page { max-width: 960px; margin: 0 auto; padding: 48px 32px 80px; }

  /* ── SUMMARY CARDS ── */
  .summary-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin: 40px 0;
  }
  .summary-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 20px;
    text-align: center;
  }
  .summary-card .count {
    font-size: 2.4rem;
    font-weight: 800;
    font-family: var(--mono);
    line-height: 1;
    display: block;
    margin-bottom: 6px;
  }
  .summary-card .label { font-size: 12px; color: var(--ink-muted); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; }
  .summary-card.c .count { color: var(--critical); }
  .summary-card.i .count { color: var(--important); }
  .summary-card.d .count { color: var(--desirable); }
  .summary-card.t .count { color: var(--positive); }

  /* ── SECTION HEADINGS ── */
  .section-title {
    font-size: 1.45rem;
    font-weight: 800;
    color: var(--accent);
    margin: 56px 0 8px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-title .icon { font-size: 1.3rem; }
  .section-intro {
    font-size: 14px;
    color: var(--ink-muted);
    margin-bottom: 24px;
  }

  /* ── PILLS ── */
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 9px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    flex-shrink: 0;
  }
  .pill.critical { background: var(--critical-bg); color: var(--critical); border: 1px solid var(--critical-border); }
  .pill.important { background: var(--important-bg); color: var(--important); border: 1px solid var(--important-border); }
  .pill.desirable { background: var(--desirable-bg); color: var(--desirable); border: 1px solid var(--desirable-border); }

  /* ── FINDING CARDS ── */
  .finding {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 10px;
    margin-bottom: 16px;
    overflow: hidden;
  }
  .finding.critical { border-left: 4px solid var(--critical); }
  .finding.important { border-left: 4px solid var(--important); }
  .finding.desirable { border-left: 4px solid var(--desirable); }

  .finding-header {
    padding: 16px 20px 12px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }
  .finding-id {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--ink-muted);
    flex-shrink: 0;
    margin-top: 2px;
  }
  .finding-title {
    font-size: 0.97rem;
    font-weight: 700;
    color: var(--accent);
    flex: 1;
  }
  .finding-body {
    padding: 0 20px 18px;
    border-top: 1px solid var(--border);
    background: #fafaf9;
  }
  .finding-section { margin-top: 14px; }
  .finding-section-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--ink-muted);
    margin-bottom: 5px;
  }
  .finding-section p, .finding-section li {
    font-size: 13.5px;
    color: var(--ink-light);
    line-height: 1.65;
  }
  .finding-section ul { padding-left: 18px; }
  .finding-section li { margin-bottom: 4px; }

  code {
    font-family: var(--mono);
    font-size: 12px;
    background: #eef0f3;
    padding: 1px 5px;
    border-radius: 4px;
    color: #c0392b;
  }

  pre {
    font-family: var(--mono);
    font-size: 12px;
    background: #1e293b;
    color: #e2e8f0;
    border-radius: 8px;
    padding: 14px 16px;
    overflow-x: auto;
    margin-top: 8px;
    line-height: 1.6;
  }
  pre .comment { color: #64748b; }
  pre .fix { color: #86efac; }
  pre .bad { color: #fca5a5; }

  .toc {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 24px 28px;
    margin: 32px 0;
  }
  .toc h2 { font-size: 1rem; font-weight: 700; margin-bottom: 14px; color: var(--accent); }
  .toc ol { padding-left: 20px; }
  .toc li { margin-bottom: 6px; font-size: 14px; }
  .toc a { color: var(--desirable); text-decoration: none; font-weight: 500; }
  .toc a:hover { text-decoration: underline; }

  .callout {
    display: flex;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 8px;
    font-size: 13.5px;
    margin: 20px 0;
    line-height: 1.6;
  }
  .callout.warning { background: var(--important-bg); border: 1px solid var(--important-border); color: #92400e; }
  .callout.info { background: var(--desirable-bg); border: 1px solid var(--desirable-border); color: #1e40af; }
  .callout.success { background: var(--positive-bg); border: 1px solid var(--positive-border); color: #166534; }
  .callout .icon { font-size: 1.1rem; flex-shrink: 0; }

  .file-ref {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: var(--mono);
    font-size: 11.5px;
    background: #f1f5f9;
    color: #334155;
    border: 1px solid #cbd5e1;
    padding: 1px 7px;
    border-radius: 4px;
    font-weight: 600;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13.5px;
    margin: 16px 0;
  }
  th {
    text-align: left;
    padding: 10px 14px;
    background: #f1f5f9;
    border: 1px solid var(--border);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--ink-muted);
    font-weight: 700;
  }
  td {
    padding: 10px 14px;
    border: 1px solid var(--border);
    vertical-align: top;
    color: var(--ink-light);
  }
  tr:nth-child(even) td { background: #fafaf9; }

  .positive-list { list-style: none; padding: 0; }
  .positive-list li {
    display: flex;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid var(--border);
    font-size: 14px;
    color: var(--ink-light);
  }
  .positive-list li:last-child { border-bottom: none; }
  .positive-list .check { color: var(--positive); font-weight: 700; flex-shrink: 0; }

  .priority-legend {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin: 0 0 20px;
    font-size: 13px;
  }
  .priority-legend-item { display: flex; align-items: center; gap: 6px; }

  @media (max-width: 700px) {
    .cover { padding: 32px 20px; }
    .cover h1 { font-size: 1.8rem; }
    .page { padding: 24px 16px 60px; }
    .summary-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media print {
    .finding { break-inside: avoid; }
    .section-title { break-before: page; }
  }
</style>
</head>
<body>

<!-- ══════════════════════════════════════════
     COVER
══════════════════════════════════════════ -->
<div class="cover">
  <div class="cover-tag">Rapport d'Audit — Confidentiel</div>
  <h1>Audit Technique<br><span>AED Congo</span></h1>
  <p class="cover-subtitle">Analyse complète du code source en vue d'une élévation du niveau MVP vers une qualité Enterprise / ONG. Ce rapport couvre la sécurité, la maintenabilité, la performance, l'accessibilité, le SEO et la conformité légale.</p>
  <div class="cover-meta">
    <div class="cover-meta-item">
      <span class="label">Fichiers analysés</span>
      <span class="value">9 fichiers HTML + configs</span>
    </div>
    <div class="cover-meta-item">
      <span class="label">Lignes de code examinées</span>
      <span class="value">~7 800 lignes</span>
    </div>
    <div class="cover-meta-item">
      <span class="label">Date d'audit</span>
      <span class="value">21 mai 2026</span>
    </div>
    <div class="cover-meta-item">
      <span class="label">Niveau cible</span>
      <span class="value">Enterprise / ONG</span>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════
     BODY
══════════════════════════════════════════ -->
<div class="page">

  <!-- RÉSUMÉ EXÉCUTIF -->
  <h2 class="section-title"><span class="icon">📋</span> Résumé Exécutif</h2>

  <p style="font-size:14.5px; color:var(--ink-light); margin-bottom: 20px;">
    Le site AED Congo présente une base solide pour un MVP : design cohérent, SEO structurel complet, structure ARIA partielle et configuration Netlify correcte. Cependant, plusieurs problèmes fondamentaux empêchent une classification « Enterprise/ONG », en particulier sur les axes <strong>sécurité</strong> (authentification admin exposée en clair, persistance client-side uniquement), <strong>maintenabilité</strong> (architecture monolithique à 4 fichiers sans composants partagés) et <strong>conformité RGPD</strong> (Analytics chargé avant consentement).
  </p>

  <div class="summary-grid">
    <div class="summary-card c"><span class="count">6</span><span class="label">Bugs Critiques</span></div>
    <div class="summary-card i"><span class="count">8</span><span class="label">Bugs Importants</span></div>
    <div class="summary-card d"><span class="count">5</span><span class="label">Bugs Souhaitables</span></div>
    <div class="summary-card t"><span class="count">17</span><span class="label">Améliorations</span></div>
  </div>

  <div class="callout success">
    <span class="icon">✅</span>
    <div><strong>Points positifs constatés :</strong> Charte graphique CSS cohérente avec variables custom properties, protection XSS via <code>escapeHtml()</code> appliquée aux données dynamiques, balises Open Graph et Twitter Card présentes, skip-link et <code>:focus-visible</code> implémentés, attribut <code>prefers-reduced-motion</code> respecté dans les animations, HSTS et X-Frame-Options configurés dans <code>netlify.toml</code>.</div>
  </div>

  <!-- TABLE DES MATIÈRES -->
  <div class="toc">
    <h2>Table des matières</h2>
    <ol>
      <li><a href="#sec-bugs">Bugs — Erreurs fonctionnelles</a>
        <ol>
          <li><a href="#sec-bugs-critical">Critiques (arrêt de production)</a></li>
          <li><a href="#sec-bugs-important">Importants (dégradation fonctionnelle)</a></li>
          <li><a href="#sec-bugs-desirable">Souhaitables (corrections mineures)</a></li>
        </ol>
      </li>
      <li><a href="#sec-ameliorations">Améliorations — Montée en niveau Enterprise</a>
        <ol>
          <li><a href="#sec-archi">Architecture & Maintenabilité</a></li>
          <li><a href="#sec-secu">Sécurité</a></li>
          <li><a href="#sec-perf">Performance</a></li>
          <li><a href="#sec-a11y">Accessibilité (WCAG 2.1)</a></li>
          <li><a href="#sec-seo">SEO</a></li>
          <li><a href="#sec-legal">Conformité légale & RGPD</a></li>
        </ol>
      </li>
      <li><a href="#sec-roadmap">Feuille de route priorisée</a></li>
    </ol>
  </div>

  <!-- ══════════════════════════════════════
       SECTION 1 — BUGS
  ══════════════════════════════════════ -->
  <h2 class="section-title" id="sec-bugs"><span class="icon">🐛</span> Section 1 — Bugs &amp; Erreurs Fonctionnelles</h2>
  <p class="section-intro">Un bug est une erreur produisant un comportement non conforme à l'intention déclarée du code, reproduisible et observable. Les bugs sont classés selon leur impact sur la disponibilité, la sécurité ou la fonctionnalité du site.</p>

  <div class="priority-legend">
    <div class="priority-legend-item"><span class="pill critical">Critique</span> Arrêt de service, faille de sécurité exploitable ou perte de données</div>
    <div class="priority-legend-item"><span class="pill important">Important</span> Dégradation fonctionnelle significative visible par l'utilisateur</div>
    <div class="priority-legend-item"><span class="pill desirable">Souhaitable</span> Anomalie mineure ou incohérence non bloquante</div>
  </div>

  <!-- ── BUGS CRITIQUES ── -->
  <h3 style="font-size:1.1rem; font-weight:700; color:var(--critical); margin: 28px 0 14px;" id="sec-bugs-critical">1.1 Bugs Critiques</h3>

  <div class="finding critical">
    <div class="finding-header">
      <div>
        <div class="finding-id">BUG-01</div>
        <div class="finding-title">Hash SHA-256 du mot de passe admin exposé en clair dans le code source</div>
      </div>
      <span class="pill critical">Critique</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">aed-studies-improved.html</span> ligne 1129 &nbsp;·&nbsp; <span class="file-ref">nos-actions.html</span> ligne 1598</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Le hash SHA-256 <code>240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9</code> est inscrit en dur dans le code JavaScript côté client. Le commentaire en ligne 1597 de <code>nos-actions.html</code> confirme explicitement qu'il s'agit du hash de <code>'admin123'</code> : <code>// SHA-256 of 'admin123'</code>. L'authentification peut être contournée de deux façons indépendantes : (1) tout internaute lisant le code source connaît le mot de passe par défaut ; (2) même en changeant le mot de passe, l'attaquant peut calculer hors ligne le SHA-256 de n'importe quel mot de passe et comparer au hash exposé, sans jamais interagir avec le serveur.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Correction recommandée</div>
        <p>Supprimer intégralement la mécanique de hash côté client. Utiliser exclusivement <strong>Netlify Identity</strong> (JWT côté serveur) déjà intégré. L'accès admin ne doit s'ouvrir que si <code>netlifyIdentity.currentUser()</code> retourne un utilisateur authentifié avec un rôle vérifié via la propriété <code>app_metadata.roles</code>.</p>
      </div>
    </div>
  </div>

  <div class="finding critical">
    <div class="finding-header">
      <div>
        <div class="finding-id">BUG-02</div>
        <div class="finding-title">CMS admin non fonctionnel : données sauvegardées uniquement dans le localStorage de l'administrateur</div>
      </div>
      <span class="pill critical">Critique</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">aed-studies-improved.html</span> ligne 1488 (<code>saveData()</code>) &nbsp;·&nbsp; <span class="file-ref">nos-actions.html</span> lignes 1705, 1713, 1721</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>La fonction <code>saveData()</code> appelle <code>localStorage.setItem('aed_studies_data', ...)</code>. Le <code>localStorage</code> est strictement local au navigateur qui a effectué l'écriture. Un administrateur ajoutant ou modifiant une étude sur son ordinateur ne verra jamais ces changements répercutés pour les visiteurs du site, qui lisent soit <code>data/studies.json</code> (si disponible), soit les données par défaut embarquées. Le CRUD admin est donc non fonctionnel pour sa finalité première : publier du contenu au public.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Correction recommandée</div>
        <p>Implémenter le workflow Decap CMS + Git Gateway décrit dans le document de déploiement (fichier <code>SearchText___id_adminToggle__in_aed.txt</code>) : l'admin édite via <code>/admin</code>, les modifications sont commitées dans le dépôt Git, Netlify rebuild le site et met à jour <code>data/studies.json</code>.</p>
      </div>
    </div>
  </div>

  <div class="finding critical">
    <div class="finding-header">
      <div>
        <div class="finding-id">BUG-03</div>
        <div class="finding-title">Formulaire de contact : attribut data-netlify absent, envoi AJAX silencieusement ignoré</div>
      </div>
      <span class="pill critical">Critique</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">aed-main-page.html</span> lignes 1062–1079 (handler <code>handleSubmit</code>)</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Le script AJAX soumet les données du formulaire vers <code>"/"</code> avec l'en-tête <code>application/x-www-form-urlencoded</code>. Netlify Forms exige que le <code>&lt;form&gt;</code> porte l'attribut <code>data-netlify="true"</code> (ou <code>netlify</code>) pour être détecté lors du build. Sans cet attribut, Netlify ne crée pas l'endpoint de réception et la requête POST vers <code>"/"</code> retourne une réponse inattendue. Le <code>.then()</code> ne rejette pas — il résout — et affiche le message de succès même si le message n'a jamais été reçu. L'utilisateur croit avoir envoyé son message alors qu'il est perdu.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Correction recommandée</div>
        <pre><span class="bad">&lt;!-- Manquant --&gt;</span>
&lt;form onsubmit="handleSubmit(event)"&gt;

<span class="fix">&lt;!-- Correct --&gt;</span>
&lt;form name="contact" onsubmit="handleSubmit(event)"
      data-netlify="true" netlify-honeypot="bot-field"&gt;
  &lt;input type="hidden" name="form-name" value="contact"&gt;
  &lt;p class="hidden"&gt;&lt;label&gt;Bot field : &lt;input name="bot-field"&gt;&lt;/label&gt;&lt;/p&gt;</pre>
      </div>
    </div>
  </div>

  <div class="finding critical">
    <div class="finding-header">
      <div>
        <div class="finding-id">BUG-04</div>
        <div class="finding-title">Google Analytics chargé sans consentement préalable (violation RGPD)</div>
      </div>
      <span class="pill critical">Critique</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">page-nous-soutenir.html</span> lignes 5–12 &nbsp;·&nbsp; <span class="file-ref">nos-actions.html</span> lignes 5–12 &nbsp;·&nbsp; <span class="file-ref">aed-main-page.html</span> lignes 53–60</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Le script <code>gtag.js</code> (Google Analytics GA4 — ID <code>G-WDPBQ43ZE1</code>) est chargé de manière inconditionnelle dans le <code>&lt;head&gt;</code>, avant tout consentement de l'utilisateur. Le bandeau de cookies est affiché mais ne bloque pas l'exécution d'Analytics. Selon le RGPD (Règlement UE 2016/679) et les recommandations de la CNIL, le dépôt de cookies analytiques non essentiels nécessite un consentement explicite et préalable.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Correction recommandée</div>
        <p>Initialiser GA4 uniquement après acceptation. Utiliser le mode consentement Google (<code>gtag('consent', 'default', { analytics_storage: 'denied' })</code>) par défaut, puis passer à <code>'granted'</code> lors du clic "Accepter" du bandeau.</p>
        <pre><span class="comment">// Avant toute balise gtag :</span>
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  wait_for_update: 500
});

<span class="comment">// Dans acceptCookies() :</span>
<span class="fix">gtag('consent', 'update', { analytics_storage: 'granted' });</span></pre>
      </div>
    </div>
  </div>

  <div class="finding critical">
    <div class="finding-header">
      <div>
        <div class="finding-id">BUG-05</div>
        <div class="finding-title">OG image en chemin relatif sur aed-studies-improved.html — non indexable par les crawlers sociaux</div>
      </div>
      <span class="pill critical">Critique</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">aed-studies-improved.html</span> ligne 24</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>La balise <code>&lt;meta property="og:image" content="images/hero.jpg"&gt;</code> utilise un chemin relatif. Le protocole Open Graph exige une URL absolue. Facebook, LinkedIn et Twitter ne résoudront pas ce chemin correctement et n'afficheront aucune image de prévisualisation lors du partage de la page. La même erreur est présente pour <code>&lt;meta name="twitter:image"&gt;</code> sur cette page.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Correction recommandée</div>
        <pre><span class="bad">&lt;meta property="og:image" content="images/hero.jpg"&gt;</span>
<span class="fix">&lt;meta property="og:image" content="https://aed-congo.netlify.app/images/hero.jpg"&gt;
&lt;meta property="og:image:width" content="1200"&gt;
&lt;meta property="og:image:height" content="630"&gt;</span></pre>
      </div>
    </div>
  </div>

  <div class="finding critical">
    <div class="finding-header">
      <div>
        <div class="finding-id">BUG-06</div>
        <div class="finding-title">loadPartners() sans try/catch — JSON corrompu en localStorage cause une exception non gérée bloquant toute la page</div>
      </div>
      <span class="pill critical">Critique</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">aed-studies-improved.html</span> ligne 1453</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>La fonction <code>loadPartners()</code> appelle <code>JSON.parse(saved)</code> sans bloc <code>try/catch</code>. Si la chaîne JSON stockée dans <code>localStorage</code> est corrompue (troncature lors d'un write interrompu, extension navigateur modifiant le storage, etc.), un <code>SyntaxError</code> est levé et remonte sans être intercepté. L'exécution de la fonction <code>init()</code> s'arrête, empêchant l'affichage de l'intégralité du contenu de la page.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Correction recommandée</div>
        <pre>function loadPartners() {
  const saved = localStorage.getItem('aed_partners');
  if (saved) {
    <span class="fix">try {
      partnersData = JSON.parse(saved);
    } catch (e) {
      console.warn('aed_partners: JSON invalide, réinitialisation.', e);
      localStorage.removeItem('aed_partners');
      partnersData = getDefaultPartners();
    }</span>
  } else {
    partnersData = getDefaultPartners();
  }
}</pre>
      </div>
    </div>
  </div>

  <!-- ── BUGS IMPORTANTS ── -->
  <h3 style="font-size:1.1rem; font-weight:700; color:var(--important); margin: 28px 0 14px;" id="sec-bugs-important">1.2 Bugs Importants</h3>

  <div class="finding important">
    <div class="finding-header">
      <div>
        <div class="finding-id">BUG-07</div>
        <div class="finding-title">via.placeholder.com absent de la CSP — images de fallback bloquées par le navigateur</div>
      </div>
      <span class="pill important">Important</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">nos-actions.html</span> lignes 1443, 1465, 1562, 1810 &nbsp;·&nbsp; <span class="file-ref">netlify.toml</span> directive <code>img-src</code></p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Les rendus de cartes utilisent <code>'https://via.placeholder.com'</code> comme URL d'image de secours. Ce domaine n'est pas listé dans la directive <code>img-src</code> de la CSP définie dans <code>netlify.toml</code>. Le navigateur bloquera ces requêtes et enregistrera une erreur CSP. De plus, <code>via.placeholder.com</code> est un service tiers non garanti en disponibilité.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Correction recommandée</div>
        <p>Remplacer les URLs <code>via.placeholder.com</code> par une image SVG placeholder locale intégrée en <code>data:</code> URI ou un fichier <code>/images/placeholder.svg</code> hébergé sur le même domaine. Mettre à jour la CSP en conséquence si un CDN externe est maintenu.</p>
      </div>
    </div>
  </div>

  <div class="finding important">
    <div class="finding-header">
      <div>
        <div class="finding-id">BUG-08</div>
        <div class="finding-title">downloadPdf() : indexOf() peut retourner -1 si l'index est désynchronisé</div>
      </div>
      <span class="pill important">Important</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">aed-studies-improved.html</span> lignes 1550, 1813</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Le template HTML de carte génère : <code>onclick="downloadPdf('${key}', ${data[key].studies.indexOf(s)})"</code>. Si entre le rendu du template et le clic utilisateur l'objet <code>data</code> a été muté (ajout/suppression d'une étude), <code>indexOf(s)</code> peut retourner <code>-1</code>. L'accès <code>data[conv].studies[-1]</code> retourne <code>undefined</code>, et <code>.pdfData</code> sur <code>undefined</code> lève un <code>TypeError</code> non géré.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Correction recommandée</div>
        <p>Identifier les études par leur propriété <code>id</code> stable plutôt que par leur position dans le tableau. Passer <code>s.id</code> à la fonction et la réécrire pour chercher par <code>id</code> : <code>data[conv].studies.find(x => x.id === id)</code>.</p>
      </div>
    </div>
  </div>

  <div class="finding important">
    <div class="finding-header">
      <div>
        <div class="finding-id">BUG-09</div>
        <div class="finding-title">Double <code>&lt;h1&gt;</code> sur aed-main-page.html — violation de la hiérarchie de titres</div>
      </div>
      <span class="pill important">Important</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">aed-main-page.html</span> lignes 97 (logo header) et 616 (page banner)</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>La page contient deux éléments <code>&lt;h1&gt;</code> : l'un dans le logo du header (<code>"AED Congo"</code>) et l'un dans le banner principal (<code>"Agir pour un développement durable"</code>). Une page HTML ne doit comporter qu'un seul <code>&lt;h1&gt;</code> selon les spécifications WCAG 2.1 (SC 1.3.1) et les bonnes pratiques SEO. Les lecteurs d'écran et les moteurs de recherche utilisent le <code>&lt;h1&gt;</code> comme titre principal de la page. Cette erreur est reproduite sur toutes les pages internes (nos-actions, études, soutenir).</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Correction recommandée</div>
        <p>Le logo dans le header doit utiliser <code>&lt;span&gt;</code> ou <code>&lt;p&gt;</code> avec <code>aria-label</code> sur le lien parent plutôt qu'un <code>&lt;h1&gt;</code>. Le vrai <code>&lt;h1&gt;</code> est le titre de la section principale.</p>
      </div>
    </div>
  </div>

  <div class="finding important">
    <div class="finding-header">
      <div>
        <div class="finding-id">BUG-10</div>
        <div class="finding-title">Lightbox et navigation admin non accessibles au clavier — éléments interactifs non-boutons</div>
      </div>
      <span class="pill important">Important</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">aed-main-page.html</span> lignes 940–948 (lightbox nav) &nbsp;·&nbsp; <span class="file-ref">nos-actions.html</span> (onclick sur div pour cards)</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Les contrôles de navigation de la lightbox (<code>.lightbox-close</code>, <code>.lightbox-prev</code>, <code>.lightbox-next</code>) sont des <code>&lt;span&gt;</code> avec <code>onclick</code>. Ils ne sont pas focusables au clavier (absence de <code>tabindex="0"</code> et de <code>role="button"</code>) et n'émettent pas d'événement <code>keydown</code> sur Entrée/Espace. Un utilisateur naviguant uniquement au clavier ne peut ni fermer ni naviguer dans la lightbox. De même, le focus n'est pas piégé dans la lightbox lorsqu'elle est ouverte (absence de focus trap).</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Correction recommandée</div>
        <p>Remplacer les <code>&lt;span&gt;</code> interactifs par des <code>&lt;button type="button"&gt;</code>. Implémenter un focus trap lors de l'ouverture de la lightbox, et restaurer le focus sur l'élément déclencheur lors de la fermeture.</p>
      </div>
    </div>
  </div>

  <div class="finding important">
    <div class="finding-header">
      <div>
        <div class="finding-id">BUG-11</div>
        <div class="finding-title">Slideshow sans contrôle pause/play — violation WCAG 2.1 SC 2.2.2</div>
      </div>
      <span class="pill important">Important</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">aed-main-page.html</span> lignes 191–223 (animation <code>slidescroll</code>)</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>L'animation CSS du slideshow (<code>animation: slidescroll 35s linear infinite</code>) se met en pause au survol souris (<code>animation-play-state: paused</code>) mais aucun bouton de contrôle "Pause" n'est fourni. Pour les utilisateurs ne pouvant pas utiliser une souris (clavier, mobilité réduite) ou ceux souffrant de sensibilité aux mouvements, l'animation ne peut pas être arrêtée. Le critère WCAG 2.1 SC 2.2.2 (Level A) impose de pouvoir mettre en pause, arrêter ou masquer tout contenu en mouvement automatique durant plus de 5 secondes.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Correction recommandée</div>
        <p>Ajouter un bouton <code>aria-label="Mettre en pause le diaporama"</code> qui bascule <code>animation-play-state</code> entre <code>running</code> et <code>paused</code>. Respecter automatiquement la préférence système via <code>@media (prefers-reduced-motion: reduce)</code> en supprimant l'animation.</p>
      </div>
    </div>
  </div>

  <div class="finding important">
    <div class="finding-header">
      <div>
        <div class="finding-id">BUG-12</div>
        <div class="finding-title">Clé publique Stripe live hardcodée dans le HTML — expiration et rotation impossibles</div>
      </div>
      <span class="pill important">Important</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">page-nous-soutenir.html</span> ligne 856</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>La clé publique Stripe live (<code>pk_live_51TX3IT...</code>) est inscrite en dur dans le HTML. Si ce fichier est versionné dans Git, la clé figurera dans tout l'historique des commits. Bien que les clés publiques Stripe soient conçues pour être exposées côté client, les inscrire dans le code source versionné rend la rotation de clé complexe (nécessite un commit + redéploiement) et peut conduire à des confusions avec les clés secrètes lors de futures modifications.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Correction recommandée</div>
        <p>Déclarer la clé comme variable d'environnement Netlify (<code>STRIPE_PUBLIC_KEY</code>) et l'injecter via un fichier de configuration ou un build step. Séparer l'environnement de test (clé <code>pk_test_</code>) de l'environnement de production.</p>
      </div>
    </div>
  </div>

  <div class="finding important">
    <div class="finding-header">
      <div>
        <div class="finding-id">BUG-13</div>
        <div class="finding-title">Déduction fiscale de 66 % présentée sans qualification du régime fiscal applicable</div>
      </div>
      <span class="pill important">Important</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">page-nous-soutenir.html</span> lignes 749–751, 761, 794</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Le calcul fiscal affiché (<code>Déduction fiscale (66 %)</code>) et la mention <code>"Reçu fiscal automatique pour bénéficier d'une déduction d'impôt à 66 %"</code> correspondent au régime d'impôt sur le revenu français (article 200 CGI). Cette déduction n'est pas applicable aux contribuables congolais. La note de bas de formulaire indique <code>"Estimation IR France/Congo"</code> mais sans préciser les conditions d'éligibilité. Pour un donateur congolais, cette information est inexacte et peut être considérée comme trompeuse.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Correction recommandée</div>
        <p>Ajouter une note explicite : <em>"La déduction fiscale à 66 % s'applique uniquement aux contribuables soumis à l'impôt sur le revenu français (Art. 200 CGI). Vérifiez votre éligibilité avec un conseiller fiscal."</em> Envisager un sélecteur de pays pour afficher le bon calcul selon la résidence fiscale du donateur.</p>
      </div>
    </div>
  </div>

  <div class="finding important">
    <div class="finding-header">
      <div>
        <div class="finding-id">BUG-14</div>
        <div class="finding-title">Redirection index.html → aed-main-page.html insuffisante : la page principale reste accessible sous deux URLs distinctes</div>
      </div>
      <span class="pill important">Important</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">netlify.toml</span> lignes 4–7 &nbsp;·&nbsp; <span class="file-ref">sitemap.xml</span></p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>La redirection <code>/index.html → /aed-main-page.html</code> redirige les accès à <code>/index.html</code> mais la page <code>aed-main-page.html</code> reste directement accessible. Google peut indexer le contenu sous deux URLs différentes (<code>/</code> et <code>/aed-main-page.html</code>), causant du contenu dupliqué et une dilution du PageRank. La balise canonical pointe vers <code>https://aed-congo.netlify.app/</code>, ce qui est correct, mais sans redirection explicite de <code>/aed-main-page.html</code>, les liens externes pointant vers cette URL ne bénéficient pas de la consolidation.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Correction recommandée</div>
        <pre><span class="fix">[[redirects]]
  from   = "/aed-main-page.html"
  to     = "/"
  status = 301</span></pre>
      </div>
    </div>
  </div>

  <!-- ── BUGS SOUHAITABLES ── -->
  <h3 style="font-size:1.1rem; font-weight:700; color:var(--desirable); margin: 28px 0 14px;" id="sec-bugs-desirable">1.3 Bugs Souhaitables (corrections mineures)</h3>

  <div class="finding desirable">
    <div class="finding-header">
      <div>
        <div class="finding-id">BUG-15</div>
        <div class="finding-title">Fichier .gitignore nommé _gitignore — non reconnu par Git</div>
      </div>
      <span class="pill desirable">Souhaitable</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Le fichier est nommé <code>_gitignore</code> au lieu de <code>.gitignore</code>. Git ne le reconnaît pas et n'ignore donc aucun des fichiers listés (<code>.DS_Store</code>, <code>Thumbs.db</code>, <code>.netlify/</code>, fichiers de backup). Ces fichiers seront inclus dans les commits si présents localement.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Correction</div>
        <p>Renommer le fichier en <code>.gitignore</code> à la racine du dépôt.</p>
      </div>
    </div>
  </div>

  <div class="finding desirable">
    <div class="finding-header">
      <div>
        <div class="finding-id">BUG-16</div>
        <div class="finding-title">Caractère parasite <code>&gt;</code> à la fin de aed-main-page.html</div>
      </div>
      <span class="pill desirable">Souhaitable</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">aed-main-page.html</span> ligne 1111 (dernière ligne)</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Après la balise fermante <code>&lt;/html&gt;</code>, un caractère orphelin <code>&gt;</code> est présent à la ligne 1111. Le parser HTML le tolère mais il constitue un résidu d'édition qui peut perturber certains outils d'analyse et génère un avertissement de validation W3C.</p>
      </div>
    </div>
  </div>

  <div class="finding desirable">
    <div class="finding-header">
      <div>
        <div class="finding-id">BUG-17</div>
        <div class="finding-title">site.webmanifest référence des icônes 192×192 et 512×512 non fournies dans les fichiers du projet</div>
      </div>
      <span class="pill desirable">Souhaitable</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">site.webmanifest</span> lignes 5–13</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Le manifest référence <code>/favicon-192x192.png</code> et <code>/favicon-512x512.png</code>. Ces fichiers ne figurent pas dans la liste des assets fournis. Si absents du serveur, l'installation en mode PWA (Progressive Web App) échouera silencieusement et Chrome affichera une erreur de manifest dans la console.</p>
      </div>
    </div>
  </div>

  <div class="finding desirable">
    <div class="finding-header">
      <div>
        <div class="finding-id">BUG-18</div>
        <div class="finding-title">Règles CSS dupliquées dans aed-studies-improved.html créant des conflits de spécificité</div>
      </div>
      <span class="pill desirable">Souhaitable</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">aed-studies-improved.html</span> lignes 76–84 vs 148–178 &nbsp;·&nbsp; <span class="file-ref">page-nous-soutenir.html</span> lignes 91–94</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Les règles <code>.logo-text h1</code>, <code>.logo-text p</code> et <code>.nav-main</code> sont définies deux fois avec des valeurs légèrement différentes. Par exemple, <code>.nav-main { gap: 4px }</code> (ligne 80) est écrasé par <code>.nav-main { gap: 32px }</code> (ligne 172). L'espacement effectif de la navigation est 32px, mais la première déclaration crée une confusion lors de la maintenance. Ces doublons suggèrent un copier-coller partiel d'un état de code intermédiaire.</p>
      </div>
    </div>
  </div>

  <div class="finding desirable">
    <div class="finding-header">
      <div>
        <div class="finding-id">BUG-19</div>
        <div class="finding-title">Classe CSS .logo-brand définie mais jamais utilisée dans le HTML</div>
      </div>
      <span class="pill desirable">Souhaitable</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">aed-main-page.html</span> ligne 98 &nbsp;·&nbsp; <span class="file-ref">aed-studies-improved.html</span> ligne 77</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>La classe <code>.logo-brand</code> est définie dans le CSS de plusieurs pages mais n'est attachée à aucun élément HTML dans ces mêmes fichiers. Code mort à supprimer pour réduire la taille du CSS et améliorer la maintenabilité.</p>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════════════════
       SECTION 2 — AMÉLIORATIONS
  ══════════════════════════════════════ -->
  <h2 class="section-title" id="sec-ameliorations"><span class="icon">⚡</span> Section 2 — Améliorations Enterprise</h2>
  <p class="section-intro">Les améliorations ci-dessous ne constituent pas des erreurs fonctionnelles actuelles mais des déficits par rapport au niveau de qualité « Enterprise/ONG » cible. Elles sont classées par domaine puis par priorité.</p>

  <!-- ── ARCHITECTURE ── -->
  <h3 class="section-title" id="sec-archi" style="font-size:1.15rem; margin-top:36px; border-bottom-color:#e2e0db;">🏗 Architecture &amp; Maintenabilité</h3>

  <div class="finding critical">
    <div class="finding-header">
      <div>
        <div class="finding-id">AME-01</div>
        <div class="finding-title">Architecture monolithique : header, navigation, footer et variables CSS dupliqués sur 4 fichiers (~3 000 lignes de code répété)</div>
      </div>
      <span class="pill critical">Critique</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Chaque page HTML est un fichier autonome embarquant la totalité du CSS et du JS. Le header (navigation, logo, social), le footer, les variables CSS <code>:root</code>, les fonctions utilitaires (<code>escapeHtml</code>, hamburger, copyright year) sont copiés-collés dans les 4 pages principales. Toute modification de la navigation nécessite d'éditer 4 fichiers manuellement. Ce pattern est incompatible avec un niveau Enterprise et est la source principale des incohérences détectées (BUG-18, BUG-19).</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Recommandation</div>
        <p>Migrer vers un générateur de site statique (SSG) compatible Netlify. <strong>Eleventy (11ty)</strong> est recommandé pour sa simplicité et sa compatibilité native avec le HTML existant. Les composants partagés (header, footer, head) deviennent des includes Nunjucks. Alternative plus légère : <strong>Vite + HTML templates</strong>. Le CSS partagé est externalisé dans un fichier <code>styles/global.css</code>.</p>
      </div>
    </div>
  </div>

  <div class="finding critical">
    <div class="finding-header">
      <div>
        <div class="finding-id">AME-02</div>
        <div class="finding-title">Absence de page 404 personnalisée</div>
      </div>
      <span class="pill critical">Critique</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Aucun fichier <code>404.html</code> n'est présent dans le projet. Toute URL incorrecte affiche la page d'erreur générique de Netlify, sans branding AED, sans navigation et sans lien de retour vers l'accueil. C'est une défaillance d'expérience utilisateur basique pour un site institutionnel.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Recommandation</div>
        <p>Créer un fichier <code>404.html</code> à la racine reprenant le header/footer du site avec un message clair et un lien vers l'accueil. Netlify le sert automatiquement pour toute URL non résolue.</p>
      </div>
    </div>
  </div>

  <div class="finding important">
    <div class="finding-header">
      <div>
        <div class="finding-id">AME-03</div>
        <div class="finding-title">Absence de processus de build et de tests automatisés</div>
      </div>
      <span class="pill important">Important</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Aucun <code>package.json</code>, aucun linter (ESLint, Stylelint), aucun validateur HTML automatique, aucune suite de tests. La minification est déléguée à Netlify post-build, ce qui signifie que le code déployé peut différer du code développé localement. Les régressions ne peuvent être détectées qu'après déploiement.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Recommandation</div>
        <p>Introduire un <code>package.json</code> minimal avec : un linter HTML (<code>htmlhint</code>), un validateur CSS (<code>stylelint</code>), et des tests de fumée via <code>playwright</code> (vérification que les pages se chargent, que le formulaire est détectable, etc.). Configurer Netlify pour exécuter ces checks avant le déploiement.</p>
      </div>
    </div>
  </div>

  <!-- ── SÉCURITÉ ── -->
  <h3 class="section-title" id="sec-secu" style="font-size:1.15rem; margin-top:36px; border-bottom-color:#e2e0db;">🔒 Sécurité</h3>

  <div class="finding critical">
    <div class="finding-header">
      <div>
        <div class="finding-id">AME-04</div>
        <div class="finding-title">CSP : directive script-src contient 'unsafe-inline' — neutralise la protection XSS</div>
      </div>
      <span class="pill critical">Critique</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">netlify.toml</span> directive <code>Content-Security-Policy</code></p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>La valeur <code>'unsafe-inline'</code> dans <code>script-src</code> permet l'exécution de tout script inline, annulant la protection principale de la CSP contre les injections XSS. Cette valeur a probablement été ajoutée pour permettre l'exécution du code JavaScript inline présent dans les fichiers HTML. Pour un niveau Enterprise, tous les scripts inline doivent être externalisés ou protégés par des nonces générés dynamiquement.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Recommandation</div>
        <p>Externaliser les scripts inline en fichiers <code>.js</code> séparés (supprime le besoin de <code>'unsafe-inline'</code>). Alternativement, utiliser des hashes CSP (<code>'sha256-...'</code>) pour chaque bloc script inline que l'on souhaite autoriser explicitement.</p>
      </div>
    </div>
  </div>

  <div class="finding important">
    <div class="finding-header">
      <div>
        <div class="finding-id">AME-05</div>
        <div class="finding-title">Absence de rate limiting sur le formulaire de contact (risque de spam)</div>
      </div>
      <span class="pill important">Important</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Le formulaire de contact ne dispose d'aucune protection anti-spam au-delà du champ honeypot Netlify (non encore implémenté, voir BUG-03). Sans protection CAPTCHA ou rate limiting, le formulaire est exposé à des soumissions automatisées massives qui satureront la boîte email de l'association.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Recommandation</div>
        <p>Activer le champ honeypot Netlify Forms (non-invasif). Pour un niveau Enterprise, implémenter Netlify's built-in spam filter ou ajouter Cloudflare Turnstile (alternative invisible à reCAPTCHA, plus respectueuse de la vie privée).</p>
      </div>
    </div>
  </div>

  <!-- ── PERFORMANCE ── -->
  <h3 class="section-title" id="sec-perf" style="font-size:1.15rem; margin-top:36px; border-bottom-color:#e2e0db;">⚡ Performance</h3>

  <div class="finding important">
    <div class="finding-header">
      <div>
        <div class="finding-id">AME-06</div>
        <div class="finding-title">Images hero hébergées sur i.imgur.com — dépendance à un service tiers non maîtrisé</div>
      </div>
      <span class="pill important">Important</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">page-nous-soutenir.html</span> ligne 105 &nbsp;·&nbsp; <span class="file-ref">nos-actions.html</span> ligne 32</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Les images hero principales (<code>https://i.imgur.com/RYvENCb.jpg</code>) sont chargées depuis Imgur. Imgur peut supprimer des images sans préavis ou limiter le bandwidth. Une indisponibilité se traduit par un hero banner vide sur toutes les pages. De plus, chaque chargement génère une requête DNS externe supplémentaire augmentant le temps de rendu initial.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Recommandation</div>
        <p>Migrer toutes les images vers le dossier <code>/images/</code> du projet, versionné dans Git et servi par Netlify CDN. Utiliser des formats modernes : WebP avec fallback JPEG. La configuration <code>netlify.toml</code> inclut déjà la compression d'images au build.</p>
      </div>
    </div>
  </div>

  <div class="finding important">
    <div class="finding-header">
      <div>
        <div class="finding-id">AME-07</div>
        <div class="finding-title">PDFs stockés en base64 dans localStorage — dépassement de quota probable à partir de ~3 Mo de PDF</div>
      </div>
      <span class="pill important">Important</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">aed-studies-improved.html</span> lignes 1756–1768 (<code>handlePdfUpload</code>)</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Un PDF est converti en base64 (overhead de ~33 %) et stocké dans <code>localStorage</code>. La limite de <code>localStorage</code> est de 5–10 Mo selon le navigateur. Un seul PDF de 4 Mo saturera l'espace disponible, levant un <code>QuotaExceededError</code> non géré. Par ailleurs, ce stockage est fonctionnellement inutile (voir BUG-02) car les données ne sont pas partagées entre navigateurs.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Recommandation</div>
        <p>Héberger les PDFs sur Netlify Large Media ou Cloudinary. Stocker uniquement l'URL du PDF dans les données de l'étude. Avec Decap CMS, les PDFs sont versionnés dans Git LFS ou hébergés sur un service dédié.</p>
      </div>
    </div>
  </div>

  <div class="finding important">
    <div class="finding-header">
      <div>
        <div class="finding-id">AME-08</div>
        <div class="finding-title">Netlify Identity widget chargé sur toutes les pages — coût réseau inutile sur les pages sans admin</div>
      </div>
      <span class="pill important">Important</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">aed-main-page.html</span> ligne 10 &nbsp;·&nbsp; <span class="file-ref">aed-studies-improved.html</span> ligne 7 &nbsp;·&nbsp; <span class="file-ref">nos-actions.html</span> ligne 16</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Le script <code>netlify-identity-widget.js</code> (~100 Ko gzippé) est chargé de manière bloquante dans le <code>&lt;head&gt;</code> de toutes les pages, y compris <code>mentions-legales.html</code> et <code>politique-confidentialite.html</code> (où il n'est pas utilisé). Ce script génère également une connexion WebSocket de vérification de session à chaque chargement de page.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Recommandation</div>
        <p>Charger le widget de manière conditionnelle et asynchrone uniquement sur les pages qui en ont besoin (<code>aed-studies-improved.html</code> et <code>nos-actions.html</code>). Utiliser <code>&lt;script defer&gt;</code> pour ne pas bloquer le parsing HTML.</p>
      </div>
    </div>
  </div>

  <div class="finding desirable">
    <div class="finding-header">
      <div>
        <div class="finding-id">AME-09</div>
        <div class="finding-title">Aucune image responsive (srcset / WebP) — chargement d'images plein format sur mobile</div>
      </div>
      <span class="pill desirable">Souhaitable</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Aucune balise <code>srcset</code> ni attribut <code>sizes</code> n'est utilisé. Les images de la galerie, du hero et des conventions sont chargées en pleine résolution sur tous les appareils. Sur mobile (résolution 375–430px), des images destinées à des viewports de 1200px sont téléchargées inutilement. Les formats WebP et AVIF, qui offrent des réductions de taille de 30–50 % par rapport au JPEG, ne sont pas utilisés.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Recommandation</div>
        <p>Utiliser <code>&lt;picture&gt;</code> avec <code>&lt;source type="image/webp"&gt;</code> et <code>srcset</code> pour les images importantes. Netlify Image CDN (disponible sur les plans Pro) peut transformer automatiquement les images à la demande.</p>
      </div>
    </div>
  </div>

  <!-- ── A11Y ── -->
  <h3 class="section-title" id="sec-a11y" style="font-size:1.15rem; margin-top:36px; border-bottom-color:#e2e0db;">♿ Accessibilité (WCAG 2.1)</h3>

  <div class="finding important">
    <div class="finding-header">
      <div>
        <div class="finding-id">AME-10</div>
        <div class="finding-title">Contraste insuffisant pour var(--text-muted) — ratio ~3.5:1 en dessous du seuil WCAG AA</div>
      </div>
      <span class="pill important">Important</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>La couleur <code>--text-muted: #7a8a6a</code> utilisée sur fond blanc <code>#ffffff</code> produit un ratio de contraste d'environ <strong>3.5:1</strong>. WCAG 2.1 SC 1.4.3 (Level AA) exige un ratio minimum de <strong>4.5:1</strong> pour le texte normal. Cette couleur est utilisée dans les métadonnées de cartes, les notes de bas de formulaire et les labels de statistiques — des informations informatives non décoratives.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Recommandation</div>
        <p>Ajuster <code>--text-muted</code> à <code>#5a6a4a</code> (ratio ~5.2:1 sur fond blanc). Utiliser l'outil <em>WebAIM Contrast Checker</em> pour vérifier toutes les combinaisons couleur/fond du site.</p>
      </div>
    </div>
  </div>

  <div class="finding important">
    <div class="finding-header">
      <div>
        <div class="finding-id">AME-11</div>
        <div class="finding-title">Libellés de liens non descriptifs hors contexte — violation WCAG 2.4.6</div>
      </div>
      <span class="pill important">Important</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Les liens <code>"En savoir plus"</code> présents dans les cards de la section "Champ d'actions" et les boutons <code>"Télécharger PDF"</code> n'ont pas d'attribut <code>aria-label</code> contextuel. Un utilisateur de lecteur d'écran naviguant par liste de liens entend plusieurs occurrences de "En savoir plus" sans pouvoir distinguer à quoi elles se réfèrent.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Recommandation</div>
        <p>Ajouter <code>aria-label</code> : <code>&lt;a ... aria-label="En savoir plus sur les Conventions BRS"&gt;</code>. Ou inclure un <code>&lt;span class="visually-hidden"&gt;</code> avec le contexte complet.</p>
      </div>
    </div>
  </div>

  <div class="finding desirable">
    <div class="finding-header">
      <div>
        <div class="finding-id">AME-12</div>
        <div class="finding-title">Absence de lang sur les rares passages en anglais dans les attributs et métadonnées techniques</div>
      </div>
      <span class="pill desirable">Souhaitable</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Des acronymes et abréviations anglais (<code>POPs</code>, <code>GHS</code>, <code>SMART</code>, <code>AbE</code>) apparaissent dans les descriptions des études sans balise <code>&lt;abbr title="..."&gt;</code> ni attribut <code>lang="en"</code>. Les lecteurs d'écran configurés en français prononceront incorrectement ces termes.</p>
      </div>
    </div>
  </div>

  <!-- ── SEO ── -->
  <h3 class="section-title" id="sec-seo" style="font-size:1.15rem; margin-top:36px; border-bottom-color:#e2e0db;">🔍 SEO</h3>

  <div class="finding important">
    <div class="finding-header">
      <div>
        <div class="finding-id">AME-13</div>
        <div class="finding-title">URLs non optimisées pour le SEO — noms de fichiers internes exposés dans les URLs publiques</div>
      </div>
      <span class="pill important">Important</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Les URLs publiques du site exposent des noms de fichiers de développement : <code>/aed-studies-improved.html</code> et <code>/aed-main-page.html</code>. Ces noms sont peu mnémotechniques, pénalisent la lisibilité des partages et sont légèrement défavorables au SEO. Le mot <code>"improved"</code> dans une URL de production est révélateur d'un état de développement non nettoyé.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Recommandation</div>
        <p>Avec l'architecture SSG recommandée (AME-01), les pages seraient naturellement servies sous <code>/</code>, <code>/etudes/</code>, <code>/actions/</code>, <code>/nous-soutenir/</code>. En attendant, configurer des redirections Netlify : <code>/etudes/ → /aed-studies-improved.html</code>.</p>
      </div>
    </div>
  </div>

  <div class="finding desirable">
    <div class="finding-header">
      <div>
        <div class="finding-id">AME-14</div>
        <div class="finding-title">sameAs dans le JSON-LD pointe vers des URLs Facebook/Twitter génériques non vérifiées</div>
      </div>
      <span class="pill desirable">Souhaitable</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">aed-main-page.html</span> lignes 552–555</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Le JSON-LD Organisation contient <code>"sameAs": ["https://facebook.com/aed-congo", "https://twitter.com/aed_congo"]</code>. Ces URLs pointent vers des profils dont l'existence réelle n'est pas confirmée. Les liens sociaux dans le header (<code>https://facebook.com</code>, <code>https://twitter.com</code>) pointent vers les pages d'accueil des réseaux, pas vers les comptes de l'association. Une structured data incorrecte peut nuire à la confiance des moteurs de recherche.</p>
      </div>
    </div>
  </div>

  <div class="finding desirable">
    <div class="finding-header">
      <div>
        <div class="finding-id">AME-15</div>
        <div class="finding-title">Sitemap.xml statique non automatisé — risque de désynchronisation lors des mises à jour</div>
      </div>
      <span class="pill desirable">Souhaitable</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Le fichier <code>sitemap.xml</code> est édité manuellement. Les dates <code>&lt;lastmod&gt;</code> (actuellement <code>2026-05-08</code> et <code>2026-05-21</code>) devront être mises à jour manuellement à chaque modification de contenu. L'oubli de cette mise à jour retardera la ré-indexation par les moteurs.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Recommandation</div>
        <p>Générer le sitemap automatiquement lors du build via un plugin Eleventy (<code>@quasibit/eleventy-plugin-sitemap</code>) ou un script Node.js qui lit la liste des fichiers HTML et génère les entrées avec la date du commit.</p>
      </div>
    </div>
  </div>

  <!-- ── LEGAL ── -->
  <h3 class="section-title" id="sec-legal" style="font-size:1.15rem; margin-top:36px; border-bottom-color:#e2e0db;">⚖️ Conformité Légale &amp; RGPD</h3>

  <div class="finding critical">
    <div class="finding-header">
      <div>
        <div class="finding-id">AME-16</div>
        <div class="finding-title">Bandeau cookies non conforme : refus n'interdit pas le chargement des cookies — consentement non préalable</div>
      </div>
      <span class="pill critical">Critique</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">page-nous-soutenir.html</span> lignes 814–842 &nbsp;·&nbsp; (implémentation similaire sur toutes les pages)</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Le bandeau cookies enregistre le choix dans <code>localStorage</code> mais ne bloque pas le chargement de Google Analytics. Que l'utilisateur accepte ou refuse, les cookies Analytics sont déposés de manière identique (voir BUG-04). La fonction <code>rejectCookies()</code> n'appelle aucune API de révocation ou de mise à jour du consentement Analytics. Le bandeau est donc purement cosmétique et non conforme au RGPD.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Recommandation</div>
        <p>Coupler le bandeau au mode consentement Google (voir BUG-04 pour le code). La fonction <code>rejectCookies()</code> doit appeler <code>gtag('consent', 'update', { analytics_storage: 'denied' })</code> et supprimer les cookies Analytics existants (<code>_ga</code>, <code>_gid</code>) via <code>document.cookie</code>.</p>
      </div>
    </div>
  </div>

  <div class="finding important">
    <div class="finding-header">
      <div>
        <div class="finding-id">AME-17</div>
        <div class="finding-title">Formulaire de don sans case de consentement aux conditions de traitement des données</div>
      </div>
      <span class="pill important">Important</span>
    </div>
    <div class="finding-body">
      <div class="finding-section">
        <div class="finding-section-label">Fichiers concernés</div>
        <p><span class="file-ref">page-nous-soutenir.html</span> (formulaire de don, étape 3)</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Observation</div>
        <p>Le formulaire collecte des données personnelles (nom, prénom, email, adresse) à des fins de traitement du don et d'émission d'un reçu fiscal. Ces données sont transmises à Stripe et potentiellement conservées par l'association. Le formulaire ne comporte pas de case à cocher de consentement explicite ni de lien vers la politique de confidentialité au moment de la soumission.</p>
      </div>
      <div class="finding-section">
        <div class="finding-section-label">Recommandation</div>
        <p>Ajouter avant le bouton "Finaliser mon don" : <em>"En soumettant ce formulaire, j'accepte que mes données soient traitées conformément à la [politique de confidentialité]."</em> avec une case à cocher obligatoire.</p>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════════════════
       SECTION 3 — ROADMAP
  ══════════════════════════════════════ -->
  <h2 class="section-title" id="sec-roadmap"><span class="icon">🗺</span> Section 3 — Feuille de Route Priorisée</h2>
  <p class="section-intro">Les actions sont regroupées par sprint de priorité décroissante. Le critère de priorisation combine l'impact sur la sécurité, la légalité et la confiance institutionnelle.</p>

  <table>
    <thead>
      <tr>
        <th>Sprint</th>
        <th>Horizon</th>
        <th>Éléments</th>
        <th>Effort estimé</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong style="color:var(--critical)">🔴 Sprint 1</strong><br><span style="font-size:12px">Blocages sécurité</span></td>
        <td>Semaine 1</td>
        <td>
          BUG-01 (hash admin exposé)<br>
          BUG-03 (formulaire Netlify Forms)<br>
          BUG-04 + AME-16 (RGPD Analytics + bandeau)<br>
          BUG-05 (OG image relative)<br>
          AME-04 (CSP unsafe-inline)
        </td>
        <td>3–5 jours</td>
      </tr>
      <tr>
        <td><strong style="color:var(--important)">🟠 Sprint 2</strong><br><span style="font-size:12px">Architecture & données</span></td>
        <td>Semaines 2–4</td>
        <td>
          BUG-02 (localStorage → Decap CMS)<br>
          AME-01 (architecture SSG Eleventy)<br>
          AME-02 (page 404)<br>
          BUG-14 (redirection aed-main-page.html)<br>
          AME-06 (images hébergées localement)
        </td>
        <td>10–15 jours</td>
      </tr>
      <tr>
        <td><strong style="color:var(--desirable)">🔵 Sprint 3</strong><br><span style="font-size:12px">Qualité & Accessibilité</span></td>
        <td>Mois 2</td>
        <td>
          BUG-09 (double h1)<br>
          BUG-10 + BUG-11 (a11y lightbox & slideshow)<br>
          AME-07 (PDF → stockage externe)<br>
          AME-10 (contrastes WCAG)<br>
          AME-11 (libellés liens)<br>
          AME-17 (consentement formulaire don)<br>
          BUG-06, BUG-08 (error handling)
        </td>
        <td>8–12 jours</td>
      </tr>
      <tr>
        <td><strong style="color:var(--ink-muted)">⚪ Sprint 4</strong><br><span style="font-size:12px">Optimisations</span></td>
        <td>Mois 3+</td>
        <td>
          AME-03 (tests automatisés)<br>
          AME-08 (Identity widget lazy)<br>
          AME-09 (images responsive WebP)<br>
          AME-13 (URLs SEO-friendly)<br>
          AME-15 (sitemap automatisé)<br>
          BUG-15 → BUG-19 (corrections mineures)
        </td>
        <td>Continu</td>
      </tr>
    </tbody>
  </table>

  <div class="callout warning">
    <span class="icon">⚠️</span>
    <div><strong>Attention au Sprint 1 :</strong> BUG-01 (mot de passe admin exposé) et BUG-04/AME-16 (RGPD) sont des risques légaux et de sécurité actifs. Ils doivent être traités avant toute nouvelle mise en production ou campagne de communication externe.</div>
  </div>

  <div class="callout info">
    <span class="icon">ℹ️</span>
    <div><strong>Prérequis du Sprint 2 :</strong> L'activation de Decap CMS (BUG-02) nécessite que <strong>Netlify Identity</strong> et <strong>Git Gateway</strong> soient activés dans le panneau Netlify avant le déploiement. Cette étape est documentée dans le fichier <code>SearchText___id_adminToggle__in_aed.txt</code> fourni.</div>
  </div>

  <!-- RÉCAPITULATIF POINTS POSITIFS -->
  <h2 class="section-title" style="margin-top:48px;"><span class="icon">✅</span> Acquis à Conserver</h2>
  <ul class="positive-list">
    <li><span class="check">✓</span> Design system CSS cohérent via custom properties — excellente base pour la migration vers un SSG</li>
    <li><span class="check">✓</span> Protection XSS via <code>escapeHtml()</code> systématiquement appliquée aux rendus de données dynamiques</li>
    <li><span class="check">✓</span> Balises SEO complètes : Open Graph, Twitter Card, JSON-LD Schema.org, canonical, geo meta</li>
    <li><span class="check">✓</span> Skip-link accessible et <code>:focus-visible</code> bien implémentés</li>
    <li><span class="check">✓</span> <code>@media (prefers-reduced-motion: reduce)</code> respecté pour les animations</li>
    <li><span class="check">✓</span> En-têtes de sécurité HTTP configurés dans Netlify : HSTS, X-Frame-Options, X-Content-Type-Options</li>
    <li><span class="check">✓</span> Attribut <code>loading="lazy"</code> sur les images non critiques, <code>fetchpriority="high"</code> sur le logo</li>
    <li><span class="check">✓</span> Navigation mobile fonctionnelle avec <code>aria-expanded</code> correctement géré</li>
    <li><span class="check">✓</span> Pages légales (mentions légales, politique de confidentialité) en place et non indexées (<code>noindex</code>)</li>
    <li><span class="check">✓</span> Fallback logo via <code>onerror</code> sur l'image — résilience en cas d'image manquante</li>
  </ul>

  <div style="margin-top:56px; padding-top:24px; border-top:1px solid var(--border); font-size:12px; color:var(--ink-muted); text-align:center;">
    Rapport d'Audit Technique — AED Congo &nbsp;·&nbsp; 21 mai 2026 &nbsp;·&nbsp; Confidentiel &nbsp;·&nbsp; 19 bugs identifiés, 17 améliorations recommandées
  </div>

</div><!-- /page -->
</body>
</html>
