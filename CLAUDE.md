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
- [ ] Page d'accueil à construire
- [ ] Premiers composants interactifs (payoffs, curseurs)
- [ ] Priceur d'options

## Fonctionnalités prévues
1. Pages de cours par thématique (options, dérivés, Greeks, pricing)
2. Composants interactifs : payoffs avec curseurs (strike, maturité, vol)
3. Priceur d'options : prix, Greeks, surfaces de vol
4. Quiz par thématique
5. Visualisations animées générées en code

## Conventions
- Contenu des pages rédigé par le propriétaire en MDX
- Composants interactifs créés par Claude Code, appelés depuis le MDX
- Sessions courtes et thématiques, CLAUDE.md mis à jour à chaque fin de session

## Commandes utiles
- Lancer en local : npm run dev → http://localhost:3000
- Arrêter le serveur : Ctrl+C

## Liens utiles
- GitHub : https://github.com/JamesLoux/website-finance