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
- [x] Page /cours — index des 10 modules (chemin serpent 4 rangées × 3 colonnes)
- [x] Page /quiz — index des quiz par module
- [x] Page /simulateur — placeholder
- [x] Page /a-propos — placeholder
- [x] Layout de cours avec sidebar (navigation) + TOC flottante à droite
- [x] Module 1 / Mouvement Brownien (template de référence)
- [x] Module 1 / Lemme d'Itô
- [x] Module 1 / Girsanov & Risque-Neutre
- [x] **Module 1 — Calcul stochastique : COMPLET (3/3 pages)**
- [x] Quiz Module 1 — Calcul stochastique (8 questions, KaTeX, corrigé)
- [x] Quiz Module 2 — Pricing (banque 24 questions, tirage stratifié 12/session, 4 groupes × 3 tirages)
- [x] Quiz Module 3 — The Greeks (banque 20 questions, tirage stratifié 10/session, 3 groupes : A×8 B×6 C×6, tirage 4+3+3)
- [x] Quiz Module 8 (affiché) — Volatilité (banque 24 questions, tirage stratifié 12/session, 4 groupes × 3 tirages) → endpoint réel /quiz/module-6
- [x] Module 2 / Équation de Black-Scholes
- [x] Module 2 / Formule de Black-Scholes
- [x] Module 2 / Modèles de diffusion
- [x] Module 2 / Simulation de Monte-Carlo
- [x] **Module 2 — Pricing : COMPLET (4/4 pages)**
- [x] Module 3 / L'essentiel des Greeks (grecques-premier-ordre)
- [x] Module 3 / Quelques démonstrations (grecques-second-ordre)
- [x] Module 3 / Arbitrage Theta-Gamma (arbitrage-theta-gamma)
- [x] **Module 3 — The Greeks : COMPLET (3/3 pages)**
- [x] Module 8 / Vol implicite et nappes (slug : module-6-volatilite)
- [x] Module 8 / Vol stochastique
- [x] Module 8 / Variance Swap & VIX
- [x] Module 8 / Skew Delta
- [x] **Module 8 — Volatilité : COMPLET (4/4 pages)**
- [x] Module 9 / Corrélation Indice et FX (slug : module-7-quanto-fx/correlation-fx)
- [x] Module 9 / Options Quanto & Composite (options-quanto)
- [x] **Module 9 — Quanto & FX : COMPLET (2/2 pages)**
- [x] Module 10 / Fonctionnement de la Fed (slug : module-8-macro/plomberie-fed)
- [x] Module 10 / Politique monétaire
- [x] **Module 10 — Macro : COMPLET (2/2 pages)**
- [x] Simulateur de positions (book de trades, modale, 4 graphiques Greeks interactifs)
- [x] Module 4 / Obligations & Bases (obligations-bases) — avec composant ZeroCouponChart interactif
- [x] Module 4 / Duration & Convexité (duration-convexite) — avec composant ConvexityChart interactif
- [x] Module 4 / Courbe des taux & instruments (fwd-rate-agreement) — taux forward, FRA, futures, bootstrapping
- [x] Module 4 / Interest Rate Swap (interest-rate-swap) — single-curve, multi-curve post-2008, DV01, swap spread
- [x] **Module 4 — Fixed Income I : COMPLET (4/4 pages)**
- [x] Module 5 / Cap & Floor (cap-floor) — Caplets/Floorlets, parité Cap-Floor-Swap, Collar, Flat Vol vs Spot Vol, conflits Delta/Rho
- [x] Module 5 / Bond Options & Swaptions (bond-options-swaptions) — 4 sections, composant CallableBondChart interactif
- [x] Module 5 / CMS & Ajustement de Convexité (cms) — 5 sections : mécanique CMS, intuition convexité, ajustement, Carr-Madan, SABR
- [x] Module 5 / Convertible Bond (convertible-bond) — 5 sections : décomposition/vocabulaire, trois zones, premium, arbitrage CB, pièges du desk
- [x] Module 5 / Range Accrual (range-accrual) — 5 sections : mécanique + MinGtee, cross-asset, callable, somme de digitales, réplication Call Spread + composant DigitalReplicationChart
- [x] Module 5 / Modèles de taux (modele-taux) — 5 sections + tableau synthèse : Vasicek ancêtre, HW1F (θ(t)/σ(t)/arbre), limite corrélation parfaite, HW2F (2 EDS), HJM et LMM
- [x] **Module 5 — Fixed Income II : COMPLET (6/6 pages)**
- [ ] Modules 6, 7 (Fixed Income III + Produits Equity)
- [x] Quiz Module 9 (affiché) — Quanto & FX (banque 20 questions, tirage stratifié 10/session, 2 groupes A×10 B×10, tirage 5+5) → endpoint réel /quiz/module-7
- [x] Quiz Module 10 (affiché) — Macro (banque 20 questions, tirage stratifié 10/session, 2 groupes A×10 B×10, tirage 5+5) → endpoint réel /quiz/module-8
- [ ] Quiz Modules 4, 5, 6, 7

## Architecture du site

### Navbar
Accueil / Cours / Simulateur / Quiz / À propos

### Pages principales
- `/` → Home (faite)
- `/cours` → Index des modules
- `/simulateur` → Simulateur de positions (book de trades + Greeks interactifs)
- `/quiz` → Quiz par thématique
- `/a-propos` → Présentation personnelle

### Structure des cours (10 modules)
⚠️ **Mapping affiché → slug réel** : les dossiers physiques ne changent pas, seul le numéro d'affichage a changé.

| Affiché | Titre | Slug réel |
|---------|-------|-----------|
| Module 1 | Calcul stochastique | module-1-calcul-stochastique |
| Module 2 | Pricing | module-2-pricing |
| Module 3 | The Greeks | module-3-grecques |
| Module 4 | Fixed Income I | module-4-taux-credit |
| Module 5 | Fixed Income II | module-5-fixed-income-2 |
| Module 6 | Fixed Income III | module-6-fixed-income-3 (nouveau, vide) |
| Module 7 | Produits Equity | module-5-produits-equity |
| Module 8 | Volatilité | module-6-volatilite |
| Module 9 | Quanto & FX | module-7-quanto-fx |
| Module 10 | Macro | module-8-macro |

- `/cours/module-1-calcul-stochastique` — mouvement-brownien, lemme-ito, girsanov-risque-neutre
- `/cours/module-2-pricing` — equation-black-scholes, probabilites-d1-d2, modeles-diffusion, monte-carlo (ordre de navigation)
  - ⚠️ Le slug `probabilites-d1-d2` est conservé tel quel mais la page s'intitule **"Formule de Black-Scholes"** — le nom affiché et le slug divergent intentionnellement (renommage sans migration d'URL).
- `/cours/module-3-grecques` — grecques-premier-ordre ("L'essentiel des Greeks"), grecques-second-ordre ("Quelques démonstrations"), arbitrage-theta-gamma
  - ⚠️ Même divergence slug/titre que pour module-2 : les slugs sont conservés, les titres affichés diffèrent.
- `/cours/module-4-taux-credit` — `obligations-bases` ✅, `duration-convexite` ✅, `fwd-rate-agreement` ✅ (pages actives, sidebar cliquables) ; grisée : Interest Rate Swap
- `/cours/module-5-fixed-income-2` — `cap-floor` ✅, `bond-options-swaptions` ✅, `cms` ✅, `convertible-bond` ✅, `range-accrual` ✅, `modele-taux` ✅ — module complet
- `/cours/module-6-fixed-income-3` — nouveau dossier vide (.gitkeep) ; sous-pages grisées : FX Swap, CDS, Inflation Swap, TRS
- `/cours/module-5-produits-equity` — vanilles-combinaisons, options-exotiques, produits-structures (grisé, pas de pages créées)
- `/cours/module-6-volatilite` — vol-implicite-nappes, vol-stochastique, variance-swap-vix, skew-delta
- `/cours/module-7-quanto-fx` — correlation-fx ("Corrélation Indice et FX"), options-quanto ("Options Quanto & Composite")
- `/cours/module-8-macro` — plomberie-fed ("Fonctionnement de la Fed"), politique-monetaire
  - ⚠️ `gestion-reserves` supprimé : contenu abandonné, module réduit à 2 sous-pages.

