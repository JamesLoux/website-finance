// Page de cours : Module 6 — Vol stochastique

import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';
import SABRWrapper from './SABRWrapper';

export const metadata = {
  title: 'Vol stochastique — Finance according to James',
  description:
    'Les modèles de volatilité stochastique : Heston et SABR, leurs paramètres, leurs limites et leurs domaines d\'application.',
};

export default function VolStochastiqueePage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 6 — Volatilité</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Vol stochastique</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Vol stochastique
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        La page précédente a montré comment Dupire reconstruit la surface de volatilité
        parfaitement. Cette page explique pourquoi cette perfection statique est insuffisante
        pour les produits complexes, et comment Heston et SABR y répondent.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — La limite du modèle de Dupire
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="limite-vol-locale" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. La limite du modèle de Dupire
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Dupire permet une calibration parfaite aux prix du marché aujourd&apos;hui, c&apos;est comme une
        photographie, c'est juste à l'instant présent mais en réalité le smile/skew évolue au fur et à mesure du temps.
        Son hypothèse est que le risque
        est prévisible : la volatilité est une fonction déterministe de{' '}
        <InlineMath>S</InlineMath> et <InlineMath>t</InlineMath>, sans dynamique propre.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Pour des options vanilles courtes, cela fonctionne. Mais pour des produits complexes à long
        terme, le modèle sous-estime gravement le risque futur, comme on l'a vu la volatilité future reste
        figée sur la surface calibrée aujourd&apos;hui.
      </p>

      <p className="text-gray-600 leading-relaxed mb-10">
        Il fallait donc un modèle où la volatilité possède sa propre dynamique, indépendante
        du sous-jacent.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — Le concept de volatilité stochastique
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="concept" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. Le concept de volatilité stochastique
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        L&apos;idée fondatrice est d'introduire deux sources d&apos;aléas distinctes.
      </p>

      <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-6 space-y-2 pl-2">
        <li>
          Un Brownien pour le spot (on ne change pas): <InlineMath>{'dW_t^S'}</InlineMath>
        </li>
        <li>
          Un Brownien pour la variance (la chose nouvelle): <InlineMath>{'dW_t^V'}</InlineMath>
        </li>
      </ul>

      <p className="text-gray-600 leading-relaxed mb-4">
        Ces deux aléas sont liés par un paramètre de corrélation{' '}
        <InlineMath>{`\\rho`}</InlineMath> :
      </p>

      <BlockMath>{'dW_t^S\\,dW_t^V = \\rho\\,dt'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-4">
        La volatilité devient un processus autonome. C&apos;est ce que l'on appelle la <strong>Vol of Vol</strong> (volatilité de la volatilité).
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — Le modèle de Heston (1993)
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="heston" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. Le modèle de Heston (1993)
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le modèle de vol stochastique le plus utilisé sur actions et Forex. Il modélise la
        variance <InlineMath>{'v_t = \\sigma_t^2'}</InlineMath> via un processus de retour à
        la moyenne (CIR) un peu comme celui de Vasicek sur les taux d'intérêt.
      </p>

      <BlockMath>{'dS_t = \\mu S_t\\,dt + \\sqrt{v_t}\\,S_t\\,dW_t^S'}</BlockMath>
      <BlockMath>{'dv_t = \\kappa(\\theta - v_t)\\,dt + \\xi\\sqrt{v_t}\\,dW_t^V'}</BlockMath>

      {/* Tableau des paramètres */}
      <div className="overflow-x-auto mb-6 mt-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300">
              <th className="text-left p-3 font-semibold text-gray-700">Paramètre</th>
              <th className="text-left p-3 font-semibold text-gray-700">Rôle</th>
              <th className="text-left p-3 font-semibold text-gray-700">Effet sur le smile</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="p-3 text-gray-700 font-medium"><InlineMath>{'v_0'}</InlineMath></td>
              <td className="p-3 text-gray-600">Variance initiale</td>
              <td className="p-3 text-gray-600">Niveau de vol ATM aujourd&apos;hui (déplace la surface haut/bas)</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 text-gray-700 font-medium"><InlineMath>{`\\theta`}</InlineMath></td>
              <td className="p-3 text-gray-600">Moyenne long terme</td>
              <td className="p-3 text-gray-600">Niveau de variance vers lequel le marché converge</td>
            </tr>
            <tr>
              <td className="p-3 text-gray-700 font-medium"><InlineMath>{`\\kappa`}</InlineMath></td>
              <td className="p-3 text-gray-600">Vitesse de mean-reversion</td>
              <td className="p-3 text-gray-600">Force de rappel après un choc de vol</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 text-gray-700 font-medium"><InlineMath>{`\\xi`}</InlineMath></td>
              <td className="p-3 text-gray-600">Vol of Vol</td>
              <td className="p-3 text-gray-600">Convexité du smile ; plus <InlineMath>{`\\xi`}</InlineMath> est grand, plus le sourire est creusé</td>
            </tr>
            <tr>
              <td className="p-3 text-gray-700 font-medium"><InlineMath>{`\\rho`}</InlineMath></td>
              <td className="p-3 text-gray-600">Corrélation spot/variance</td>
              <td className="p-3 text-gray-600">Pente du skew (<InlineMath>{`\\rho < 0`}</InlineMath> sur actions, <InlineMath>{`\\rho \\approx 0`}</InlineMath> sur Forex)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Condition de Feller */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-5">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Condition de Feller
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          La condition{' '}
          <InlineMath>{'2\\kappa\\theta > \\xi^2'}</InlineMath> garantit que la variance{' '}
          <InlineMath>{'v_t'}</InlineMath> reste strictement positive. Si elle n&apos;est pas
          respectée, le processus peut atteindre zéro, ce qui est numériquement problématique.
        </p>
      </div>

      {/* Limite de Heston */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Limite de Heston
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          La Vol of Vol <InlineMath>{`\\xi`}</InlineMath> est constante. En pratique, le smile
          court terme est bien plus pentu que ce que Heston peut reproduire, le modèle peine
          à calibrer les maturités très courtes.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 4 — Le modèle SABR : Stochastique Alpha Beta Rho (2002)
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="sabr" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        4. Le modèle SABR : Stochastique Alpha Beta Rho (2002)
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Créé par Hagan, SABR domine le marché des taux d&apos;intérêt (swaptions,
        caps/floors, divswaps). Il modélise le taux forward <InlineMath>{'F_t'}</InlineMath> mais pas le
        spot, ce qui le rend naturellement adapté aux produits de taux.
      </p>


      <BlockMath>{'dF_t = \\alpha_t F_t^\\beta\\,dW_t^1'}</BlockMath>
      <BlockMath>{'d\\alpha_t = \\nu\\,\\alpha_t\\,dW_t^2'}</BlockMath>

      <p className="text-gray-600 leading-relaxed mt-2 mb-8">
        Avec <InlineMath>{'dW_t^1\\,dW_t^2 = \\rho\\,dt'}</InlineMath>
      </p>

      {/* Tableau des paramètres SABR */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300">
              <th className="text-left p-3 font-semibold text-gray-700">Paramètre</th>
              <th className="text-left p-3 font-semibold text-gray-700">Rôle</th>
              <th className="text-left p-3 font-semibold text-gray-700">Effet pratique</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="p-3 text-gray-700 font-medium"><InlineMath>{`\\alpha_t`}</InlineMath></td>
              <td className="p-3 text-gray-600">Volatilité stochastique instantanée</td>
              <td className="p-3 text-gray-600">Niveau de vol ATM (analogue à <InlineMath>{`\\sigma`}</InlineMath> dans BS)</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 text-gray-700 font-medium"><InlineMath>{`\\beta`}</InlineMath></td>
              <td className="p-3 text-gray-600">Exposant (constante à ajuster)</td>
              <td className="p-3 text-gray-600">Dynamique du forward : 0 = Normale, 1 = Log-Normale</td>
            </tr>
            <tr>
              <td className="p-3 text-gray-700 font-medium"><InlineMath>{`\\nu`}</InlineMath></td>
              <td className="p-3 text-gray-600">Vol of Vol</td>
              <td className="p-3 text-gray-600">Convexité du smile ; plus <InlineMath>{`\\nu`}</InlineMath> est grand, plus le sourire est creusé</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 text-gray-700 font-medium"><InlineMath>{`\\rho`}</InlineMath></td>
              <td className="p-3 text-gray-600">Corrélation forward/vol</td>
              <td className="p-3 text-gray-600">Pente du skew (<InlineMath>{`\\rho < 0`}</InlineMath> = skew baissier, <InlineMath>{`\\rho > 0`}</InlineMath> = skew haussier)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        Utilisez le simulateur ci-dessous pour comprendre l&apos;effet de chaque paramètre, puis tentez de reproduire le smile de référence en bleu :
      </p>

      <SABRWrapper />

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-5 mt-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Formule de Hagan
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          SABR dispose d&apos;une formule fermée asymptotique pour la vol implicite (trop longue pour l'afficher ici). La calibration
          est quasi-instantanée, sans Monte Carlo. On fixe <InlineMath>{`\\beta`}</InlineMath> et l'algorithme calibre le smile au marché pour trouver les autres paramètres.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-5">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Calibration par tranche
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          SABR est calibré maturité par maturité, comme un photo faite à un instant t parfaitement calibrée. On l'utilise pour interpoler proprement entre
          strikes cotés sur un smile donné.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-5">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Le paramètre <InlineMath>{`\\beta`}</InlineMath> (constante à fixer)
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Contrôle la dynamique de la vol ATM quand le forward bouge.{' '}
          <InlineMath>{`\\beta = 1`}</InlineMath> : dynamique log-normale (Black-Scholes).{' '}
          <InlineMath>{`\\beta = 0`}</InlineMath> : dynamique normale (Bachelier), idéale pour
          les taux négatifs.
        </p>
      </div>

      {/* Limite de SABR */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Limite de SABR
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          L&apos;équation de <InlineMath>{`\\alpha_t`}</InlineMath> est un GBM pur, sans
          mean-reversion. La volatilité peut exploser sur de longues maturités. SABR gère donc
          très mal la structure par terme, il est calibré tranche par tranche, pas sur toute
          la surface simultanément.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 5 — Heston vs SABR
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="synthese" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        5. Heston vs SABR
      </h2>

      {/* Tableau comparatif */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300">
              <th className="text-left p-3 font-semibold text-gray-700">Critère</th>
              <th className="text-left p-3 font-semibold text-gray-700">Heston</th>
              <th className="text-left p-3 font-semibold text-gray-700">SABR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="p-3 text-gray-700 font-medium">Classe d&apos;actifs</td>
              <td className="p-3 text-gray-600">Actions, Forex</td>
              <td className="p-3 text-gray-600">Taux d&apos;intérêt</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 text-gray-700 font-medium">Variable modélisée</td>
              <td className="p-3 text-gray-600">Spot <InlineMath>{'S_t'}</InlineMath></td>
              <td className="p-3 text-gray-600">Forward <InlineMath>{'F_t'}</InlineMath></td>
            </tr>
            <tr>
              <td className="p-3 text-gray-700 font-medium">Calibration</td>
              <td className="p-3 text-gray-600">Surface entière</td>
              <td className="p-3 text-gray-600">Tranche par tranche</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 text-gray-700 font-medium">Structure par terme</td>
              <td className="p-3 text-gray-600">Bonne</td>
              <td className="p-3 text-gray-600">Mauvaise</td>
            </tr>
            <tr>
              <td className="p-3 text-gray-700 font-medium">Smile court terme</td>
              <td className="p-3 text-gray-600">Imparfait</td>
              <td className="p-3 text-gray-600">Excellent</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 text-gray-700 font-medium">Mean-reversion</td>
              <td className="p-3 text-gray-600">Oui (<InlineMath>{`\\kappa`}</InlineMath>)</td>
              <td className="p-3 text-gray-600">Non</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-600 leading-relaxed">
        Ces deux modèles coexistent parce qu&apos;ils répondent à des besoins différents. Heston
        offre une vision cohérente de la surface dans le temps, idéale pour les produits
        path-dependent sur actions. SABR offre une calibration locale ultra-rapide, indispensable
        pour la gestion quotidienne des books de taux. En pratique, chaque desk utilise 
        plutôt l'un ou l'autre selon les produits traités.
      </p>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Le quiz du Module 6 est disponible — <a href="/quiz/module-6" className="text-blue-600 hover:underline font-medium">S&apos;entraîner →</a>
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-6-volatilite/vol-implicite-nappes" className="text-blue-600 hover:underline text-sm">
          ← Vol implicite et nappes
        </a>
        <a href="/cours/module-6-volatilite/variance-swap-vix" className="text-blue-600 hover:underline text-sm">
          Variance Swap &amp; VIX →
        </a>
      </div>

    </article>
  );
}
