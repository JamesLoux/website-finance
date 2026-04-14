# CLAUDE.md — Website Finance

## Contexte du projet
Site web personnel de finance de marché, servant de portfolio professionnel 
et de base de connaissances interactive. Destiné aux recruteurs et passionnés 
du domaine.

## Propriétaire
Ingénieur en maths appliquées à la finance de marché. Débutant en 
développement web — ne code pas lui-même, rédige uniquement le contenu 
des pages. Veut comprendre ce qu'il fait sans être noyé dans le code.

## Stack technique
- Next.js (App Router, JavaScript, pas TypeScript)
- Tailwind CSS
- Déployé sur Vercel

## État du projet
- [x] Setup complet (Node.js, Git, GitHub, Claude Code, Vercel)
- [x] Projet Next.js initialisé dans /website_finance
- [x] Page d'accueil (v1 — modifiable)
- [x] Navbar (Accueil / Cours / Simulateur / Quiz / À propos)
- [x] Page /cours — index des 8 modules
- [x] Page /quiz — index des quiz par module
- [x] Page /simulateur — placeholder
- [x] Page /a-propos — placeholder
- [x] Layout de cours avec sidebar (navigation) + TOC flottante à droite
- [x] Module 1 / Mouvement Brownien (template de référence)
- [x] Module 1 / Lemme d'Itô
- [x] Module 1 / Girsanov & Risque-Neutre
- [x] **Module 1 — Calcul stochastique : COMPLET (3/3 pages)**
- [x] Quiz Module 1 — Calcul stochastique (8 questions, KaTeX, corrigé)
- [x] Module 2 / Équation de Black-Scholes
- [x] Module 2 / Formule de Black-Scholes
- [x] Module 2 / Modèles de diffusion
- [x] Module 2 / Simulation de Monte-Carlo
- [x] **Module 2 — Pricing : COMPLET (4/4 pages)**
- [x] Module 3 / L'essentiel des Greeks (grecques-premier-ordre)
- [x] Module 3 / Quelques démonstrations (grecques-second-ordre)
- [x] Module 3 / Arbitrage Theta-Gamma (arbitrage-theta-gamma)
- [x] **Module 3 — The Greeks : COMPLET (3/3 pages)**
- [x] Module 6 / Vol implicite et nappes
- [x] Module 6 / Vol stochastique
- [x] Module 6 / Variance Swap & VIX
- [x] Module 6 / Skew Delta
- [x] **Module 6 — Volatilité : COMPLET (4/4 pages)**
- [x] Module 7 / Corrélation Indice et FX (correlation-fx)
- [x] Module 7 / Options Quanto & Composite (options-quanto)
- [x] **Module 7 — Quanto & FX : COMPLET (2/2 pages)**
- [x] Module 8 / Fonctionnement de la Fed (plomberie-fed)
- [x] Module 8 / Politique monétaire (politique-monetaire)
- [x] **Module 8 — Macro : COMPLET (2/2 pages)**
- [ ] Modules 4, 5
- [ ] Simulateur de stratégies
- [ ] Quiz Modules 2 à 8

## Architecture du site

### Navbar
Accueil / Cours / Simulateur / Quiz / À propos

### Pages principales
- `/` → Home (faite)
- `/cours` → Index des modules
- `/simulateur` → Simulateur de stratégies
- `/quiz` → Quiz par thématique
- `/a-propos` → Présentation personnelle

### Structure des cours (8 modules)
- `/cours/module-1-calcul-stochastique` — mouvement-brownien, lemme-ito, girsanov-risque-neutre
- `/cours/module-2-pricing` — equation-black-scholes, probabilites-d1-d2, modeles-diffusion, monte-carlo (ordre de navigation)
  - ⚠️ Le slug `probabilites-d1-d2` est conservé tel quel mais la page s'intitule **"Formule de Black-Scholes"** — le nom affiché et le slug divergent intentionnellement (renommage sans migration d'URL).
- `/cours/module-3-grecques` — grecques-premier-ordre ("L'essentiel des Greeks"), grecques-second-ordre ("Quelques démonstrations"), arbitrage-theta-gamma
  - ⚠️ Même divergence slug/titre que pour module-2 : les slugs sont conservés, les titres affichés diffèrent.
- `/cours/module-4-taux-credit` — swaps-flux, produits-courbe, modeles-taux
- `/cours/module-5-produits-equity` — vanilles-combinaisons, options-exotiques, produits-structures
- `/cours/module-6-volatilite` — vol-implicite-nappes, vol-stochastique, variance-swap-vix, skew-delta
- `/cours/module-7-quanto-fx` — correlation-fx ("Corrélation Indice et FX"), options-quanto ("Options Quanto & Composite")
- `/cours/module-8-macro` — plomberie-fed ("Fonctionnement de la Fed"), politique-monetaire
  - ⚠️ `gestion-reserves` supprimé : contenu abandonné, module réduit à 2 sous-pages.

### Simulateur
- Accessible depuis la navbar
- Lien contextuel depuis les pages de cours concernées

## Fonctionnalités prévues
1. Pages de cours (8 modules, 2-3 sous-pages chacun, contenu MDX rédigé par le propriétaire)
2. Composants interactifs : payoffs avec curseurs (strike, maturité, vol)
3. Simulateur de stratégies : prix, Greeks, surfaces de vol
4. Quiz par thématique
5. Visualisations animées générées en code

## Dépendances notables
- `katex` — rendu des formules LaTeX côté serveur (ajouté 2026-03-31)
- `chart.js` + `react-chartjs-2` — graphiques interactifs (ajouté 2026-03-31)
- `three` — rendu 3D WebGL pour la nappe de volatilité (ajouté 2026-04-09)

