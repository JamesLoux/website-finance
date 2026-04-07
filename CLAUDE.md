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
- [x] **Module 2 — Pricing : COMPLET (3/3 pages)**
- [x] Module 3 / L'essentiel des Greeks (grecques-premier-ordre)
- [x] Module 3 / Quelques démonstrations (grecques-second-ordre)
- [x] Module 3 / Arbitrage Theta-Gamma (arbitrage-theta-gamma)
- [x] **Module 3 — The Greeks : COMPLET (3/3 pages)**
- [ ] Modules 4 à 8
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
- `/cours/module-2-pricing` — equation-black-scholes, probabilites-d1-d2, modeles-diffusion (ordre de navigation)
  - ⚠️ Le slug `probabilites-d1-d2` est conservé tel quel mais la page s'intitule **"Formule de Black-Scholes"** — le nom affiché et le slug divergent intentionnellement (renommage sans migration d'URL).
- `/cours/module-3-grecques` — grecques-premier-ordre ("L'essentiel des Greeks"), grecques-second-ordre ("Quelques démonstrations"), arbitrage-theta-gamma
  - ⚠️ Même divergence slug/titre que pour module-2 : les slugs sont conservés, les titres affichés diffèrent.
- `/cours/module-4-taux-credit` — swaps-flux, produits-courbe, modeles-taux
- `/cours/module-5-produits-equity` — vanilles-combinaisons, options-exotiques, produits-structures
- `/cours/module-6-volatilite` — variance-swap, vol-locale-stochastique
- `/cours/module-7-quanto-fx` — options-quanto, options-composites
- `/cours/module-8-macro` — plomberie-fed, gestion-reserves, politique-monetaire

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
      BachelierChart.js              ← Composant : décomposition Bachelier — bruit bleu + tendance orange pointillés + trajectoire complète noire, Box-Muller, N=252 jours, bouton "Nouvelle simulation"
    module-1-calcul-stochastique/
      mouvement-brownien/page.js     ← ⭐ TEMPLATE DE RÉFÉRENCE pour toutes les pages de cours
      lemme-ito/page.js              ← ✅ Fait
      girsanov-risque-neutre/page.js ← ✅ Fait
    module-2-pricing/
      equation-black-scholes/page.js ← ✅ Fait
      probabilites-d1-d2/page.js     ← ✅ Fait (titre affiché : "Formule de Black-Scholes", slug conservé)
      modeles-diffusion/page.js      ← ✅ Fait
    module-3-grecques/
      grecques-premier-ordre/page.js ← ✅ Fait (titre : "L'essentiel des Greeks", slug conservé)
      grecques-second-ordre/page.js  ← ✅ Fait (titre : "Quelques démonstrations", slug conservé)
      arbitrage-theta-gamma/page.js  ← ✅ Fait
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
- **Style texte** : ne pas utiliser de tirets longs (—) comme séparateurs décoratifs dans le corps du texte
- La TOC est générée automatiquement par `TableOfContents.js` (scan `h2[id]` avec délai 100ms) — panneau flottant sticky à droite, visible uniquement sur écrans xl+ (≥1280px)
- La TOC se met à jour automatiquement dès qu'on modifie le texte ou l'`id` d'un `h2` — pas besoin de toucher à `TableOfContents.js` ni à la sidebar
- Contenu rédigé par le propriétaire, composants interactifs créés par Claude Code
- Sessions courtes et thématiques, CLAUDE.md mis à jour à chaque fin de session

## Journal des sessions
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