### Simulateur
- Accessible depuis la navbar
- Lien contextuel depuis les pages de cours concernées

## Fonctionnalités prévues
1. Pages de cours (10 modules, 2-6 sous-pages chacun, contenu MDX rédigé par le propriétaire)
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
    page.js                          ← Index des 10 modules (chemin serpent 4 rangées)
    components/
      CoursClientLayout.js           ← Wrapper client : état sidebar + hamburger mobile + TOC
      Sidebar.js                     ← Sidebar : navigation 10 modules, sous-pages sans slug rendues comme <span> non cliquable
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
      ZeroCouponChart.js             ← Composant Chart.js : trajectoire de valorisation d'un ZC P(t)=100×e^{−y(T−t)}, courbe orange, point vert au pair en T. Axe Y fixé 0→105. Deux sliders : rendement 0→20% + durée 6mois→10ans. Tick Y le plus proche du prix d'entrée mis en évidence (orange gras). Carte "Prix aujourd'hui". Pattern destroy/recréation du chart dans useEffect([y, T]).
      ConvexityChart.js              ← Composant Chart.js : prix réel P(y) (noir épais) vs approximation ordre 1 (orange pointillés) vs ordre 2 (bleu pointillés). Obligation couponnée 10 ans, nominal 100, coupons annuels. X fixes 0.1%→23% (N_POINTS=200, calculés une seule fois). Axes figés X:0→23, Y:0→200. Ligne verticale au taux y₀ via plugin beforeDraw + y0Ref. 2 sliders (taux central y₀ + coupon). 3 cartes (Sensibilité, Convexité, Erreur Δ-hedging à +200bps). Pattern : init useEffect([]) + update useEffect([y0, couponPct]) → chart.update('none') sans recréation.
      CallableBondChart.js           ← Composant Chart.js : Bond classique (noir, dataset 2) vs Callable Bond (bleu, dataset 0) + helper fill vert (dataset 1, fill:'+1'). Seuil de rappel = coupon (y < couponPct → min(prix, 100.5)). Axe X 0.5%→10%, Y 60→140. Ligne verticale pointillée bleue au taux de marché actuel via marketRateRef mutable. 2 sliders (coupon 1→10% / taux marché 0.5→10%). 2 cartes (valeur de l'option au taux actuel en vert / gain si rappel en bps, texte rouge si négatif). Pattern deux useEffect anti-vibration.
      DigitalReplicationChart.js     ← Composant Chart.js : réplication d'une option digitale par Call Spread. K=100, S 80→120 (201 points). Courbe noire pointillée "Digital idéale" (step function via deux points 99.999/100.001) + courbe bleue pleine "Call Spread". Slider ε 0.5→10 (pas 0.5, défaut 4). Axe Y fixé 0→1.2. Mise à jour directement dans le handler onChange (pas dans useEffect) — contournement du bug chart.update('none') avec animation:false.
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
    module-4-taux-credit/
      obligations-bases/page.js        ← ✅ Fait (5 sections : vecteur de flux, Rho des taux, ZC & T-Bills, FRN, Repo)
      duration-convexite/page.js       ← ✅ Fait (6 sections : Taylor, ordre 1, monde continu, convexité, convexité négative, DV01)
      duration-convexite/ConvexityWrapper.js ← Wrapper 'use client' pour ConvexityChart (next/dynamic ssr:false)
      fwd-rate-agreement/page.js             ← ✅ Fait (4 sections : taux forward, FRA + pricing, futures vs FRA, bootstrapping)
      interest-rate-swap/page.js             ← ✅ Fait (5 sections : définition, single-curve, multi-curve post-2008, DV01, swap spread)
    module-5-fixed-income-2/
      cap-floor/page.js                ← ✅ Fait (5 sections : Caplets/Floorlets, parité Cap-Floor-Swap, Collar/option cachée, Flat Vol vs Spot Vol, Grecques Delta/Rho)
      bond-options-swaptions/page.js   ← ✅ Fait (4 sections : définition/équivalence Payer-Receiver, pricing Bachelier + cube de vol, Bermudéennes/Callable Bonds, Greeks du cube)
      bond-options-swaptions/CallableBondWrapper.js ← Wrapper 'use client' pour CallableBondChart (next/dynamic ssr:false)
      cms/page.js                      ← ✅ Fait (5 sections : mécanique CMS + Steepener, intuition convexité swap vs CMS, ajustement de convexité, réplication Carr-Madan, modélisation SABR)
      convertible-bond/page.js         ← ✅ Fait (5 sections : décomposition Bond+Call, trois zones Busted/Hybride/Equity-Bound, premium + break-even, arbitrage delta-hedging, pièges desk)
      range-accrual/page.js            ← ✅ Fait (5 sections : mécanique + MinGtee, cross-asset, callable, somme de digitales, réplication Call Spread)
      range-accrual/DigitalReplicationWrapper.js ← Wrapper 'use client' pour DigitalReplicationChart (next/dynamic ssr:false)
      modele-taux/page.js              ← ✅ Fait (5 sections : Vasicek, HW1F, limite corrélation parfaite, HW2F, HJM/LMM + tableau synthèse 4×4)
    module-6-fixed-income-3/
      .gitkeep                         ← Dossier placeholder (pas de page.js)
    module-7-quanto-fx/
      correlation-fx/page.js           ← ✅ Fait (titre : "Corrélation Indice et FX") — affiché Module 9
      options-quanto/page.js           ← ✅ Fait (titre : "Options Quanto & Composite") — regroupe Quanto + Composite, page finale du module
    module-8-macro/
      plomberie-fed/page.js            ← ✅ Fait (titre : "Fonctionnement de la Fed") — affiché Module 10
  quiz/
    page.js                          ← Index des quiz — 10 entrées, disponibles : 01/02/03/08/09/10 (affiché) ; quizEndpoint sur 08/09/10 pour pointer vers les slugs réels /quiz/module-6/7/8
    module-1/
      page.js                        ← ✅ Quiz Module 1 : 8 questions interactives avec KaTeX
    module-2/
      page.js                        ← ✅ Quiz Module 2 : banque 24q, tirage stratifié 12/session (4 groupes × 3)
    module-3/
      page.js                        ← ✅ Quiz Module 3 : banque 20q, tirage stratifié 10/session (4+3+3)
    module-6/
      page.js                        ← ✅ Quiz Volatilité (affiché Module 8) : banque 24q, tirage stratifié 12/session (4 groupes × 3)
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
- Pattern KaTeX dans les quiz : `import katex from 'katex'` + `import 'katex/dist/katex.min.css'` + composant helper local `function Katex({ children, block = false })` avec `dangerouslySetInnerHTML`
- **⚠️ NE PAS nommer le helper `Math`** — cela écrase le global JavaScript `Math` (`Math.random`, `Math.floor`...) et provoque des erreurs au runtime. Toujours utiliser `Katex`.
- **Robustesse du composant Katex** : normaliser `children` avant de passer à KaTeX : `const formula = Array.isArray(children) ? children.join('') : String(children)` — évite l'erreur "KaTeX can only parse string typed expression" causée par des espaces traînants dans les balises JSX.
- Le CSS KaTeX est importé dans chaque page quiz (contrairement aux cours où il est dans `cours/layout.js`)
- Questions, choix **et explications** sont du JSX (pas des strings) — permet d'imbriquer `<Katex>` dans les énoncés, les choix et le corrigé
- Choix purement textuels : JSX minimal `<>texte</>` suffit, pas besoin de `<Katex>`
- Logic standard : `current`, `selected`, `validated`, `results`, `finished` — réutiliser ce pattern pour tous les quiz
- Page index `/quiz/page.js` : disponibilité via `["01","02","03","08","09","10"].includes(module.number)` (numéros affichés). Les modules 08/09/10 ont un champ `quizEndpoint` qui pointe vers l'endpoint réel (`/quiz/module-6`, `/quiz/module-7`, `/quiz/module-8`). Le href utilise `module.quizEndpoint || \`/quiz/module-${parseInt(module.number)}\``. Pour tout nouveau quiz, ajouter son numéro affiché à l'array et un `quizEndpoint` si le numéro affiché diffère du numéro réel.
- **Tirage stratifié (banque de questions)** : pour les quiz avec banque large, diviser les questions en groupes thématiques (ex. 4 groupes de 6 = 24 questions). Tirer N questions aléatoires dans chaque groupe via `useEffect(() => setQuestions(drawSession()), [])` avec `useState(null)` comme état initial. **Ne pas utiliser `useState(() => drawSession())`** — cet initialiseur s'exécute aussi côté serveur (SSR) et produit un tirage différent de celui du client, causant une erreur d'hydration React. `handleRestart` déclenche `window.location.reload()` pour forcer un nouveau tirage. Voir `app/quiz/module-2/page.js` comme template de référence.

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
- **⚠️ Chart.js — callbacks tooltip** : `title(tooltipItems)` reçoit un **tableau** → `items[0].parsed.x`. `label(tooltipItem)` reçoit un **seul** TooltipItem → `item.parsed.y` directement. Ne jamais écrire `item[0].parsed` dans un `label` callback — `item[0]` est `undefined` et le site crashe.
- **⚠️ Chart.js — ticks.color/font callbacks** : `context.chart.scales.y.ticks` peut être `null` lors du premier rendu. Toujours garder : `const allTicks = context.chart.scales.y?.ticks; if (!allTicks?.length) return valeurParDéfaut;` avant toute itération.
- **Pattern destroy/recréation Chart.js** : quand plusieurs états (ex. `y` et `T`) pilotent le graphique, mettre tous les états en dépendance du `useEffect` (`[y, T]`) — le chart est détruit puis recréé à chaque changement. Plus simple que les mises à jour partielles pour les cas avec changements d'échelle ou de dataset.
- **⚠️ Anti-pattern : vibration des sliders** : si les sliders bougent et que le graphique "vibre" ou clignote, c'est que le chart est recréé à chaque frame. Solution : pattern à deux effets — `useEffect([], [])` pour l'initialisation (une seule fois), `useEffect([slider1, slider2])` pour mettre à jour uniquement les données via `chart.data.datasets[i].data = ...` puis `chart.update('none')`. Pour les plugins qui lisent des valeurs de sliders (ex. ligne verticale), utiliser une `ref` mutable (`const xRef = useRef(valInit); xRef.current = x` dans le corps du composant) — le plugin lit `xRef.current` et reste correct sans recréer le chart. Voir `ConvexityChart.js` comme template de référence pour ce pattern.

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
Actuellement, les **Modules 1, 2, 3, 6, 7 et 8** ont un quiz actif.

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

- **2026-04-14 (quiz module 2)** :
  - **Quiz Module 2 — Pricing** (`app/quiz/module-2/page.js`) créé. Banque de 24 questions réparties en 4 groupes thématiques (A : Équation BS, B : Formule BS, C : Modèles de diffusion, D : Monte-Carlo). Tirage stratifié de 12 questions à chaque session (3 par groupe, mélangées aléatoirement). State initialisé via `useState(() => drawSession())` — le tirage est figé pour toute la session, `handleRestart` recharge la page pour un nouveau tirage.
  - **Page index `/quiz`** : Module 2 activé — `isAvailable` étendu à `"02"`, href dérivé dynamiquement.
  - **4 pages du Module 2** : badge "Bientôt disponible" remplacé par le lien actif `→ /quiz/module-2` dans les blocs quiz bas de page.
  - **CLAUDE.md** : conventions quiz mises à jour avec le pattern tirage stratifié.

- **2026-04-15** :
  - **Quiz Module 1 mis à niveau** : composant helper renommé `Math` → `Katex` (évite le conflit avec le global JS). Toutes les explications converties de strings en JSX avec `<Katex>` pour le rendu des formules. Bouton "← Tous les quiz" ajouté sur l'écran de résultats (à côté de "Recommencer" et "Revoir le Module 1").
  - **3 bugs corrigés** :
    - `Math.random is not a function` (module-2) : nommer le helper `Math` écrasait le global JS — corrigé en renommant en `Katex` dans les deux quiz.
    - `KaTeX can only parse string typed expression` (module-1) : espaces traînants dans `<Katex>  </Katex>` créaient un tableau de children — corrigé en ajoutant `Array.isArray(children) ? children.join('') : String(children)` dans le composant.
    - Hydration mismatch (module-2) : `useState(() => drawSession())` s'exécutait côté serveur avec un résultat différent du client — corrigé avec `useState(null)` + `useEffect`.

- **2026-04-16** :
  - **Quiz Module 3 — The Greeks** (`app/quiz/module-3/page.js`) créé. Banque de 20 questions réparties en 3 groupes thématiques (A : Greek formulas & propriétés — 8q, B : démonstrations Delta/Gamma/Vega — 6q, C : arbitrage Theta-Gamma — 6q). Tirage stratifié 10 questions/session (4 de A, 3 de B, 3 de C), mélangées. Pattern `useState(null)` + `useEffect`. Bouton "← Tous les quiz" sur l'écran de résultats. Seuils de score : ≥8 vert, ≥5 amber, <5 rouge.
  - **Quiz Module 6 — Volatilité** (`app/quiz/module-6/page.js`) créé. Banque de 24 questions réparties en 4 groupes thématiques (A : vol implicite et nappes — 6q, B : vol stochastique / Heston / SABR — 6q, C : variance swap et VIX — 6q, D : skew delta — 6q). Tirage stratifié 12 questions/session (3 par groupe), mélangées. Même pattern que module-2.
  - **Équilibrage des positions de réponse** : dans les deux quiz, les bonnes réponses ont été redistribuées pour obtenir exactement 5 occurrences par position (0, 1, 2, 3) sur les 20 et 24 questions respectivement. Principe : réordonner les choix de chaque question (sans changer le contenu), mettre à jour `answer` en conséquence. À appliquer systématiquement à chaque nouveau quiz pour éviter que la bonne réponse soit toujours à la même position.
  - **`quiz/page.js`** : `isAvailable` étendu à `"03"` et `"06"`.
  - **3 pages Module 3** : bloc quiz "bientôt disponible" → lien actif `/quiz/module-3` (grecques-premier-ordre, grecques-second-ordre, arbitrage-theta-gamma).
  - **4 pages Module 6** : bloc quiz "bientôt disponible" → lien actif `/quiz/module-6` (vol-implicite-nappes, vol-stochastique, variance-swap-vix, skew-delta).

- **2026-04-18** :
  - **Quiz Module 7 — Quanto & FX** (`app/quiz/module-7/page.js`) créé. Banque de 20 questions réparties en 2 groupes thématiques (A : Corrélation Indice et FX — 10q, B : Options Quanto & Composite — 10q). Tirage stratifié 10 questions/session (5 de A + 5 de B), mélangées aléatoirement. Pattern `useState(null)` + `useEffect`. Seuils de score : ≥8 vert, ≥5 amber, <5 rouge. Bouton "← Tous les quiz" sur l'écran de résultats.
  - **Équilibrage des positions de réponse** : redistribution pour obtenir exactement 5 occurrences par position (0, 1, 2, 3) sur les 20 questions. A2 : bonne réponse déplacée de la position 0 à la position 1 (choix réordonnés). B3 : bonne réponse déplacée de la position 3 à la position 2 (choix réordonnés).
  - **`quiz/page.js`** : `isAvailable` étendu à `"07"`.
  - **2 pages Module 7** : bloc quiz "bientôt disponible" → lien actif `/quiz/module-7` (correlation-fx, options-quanto).
  - **Quiz Module 8 — Macro** (`app/quiz/module-8/page.js`) créé. Banque de 20 questions réparties en 2 groupes thématiques (A : Fonctionnement de la Fed — 10q, B : Politique monétaire — 10q). Tirage stratifié 10 questions/session (5 de A + 5 de B), mélangées aléatoirement. Pattern `useState(null)` + `useEffect`. Seuils de score : ≥8 vert, ≥5 amber, <5 rouge. Bouton "← Tous les quiz" sur l'écran de résultats. Contenu entièrement textuel (pas de LaTeX).
  - **Équilibrage des positions de réponse (Module 8)** : redistribution pour obtenir exactement 5 occurrences par position (0, 1, 2, 3) sur les 20 questions. Questions réordonnées : A2 (IORB → pos 0), A4 (25 bps → pos 0), B1 (taux 2 ans → pos 0), B2 (prime de terme → pos 0), B4 (courbe inversée → pos 1), B5 (dot plot → pos 1).
  - **`quiz/page.js`** : `isAvailable` étendu à `"08"`.
  - **2 pages Module 8** : bloc quiz "bientôt disponible" → lien actif `/quiz/module-8` (plomberie-fed, politique-monetaire).

- **2026-04-19** :
  - **`quiz/page.js` — refonte des cartes** : champ `description` remplacé par `pages` (liste des sous-pages du module, séparées par `·`). Nombre de questions corrigé pour afficher le tirage réel par session (pas la taille de la banque) : M1=8, M2=12, M3=10, M6=12, M7=10, M8=10. Les modules 4 et 5 (non disponibles) affichent 10 par défaut.
  - **`cours/page.js` — refonte visuelle du chemin serpent** : remplacement des cercles numérotés par des cartes rectangulaires. Architecture finale :
    - **Constantes de layout** : `CARD_W = 208px`, `CONN_W = 64px`, `ROW_W = CARD_W*3 + CONN_W*2 = 752px`. Conteneur serpent centré via `width: ROW_W; margin: 0 auto`.
    - **Cartes `Node`** : deux parties séparées par un filet. Haut (`padding: 10px 14px`) : numéro `fontSize 22 fontWeight 700` + titre `fontSize 13 fontWeight 600`, flex row. Bas (`padding: 8px 14px`) : liste des sous-pages. Modules actifs (1,2,3,6,7,8) : bordure `#2563eb`, numéro `#2563eb`, fond bas `#eff6ff`, liens `<a>` bleus hover underline. Modules inactifs (4,5) : bordure `#bfdbfe`, numéro `#bfdbfe`, titre `#9ca3af`, fond bas `#f9fafb`, texte gris non cliquable.
    - **`HConn`** : `width: CONN_W (64px)`, `height: 2px`, `flexShrink: 0`, `marginTop: 22px` (aligné avec le centre de la partie haute des cartes). Pas de `flex` sur la div (évite le bug `flex-basis: 0%` qui écrasait la largeur).
    - **`VConn`** : `width: ROW_W`, `height: 32px`, ligne verticale `width: 2px`. Offset calculé en px : `paddingRight/Left = CARD_W/2 - 1 = 103px` — aligne le centre de la ligne avec le centre de la carte d'extrémité.
    - **Rangée 3** (7→8) : fantôme `<div style={{ width: CARD_W }}>` + `<HConn invisible>` pour maintenir l'alignement sur 3 colonnes.
    - **Correction bug HConn** : l'ancienne version utilisait `flex: 0` qui génère `flex-basis: 0%` en CSS et écrase `width` → la div collapsait à 0px et la ligne disparaissait. Corrigé en supprimant `flex: 0` et en gardant uniquement `flexShrink: 0`.

- **2026-04-17** :
  - **Simulateur de positions — COMPLET** (`app/simulateur/page.js`) : composant client complet en un seul fichier — remplace le placeholder. Architecture finale documentée ci-dessous.

  - **Architecture du simulateur**
    - **Book de trades** : max 2 trades simultanés. Chaque trade = carte compacte `bg-white border-l-4` (bandeau bleu Trade 1, rouge Trade 2). Champs affichés : type/sens (badges), S/K/σ/T en grille 4 colonnes, prime, contrats, montant. Bouton × pour fermer.
    - **Modale d'ajout de trade** : panneau latéral droit, slide-in depuis la droite (transition CSS `translate-x`), fond semi-transparent. Toggle Call/Put et Long/Short (boutons bleus). 7 champs numériques : S, K, σ (%), T, q (%), r (%), montant (€). `r` grisé et pré-rempli depuis trade 1 si déjà ouvert (cohérence pricing). Aperçu temps réel : prime BS recalculée à chaque frappe + nombre de contrats = `montant ÷ (prime × 100)`. Bouton "Lancer mon trade →" désactivé si inputs invalides.
    - **4 graphiques Greeks** (Delta, Gamma, Vega, Theta) en grille 2×2 (`grid-cols-1 md:grid-cols-2`). Axe X = moneyness S/K de 0.5 à 1.5 (200 points). Axe Y labellisé en euros : "Delta (€)", "Gamma (€)", "Vega (€)", "Theta (€/j)". Checkboxes pour masquer/afficher chaque graphique entier. Avec 1 trade : courbe bleue pleine. Avec 2 trades : courbes bleue/rouge en pointillés + courbe agrégée noire (somme simple). Légende filtre les datasets `_spot` (via label commençant par `_`).
    - **Plugin `beforeDraw`** (Chart.js inline, un par graphique) : ligne horizontale y=0 (`rgba(100,100,100,0.35)`, 1px, aucun tiret) + lignes verticales pointillées au spot réel de chaque trade (couleur par trade, opacité 0.45). `tradesRef` (ref mutable) partagée avec le plugin pour lecture synchrone sans re-créer le chart.
    - **Zones colorées** (Filler plugin) : deux datasets helper `_fill_pos` (données = `max(y,0)`, fond vert 12%) et `_fill_neg` (données = `min(y,0)`, fond rouge 10%), basés sur la courbe de référence (bleue si 1 trade, noire agrégée si 2 trades). Placés en tête du tableau de datasets pour rendu en arrière-plan.
    - **Point au spot** : dataset `_spot` avec un seul point, `pointRadius: 6`, même couleur que la courbe du trade concerné, sans ligne.
    - **Scaling trading floor — convention euros** : `scaleEur(gName, t)` calcule `N = montant / S` (nombre d'unités fixe par trade), puis : `Delta_€ = Δ_BS × N`, `Gamma_€ = Γ_BS × N × S × 1%`, `Vega_€ = 𝒱_BS × N × 1%`, `Theta_€ = Θ_BS × N / 365`. Short = signe −1. Agrégation = somme simple des Greeks en euros (pas de pondération).
    - **Valeurs numériques au spot** (ligne des checkboxes) : pour chaque Greek, mini-colonne `font-mono text-xs` à droite du label. 1 trade : point bleu + valeur. 2 trades : point bleu, point rouge, séparateur `border-t`, somme en noir. Couleurs : vert si > 0, rouge si < 0, gris si ≈ 0. Format : `+1234.5678` (4 décimales, signe explicite).
    - **Modale ⓘ** : bouton circulaire gris `ⓘ` à droite de "Afficher :", ouvre une modale centrée (`max-w-lg`, overlay `bg-black/40`). Contenu : explication de la convention euros (N = montant/S, 4 formules en `font-mono bg-gray-100 rounded`), agrégation en somme, lecture des courbes moneyness. Bouton "Fermer" en bas.
    - **Formules BS** : `ncdf` copiée exactement depuis `GreeksChart.js` (A&S 26.2.17, erreur < 7.5e-8). `greekBS(name, type, S, K, r, q, sigma, T)` : Delta, Gamma, Vega, Theta avec dividende `q`. Protection T≤0 / σ≤0 / S≤0 → retourne 0 ou valeur intrinsèque.
    - **État vide** : message d'invitation centré avec bouton "Ouvrir un trade".
    - **Style** : `bg-gray-50 min-h-full py-12 px-6`, `max-w-7xl mx-auto`, cards `bg-white border border-gray-300 rounded-xl`. Respecte toutes les règles de style du projet (pas de dark mode, accent blue-600, bordures gray-300).

- **2026-04-29** :
  - **Passage de 8 à 10 modules** : restructuration purement affichage — aucun slug physique modifié, aucune page de cours touchée.
  - **Deux nouveaux modules insérés en positions 5 et 6** : Fixed Income II (`module-5-fixed-income-2`) et Fixed Income III (`module-6-fixed-income-3`). Dossiers créés avec `.gitkeep`. Pas de `page.js` pour l'instant.
  - **Décalage des anciens modules 5→8 en 7→10** (affichage uniquement) :
    - Produits Equity : affiché 5 → 7, slug `module-5-produits-equity` inchangé
    - Volatilité : affiché 6 → 8, slug `module-6-volatilite` inchangé
    - Quanto & FX : affiché 7 → 9, slug `module-7-quanto-fx` inchangé
    - Macro : affiché 8 → 10, slug `module-8-macro` inchangé
  - **Module 4 renommé** : "Taux & Crédit" → "Fixed Income I". Sous-pages redessinées : Obligations & Bases / Duration & Convexité / Fwd Rate Agreement / Interest Rate Swap (non cliquables, pas de pages créées). Slug `module-4-taux-credit` inchangé.
  - **`app/cours/page.js`** : chemin serpent adapté à 4 rangées (1→3, 4→6, 7→9, 10 seul à droite + 2 fantômes). Constantes ROW_W inchangées (3 colonnes × 208px). 3e VConn `side="right"` ajouté après la rangée 7→9.
  - **`app/cours/components/Sidebar.js`** : 10 modules dans l'ordre affiché. Sous-pages sans `slug` rendues en `<span className="text-gray-400 cursor-default">` non cliquable (modules 4/5/6/7). Rendu conditionnel `sp.slug ? <Link> : <span>`.
  - **`app/quiz/page.js`** : 10 entrées. `isAvailable` = `["01","02","03","08","09","10"]`. Champ `quizEndpoint` sur modules 08/09/10 (`/quiz/module-6`, `/quiz/module-7`, `/quiz/module-8`) pour dissocier numéro affiché et endpoint réel. `href` = `module.quizEndpoint || \`/quiz/module-${parseInt(module.number)}\``.

- **2026-04-29 (suite)** :
  - **Page "Obligations & Bases"** (`app/cours/module-4-taux-credit/obligations-bases/page.js`) créée. Première sous-page du Module 4. 5 sections h2. Dossier `module-4-taux-credit/` créé de zéro.
    - **Section 1 — Un vecteur de flux** : formule de pricing `P(y) = Σ CF_i · e^{−y t_i}` encadrée. Boîte bleue "Le yield to maturity" (taux implicite = convention de cotation, pas un taux de marché direct).
    - **Section 2 — Le Rho des taux** : intuition inverse prix/taux, dérivée formelle `∂P/∂y = −Σ t_i · CF_i · e^{−y t_i} < 0` encadrée. Boîte bleue "Différence avec les actions". Composant `ZeroCouponChart` interactif inséré après.
    - **Section 3 — ZC et T-Bills** : formule `P_ZC = N · e^{−yT}` encadrée, lien facteur d'escompte/bootstrapping. Formule de cotation T-Bill Actual/360 encadrée. Boîtes bleues dédiées.
    - **Section 4 — Le FRN** : mécanisme de reset, démonstration du retour au pair `N(1 + rδ)/(1 + rδ) = N` encadrée. Boîte bleue risque de taux vs risque de crédit.
    - **Section 5 — Le Repo** : mécanisme prêt collatéralisé, formule `Cash remis = Cash initial × (1 + R × dt/360)` encadrée. Boîte bleue "clé de voûte de l'arbitrage". Boîte amber "Special Repo".
    - Navigation : ← Arbitrage Theta-Gamma / → Duration & Convexité.
  - **Sidebar** : `obligations-bases` rendu cliquable (slug ajouté) — les 3 autres sous-pages du module 4 restent en `<span>` non cliquable.
  - **Composant ZeroCouponChart** (`app/cours/components/ZeroCouponChart.js`) créé. Deux bugs corrigés en cours de session :
    - **Bug 1** — `Cannot read properties of null (reading 'forEach')` : `context.chart.scales.y.ticks` est `null` lors du premier rendu. Corrigé par garde `?.ticks` + `?.length`.
    - **Bug 2** — `Cannot read properties of undefined (reading 'parsed')` : callback `label` de Chart.js reçoit un seul `TooltipItem` (pas un tableau) — `ctx[0]` est `undefined`. Corrigé en `label: (item) => item.parsed.y`.
  - **Évolutions du composant** : ajout d'un axe Y fixé 0→105 (chute visible), ajout d'un deuxième slider durée (6 mois → 10 ans), formule actualisée `P(t) = 100 × e^{−y(T−t)}` avec axe X dynamique 0→T.

- **2026-04-30** :
  - **Page "Duration & Convexité"** (`app/cours/module-4-taux-credit/duration-convexite/page.js`) créée. Deuxième sous-page du Module 4. 6 sections h2.
    - **Section 1 — Taylor** : formule P(y) encadrée en `bg-gray-50`. Développement d'ordre 2 encadré. Variation relative dP/P encadrée. Phrase de transition vers Sensibilité et Convexité.
    - **Section 2 — Ordre 1** : trois sous-parties (A) Duration Macaulay — formule `D_mac = Σ t_i·CF_i·(1+y)^{−t_i}/P` encadrée + boîte bleue intuition "7 ans sur 10 ans" ; (B) Sensibilité — formule `S = −(1/P)·∂P/∂y` encadrée + lien `S = D_mac/(1+y)` encadré + note Duration Modifiée ; (C) Exemple chiffré avec bloc "À retenir" `dP/P ≈ −S·dy`.
    - **Section 3 — Monde continu** : disparition du (1+y), coïncidence Duration/Sensibilité, formule `dP/P ≈ −D·dy` encadrée, boîte bleue quants / temps continu.
    - **Section 4 — Convexité** : droite tangente vs courbe convexe, définition `C = (1/P)·∂²P/∂y² = Σ t_i²·CF_i·e^{−yt_i}/P` encadrée. Formule P&L complète `dP/P ≈ −S·dy + ½C(dy)²` encadrée. Composant `ConvexityChart` interactif + phrase de transition. Boîte bleue convexité strictement positive.
    - **Section 5 — Convexité négative** : boîte amber "Attention". Deux boîtes bleues côte à côte Callable Bond / MBS. Phrase sur la prime optionnelle.
    - **Section 6 — DV01** : formule `DV01 = S × P × N × 0.0001` encadrée. Couverture Delta-Neutre, formule `N_contrats = −DV01_position / DV01_couverture` encadrée. Boîte amber "Risque de base" (twist, butterfly).
    - Navigation : ← Obligations & Bases / → Fwd Rate Agreement.
  - **Sidebar** : `duration-convexite` rendu cliquable (slug ajouté) — les 2 autres sous-pages du module 4 restent en `<span>` non cliquable.
  - **Composant ConvexityChart** (`app/cours/components/ConvexityChart.js`) créé. Voir architecture des fichiers clés pour le détail.
  - **ConvexityWrapper** (`app/cours/module-4-taux-credit/duration-convexite/ConvexityWrapper.js`) : wrapper `'use client'` + `next/dynamic { ssr: false }`.
  - **Bug vibration Chart.js corrigé** : le pattern destroy/recréation du chart dans `useEffect([sliders...])` provoque un flickering visible à chaque mouvement de slider. Corrigé avec le pattern à deux effets :
    1. `useEffect([], [])` — crée le chart une seule fois au montage, avec le plugin `beforeDraw` qui lit une `ref` mutable pour la ligne verticale.
    2. `useEffect([slider1, slider2])` — met à jour uniquement `chart.data.datasets[i].data` puis appelle `chart.update('none')`. Zéro recréation, zéro vibration.
    - La ref `y0Ref.current = y0` est mise à jour synchroniquement dans le corps du composant (avant les effets) — le plugin lit toujours la valeur courante sans jamais recréer le chart.
    - ⚠️ À appliquer à tout nouveau composant Chart.js avec sliders. Ne jamais mettre des dépendances de sliders dans le `useEffect` d'initialisation du chart.

- **2026-05-03** :
  - **Page "Courbe des taux & instruments"** (`app/cours/module-4-taux-credit/fwd-rate-agreement/page.js`) créée. Troisième sous-page du Module 4. 4 sections h2.
    - **Section 1 — Du taux spot au taux forward** : égalité des facteurs d'escompte encadrée → formule `F(T₁,T₂) = (y₂T₂ − y₁T₁)/(T₂−T₁)` encadrée. Boîte bleue exemple chiffré (y₁=2%, y₂=3%, F(1,2)=4%).
    - **Section 2 — Le Forward Rate Agreement** : payoff actualisé en T₁ `N×(L−K)×δ×e^{−Lδ}` encadré. Boîte bleue exemple chiffré (FRA 1an→1,5an, K=3%, L=4%, gain 4 901 €). Boîte bleue pricing en cours de vie : `V_FRA = N×δ×(F(T₁,T₂)−K)×DF(0,T₂)`.
    - **Section 3 — Futures sur taux vs FRA** : boîte amber "ajustement de convexité" — biais de mark-to-market quotidien, formule `F_forward = F_future − ½σ²T₁T₂` (modèle Vasicek simplifié).
    - **Section 4 — Bootstrapping** : 3 étapes numérotées (point de départ taux monétaire → itération FRA/futures → interpolation log-linéaire). Formules encadrées pour chaque étape. Boîte bleue avec lien FRED courbe US Treasury.
    - Navigation : ← Duration & Convexité / → Interest Rate Swap.
  - **Sidebar** : `fwd-rate-agreement` rendu cliquable (slug ajouté) — `Interest Rate Swap` reste en `<span>` grisé.

- **2026-05-04** :
  - **Page "Interest Rate Swap"** (`app/cours/module-4-taux-credit/interest-rate-swap/page.js`) créée. Quatrième et dernière sous-page du Module 4. 5 sections h2.
    - **Section 1 — Définition et conventions** : deux boîtes bleues côte à côte (Payer Swap = long taux / short obligation / Receiver Swap = short taux / long obligation). Paragraphe sur le netting. Tableau 2 lignes × 3 colonnes (Fixe 30/360 / Variable Exact/360).
    - **Section 2 — Pricing classique : le monde single-curve** : valeur de la jambe variable par structure télescopique `DF(t_{i-1}) − DF(t_i)` encadrée → somme `PV_variable = 1 − DF(T)` encadrée. Par swap rate `S = (1 − DF(T)) / Annuité` encadré. Boîte bleue "L'Annuité comme mesure de risque" (PVBP → DV01).
    - **Section 3 — Le paradigme multi-curve (post-2008)** : boîte amber "Pourquoi 2008 a tout changé" (basis spread Euribor 3M/OIS à 350 bps). Deux boîtes bleues côte à côte (Courbe de projection Euribor / Courbe d'actualisation OIS). Formule par swap rate multi-curve encadrée (moyenne pondérée des forwards Euribor actualisés en OIS). Boîte bleue "Le contrat CSA" (Credit Support Annex, choix de la courbe d'actualisation selon le collatéral).
    - **Section 4 — Risques et sensibilités** : DV01 = `PV(r) − PV(r+0.0001)` encadré + approximation `N × D × 0.0001` encadrée (exemple swap 10 ans 10M€ = 10 000 €). Deux boîtes bleues côte à côte (Receiver Swap convexité positive / Payer Swap convexité négative).
    - **Section 5 — Hedging et Swap Spread** : couverture via Bund/OAT Future, `N_contrats = DV01_position / DV01_future` encadré. Swap Spread = Taux Swap − Taux OAT encadré. Risque d'écartement en cas de stress bancaire. Tableau de synthèse 5 lignes × 3 colonnes (Convention fixe/variable, Actualisation OIS, Projection Euribor, Basis Swap).
    - Navigation : ← Courbe des taux & instruments / pas de suivant (`<div />`).
  - **Sidebar** (`app/cours/components/Sidebar.js`) : `slug: 'interest-rate-swap'` ajouté — la sous-page est désormais cliquable.
  - **`app/cours/page.js`** : Module 4 passe en `active` avec les 4 `href` renseignés — la carte est désormais en bleu avec les sous-pages cliquables.
  - **Module 4 — Fixed Income I : COMPLET (4/4 pages)**.

- **2026-05-04 (suite)** :
  - **Page "Cap & Floor"** (`app/cours/module-5-fixed-income-2/cap-floor/page.js`) créée. Première sous-page du Module 5. 5 sections h2.
    - **Section 1 — Anatomie d'un Cap : Caplets** : Cap = somme de Caplets, Floor = somme de Floorlets. Deux payoffs encadrés en `bg-gray-100` (Caplet : `(L-K)_+ × N × δ_i` / Floorlet : `(K-L)_+ × N × δ_i`). Boîte bleue "Deux pièges structurels" : (A) Fixing in advance, payment in arrears — taux observé en `t_i` mais payé en `t_{i+1}`, actualiser avec `DF(0, t_{i+1})` ; (B) Le Caplet manquant — Cap 5 ans Euribor 3M = 19 Caplets (pas 20), le premier taux est déjà fixé.
    - **Section 2 — Parité Cap-Floor-Swap** : démonstration en 2 étapes : `(L-K)_+ - (K-L)_+ = L-K` → agrégation = IRS Payer. Résultat encadré en `bg-gray-100` : Achat Cap − Vente Floor = Swap Payer (IRS). Analogie avec la parité Call-Put en actions.
    - **Section 3 — Stratégies : Collar et option cachée** : Zero Cost Collar — achat Cap + vente Floor jusqu'à prime nette nulle, rôle du quant pour ajuster les strikes. Boîte bleue "L'option cachée du Livret A" — taux jamais négatif = Floor strike 0% vendu implicitement par la banque, risque porté par l'ALM.
    - **Section 4 — Flat Vol, Spot Vol et bootstrapping** : deux boîtes bleues côte à côte (Flat Vol = chiffre Bloomberg unique / Spot Vol = volatilité intrinsèque par Caplet). Bootstrapping en 3 étapes numérotées (Cap 1 an → Cap 2 ans → répétition → Term Structure of Volatility). Boîte bleue "Pourquoi ça compte" (Flat Vol inutilisable pour les exotiques, seule la Spot Vol permet de pricer des produits path-dependent).
    - **Section 5 — Grecques : le conflit Delta/Rho** : boîte bleue "Intuition économique" (Long Cap = Long taux = Short obligations). Deux boîtes bleues côte à côte : Effet Delta (Forward monte → valeur intrinsèque augmente → Cap gagne) / Effet Rho (Discounting baisse → valeur actuelle diminue → Cap perd). Conclusion encadrée : l'effet Delta domine en pratique, mais le quant calcule précisément le ratio Forward/OIS pour delta-hedger.
    - Navigation : ← Interest Rate Swap / → Bond Options & Swaptions (lien ajouté en fin de session).
  - **Sidebar** : `slug: 'cap-floor'` ajouté sur la première sous-page du Module 5 — les 5 autres restent en `<span>` grisé.

- **2026-05-04 (fin de session)** :
  - **Page "Bond Options & Swaptions"** (`app/cours/module-5-fixed-income-2/bond-options-swaptions/page.js`) créée. Deuxième sous-page du Module 5. 4 sections h2.
    - **Section 1 — Définition, Typologie et Équivalence** : Payer Swaption = Put sur Bond (Long Rates) / Receiver Swaption = Call sur Bond (Short Rates). Notation standard `1y10y` : Expiry 1 an, Tenor 10 ans, sous-jacent = taux swap forward 10 ans dans 1 an.
    - **Section 2 — Pricing et Modélisation** : passage Black lognormal → Bachelier normal (taux négatifs). EDS arithmétique `dS = σ_N dW`. Payoff `N × Annuité × max(S_Fwd − K, 0)`. Formule fermée Bachelier : `V_Payer = N × Annuité × [(F−K)N(d) + σ_N√T n(d)]`. Boîte amber "Le problème des taux négatifs". Boîte bleue "Le Cube de Volatilité" (3D : Strike × Expiry × Tenor).
    - **Section 3 — Swaptions Bermudéennes et Callable Bonds** : notation `10nc1`, décomposition `Callable Bond = Bond Fixe + Vente d'une Receiver Swaption Bermudéenne`. Boîte bleue "L'analogie du Covered Call" (convexité négative). Composant `CallableBondChart` interactif. Boîte bleue "La complexité du pricing — Optimal Stopping Time" (Longstaff-Schwartz).
    - **Section 4 — Trading de Volatilité : les Greeks du Cube** : Long Vega / Long Gamma / Short Theta (3 boîtes). Stratégie de déformation du cube `Long Vega_5y5y + Short Vega_1y10y`.
    - Navigation : ← Cap & Floor / → CMS.
  - **Composant CallableBondChart** (`app/cours/components/CallableBondChart.js`) créé. Voir architecture des fichiers clés pour le détail.
    - **Logique du callable** : seuil de rappel = coupon (y < couponPct → min(prix, 100.5)). Pas de paramètre externe.
    - **Datasets** : 0 = Callable Bond (bleu, dessiné en premier), 1 = helper fill vert (données Callable, fill:'+1' → Bond), 2 = Bond classique (noir, dessiné en dernier sur le bleu).
    - **Sliders** : coupon (1→10%, défaut 5%) + taux de marché actuel (0.5→10%, défaut 4%). La ligne verticale suit `marketRateRef.current` via plugin `beforeDraw`.
    - **Cartes** : "Valeur de l'option au taux actuel" = pBond − pCallable (vert si > 0) / "Gain si rappel" = (coupon − tauxMarché) × 100 bps (vert si positif, texte rouge "L'émetteur ne rappelle pas" si négatif).
    - **Bugs résolus en session** : (1) discontinuité à droite du strike avec l'ancienne condition `yPct < callRatePct` — corrigé en supprimant la condition et en utilisant `Math.min(priceBond, 100.5)` pour toute la plage ; (2) slider "Taux de rappel" redondant remplacé par "Taux de marché actuel".
  - **CallableBondWrapper** (`app/cours/module-5-fixed-income-2/bond-options-swaptions/CallableBondWrapper.js`) : wrapper `'use client'` + `next/dynamic { ssr: false }`. Inséré dans page.js entre "L'analogie du Covered Call" et "La complexité du pricing".
  - **Sidebar** : `slug: 'bond-options-swaptions'` ajouté — les 4 autres sous-pages du Module 5 restent en `<span>` grisé.
  - **Navigation cap-floor** : lien Suivant mis à jour de `<div />` vers `/cours/module-5-fixed-income-2/bond-options-swaptions`.

- **2026-05-05** :
  - **Page "CMS & Ajustement de Convexité"** (`app/cours/module-5-fixed-income-2/cms/page.js`) créée. Troisième sous-page du Module 5. 5 sections h2. Pas de composant interactif.
    - **Section 1 — Mécanique du CMS** : payoff `N × S_{10y}(Fixing) × δ` encadré. Boîte bleue "Le Steepener (CMS Spread)" — receiver CMS 10 ans + payer CMS 2 ans, pari sur la pentification de la courbe.
    - **Section 2 — L'intuition de la convexité** : comparaison Vrai Swap 10 ans vs CMS en deux scénarios (taux à 10% / taux à 1%) via deux boîtes `bg-gray-50` côte à côte. Conclusion : le CMS donne la performance brute sans l'effet d'actualisation multi-périodes — profil asymétrique avantageux. Boîte bleue "Bilan".
    - **Section 3 — L'ajustement de convexité** : formule `Taux CMS = Taux Forward + Ajustement de Convexité` encadrée. Boîte bleue exemple chiffré (forward 3,00% → CMS 3,40%, +40 bps). Deux facteurs amplificateurs : volatilité et temps.
    - **Section 4 — La réplication statique : Carr-Madan** : intuition FRA linéaire insuffisant → Swaptions pour créer la convexité. Intégrale de Carr-Madan encadrée (Receiver de 0 à S_Fwd + Payer de S_Fwd à ∞, pondérés par w(K) = dérivée seconde du payoff). Boîte bleue "En pratique sur le desk" (somme discrète des Swaptions cotées tous les 25-50 bps).
    - **Section 5 — Modélisation et limites : SABR** : deux boîtes `bg-gray-50` (illiquidité des strikes extrêmes / insuffisance du modèle flat). Recours à SABR pour extrapoler le smile et valoriser les Swaptions périphériques. Boîte bleue "Le CMS en une phrase".
    - Navigation : ← Bond Options & Swaptions / → Convertible Bond (lien mis à jour en fin de session).
  - **Sidebar** : `slug: 'cms'` ajouté — les 3 autres sous-pages du Module 5 restent en `<span>` grisé.

- **2026-05-05 (suite)** :
  - **Page "Convertible Bond"** (`app/cours/module-5-fixed-income-2/convertible-bond/page.js`) créée. Quatrième sous-page du Module 5. 5 sections h2. Pas de composant interactif.
    - **Section 1 — Décomposition et vocabulaire** : formule `Prix_CB = Bond Floor + Call(K, T)` encadrée. Bloc `bg-gray-50` avec 4 définitions (Ratio de Conversion CR, Prix de Conversion K = Nominal/CR encadré, Bond Floor, Valeur de Parité = CR × S encadrée).
    - **Section 2 — Les trois zones** : trois boîtes (Busted — action très basse, CB colle au Bond Floor, Delta ≈ 0, trade comme HY / Hybride ATM — Gamma et Vega max, zone de volatilité / Equity-Bound — option deep-ITM, Delta → 1, CB colle à la Parité).
    - **Section 3 — Le premium** : formule `Premium = (Prix_CB − Parity) / Parity` encadrée. Deux boîtes côte à côte (Premium élevé 30–50% : protection, profil lent / Premium faible 5–15% : fort Delta/Gamma, vol implicite bon marché). Boîte bleue "Le Break-even" (années pour amortir le premium via le surcroît de coupon).
    - **Section 4 — Arbitrage convertible** : construction en 2 étapes (Achat CB = Long Gamma/Vega/Delta + Short action = `N_short = CR × Δ_Call`). Deux boîtes (action monte → vend haut / action baisse → rachète bas). Paragraphe de clôture reliant au gamma scalping (Theta-Gamma).
    - **Section 5 — Les pièges réels du desk** : 3 boîtes (Borrow Rate — coût d'emprunt 10–15% an si Hard-to-Borrow / Risque dividende — clause Dividend Protection ajuste CR / Corrélation crédit-action amber — Bond Floor et spread de crédit se dégradent simultanément en cas de chute de l'action). Boîte bleue "Pourquoi il n'existe pas de formule fermée" (exercice américain/bermudéen → arbres binomiaux hybrides / différences finies).
    - Navigation : ← CMS & Ajustement de Convexité / pas de suivant (`<div />`).
  - **Sidebar** : `slug: 'convertible-bond'` ajouté — `Range Accrual` et `Modèle de taux` restent en `<span>` grisé.
  - **cms/page.js** : lien Suivant mis à jour de `<div />` vers `/cours/module-5-fixed-income-2/convertible-bond`.

- **2026-05-08** :
  - **Page "Range Accrual"** (`app/cours/module-5-fixed-income-2/range-accrual/page.js`) créée. Cinquième sous-page du Module 5. 5 sections h2. Composant interactif `DigitalReplicationChart`.
    - **Section 1 — Mécanique et structuration commerciale** (`id="mecanique"`) : formule centrale `Coupon_total = C_bonifié × N_jours/N_total` encadrée. Biais directionnel (tunnel désaxé bearish/bullish). Formule MinGtee `max(MinGtee, C × ratio)` encadrée. Boîte bleue "Pourquoi une MinGtee ?".
    - **Section 2 — L'ingénierie cross-asset** (`id="cross-asset"`) : deux exemples en `bg-gray-50` côte à côte (Actions US + Devises / Pétrole + Actions). Boîte bleue "Pourquoi short corrélation ?" avec formule `P(A ∩ B) = P(A) × P(B)` — l'investisseur est short corrélation et long dispersion.
    - **Section 3 — La clause callable** (`id="callable"`) : deux boîtes bleues côte à côte (Pour l'investisseur : subventionne son coupon en cédant l'option de rappel / Pour la banque : exerce si volatilité s'effondre, ne rappelle pas si volatilité explose).
    - **Section 4 — La décomposition quant : somme de digitales** (`id="decomposition-quant"`) : deux formules encadrées séparément (indicatrice journalière produit sur M actifs / coupon total comme somme temporelle). Boîte bleue sur l'enjeu du skew aux barrières (modèles SABR).
    - **Section 5 — Gestion des risques : Gamma et Call Spread** (`id="gestion-risques"`) : pin risk, formule approximation Call Spread `Digital(K) ≈ [Call(K-ε) - Call(K+ε)] / (2ε)` encadrée. Composant `DigitalReplicationWrapper`. Boîte bleue "L'overhedge". Boîte amber "Limite" (biais de pricing).
    - Navigation : ← Bond Options & Swaptions / pas de suivant (`<div />`).
  - **Sidebar** : `slug: 'range-accrual'` ajouté — `Modèle de taux` reste en `<span>` grisé.
  - **convertible-bond/page.js** : lien Suivant mis à jour de `<div />` vers `/cours/module-5-fixed-income-2/range-accrual`.
  - **Composant DigitalReplicationChart** (`app/cours/components/DigitalReplicationChart.js`) : composant client Chart.js. K=100, S de 80 à 120 (201 points). Deux datasets : courbe noire pointillée "Digital idéale" (step function avec deux points proches 99.999/100.001 pour simuler le saut, `parsing: false`, `tension: 0`) + courbe bleue pleine "Call Spread (réplication)". Slider ε 0.5→10 (pas 0.5, défaut 4). Axe Y fixé 0→1.2. Tooltip filtré sur le Call Spread uniquement. Carte dynamique : N = Math.round(1000000 / (1000 × 2 × ε)), strikes K±ε affichés.
    - **⚠️ Payoff, pas prix BS** : le Call Spread est calculé comme le **payoff normalisé** (rampe linéaire 0→1 entre K-ε et K+ε), pas comme un prix Black-Scholes. Un prix BS plafonne à ~0.53 (valeur actualisée) et ne montre pas la convergence vers la digitale — le payoff, lui, converge visuellement vers le step function quand ε → 0.
    - **⚠️ Pattern de mise à jour Chart.js** : l'anti-vibration à deux `useEffect` (`useEffect([], [])` + `useEffect([epsilon])`) ne fonctionne pas ici — avec `animation: false` dans les options, `chart.update('none')` ne déclenche pas de repaint. Solution : **mettre à jour le chart directement dans le handler `onChange`** (pas dans un `useEffect`). `setEpsilon` gère l'affichage React, `chartInstance.current.update('none')` gère le canvas — synchrone, sans vibration.
  - **DigitalReplicationWrapper** (`app/cours/module-5-fixed-income-2/range-accrual/DigitalReplicationWrapper.js`) : wrapper `'use client'` + `next/dynamic { ssr: false }`, chemin `'../../components/DigitalReplicationChart'`.

- **2026-05-09** :
  - **Page "Modèles de taux"** (`app/cours/module-5-fixed-income-2/modele-taux/page.js`) créée. Sixième et dernière sous-page du Module 5. 5 sections h2 + tableau synthèse. Pas de composant interactif.
    - **Section 1 — Fondamentaux** (`id="pourquoi"`) : motivation (Bachelier/Black suffisent pour Swaption européen, insuffisants pour Bermudéenne/Range Accrual). Vasicek (1977) comme ancêtre — EDS `dr_t = a(b-r_t)dt + σdW_t` encadrée, 3 paramètres (b niveau cible, a vitesse de retour, σdW_t choc). Boîte amber "La limite de Vasicek" (modèle d'équilibre, paramètres constants, ne colle pas à la courbe Bloomberg).
    - **Section 2 — Hull-White 1-Facteur** (`id="hw1f"`) : EDS `dr_t = [θ(t) - a(t)r_t]dt + σ(t)dW_t` encadrée. Trois boîtes bleues : (1) θ(t) — calibration no-arbitrage, redonne exactement la courbe spot ; (2) σ(t) — calibration de la structure par terme de vol sur Swaptions ; (3) Arbres trinomiaux + backward induction, avec lien vers bond-options-swaptions pour l'optimal stopping.
    - **Section 3 — Limite fatale : corrélation parfaite** (`id="limite"`) : boîte amber unique — un seul Brownien = tous les taux parfaitement corrélés, courbe peut monter/descendre mais pas se tordre. Conséquence : incapable de pricer les CMS Spread Options (lien vers cms).
    - **Section 4 — Hull-White 2-Facteurs** (`id="hw2f"`) : deux EDS encadrées séparément (`dr_t = [θ(t)+u_t-a(t)r_t]dt + σ_1(t)dW_1` et `du_t = -bu_t dt + σ_2(t)dW_2`). Rôle du second facteur u_t (perturbation lente, découple court/long terme). Boîte amber : over-fit et instabilité numérique de σ(t). Boîte bleue : formules fermées ZC pour calibration rapide.
    - **Section 5 — HJM et LMM** (`id="hjm-lmm"`) : HJM en boîte grise `bg-gray-50` (cadre général, HW = cas particulier, Monte Carlo obligatoire → inadapté aux arbres). LMM en boîte grise (taux de marché directement, calibration naturelle Caps/Swaptions, dimensionnalité explosive, complexité post-LIBOR). Citation encadrée "règle pratique HW vs LMM". Boîte bleue "Pour aller plus loin" : Brigo & Mercurio + Andersen & Piterbarg.
    - **Tableau synthèse** 4 lignes × 4 colonnes (HW1F, HW2F, HJM, LMM / Philosophie / Usage principal / Point de vigilance). Note sous le tableau : SABR exclu car catégorie différente (modèle de vol, pas de taux court).
    - Navigation : ← Range Accrual / pas de suivant (`<div />`).
  - **Sidebar** : `slug: 'modele-taux'` ajouté — "Modèle de taux" est désormais cliquable.
  - **range-accrual/page.js** : lien Suivant mis à jour de `<div />` vers `/cours/module-5-fixed-income-2/modele-taux`.
  - **`app/cours/page.js`** : Module 5 passe en `active` avec les 6 `href` renseignés — la carte est désormais en bleu avec toutes les sous-pages cliquables.
  - **Module 5 — Fixed Income II : COMPLET (6/6 pages)**.

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