## Architecture des fichiers clés
```
app/
  layout.js                          ← Layout global : Header + Footer (toutes les pages)
  page.js                            ← Page d'accueil
  components/
    Header.js                        ← Navbar avec liens actifs (usePathname)
    Hero.js                          ← Section d'accroche
    Themes.js / ThemeCard.js         ← Grille des thématiques (accueil)
    Footer.js                        ← Pied de page
    Math.js                          ← <InlineMath> et <BlockMath> via KaTeX (server component)
  cours/
    layout.js                        ← Layout deux colonnes pour /cours/** (importe KaTeX CSS)
    page.js                          ← Index des 8 modules
    components/
      CoursClientLayout.js           ← Wrapper client : état sidebar + hamburger mobile + TOC
      Sidebar.js                     ← Sidebar : navigation 8 modules uniquement (TOC déplacée)
      TableOfContents.js             ← TOC flottante sticky à droite (visible xl+), scan h2[id] + délai 100ms
      BrownianMotionChart.js         ← Composant interactif : simulation MB avec slider σ
      DiffusionComparisonChart.js    ← Composant interactif : densités Normale (bleue) vs Log-Normale (verte), slider σ 0.1→1.0, ligne rouge frontière zéro, parsing:false + LinearScale
      GreeksChart.js                 ← Composant interactif : Greek sélectionné (dropdown) en fonction de S, Call + Put côte à côte (flex-col xl:flex-row), courbes noires, zones vert/rouge, ligne orange y=0, Filler plugin
      CallValueChart.js              ← Composant : prime BS vs valeur intrinsèque, zone verte valeur temps, fill:'+1', plage S 70-130, K=100 σ=20% r=5% τ=1an
      MonteCarloChart.js             ← Composant : canvas 2D natif (pas Chart.js), 30 trajectoires GBM bleues, ligne K rouge. Boutons toggle M (1 000/10 000/100 000), slider σ uniquement. S₀=K=100, T=1an, r=5% fixes. 3 cartes : prix MC (bleu), prix BS (gris), écart relatif en %. normCDF corrigée (A&S 7.1.26 → passer x/√2)
      BachelierChart.js              ← Composant : décomposition Bachelier — bruit bleu + tendance orange pointillés + trajectoire complète noire, Box-Muller, N=252 jours, bouton "Nouvelle simulation"
      VolSurfaceChart.js             ← Composant Three.js : nappe de volatilité 3D interactive — skew actions (sigmImpl avec term structure + skew + convexité exponentiels), heatmap vertexColors, wireframe, axes 3D (Line), labels (Sprite+CanvasTexture), rotation souris+touch natives. Three.js = npm dep.
      SABRCalibrationChart.js        ← Composant Chart.js : calibration interactive du smile SABR — formule Hagan asymptotique, 16 strikes K=70→115 en moneyness, courbe bleue de référence (α=0.25,β=0.50,ρ=−0.90,ν=1.50), courbe rouge ajustable via 4 sliders (α/β/ρ/ν), score RMSE avec barre de progression colorée (rouge→amber→vert→bleu). Axe Y 0→30%, axe X moneyness 0.70→1.15.
      VannaPutChart.js               ← Composant Chart.js : Prix et Delta d'un Put BS — deux graphiques côte à côte xl, courbe bleue dynamique + grise référence (15%), sliders vol/spot, ligne verticale via spotRef mutable, normCDF série de Taylor, N_POINTS=1000, tension=0.
      StickyStrikeChart.js           ← Composant Chart.js : smile fixe (skew actions) + point bleu mobile au spot + ligne verticale. Layout graphique xl:w-1/2 + bulle xl:w-1/2. Illustre le régime Sticky Strike (α=0).
      StickyDeltaChart.js            ← Composant Chart.js : smile fixe bleu + smile rouge qui translate avec le spot. Point bleu (fixe) + point rouge (ATM dynamique). Layout flex-1 + bulle xl:w-56. Illustre le régime Sticky Delta (α=1).
      StickySkewChart.js             ← Composant Chart.js : smile fixe bleu pointillé + smile rouge qui translate ET monte/baisse selon la courbe fixe. Vol ATM lue sur la courbe fixe au spot. Slope=−0.25, convexity=0.25. Illustre le régime Sticky Skew (vol locale).
    module-1-calcul-stochastique/
      mouvement-brownien/page.js     ← ⭐ TEMPLATE DE RÉFÉRENCE pour toutes les pages de cours
      lemme-ito/page.js              ← ✅ Fait
      girsanov-risque-neutre/page.js ← ✅ Fait
    module-2-pricing/
      equation-black-scholes/page.js ← ✅ Fait
      probabilites-d1-d2/page.js     ← ✅ Fait (titre affiché : "Formule de Black-Scholes", slug conservé)
      modeles-diffusion/page.js      ← ✅ Fait
      monte-carlo/page.js            ← ✅ Fait
    module-3-grecques/
      grecques-premier-ordre/page.js ← ✅ Fait (titre : "L'essentiel des Greeks", slug conservé)
      grecques-second-ordre/page.js  ← ✅ Fait (titre : "Quelques démonstrations", slug conservé)
      arbitrage-theta-gamma/page.js  ← ✅ Fait
    module-6-volatilite/
      vol-implicite-nappes/page.js   ← ✅ Fait
      vol-implicite-nappes/VolSurfaceWrapper.js ← Wrapper 'use client' nécessaire pour next/dynamic {ssr:false} depuis Server Component
      vol-stochastique/page.js       ← ✅ Fait
      vol-stochastique/SABRWrapper.js ← Wrapper 'use client' pour SABRCalibrationChart (next/dynamic ssr:false)
      variance-swap-vix/page.js      ← ✅ Fait
      skew-delta/page.js             ← ✅ Fait
      skew-delta/VannaWrapper.js     ← Wrapper 'use client' pour VannaPutChart (next/dynamic ssr:false)
      skew-delta/StickyStrikeWrapper.js ← Wrapper 'use client' pour StickyStrikeChart (next/dynamic ssr:false)
      skew-delta/StickyDeltaWrapper.js  ← Wrapper 'use client' pour StickyDeltaChart (next/dynamic ssr:false)
      skew-delta/StickySkewWrapper.js   ← Wrapper 'use client' pour StickySkewChart (next/dynamic ssr:false)
    module-7-quanto-fx/
      correlation-fx/page.js           ← ✅ Fait (titre : "Corrélation Indice et FX")
      options-quanto/page.js           ← ✅ Fait (titre : "Options Quanto & Composite") — regroupe Quanto + Composite, page finale du module
    module-8-macro/
      plomberie-fed/page.js            ← ✅ Fait (titre : "Fonctionnement de la Fed")
  quiz/
    page.js                          ← Index des quiz — Module 1 lien actif, autres badges "Bientôt disponible"
    module-1/
      page.js                        ← ✅ Quiz Module 1 : 8 questions interactives avec KaTeX
  simulateur/page.js                 ← Placeholder
  a-propos/page.js                   ← Placeholder
```

