// Page de cours : Module 1 — Girsanov & Probabilité Risque-Neutre

import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';

export const metadata = {
  title: 'Girsanov & Risque-Neutre — Finance according to James',
  description:
    'Changement de mesure, théorème de Girsanov et formule de pricing universel sous probabilité risque-neutre.',
};

export default function GirsanovRisqueNeutrePage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 1 — Calcul stochastique</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Girsanov &amp; Risque-Neutre</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Girsanov &amp; la Probabilité Risque-Neutre
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-10">
        Le Lemme d&apos;Itô nous a donné la dynamique des prix. Mais pour pricer un dérivé, il
        reste un obstacle : le drift <InlineMath>{`\\mu`}</InlineMath> d&apos;un actif est subjectif,
        inobservable, et propre à chaque investisseur. Le théorème de Girsanov résout ce problème
        en <strong>changeant de probabilité de référence</strong> — et en faisant disparaître{' '}
        <InlineMath>{`\\mu`}</InlineMath> de l&apos;équation.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Le problème de la probabilité historique
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="probabilite-historique" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. Le problème de la probabilité historique
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Dans le monde réel, sous la probabilité dite historique (notée{' '}
        <InlineMath>{`\\mathbb{P}`}</InlineMath>), la dynamique du prix d&apos;un actif{' '}
        <InlineMath>S_t</InlineMath> intègre un drift <InlineMath>{`\\mu`}</InlineMath> :
      </p>

      <BlockMath>{`dS_t = \\mu S_t \\, dt + \\sigma S_t \\, dW_t^{\\mathbb{P}}`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-6">
        Pour un praticien, ce drift pose un problème majeur : il est <strong>subjectif et
        inobservable</strong>. Il dépend de l&apos;aversion au risque des investisseurs (la courbe d'utilité) et de leur
        opinion sur la croissance future de l&apos;actif.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Le problème
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Si le prix d&apos;un dérivé dépendait de <InlineMath>{`\\mu`}</InlineMath>, deux traders
          ayant des vues de marché différentes ne s&apos;accorderaient jamais sur son prix. La finance
          quantitative a besoin de s&apos;affranchir de cette opinion.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — Théorème de Girsanov
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="theoreme-girsanov" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. Le changement de mesure — Théorème de Girsanov
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le théorème de Girsanov permet de passer de la probabilité historique{' '}
        <InlineMath>{`\\mathbb{P}`}</InlineMath> à une probabilité risque-neutre{' '}
        <InlineMath>{`\\mathbb{Q}`}</InlineMath>. L&apos;idée est d&apos;absorber le drift excédentaire
        dans un nouveau Mouvement Brownien.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Partons de la dynamique sous <InlineMath>{`\\mathbb{P}`}</InlineMath> et forçons
        l&apos;apparition du taux sans risque <InlineMath>r</InlineMath> :
      </p>

      <BlockMath>{`dS_t = r S_t \\, dt + (\\mu - r) S_t \\, dt + \\sigma S_t \\, dW_t^{\\mathbb{P}}`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        En factorisant par <InlineMath>{`\\sigma`}</InlineMath> :
      </p>

      <BlockMath>{`dS_t = r S_t \\, dt + \\sigma S_t \\left( dW_t^{\\mathbb{P}} + \\frac{\\mu - r}{\\sigma} \\, dt \\right)`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        C&apos;est ici qu&apos;intervient Girsanov. Le théorème prouve que le terme entre parenthèses
        est un Mouvement Brownien standard sous une nouvelle probabilité{' '}
        <InlineMath>{`\\mathbb{Q}`}</InlineMath> :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{`dW_t^{\\mathbb{Q}} = dW_t^{\\mathbb{P}} + \\frac{\\mu - r}{\\sigma} \\, dt`}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        La dynamique de l&apos;actif sous la probabilité risque-neutre devient alors universelle :
      </p>

      <BlockMath>{`dS_t = r S_t \\, dt + \\sigma S_t \\, dW_t^{\\mathbb{Q}}`}</BlockMath>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Concept clé — Le prix du risque
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Le ratio <InlineMath>{`\\frac{\\mu - r}{\\sigma}`}</InlineMath> est le{' '}
          <strong>Prix du Risque du marché</strong> (Market Price of Risk). Il représente la prime
          de rendement exigée par les investisseurs pour supporter une unité de volatilité.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — La conséquence sur le pricing
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="consequence-pricing" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. La conséquence sur le pricing
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Sous <InlineMath>{`\\mathbb{Q}`}</InlineMath>, tous les actifs — actions, devises, indices
        — croissent en moyenne au taux sans risque <InlineMath>r</InlineMath>, indépendamment
        de leur drift historique <InlineMath>{`\\mu`}</InlineMath>. Le drift subjectif a disparu
        de l&apos;équation.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Concrètement
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Sous <InlineMath>{`\\mathbb{Q}`}</InlineMath>, pricer une option ne nécessite plus
          d&apos;avoir une opinion sur la direction du marché. Peu importe que le trader soit
          haussier ou baissier sur l&apos;actif — sous la mesure risque-neutre, tous s&apos;accordent
          sur le même prix. C&apos;est ce qui rend le pricing <strong>objectif et universel</strong>.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 4 — La formule de pricing universel
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="formule-pricing-universel" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        4. La formule de pricing universel
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Ce changement de probabilité aboutit à la formule la plus importante de toute la finance
        de marché. La valeur aujourd&apos;hui d&apos;un produit dérivé de payoff{' '}
        <InlineMath>V_T</InlineMath> est :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center text-gray-900">
        <BlockMath>{`V_0 = e^{-rT} \\, \\mathbb{E}^{\\mathbb{Q}}\\left[V_T\\right]`}</BlockMath>
      </div>

      {/* Boîte 1 */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-4">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          L&apos;actualisation
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Le facteur <InlineMath>{`e^{-rT}`}</InlineMath> ramène la valeur future au présent en
          actualisant au taux sans risque <InlineMath>r</InlineMath>. C&apos;est le prix du temps.
        </p>
      </div>

      {/* Boîte 2 */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-4">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          L&apos;espérance sous <InlineMath>{`\\mathbb{Q}`}</InlineMath>
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          <InlineMath>{`\\mathbb{E}^{\\mathbb{Q}}[V_T]`}</InlineMath> est la moyenne du payoff
          calculée sous la probabilité risque-neutre. Sous{' '}
          <InlineMath>{`\\mathbb{Q}`}</InlineMath>, le drift subjectif{' '}
          <InlineMath>{`\\mu`}</InlineMath> a disparu — deux traders aux vues opposées sur le
          marché s&apos;accordent sur le même prix.
        </p>
      </div>

      {/* Boîte 3 */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Le pont vers Black-Scholes
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Appliquer cette formule à un call européen de payoff{' '}
          <InlineMath>{`V_T = \\max(S_T - K,\\, 0)`}</InlineMath>, avec{' '}
          <InlineMath>S_T</InlineMath> log-normale sous <InlineMath>{`\\mathbb{Q}`}</InlineMath>{' '}
          (démontré au chapitre précédent via le Lemme d&apos;Itô), donne exactement la formule de
          Black-Scholes. C&apos;est l&apos;objet du Module 2.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le Module 1 est complet. En trois chapitres, on a posé les trois piliers du pricing
        moderne : le Mouvement Brownien modélise l&apos;aléa, le Lemme d&apos;Itô permet de dériver les
        fonctions de cet aléa, et Girsanov permet de pricer sans opinion subjective. Tout le
        reste — Black-Scholes, les Grecs, les produits exotiques — est une application de ces
        trois outils.
      </p>

      <div className="border-l-4 border-blue-400 pl-5 py-1 my-8">
        <p className="text-gray-700 italic leading-relaxed">
          En résumé : sous <InlineMath>{`\\mathbb{P}`}</InlineMath> on observe le monde, sous{' '}
          <InlineMath>{`\\mathbb{Q}`}</InlineMath> on price les dérivés. Girsanov est le pont
          entre les deux.
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Le quiz du Module 1 est disponible — <a href="/quiz/module-1" className="text-blue-600 hover:underline font-medium">S&apos;entraîner →</a>
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-1-calcul-stochastique/lemme-ito" className="text-blue-600 hover:underline text-sm">
          ← Le Lemme d&apos;Itô
        </a>
        <a href="/cours/module-2-pricing/equation-black-scholes" className="text-blue-600 hover:underline text-sm">
          L&apos;Équation de Black-Scholes →
        </a>
      </div>

    </article>
  );
}