## Règles de style absolues
- **Pas de dark mode** — le site est toujours en thème clair. La media query `prefers-color-scheme: dark` a été supprimée de `globals.css`. Ne jamais la réintroduire.
- **Fond** : toujours `bg-white` ou `bg-gray-50` (jamais de fond sombre)
- **Texte principal** : `text-gray-900`
- **Texte secondaire / corps** : `text-gray-600`
- **Titres** : `text-gray-900` (ou `text-blue-600` pour l'accent)
- **Cards / boîtes de propriétés** : `bg-gray-50` avec `border border-gray-300` (jamais de fond coloré foncé)
- **Accent** : bleu → `text-blue-600`, `bg-blue-50`, `border-blue-100`
- **Bordures générales** : `border-gray-300` (remplace `border-gray-200` — migration faite le 2026-04-01 sur tous les fichiers de `app/`)
- **Cohérence** : même palette que la Home et la page /cours

## Conventions pour les pages de quiz
- **Template de référence** : `app/quiz/module-1/page.js`
- Composant client (`'use client'`) — KaTeX importé directement dans le fichier (pas via `Math.js` qui est server-only)
- Pattern KaTeX dans les quiz : `import katex from 'katex'` + `import 'katex/dist/katex.min.css'` + composant helper local `function Math({ children, block = false })` avec `dangerouslySetInnerHTML`
- Le CSS KaTeX est importé dans chaque page quiz (contrairement aux cours où il est dans `cours/layout.js`)
- Questions et choix sont du JSX (pas des strings) — permet d'imbriquer `<Math>` dans les énoncés et les choix
- Choix purement textuels : JSX minimal `<>texte</>` suffit, pas besoin de `<Math>`
- Logic standard : `current`, `selected`, `validated`, `results`, `finished` — réutiliser ce pattern pour tous les quiz
- Page index `/quiz/page.js` : déterminer si un quiz est disponible par `module.number === "01"` → à adapter au fur et à mesure (ajouter "02", "03"…)

## Conventions pour les pages de cours
- **Template de référence** : `app/cours/module-1-calcul-stochastique/mouvement-brownien/page.js`
- Chaque page de cours inclut : fil d'Ariane, titre h1, sections h2 avec `id` (pour la TOC), propriétés en boîtes bleues, navigation Précédent/Suivant, lien Quiz
- Formules LaTeX : `<InlineMath>` pour l'inline, `<BlockMath>` pour les équations centrées
- **CRITIQUE — syntaxe LaTeX** : toujours `{'\\formule'}` (guillemets simples), jamais `` {`\\formule`} `` (backticks). Les backticks dans `<InlineMath>` causent une erreur de parsing à la compilation.
- **Chemin d'import Math.js** : tous les modules (1 à 8) utilisent `'../../../components/Math'` (3 niveaux). La structure `app/cours/[module]/[page]/page.js` est identique pour tous les modules — 3 niveaux suffisent pour remonter à `app/`.
- **⚠️ CRITIQUE — next/dynamic {ssr:false} depuis un Server Component** : impossible d'utiliser `next/dynamic(() => import('...'), { ssr: false })` directement dans un fichier `page.js` (qui est un Server Component par défaut). Il faut créer un fichier wrapper `'use client'` intermédiaire (ex. `VolSurfaceWrapper.js`) dans le même dossier que la page, qui fait l'import dynamique, puis importer ce wrapper dans `page.js`. Applicable à tout composant Three.js ou browser-only.
- **⚠️ Chemin dans le wrapper `'use client'`** : le wrapper est dans `module-X/page-slug/`, donc pour atteindre `cours/components/`, il faut `'../../components/NomComposant'` (2 niveaux), pas 3.
- **Style texte** : ne pas utiliser de tirets longs (—) comme séparateurs décoratifs dans le corps du texte
- La TOC est générée automatiquement par `TableOfContents.js` (scan `h2[id]` avec délai 100ms) — panneau flottant sticky à droite, visible uniquement sur écrans xl+ (≥1280px)
- La TOC se met à jour automatiquement dès qu'on modifie le texte ou l'`id` d'un `h2` — pas besoin de toucher à `TableOfContents.js` ni à la sidebar
- Contenu rédigé par le propriétaire, composants interactifs créés par Claude Code
- Sessions courtes et thématiques, CLAUDE.md mis à jour à chaque fin de session

### Pattern standardisé du bas de page (appliqué à toutes les pages depuis 2026-04-08)
Toutes les pages de cours doivent terminer avec exactement ce pattern, dans cet ordre :

**1. Bloc quiz** (juste avant la navigation) :
```jsx
{/* ── Lien quiz ── */}
<div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
  Un quiz sur le Module X sera bientôt disponible.
</div>
```
Exception : si le quiz du module existe, remplacer par un lien actif :
```jsx
<div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
  Le quiz du Module 1 est disponible — <a href="/quiz/module-1" className="text-blue-600 hover:underline font-medium">S&apos;entraîner →</a>
</div>
```
Actuellement, seul le **Module 1** a un quiz actif (`/quiz/module-1`).

**2. Navigation Précédent/Suivant** :
```jsx
{/* ── Navigation Précédent / Suivant ── */}
<div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
  <a href="/cours/..." className="text-blue-600 hover:underline text-sm">
    ← Titre précédent
  </a>
  <a href="/cours/..." className="text-blue-600 hover:underline text-sm">
    Titre suivant →
  </a>
</div>
```
Si première page (pas de précédent) : `<div />` à la place du lien gauche. Utiliser `<a>` simples, **pas** `<Link>` avec carte.

## Journal des sessions
- **2026-04-13** :
  - **Page "Options Quanto & Composite"** (`app/cours/module-7-quanto-fx/options-quanto/page.js`) créée. Deuxième et dernière sous-page du Module 7. 5 sections h2.
    - **Section 1 — Les deux processus de base** : trois encadrés séparés `bg-gray-100` pour les EDS de l'action, du FX et la corrélation. Boîte bleue "Convention" sur le sens de cotation EUR/USD.
    - **Section 2 — L'option Quanto** : 5 sous-sections. Payoff `X_fixe × (S_T − K)_+` encadré. Changement de mesure Girsanov (`dW^{S,Q_USD} = dW^{S,Q_EUR} + ρσ_X dt`) encadré + boîte bleue "D'où vient le terme de correction ?". EDS sous Q_EUR avec drift ajusté `r_USD − q − ρσ_Sσ_X` encadrée. Forward Quanto encadré. Impact de ρ : deux boîtes côte à côte (ρ > 0 forward en baisse / ρ < 0 forward en hausse) + exemple chiffré + boîte bleue "Sensibilité à la corrélation" (Long Call → Short ρ, Long Put → Long ρ).
    - **Section 3 — L'option Composite** : Payoff `(S_T × X_T − K_EUR)_+` encadré. Volatilité composite `√(σ²_S + σ²_X + 2ρσ_Sσ_X)` encadrée + boîte bleue "Formule du portefeuille". Impact ρ : boîte bleue "Long Call/Put Composite → Long ρ" + boîte amber cas limite ρ=−1.
    - **Section 4 — Hedging dynamique et Cross-Gamma** : formule `dΠ ∝ (ρ_réal − ρ_impl) × σ_S × σ_X × S × X dt` dans une boîte bleue. Deux boîtes côte à côte (ρ_réal > ρ_impl / ρ_réal < ρ_impl). Citation encadrée de clôture.
    - **Section 5 — Synthèse** : tableau 4 lignes × 3 colonnes (Drift / Volatilité / Rôle de ρ / Exposition à ρ). Boîte bleue "En résumé".
    - Navigation : ← Corrélation Indice et FX / pas de suivant (page finale du module).
  - **Sidebar** : label `'Options quanto'` → `'Options Quanto & Composite'` ; entrée `options-composites` supprimée (contenu fusionné dans `options-quanto`).
  - **Module 7 — Quanto & FX : COMPLET (2/2 pages)**. La sous-page `options-composites` a été abandonnée — son contenu (payoff, vol composite, impact de ρ) a été intégré directement dans la page `options-quanto`.

- **2026-04-12** :
  - **Page "Corrélation Indice et FX"** (`app/cours/module-7-quanto-fx/correlation-fx/page.js`) créée. Première sous-page du Module 7. 4 sections h2.
    - **Section 1 — Corrélation et Bêta** : relation β = ρ × σ_A/σ_B encadrée. Définition de ρ via covariance normalisée (formule longue avec espérances). Boîte bleue "Linéarité de la covariance" : `Cov(aX, bY+Z) = ab·Cov(X,Y) + a·Cov(X,Z)` — propriété fondamentale qui sous-tend toute la suite. Paragraphe sur l'interprétation du Bêta vs la corrélation.
    - **Section 2 — Démonstration : corrélation indice-FX** : dérivation en 4 étapes (rendement de l'indice comme somme pondérée → covariance avec FX par linéarité → passage aux corrélations via Cov = ρσσ → simplification de σ_FX → résultat `ρ_{I,FX} = Σ w_i · ρ_{i,FX} · σ_i/σ_I` encadré). Boîte bleue "Interprétation" (pondération par σ_i/σ_I, effet de levier sur la corrélation).
    - **Section 3 — Volatilité d'un indice et corrélation implicite** : développement en 3 lignes alignées dans un `bg-gray-100` (Var(I) = Cov de la somme → bilinéarité → passage aux ρ_ij). Formule `σ_I = √(double somme)` encadrée séparément. Inégalité de Markowitz `σ_I ≤ Σ w_i σ_i` encadrée. Boîte bleue "Corrélation implicite" (extraction depuis les prix d'options indice + actions individuelles).
    - **Section 4 — Le trading de dispersion** : construction d'un trade short corrélation — deux boîtes bleues côte à côte (Jambe 1 : vendre Straddle indice / Jambe 2 : acheter Straddles actions). Tableau 3 scénarios × 4 colonnes (Actions dispersées → P&L positif / Actions corrélées → P&L négatif / Vol flat → faiblement négatif). Boîte bleue "L'intuition de la dispersion" (Earnings Season comme scénario idéal).
    - Navigation : ← Skew Delta (`/cours/module-6-volatilite/skew-delta`) / → Options Quanto (`/cours/module-7-quanto-fx/options-quanto`).
  - **Sidebar** (`app/cours/components/Sidebar.js`) : "Corrélation Indice et FX" (`correlation-fx`) ajoutée en première position dans le module 07, avant "Options quanto".
  - **Réorganisation** effectuée en cours de session : sections 2 et 3 échangées (la démo indice-FX passe avant la variance d'indice). Développement en 3 lignes de `σ_I²` ajouté dans un bloc aligné.


- **2026-03-30** : Construction complète de la page d'accueil (composants Header, Hero, Thématiques, Footer), ajustements du Hero, et mise en place du déploiement (Git, GitHub, Vercel).
- **2026-03-31** :
  - **Architecture** : Définition de la structure complète du site — navbar 5 entrées (Accueil, Cours, Simulateur, Quiz, À propos), 5 pages principales avec leurs routes, 8 modules de cours avec 2-3 sous-pages chacun.
  - **Navigation** : Refonte du Header (liens actifs via `usePathname`, composant `<Link>` Next.js). Header et Footer déplacés dans `app/layout.js` (plus de duplication par page). Hero CTA mis à jour vers `/cours`.
  - **Pages créées** : `/cours` (index 8 modules en grille), `/quiz` (index quiz par module avec badges "Bientôt disponible"), `/simulateur` (placeholder), `/a-propos` (placeholder).
  - **Layout de cours** : `app/cours/layout.js` → shell deux colonnes. `CoursClientLayout.js` → wrapper client gérant l'état ouvert/fermé de la sidebar + bouton hamburger mobile avec overlay. `Sidebar.js` → navigation complète des 8 modules avec sous-pages, lien actif mis en évidence (module + sous-page), TOC générée automatiquement au montage en scannant les `h2[id]` de la page courante, bouton fermer sur mobile.
  - **Rendu mathématique** : Installation de `katex`. Composant `app/components/Math.js` (server component) avec `<InlineMath>` et `<BlockMath>`. Import du CSS KaTeX dans `app/cours/layout.js`. Robustesse : `children` normalisé en string (gère les tableaux JSX).
  - **Page Mouvement Brownien** (`app/cours/module-1-calcul-stochastique/mouvement-brownien/page.js`) : template complet de référence. Contient : fil d'Ariane, titre h1, introduction, 3 propriétés fondamentales en boîtes bleues (`bg-blue-50 border border-blue-100`) avec interprétations financières, section Variation Quadratique avec formule encadrée, section Pricing avec citation mise en valeur, lien Quiz, navigation Précédent/Suivant.
  - **Composant interactif BrownianMotionChart** : simulation Mouvement Brownien en JS pur (Box-Muller, 1000 pas, `dt = 1/1000`). Rendu via Chart.js (tree-shaking manuel). Bouton "Générer une nouvelle trajectoire". Slider volatilité σ (0.1 → 2.0, pas 0.1, défaut 1.0) — incréments `σ√dt·N(0,1)`, régénération automatique au changement. Slider positionné sous le graphique. Style cohérent : fond blanc, bordure grise, bouton bleu.
  - **Corrections de style** : Suppression de la media query `prefers-color-scheme: dark` dans `globals.css` (causait fond noir sur systèmes en dark mode). Card de la formule `(dWt)² = dt` passée de `bg-gray-900` à `bg-gray-100 border border-gray-200 text-gray-900`. Règles de style absolues documentées dans ce fichier.
- **2026-04-01** :
  - **TOC déplacée de la sidebar vers un panneau flottant** : Nouveau composant `TableOfContents.js` (client, sticky, visible xl+). Scan des `h2[id]` avec délai 100ms (corrige le problème de TOC vide au chargement). `CoursClientLayout.js` mis à jour pour intégrer la TOC comme 3e colonne. `Sidebar.js` allégé : suppression du state `toc`, du `useEffect`, du bloc TOC, et des imports `useState`/`useEffect` devenus inutiles. Style de la TOC : `border-l border-gray-300`, séparateur `border-t border-gray-200`.
  - **Migration `border-gray-200` → `border-gray-300`** : Remplacement global sur l'ensemble des 12 fichiers de `app/` pour des bordures plus visibles. Règle de style mise à jour dans ce fichier.
  - **Page Lemme d'Itô** (`app/cours/module-1-calcul-stochastique/lemme-ito/page.js`) : page complète suivant le template. Contient : fil d'Ariane, 5 sections h2 (échec du calcul classique, formalisme, réduction stochastique, formule finale, application MBG). Boîte bleue `border-blue-300` pour les règles de simplification. Encadré amber "Sans le terme Gamma". Tableau 3 colonnes (Terme / Sensibilité / Rôle) avec Θ, Δ, Γ en `<InlineMath>`. Section MBG : calcul complet pas à pas (dérivées partielles → application Itô → intégration → formule finale encadrée). 3 boîtes bleues (ajustement de convexité, Moyenne vs Médiane, loi log-normale).
  - **Page Girsanov & Risque-Neutre** (`app/cours/module-1-calcul-stochastique/girsanov-risque-neutre/page.js`) : 4 sections h2 (probabilité historique, théorème de Girsanov, conséquence sur le pricing, formule de pricing universel). Boîte amber "Le problème". Formule du changement de Brownien encadrée. Boîte bleue "Prix du risque" avec exemple chiffré. Formule universelle `V₀ = e^{-rT} 𝔼^ℚ[VT]` encadrée. 3 boîtes bleues (actualisation, espérance sous ℚ, pont vers Black-Scholes). Citation de clôture "sous ℙ on observe, sous ℚ on price". Navigation vers Module 2 / Black-Scholes.
  - **Quiz Module 1** (`app/quiz/module-1/page.js`) : composant client interactif, 8 questions. KaTeX intégré directement dans le fichier (import `katex` + `import 'katex/dist/katex.min.css'` + composant helper `function Math({ children, block })` — **différent** du `Math.js` server component des cours). Questions et choix en JSX avec `<Math>` pour les formules. Logic : sélection → validation → affichage de l'explication → question suivante → écran de résultat avec score coloré + corrigé complet. `app/quiz/page.js` mis à jour : Module 1 remplace le badge "Bientôt disponible" par un `<Link>` actif avec badge bleu "Commencer →".
  - **Page Équation de Black-Scholes** (`app/cours/module-2-pricing/equation-black-scholes/page.js`) : 8 sections h2 (intuition/réplication, hypothèses, portefeuille de couverture, dynamique Itô, delta-hedging, absence d'arbitrage, équation finale, limites). Dérivation complète pas à pas : construction de Π = V - ΔS → application Lemme d'Itô → regroupement des termes → annulation du dWt (choix de Δ = ∂V/∂S) → portefeuille déterministe → argument d'arbitrage (dΠ = rΠ dt) → équation EDP. Deux formulations de l'équation encadrées : version dérivées partielles + version Grecs (Θ + rSΔ + ½σ²S²Γ = rV). Tableau des hypothèses 3 colonnes avec renvois aux modules concernés. 3 boîtes bleues sur les limites (vol non constante → M6, marchés discrets → M3, queues épaisses). Citation de clôture "BS = langage universel". Module 2 démarré (1/3).
- **2026-04-02** :
  - **Page Formule de Black-Scholes** (`app/cours/module-2-pricing/probabilites-d1-d2/page.js`) : 4 sections h2. Section 1 : Feynman-Kac — EDP BS rappelée, formule `V = e^{-rτ} 𝔼^ℚ[Φ(S_T)|F_t]` encadrée, bloc citation sur l'équivalence delta-hedging / espérance sous ℚ. Section 2 : application au Call européen — payoff max(S_T−K, 0) encadré, loi log-normale de S_T sous ℚ. Section 3 : démonstration en 5 étapes numérotées (3.1 condition d'exercice Z > −d₂ → définition de d₂ encadrée ; 3.2 scission Bloc A / Bloc B ; 3.3 Bloc B = K e^{-rτ} N(d₂) via symétrie gaussienne ; 3.4 Bloc A via complétion du carré en boîte bleue dédiée + changement de variable u = z − σ√τ → Bloc A = S_t N(d₁) ; 3.5 formule finale encadrée + d₁ = d₂ + σ√τ encadré). Section 4 : interprétation financière — deux boîtes bleues (N(d₂) = proba d'exercice, N(d₁) = Delta du Call).
  - **Page Modèles de diffusion** (`app/cours/module-2-pricing/modeles-diffusion/page.js`) : 5 sections h2. Section 1 : définition EDS générale, opposition fondamentale σ constant vs σ proportionnel à S_t. Section 2 : Bachelier 1900 — EDS arithmétique, loi Normale, boîte amber "Problème majeur" (prix négatifs), boîte bleue "Utilisations actuelles" (taux, spreads, WTI). Section 3 : Black-Scholes 1973 — EDS géométrique GBM, réécriture en rendements, loi Log-Normale confinée sur ]0,+∞[, boîte bleue "Utilisations" (actions, indices, forex). Section 4 : composant interactif `DiffusionComparisonChart`. Section 5 : tableau comparatif 4 lignes + 2 boîtes de règle de décision.
  - **Composant DiffusionComparisonChart** (`app/cours/components/DiffusionComparisonChart.js`) : courbe bleue = densité Normale (Bachelier, std = σ·S₀), courbe verte = densité Log-Normale (Black-Scholes, médiane = S₀), ligne rouge en pointillés = frontière S_T = 0. Slider σ 0.1→1.0 pas 0.1 défaut 0.3. X de −150 à +400 (montre les prix négatifs). Chart.js avec `parsing: false` + `LinearScale` (pas de `CategoryScale`). Légende intégrée + texte explicatif sous le graphique.
  - **Ordre de navigation Module 2** (aussi mis à jour dans la Sidebar) : Équation de Black-Scholes → Formule de Black-Scholes → Modèles de diffusion → Grecques premier ordre.
  - **Module 2 — Pricing : COMPLET (3/3)**.
  - **Renommage** : "Probabilités d1 & d2" → "Formule de Black-Scholes" sur tout le site (sidebar, fil d'Ariane, h1, metadata, liens nav, cours/page.js). Slug `probabilites-d1-d2` conservé sans migration.
- **2026-04-03** :
  - **Sidebar accordéon** (`app/cours/components/Sidebar.js`) : les titres de modules sont devenus des boutons cliquables. État géré par un `Set` (plusieurs modules peuvent être ouverts simultanément). Au chargement, seul le module actif est ouvert (détecté via `pathname.startsWith`). Cliquer sur un module ouvert le ferme sans affecter les autres.
  - **Chevron animé** : SVG `›` à droite du titre, rotation 90° quand ouvert via `transition-transform duration-200`.
  - **Hover sur les titres de module** : `hover:bg-blue-50 rounded-lg transition-colors duration-150`.
  - **Animation d'ouverture des sous-pages** : remplacement du `{isOpen && ...}` par un `<div>` toujours rendu avec `overflow-hidden transition-all duration-300 ease-in-out`. Fermé : `max-h-0 opacity-0`. Ouvert : `max-h-96 opacity-100`. Fondu + glissement simultanés.
- **2026-04-03 (suite)** :
  - **Page "L'essentiel des Greeks"** (`app/cours/module-3-grecques/grecques-premier-ordre/page.js`) : template suivi. Section 1 : rappel formule Call avec dividende continu q encadrée, d₁/d₂, deux boîtes bleues côte à côte N(x)/n(x), boîte amber "Astuce Call → Put" (remplacer N(d₁) par -N(-d₁) etc.). Section 2 : tableau 9 lignes × 4 colonnes (Greek / Symbole / Formule Call / Note) — Delta, Gamma, Vega, Theta, Rho, Epsilon, Vanna, Volga/Vomma, Charm. Dans la colonne Formule : équivalence mathématique inline à droite en `text-gray-400 text-xs`. Dans la colonne Note : dérivée partielle ∂C/∂x en `text-gray-700` + texte descriptif à droite en flex. Boîte bleue mnémotechnique "deux trios inséparables" (jambe action S/q/d₁ vs jambe strike K/r/d₂). Section 3 : composant `GreeksChart`, paragraphe de renvoi vers le simulateur, lien quiz "Bientôt disponible". Navigation : ← Modèles de diffusion / → Quelques démonstrations.
  - **Composant GreeksChart** (`app/cours/components/GreeksChart.js`) : deux canvas côte à côte Call/Put, dropdown 9 Greeks. CDF normale Abramowitz & Stegun (erreur < 7.5e-8). 4 datasets par graphique : zone positive (fill origin, fond vert rgba(34,197,94,0.15)), zone négative (fill origin, fond rouge rgba(239,68,68,0.15)), ligne y=0 en pointillés orange, courbe principale noire. Filler plugin Chart.js enregistré. Tooltip filtré sur la courbe noire uniquement. Légende dynamique : "Zone verte = long {greek} · Zone rouge = short {greek}". Paramètres fixes affichés (K=100, r=5%, q=2%, σ=20%, τ=1an).
  - **Renommages Module 3** : "Les Grecques" → "The Greeks" (sidebar, cours/page.js, quiz/page.js, lien nav modeles-diffusion). Sous-pages : "Greeks de 1er ordre" → "L'essentiel des Greeks", "Greeks de 2nd ordre" → "Quelques démonstrations" (sidebar, cours/page.js, lien Suivant de la page, lien Suivant de modeles-diffusion). Slugs conservés (`grecques-premier-ordre`, `grecques-second-ordre`).

- **2026-04-07** :
  - **Page "Quelques démonstrations"** (`app/cours/module-3-grecques/grecques-second-ordre/page.js`) créée et complétée. 3 sections h2 (Delta ∂C/∂S, Gamma ∂²C/∂S², Vega ∂C/∂σ).
    - **Section Delta** : formule Call encadrée en `bg-gray-50`, dérivation en 4 étapes (règle du produit → calcul ∂d₁/∂S = ∂d₂/∂S = 1/(Sσ√τ) → identité fondamentale Se^{-qτ}n(d₁) = Ke^{-rτ}n(d₂) en boîte bleue → résultat Δ_call = e^{-qτ}N(d₁) encadré).
    - **Section Gamma** : formule Δ encadrée, 2 étapes → résultat Γ = e^{-qτ}n(d₁)/(Sσ√τ) encadré, boîte bleue "Gamma Call = Gamma Put" (parité Call-Put, constante disparaît à la dérivation).
    - **Section Vega** : développement de d₁ et d₂ en isolant les termes en σ → calcul ∂d₁/∂σ et ∂d₂/∂σ en 4 étapes → factorisation via identité fondamentale → différence √τ → résultat 𝒱_call = Se^{-qτ}n(d₁)√τ encadré, boîte bleue "Vega Call = Vega Put" (parité C−P indépendante de σ).
    - **Encadré "À savoir"** ajouté entre l'introduction et la section Delta : `bg-blue-50 border border-blue-300`, rappel de la règle de dérivation de fonction composée appliquée à N(d₁) — dérivée de N est n, x désigne S ou σ selon le Greek.
    - Navigation : ← L'essentiel des Greeks / → Arbitrage Theta-Gamma.
  - **Page "Arbitrage Theta-Gamma"** (`app/cours/module-3-grecques/arbitrage-theta-gamma/page.js`) créée et complétée. 4 sections h2.
    - **Section 1 — Jensen** : inégalité de Jensen 𝔼[f(Sₜ)] ≥ f(𝔼[Sₜ]) encadrée, boîte bleue "Traduction financière" (valeur temps dictée par la volatilité).
    - **Section 2 — P&L Delta-neutre** : dV depuis le lemme d'Itô, construction Π = V − ΔSₜ, annulation de ΔdSₜ, résultat encadré dΠ = (Θ + ½σ²Sₜ²Γ)dt.
    - **Section 3 — Relation fondamentale** : sous r=0, dΠ = 0 → Θ = −½σ²Sₜ²Γ encadré. Boîte bleue "Gamma Scalping" (achat bas / vente haut). Boîte bleue "Condition d'arbitrage" (σ_réal vs σ_impl).
    - **Section 4 — Anomalie** : EDP complète Θ = −½σ²Sₜ²Γ + r(V − SₜΔ). Put Deep-ITM : V≈K, Δ≈−1, Γ→0. Calcul 3 étapes → Θ ≈ rK encadré. Boîte amber "Attention" (Européen seulement). Boîte bleue "Explication économique" (actualisation de K).
    - Quiz badge "Bientôt disponible". Navigation : ← Quelques démonstrations / → Swaps & Flux (/cours/module-4-taux-credit/swaps-flux).
  - **Module 3 — The Greeks : COMPLET (3/3 pages)**.
  - **Composant CallValueChart** (`app/cours/components/CallValueChart.js`) : composant client Chart.js. Affiche la prime BS d'un Call (courbe pleine rouge) vs la valeur intrinsèque max(S−K,0) (pointillés rouges). Zone verte `rgba(134,239,172,0.5)` entre les deux courbes via `fill: '+1'` (dataset helper transparent). Ligne verticale grise en pointillés au strike K=100. Plage S : 70 à 130 (200 points). Légende filtrée (masque le helper et la ligne K). Tooltip sur les deux courbes visibles uniquement. Paramètres fixes : K=100, σ=20%, r=5%, q=0, τ=1an. Intégré dans `arbitrage-theta-gamma/page.js` section 1 (après boîte bleue Jensen), avec phrase de transition.
  - **Composant BachelierChart** (`app/cours/components/BachelierChart.js`) : composant client Chart.js. Décompose le modèle Bachelier en trois séries partageant le même Brownien (Box-Muller) : bruit pur σdW (bleu, `#3b82f6`), tendance μdt (orange pointillés, `#f97316`), Bachelier complet (noir épais, `#111827`). S₀=100, μ=8%, σ=15%, N=252 jours. Bouton "Nouvelle simulation" (state `count`). Tooltip désactivé. Intégré dans `modeles-diffusion/page.js` section 2 (Bachelier), après la boîte bleue "Utilisations actuelles", avec phrase de transition.
  - **GreeksChart — layout responsive** : wrapper des deux canvas Call/Put modifié de `grid grid-cols-2 gap-4` → `flex flex-col xl:flex-row gap-6`. Mobile/tablette : empilés verticalement. xl+ : côte à côte.
  - **TableOfContents — largeur TOC** : `w-48` → `w-64` (+33%) dans `TableOfContents.js`. Seule la colonne TOC droite est affectée.

- **2026-04-08** :
  - **Page "Simulation de Monte-Carlo"** (`app/cours/module-2-pricing/monte-carlo/page.js`) créée. 6 sections h2 (intuition π, application au pricing, algorithme + code Python, convergence TCL, simulateur, quand utiliser MC). Encadré schéma exact GBM sous ℚ. Bloc code Python en `bg-gray-50`. Deux colonnes "Quand MC s'impose / Limites". Navigation : ← Modèles de diffusion / → L'essentiel des Greeks.
  - **Composant MonteCarloChart** (`app/cours/components/MonteCarloChart.js`) : canvas 2D natif (pas Chart.js) — 30 trajectoires GBM bleues semi-transparentes, ligne K rouge en pointillés. Trois cartes : Prix MC (bleu), Prix BS exact (gris), Écart relatif en %. Boutons toggle M : 1 000 / 10 000 / 100 000 (pas de slider M). Slider σ uniquement (5%→80%). Paramètres fixes : S₀=K=100, T=1an, r=5%, 50 pas. Calcul en `setTimeout(10ms)`. State : `{ M: 1000, sigma: 0.2 }` seulement.
  - **Bug normCDF corrigé dans MonteCarloChart.js** : la formule A&S 7.1.26 approxime `erf(z)`, donc `N(x) = 0.5*(1+erf(x/√2))` — il faut passer `x/Math.sqrt(2)` à la formule, pas `x` directement. Le bug produisait des prix gonflés (ex. ~7.99 € au lieu de ~6.81 € pour σ=10%). `GreeksChart.js` utilise A&S 26.2.17 (coefficients `0.2316419`), appliqué directement à `x` — correct et inchangé.
  - **Sidebar** : "Simulation de Monte-Carlo" ajoutée après "Modèles de diffusion" dans Module 2. Module 2 passe de 3 à 4 sous-pages.
  - **cours/page.js** : Module 2 passe à 4 badges.
  - **Module 2 — Pricing : COMPLET (4/4 pages)**.
  - **Standardisation des bas de page** (toutes les pages de cours, 9 fichiers modifiés) : remplacement du bloc quiz `bg-gray-50` avec bouton ou span "Bientôt disponible" → bloc compact `bg-blue-50 border-blue-100 mt-10 p-4`. Remplacement des navigations `<Link>` carte → `<div className="flex justify-between mt-12 pt-6 border-t border-gray-300">` avec simples `<a>`. Module 1 (quiz existant) → lien actif vers `/quiz/module-1`. Modules 2 et 3 → "Un quiz sur le Module X sera bientôt disponible."
  - **grecques-premier-ordre** : lien Précédent corrigé — pointait vers "Modèles de diffusion", désormais vers "Simulation de Monte-Carlo" (chaîne de navigation cohérente après ajout de monte-carlo).
  - **arbitrage-theta-gamma** : même standardisation du bas de page appliquée.

- **2026-04-08 (suite)** :
  - **Refonte Module 6 — Volatilité** : remplacement des anciens slugs (`variance-swap`, `vol-locale-stochastique`) par 4 nouvelles sous-pages (`vol-implicite-nappes`, `vol-stochastique`, `variance-swap-vix`, `skew-delta`). Sidebar et cours/page.js mis à jour.
  - **Page "Vol implicite et nappes"** (`app/cours/module-6-volatilite/vol-implicite-nappes/page.js`) créée. 4 sections h2 (volatilité implicite, smile/skew, nappe de volatilité, Dupire). Section 1 : inversion de la formule BS encadrée (`bg-gray-50`) + boîte amber "Calibration" (Newton-Raphson / Vega). Section 2 : deux boîtes bleues côte à côte (skew actions vs smile forex) avec SVG inline dans chaque boîte — courbe décroissante avec légère remontée OTM Call pour le skew, courbe en U asymétrique pour le smile forex. Section 3 : axes de la nappe (liste 3 lignes), composant `VolSurfaceChart` interactif 3D, sous-section "Les contraintes d'arbitrage" avec deux boîtes bleues (calendar spread, butterfly), paragraphe SVI/SSVI. Section 4 : EDS avec vol locale encadrée, formule de Dupire encadrée, deux boîtes bleues numérateur/dénominateur. Navigation : ← Arbitrage Theta-Gamma / → Vol stochastique.

- **2026-04-09** :
  - **Composant VolSurfaceChart** (`app/cours/components/VolSurfaceChart.js`) : composant client Three.js — nappe de volatilité 3D interactive. `sigmImpl(K, T)` = `atmVol(T) + skew(T)×m + convexity(T)×m²` avec term structure, skew et convexité qui s'écrasent exponentiellement avec T (court terme = skew fort + smile prononcé, long terme = quasi-plat). Heatmap bleu→cyan→vert→jaune→rouge via `vertexColors`. Wireframe noir opacité 15% par-dessus. Axes 3D via `THREE.Line` (rouge K, vert T, bleu σ). Labels via `THREE.Sprite` + `CanvasTexture`. Rotation souris + touch natives (pas OrbitControls). Cleanup complet (geo, mat, tex, renderer). Canvas 420px hauteur.
  - **VolSurfaceWrapper** (`app/cours/module-6-volatilite/vol-implicite-nappes/VolSurfaceWrapper.js`) : wrapper client nécessaire pour importer `VolSurfaceChart` dynamiquement avec `next/dynamic { ssr: false }` depuis une page Server Component. ⚠️ `next/dynamic` dans un Server Component ne peut pas utiliser `{ ssr: false }` directement — il faut un wrapper `'use client'` intermédiaire.
  - **SVG skew/smile** : deux SVG inline JSX dans les boîtes bleues de la section 2. Skew : courbe part haut gauche, descend vers ATM, remonte légèrement à droite (`path` cubique). Smile : courbe en U asymétrique (gauche plus haut). Labels OTM Put / ATM / OTM Call sous l'axe, décalés (x=55/147/228) pour rester dans le `viewBox="0 0 280 120"`. Pas de label "Strike K" sur l'axe — il se superposait avec "OTM Call".

- **2026-04-09 (suite)** :
  - **Page "Vol stochastique"** (`app/cours/module-6-volatilite/vol-stochastique/page.js`) créée et complétée. 5 sections h2.
    - **Section 1 — Limite de Dupire** : calibration parfaite mais statique, vol future figée sur la surface d'aujourd'hui, insuffisance pour produits complexes long terme.
    - **Section 2 — Concept** : deux Browniens distincts dW^S et dW^V, corrélation ρ encadrée en BlockMath, introduction de la Vol of Vol.
    - **Section 3 — Heston (1993)** : deux EDS (GBM pour S_t + CIR pour v_t = σ²_t), tableau 5 paramètres (v₀/θ/κ/ξ/ρ, rôle + effet sur le smile), boîte bleue "Condition de Feller" 2κθ > ξ², boîte amber "Limite" (ξ constant, smile court terme imparfait).
    - **Section 4 — SABR (2002)** : deux EDS (forward F_t avec exposant β + GBM pour α_t), tableau 4 paramètres (α_t/β/ν/ρ, rôle + effet pratique), 3 boîtes bleues (Formule de Hagan, Calibration par tranche, Paramètre β backbone), boîte amber "Limite" (pas de mean-reversion, explose longue maturité).
    - **Section 5 — Synthèse** : tableau comparatif 6 lignes × 3 colonnes (Critère / Heston / SABR) — classe d'actifs, variable modélisée, calibration, structure par terme, smile court terme, mean-reversion. Paragraphe de clôture sur la coexistence des deux modèles.
    - Navigation : ← Vol implicite et nappes / → Variance Swap & VIX.
  - **Composant SABRCalibrationChart** (`app/cours/components/SABRCalibrationChart.js`) : composant client Chart.js — calibration interactive du smile SABR. Formule Hagan asymptotique complète (FK moyenne géométrique, z/chi, facteurs A/B/C). Courbe bleue de référence fixe (α=0.25, β=0.50, ρ=−0.90, ν=1.50), calculée une seule fois au montage. Courbe rouge ajustable via 4 sliders (α 0.05→0.80, β 0.0→1.0, ρ −0.90→0.90, ν 0.0→2.0 pas 0.05). 16 strikes K=70→115 (pas 3), axe X en moneyness 0.70→1.15, axe Y 0→30%. Score RMSE en pts de vol avec barre de progression colorée : rouge >5 / amber 2-5 / vert 0.5-2 / bleu <0.5. Sliders en grille 2 colonnes, valeur courante en `font-mono text-blue-600`. `useMemo` sur userVols et rmse, update chart sans animation (`'none'`). Valeurs initiales des sliders : α=0.20, β=0.70, ρ=0.0, ν=0.20 (départ neutre délibérément loin du smile de référence).
  - **SABRWrapper** (`app/cours/module-6-volatilite/vol-stochastique/SABRWrapper.js`) : wrapper `'use client'` + `next/dynamic { ssr: false }` pour intégrer SABRCalibrationChart dans le Server Component page.js. Placé dans la section SABR, après le tableau des paramètres, avant les boîtes bleues.

- **2026-04-09 (fin de session)** :
  - **Page "Variance Swap & VIX"** (`app/cours/module-6-volatilite/variance-swap-vix/page.js`) créée et complétée. 5 sections h2. Aucun composant interactif.
    - **Section 1 — La volatilité comme classe d'actifs** : opposition vol réalisée vs vol implicite, exposition pure sans delta-hedging actif.
    - **Section 2 — Le Variance Swap** : payoff `N × (σ²_real − K_var)` encadré en `bg-gray-50`. Formule de la variance réalisée annualisée (252/n × Σ ln²). Rôle du strike K_var (calibré pour valeur nulle à l'initiation, comme tout swap).
    - **Section 3 — Réplication statique** : démonstration en 5 étapes numérotées. Étape 1 : P&L delta-hedgé `dΠ = ½S²Γ(σ²_real − σ²_impl)dt`, problème path-dependent. Étape 2 : objectif rendre S²Γ constant. Étape 3 : condition `Γ(S) = 1/S²` encadrée. Étape 4 : intégration double `f'' = 1/S² → f' = −1/S → f(S) = −ln S` avec 3 lignes alignées (label / BlockMath), résultat `−ln(S_T/S_0)` encadré. Étape 5 : pondération `w(K) = 1/K²` encadrée, portefeuille Puts OTM + Calls OTM. Boîte amber "Risque de queue" (poids 1/K² amplifie les Puts très OTM lors d'un krach).
    - **Section 4 — VarSwap vs VolSwap** : tableau 4 lignes × 3 colonnes (sous-jacent, payoff, réplication, statut marché). Phrase de clôture sur la réplication statique comme raison du standard OTC.
    - **Section 5 — L'indice VIX** : méthodologie CBOE en 4 étapes (panier, pondération ΔK/K², interpolation temporelle, racine carrée × 100). Formule CBOE complète encadrée en BlockMath. Paragraphe intercalé entre étapes 2 et 3 : "Pourquoi ΔK/K² et pas 1/K² ?" — intégrale continue → somme de Riemann, formule `ΔK_i = (K_{i+1} − K_{i-1}) / 2` encadrée. Lien PDF officiel CBOE (`https://cdn.cboe.com/resources/vix/VIX_Methodology.pdf`) inséré juste avant la formule. Boîte bleue "À retenir" (VIX = cotation continue de K_var d'un VarSwap 30j S&P 500). Paragraphe sur les futures VIX (contango, non tradabilité du VIX spot).
    - Navigation : ← Vol stochastique / → Skew Delta.

- **2026-04-10** :
  - **LinkedIn dans le Footer** (`app/components/Footer.js`) : le lien LinkedIn pointait vers `"#"` — remplacé par `https://www.linkedin.com/in/james-du-peloux-433473231/`. Ouvre dans un nouvel onglet (`target="_blank"`).
  - **Suppression du composant Themes** (`app/page.js`) : import et utilisation de `<Themes />` supprimés. La page d'accueil ne rend plus que `<Hero />`.
  - **Refonte de `/cours` — chemin serpent** (`app/cours/page.js`) : remplacement de la grille de cartes par un "chemin serpent" visuel représentant les 8 modules en 3 rangées. Rangée 1→3 (gauche à droite), virage droite, rangée 4→6 (droite à gauche), virage gauche, rangée 7→8 (gauche à droite). Chaque module est un cercle numéroté cliquable (si la page existe) avec titre et liste des sous-pages. Connecteurs horizontaux `HConn` et virages verticaux `VConn`. Fantômes invisibles pour aligner la rangée 7–8 sur 3 colonnes. Composants internes : `Row`, `Node`, `HConn`, `VConn`. Fichier passé en `'use client'` (nécessaire pour les handlers `onMouseEnter`/`onMouseLeave` sur les cercles). Disclaimer niveau Bac+5 avec bordure gauche bleue.
  - **Animation canvas Hero** (`app/components/Hero.js`) : réécriture complète en `'use client'`. Canvas `position: absolute` couvrant tout le hero (z-index 1), contenu en z-index 2. Animation `requestAnimationFrame` en boucle (`tick` récursif). Deux couches :
    - **Grille papier millimétré** : petites lignes toutes les 20px (opacité 0.045, épaisseur 0.5px) + grandes lignes toutes les 100px (opacité 0.10, épaisseur 0.8px), redessinées à chaque frame via `clearRect`.
    - **3 trajectoires browniennes** : générées via Box-Muller. Chaque frame : nouveau point ajouté à droite (`headX += STEP`, STEP=2.4px), points sortis à gauche pruned. Cycle de vie : fadein (40 frames) → active → fadeout (150 frames) quand `headX >= canvasWidth + 60` → respawn. Sigma 4.5–10, drift ±0.9 par trajectoire. 70% bleu `#2563eb` opacité 0.12–0.18, 30% gris `#94a3b8` opacité 0.20–0.41. Épaisseur 1.2px, `lineJoin/lineCap: round`. Stagger au chargement : pré-remplissage de 0–70% du canvas pour éviter que les 3 trajectoires démarrent ensemble. `cancelAnimationFrame` + `removeEventListener` au unmount.
  - **Bug trajectoires immobiles corrigé** : première version pré-calculait tous les points avec x fixes — les trajectoires ne bougeaient pas. `allOffRight` ne pouvait jamais être vrai (x=0 ne dépasse jamais w). Corrigé en architecture "flux continu" : headX avance chaque frame, points générés incrémentalement.
  - **Bug trajectoires trop courtes corrigé** : le `lifetime` en frames (250–600) stoppait les trajectoires avant le bord droit sur grands écrans. Remplacé par un trigger géométrique `headX >= canvasWidth + 60` — toutes les trajectoires traversent désormais l'écran en entier.

- **2026-04-10 (suite)** :
  - **Page "Skew Delta"** (`app/cours/module-6-volatilite/skew-delta/page.js`) créée et complétée. 6 sections h2 numérotées + tableau synthèse.
    - **Section 1 — Delta Total** : règle de dérivation totale → formule `Δ_total = Δ_BS + 𝒱 · ∂σ/∂S` encadrée. Boîte bleue "Lien avec le Vanna" (Vanna = ∂Δ/∂σ = ∂𝒱/∂S, lien vers L'essentiel des Greeks).
    - **Section 2 — Démonstration : la relation Spot-Vol** : hypothèse `σ(S,K) = Σ(K/S^α)`, dérivation en 3 étapes (sensibilité au spot via règle chaîne → sensibilité au strike → substitution) → résultat `Skew Delta = −α · 𝒱 · (K/S) · ∂σ/∂K` encadré. Boîte bleue "Interprétation". Approximation near-ATM K/S ≈ 1.
    - **Section 3 — Comprendre le Vanna** : Put acheté ATM qui rentre dans la monnaie — deux boîtes bleues (effet Vega = P&L gagnant / effet Vanna = aplatissement du Delta). Paragraphe de synthèse. Composant `VannaPutChart` interactif (deux courbes Prix + Delta). Paragraphe de clôture sur l'utilité du Skew Delta dans le book du trader.
    - **Sections 4, 5, 6 — Régimes Sticky Strike (α=0), Sticky Delta (α=1), Sticky Skew** : principe, formule pour α=1, utilisation typique, boîte amber Limite. Chaque section précède sa boîte amber d'un composant interactif dédié.
    - **Tableau synthèse** : 3 lignes × 5 colonnes (Régime / α / Dynamique / Marché typique / Limite principale).
    - **Style** : aligné sur le template Mouvement Brownien — `<article px-6 py-12>`, `<Link>` dans le fil d'Ariane, h1 `text-4xl`, h2 `font-bold mb-6 scroll-mt-24`, paragraphes `leading-relaxed`, boîtes bleues avec titres `text-blue-600 uppercase tracking-wide`, formules clés en `bg-gray-100 px-8 py-6`, boîtes amber `border-amber-100 p-6`.
  - **Composant VannaPutChart** (`app/cours/components/VannaPutChart.js`) : composant Chart.js interactif. Deux graphiques côte à côte sur xl (flex-col xl:flex-row) : Prix du Put (haut) et Delta du Put (bas). Courbe bleue dynamique (vol slider) + courbe grise pointillée de référence (15%). Slider vol 10%→80%, slider spot 50→150. Ligne verticale pointillée au spot via plugin `spotRef` (ref mutable partagée, pas de réassignation `config.plugins`). 4 cartes de valeurs (Prix dyn., Prix réf., Delta dyn., Delta réf.). `normCDF` par série de Taylor (précision maximale autour de zéro, évite la "bosse ATM"). N_POINTS=1000, tension=0. Paramètres fixes : K=100, r=0%, T=6 mois.
  - **VannaWrapper** (`app/cours/module-6-volatilite/skew-delta/VannaWrapper.js`) : wrapper `'use client'` + `next/dynamic { ssr: false }`.
  - **Composant StickyStrikeChart** (`app/cours/components/StickyStrikeChart.js`) : courbe de skew S&P stylisée fixe (slope=−0.15, convexity=0.10, ATM=20%), slider spot 50→150. Point bleu qui glisse le long de la courbe immobile + ligne verticale pointillée. Layout : graphique (`xl:w-1/2`) + bulle bleue (`xl:w-1/2`) côte à côte sur xl. Plugin `spotRef` mutable. Légende pédagogique "la nappe reste fixe".
  - **StickyStrikeWrapper** (`app/cours/module-6-volatilite/skew-delta/StickyStrikeWrapper.js`) : wrapper `'use client'` + `next/dynamic { ssr: false }`.
  - **Composant StickyDeltaChart** (`app/cours/components/StickyDeltaChart.js`) : deux courbes — smile fixe bleu + smile dynamique rouge pointillé qui translate avec le spot. Slider spot 50→150. Point bleu (sur smile fixe) + point rouge (ATM smile dynamique) au niveau du spot. Layout : graphique flexible (`flex-1`) + bulle bleue (`xl:w-56`) côte à côte sur xl. skewVol(K, center) : même formule, centre variable.
  - **StickyDeltaWrapper** (`app/cours/module-6-volatilite/skew-delta/StickyDeltaWrapper.js`) : wrapper `'use client'` + `next/dynamic { ssr: false }`.
  - **Composant StickySkewChart** (`app/cours/components/StickySkewChart.js`) : deux courbes — smile fixe bleu pointillé + smile dynamique rouge plein. Slope=−0.25, convexity=0.25 (paramètres plus prononcés que StickyStrike pour mieux montrer l'effet). Vol ATM dynamique lue sur la courbe fixe au niveau du spot (monte quand le spot baisse). Smile rouge translte avec le spot ET monte/baisse verticalement. Layout identique à StickyDelta.
  - **StickySkewWrapper** (`app/cours/module-6-volatilite/skew-delta/StickySkewWrapper.js`) : wrapper `'use client'` + `next/dynamic { ssr: false }`.
  - **Module 6 — Volatilité : COMPLET (4/4 pages)**.

- **2026-04-14** :
  - **Page "Fonctionnement de la Fed"** (`app/cours/module-8-macro/plomberie-fed/page.js`) créée. Première page du Module 8. 4 sections h2. Pas de composant interactif — contenu institutionnel (tableaux, T-Account, boîtes bleues/amber).
    - **Section 1 — La hiérarchie des taux** : deux sous-sections. A) Taux administrés : trois boîtes bleues (IORB plafond, ON RRP plancher, SRF backstop) avec lien CME FedWatch entre ON RRP et SRF. B) Taux de marché : tableau 2 lignes (EFFR non sécurisé / SOFR sécurisé).
    - **Section 2 — Le bilan de la Fed** : T-Account HTML/Tailwind en deux colonnes (Actif : T-Bills, Treasuries, MBS / Passif : Réserves, TGA, ON RRP, Currency). Boîte amber "Le risque du TGA en avril" (saison des impôts → drainage des réserves → risque de spike).
    - **Section 3 — Le spread EFFR − IORB** : formule `Signal clé = EFFR − IORB` encadrée. Deux boîtes bleues (situation normale spread négatif / signal d'alerte spread qui se resserre) + boîte amber "Souvenir de septembre 2019" (spike Repo à 10%).
    - **Section 4 — RMP vs QE** : tableau 5 lignes × 3 colonnes (Intention / Cibles / Communication / Impact taux longs / Réaction marchés). Deux boîtes bleues (exemple janvier 2025 — RMP T-Bills avant saison des impôts / objectif Repo stable).
    - **Correction factuelle** : `Currency` (billets en circulation = Federal Reserve Notes) déplacé côté Passif dans le T-Account (c'est une dette de la Fed envers le public, pas un actif).
    - **Navigation** : ← Corrélation Indice et FX (`/cours/module-7-quanto-fx/correlation-fx`) / pas de suivant pour l'instant (`<div />`).
  - **Sidebar** : `gestion-reserves` retiré du Module 8 — contenu abandonné. Module 8 réduit à 2 sous-pages : `plomberie-fed` + `politique-monetaire`.

- **2026-04-14 (suite)** :
  - **Page "Politique monétaire"** (`app/cours/module-8-macro/politique-monetaire/page.js`) créée. Deuxième et dernière page du Module 8. 5 sections h2. Pas de composant interactif.
    - **Section 1 — La décomposition d'un taux long** : formule tripartite encadrée (Taux court anticipé + Anticipation d'inflation + Prime de terme). Deux boîtes bleues côte à côte (Hypothèse des attentes / Prime de terme). Encadré `bg-gray-50` "L'inversion de 2022–2023" (spread 2Y–10Y à −80 bps en octobre 2022).
    - **Section 2 — Lire la courbe** : tableau 3 lignes × 3 colonnes (Normale / Plate / Inversée — Interprétation marché / Contexte typique).
    - **Section 3 — La forward guidance** : deux boîtes bleues (Le dot plot / La communication verbale — "transitoire" 2021, "patient" 2019).
    - **Section 4 — QE et QT** : boîte bleue "Qu'est-ce que la duration ?". Deux boîtes côte à côte (QE bleue — aspirer la duration / QT grise — réinjecter la duration).
    - **Section 5 — Le lien avec la plomberie** : deux paragraphes de synthèse. Encadré `bg-blue-50` "En résumé — Module 8" en prose (trois leviers + condition de plomberie saine).
    - **Navigation** : ← Fonctionnement de la Fed / pas de suivant (`<div />`).
  - **Correction navigation plomberie-fed** : lien Suivant mis à jour de `<div />` vers `/cours/module-8-macro/politique-monetaire`.
  - **Module 8 — Macro : COMPLET (2/2 pages)**.

## Commandes utiles
- Lancer en local : npm run dev → http://localhost:3000
- Arrêter le serveur : Ctrl+C
- Commande Git dans l'ordre terminal dans website_finance:
git add . → je sélectionne tout
git status → je vérifie avant d'agir
git commit -m "..." → je sauvegarde localement avec un message clair
git push → j'envoie sur GitHub → Vercel déploie automatiquement

## Liens utiles
- GitHub : https://github.com/JamesLoux/website-finance
- Site en ligne : https://website-finance.vercel.app