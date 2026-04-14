// Page de cours : Module 7 — Options Quanto & Composite

import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';

export const metadata = {
  title: 'Options Quanto & Composite — Finance according to James',
  description:
    'Pricing et hedging des options Quanto et Composite : changement de mesure, ajustement de corrélation, Cross-Gamma.',
};

export default function OptionsQuantoPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 7 — Quanto & FX</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Options Quanto & Composite</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Options Quanto &amp; Composite
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        Lorsqu&apos;un investisseur européen veut s&apos;exposer à un actif étranger (par exemple
        le S&amp;P 500), deux philosophies s&apos;affrontent. Le produit <strong>Composite</strong>{' '}
        l&apos;expose au change : il subit les variations EUR/USD en plus de celles du sous-jacent.
        Le produit <strong>Quanto</strong> l&apos;en immunise : il touche la performance de l&apos;actif
        convertie à un taux de change fixe défini à l&apos;initiation.
      </p>
      <p className="text-gray-600 leading-relaxed mb-10">
        Ces deux structures répondent au même besoin d&apos;exposition internationale, mais génèrent
        des profils de risque radicalement différents.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Les deux processus de base
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="bases" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. Les deux processus de base
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Sous leurs mesures respectives, l&apos;action étrangère et le taux de change suivent deux EDS
        couplées par leur corrélation.
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-4 text-center text-gray-900">
        <BlockMath>{'\\frac{dS_t}{S_t} = \\mu_S \\, dt + \\sigma_S \\, dW_t^S'}</BlockMath>
        <p className="text-sm text-gray-500 mt-1">(Action en USD)</p>
      </div>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-4 text-center text-gray-900">
        <BlockMath>{'\\frac{dX_t}{X_t} = \\mu_X \\, dt + \\sigma_X \\, dW_t^X'}</BlockMath>
        <p className="text-sm text-gray-500 mt-1">(Taux de change USD/EUR)</p>
      </div>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center text-gray-900">
        <BlockMath>{'d\\langle W^S, W^X \\rangle_t = \\rho \\, dt'}</BlockMath>
        <p className="text-sm text-gray-500 mt-1">(Corrélation entre l'actif et sa monnaie native)</p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Attention Convention
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Je sais que pour c'est déroutant mais durant ce chapitre, le processus <InlineMath>X_t</InlineMath> désigne la valeur du dollar (la monnaie étrangère, celle natif à l'actif sur lequel on souhaite s'exposer) ! On est obligé penser ainsi pour le cas générale. Donc c'est l'inverse de la paire EUR/USD qui se trouve sur le marché, <InlineMath>X_t</InlineMath> désigne le nombre d&apos;euros pour un dollar (cotation à
          l&apos;incertain pour l&apos;européen). Si <InlineMath>X_t</InlineMath> monte, le dollar
          s&apos;apprécie (l&apos;actif étranger vaut davantage converti en euros).{' '}
          <InlineMath>{'\\rho > 0'}</InlineMath> signifie que l&apos;indice et le dollar montent ensemble.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — L'option Quanto
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="quanto" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. L&apos;option Quanto
      </h2>

      {/* Sous-section : Le payoff */}
      <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Le payoff</h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le Quanto garantit un taux de change fixe <InlineMath>{'X_{\\text{fixe}}'}</InlineMath>{' '}
        défini à la date 0. Le payoff d&apos;un Call Quanto est :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>{'\\text{Payoff}_Q = X_{\\text{fixe}} \\times (S_T - K)_+'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">
        L&apos;investisseur est totalement immunisé contre le risque de change. Il perçoit
        exactement la performance de l&apos;actif étranger, ni plus ni moins.
        <InlineMath>{'S_{T}'}</InlineMath> et <InlineMath>{'K'}</InlineMath> sont dans la devise étrangère (dollars).
      </p>

      {/* Sous-section : Changement de mesure */}
      <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">
        Le changement de mesure — mécanique de Girsanov
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Pour pricer ce produit, on se place sous la mesure risque-neutre de la monnaie domestique{' '}
        <InlineMath>{'\\mathbb{Q}_{EUR}'}</InlineMath>. Le passage de la mesure USD à{' '}
        <InlineMath>{'\\mathbb{Q}_{EUR}'}</InlineMath> transforme le Brownien de l&apos;action. Le
        théorème de Girsanov impose la substitution :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>
          {'dW_t^{S,\\mathbb{Q}_{USD}} = dW_t^{S,\\mathbb{Q}_{EUR}} + \\rho \\, \\sigma_X \\, dt'}
        </BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          D&apos;où vient le terme de correction ?
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Sous <InlineMath>{'\\mathbb{Q}_{EUR}'}</InlineMath>, le numéraire est le compte bancaire
          en euros. Changer de numéraire revient à &quot;absorber&quot; la dynamique du taux de change
          dans le drift de l&apos;action. La corrélation <InlineMath>{'\\rho'}</InlineMath> entre{' '}
          <InlineMath>{'dW^S'}</InlineMath> et <InlineMath>{'dW^X'}</InlineMath> fait apparaître un
          terme de covariance <InlineMath>{'- \\rho \\sigma_S \\sigma_X \\, dt'}</InlineMath> dans
          le drift — c&apos;est l&apos;ajustement Quanto.
        </p>
      </div>

      {/* Sous-section : EDS sous Q_EUR */}
      <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">
        L&apos;EDS sous <InlineMath>{'\\mathbb{Q}_{EUR}'}</InlineMath>
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        En substituant dans l&apos;EDS originale et en imposant l&apos;absence d&apos;arbitrage, l&apos;action
        suit sous <InlineMath>{'\\mathbb{Q}_{EUR}'}</InlineMath> :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>
          {'\\frac{dS_t}{S_t} = \\left(r_{USD} - q - \\rho \\, \\sigma_S \\, \\sigma_X\\right) dt + \\sigma_S \\, dW_t^{S,\\mathbb{Q}_{EUR}}'}
        </BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">
        Quand on y pense c'est assez intuitif. Vu que l'on est exposé qu'à la variation de l'actif étranger dans sa monnaie, la volatilité <InlineMath>{'\\sigma_S'}</InlineMath> est inchangée. Seul le drift est
        modifié, et on espère un rendement moyen qui sera donc logiquement au taux étranger/américain (car la fonction max(.) du payoff est en dollars), en soustrayant par la covariance car une correlation positive est un manque à gagner dans du point de vue domestique/européen.
        En effet, si l'indice et le dollar montent ensemble, on aurait été gagnant, c'est donc le vendeur qui gagne ce terme et ne vous le fait pas payer.
      </p>

      {/* Sous-section : Prix forward Quanto */}
      <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Le prix forward Quanto</h3>

      <p className="text-gray-600 leading-relaxed mb-8">
        Il est évident et découle directement de l&apos;EDS et de la formule de Black-Scholes. Mais il nous est utile pour comprendre la sensibilité des options Quanto à la corrélation.
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center text-gray-900">
        <BlockMath>
          {'F_{\\text{Quanto}}(T) = S_0 \\cdot e^{(r_{USD} - q - \\rho \\sigma_S \\sigma_X) T}'}
        </BlockMath>
      </div>

      {/* Sous-section : Impact de la corrélation */}
      <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Impact de la corrélation</h3>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex-1">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            {'ρ > 0 : forward en baisse'}
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            L&apos;ajustement <InlineMath>{'- \\rho \\sigma_S \\sigma_X'}</InlineMath> est négatif,
            le drift diminue, le forward baisse, le Call Quanto est moins cher. La logique économique est la même
            que celle expliquée précédemment pour l'EDS :
            si l&apos;indice monte quand le dollar monte, l&apos;émetteur &quot;récupère&quot; du gain
            sur le change, cela réduit son coût et ne le fait pas payer à son client.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex-1">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            {'ρ < 0 : forward en hausse'}
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            L&apos;ajustement devient positif, le forward monte, le Call Quanto est plus cher.
            L&apos;indice tend à monter quand le dollar baisse (ce qui correspond à la réalité dans notre cas), la garantie de change coûte davantage
            au vendeur qui le fait donc payer à l'acheteur.
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        <strong>Exemple chiffré pour réaliser un impact standard :
        <br />  
        </strong> avec <InlineMath>{'S_0 = 100'}</InlineMath>,{' '}
        <InlineMath>{'r_{USD} = 3\\%'}</InlineMath>, <InlineMath>{'q = 2\\%'}</InlineMath>,{' '}
        <InlineMath>{'\\sigma_S = 20\\%'}</InlineMath>, <InlineMath>{'\\sigma_X = 10\\%'}</InlineMath>,{' '}
        <InlineMath>{'T = 1'}</InlineMath> an. 
        <br />
        Si <InlineMath>{'\\rho = 0'}</InlineMath>,{' '}
        <InlineMath>{'F \\approx 101.0'}</InlineMath>.
        
        Si <InlineMath>{'\\rho = +50\\%'}</InlineMath>,
        l&apos;ajustement vaut <InlineMath>{'- 0.5 \\times 0.20 \\times 0.10 = -1\\%'}</InlineMath>,
        donc <InlineMath>{'F \\approx 100.0'}</InlineMath> — le forward perd un point entier. Si{' '}
        <InlineMath>{'\\rho = -50\\%'}</InlineMath>,{' '}
        <InlineMath>{'F \\approx 102.0'}</InlineMath>.
      </p>

      {/* Sous-section : Exposition du trader */}
      <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Exposition du trader</h3>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Sensibilité à la corrélation
        </p>
        <ul className="text-gray-700 text-sm leading-relaxed space-y-2">
          <li>
            <strong>Long Call Quanto</strong> → Short Corrélation (le Call s&apos;apprécie à mesure que{' '}
            <InlineMath>{'\\rho'}</InlineMath> baisse car le forward monte)
          </li>
          <li>
            <strong>Long Put Quanto</strong> → Long Corrélation (inversement le Put s&apos;apprécie quand{' '}
            <InlineMath>{'\\rho'}</InlineMath> monte)
          </li>
        </ul>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — L'option Composite
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="composite" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. L&apos;option Composite
      </h2>

      {/* Sous-section : Le payoff */}
      <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Le payoff</h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Dans le produit Composite, l&apos;investisseur achète
        l&apos;action en dollars et subit le taux de change au moment du dénouement. Les deux termes du payoff
        d&apos;un Call Composite doit donc être en euros (dans la monnaie domestique). L'actif sous-jacent est le produit <InlineMath>{'S_T \\times X_T'}</InlineMath> pour que la valeur de l&apos;action soit convertie en euros à l&apos;échéance. Le strike est lui aussi défini en euros, noté <InlineMath>{'K_{EUR}'}</InlineMath>. Le payoff du Call Composite est :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>
          {'\\text{Payoff}_C = \\left(\\frac{S_T}{USD} \\times \\frac{USD}{EUR} - K_{EUR}\\right)_+ = \\left(S_T^{USD} \\times X_T^{USD} - K_{EUR}\\right)_+'}
        </BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">
        L&apos;actif sous-jacent effectif est le produit <InlineMath>{'S_T \\times X_T'}</InlineMath>{' '}
        selon le processus définie plus haut dans le 1. <br />
        En réalité on divise par le taux connue sur les marché qui est l'EUR/USD.
      </p>

      {/* Sous-section : La volatilité du Composite */}
      <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">La volatilité du Composite</h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le taux de change étant dans la formule optionnelle du payoff (dans la fonction max(.)), la volatilité du composite doit donc prendre en compte la corrélation entre l&apos;action et le change.<br />
        L&apos;actif composite est le produit de deux lognormales. Par la propriété du logarithme{' '}
        (<InlineMath>{'\\ln(SX) = \\ln S + \\ln X'}</InlineMath>), la variance totale est la somme
        des variances plus le terme croisé :
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-6 text-center text-gray-900">
        <BlockMath>
          {'\\sigma_{\\text{comp}} = \\sqrt{\\sigma_S^2 + \\sigma_X^2 + 2\\rho \\, \\sigma_S \\, \\sigma_X}'}
        </BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          C&apos;est la formule du portefeuille
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          On retrouve exactement la variance d&apos;un portefeuille à deux actifs. Le Composite se
          price donc comme un Call Black-Scholes standard sur <InlineMath>{'S \\times X'}</InlineMath>,
          avec cette volatilité combinée.<br />
          Le drift quant à lui est intuitivement  <InlineMath>{'r_{EUR} - q'}</InlineMath> car le payoff étant en euros, il doit rapporter en moyenne le taux sans risque de la zone euro.
        </p>
      </div>

      {/* Sous-section : Impact de la corrélation */}
      <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Impact de la corrélation</h3>

      <p className="text-gray-600 leading-relaxed mb-4">
        Contrairement au Quanto où <InlineMath>{'\\rho'}</InlineMath> agit sur le drift, ici{' '}
        <InlineMath>{'\\rho'}</InlineMath> agit uniquement sur la volatilité globale de
        l&apos;instrument, et donc sur le prix via le Vega.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-4">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Long Call/Put Composite → Long Corrélation
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Plus <InlineMath>{'\\rho'}</InlineMath> est élevée, plus{' '}
          <InlineMath>{'\\sigma_{\\text{comp}}'}</InlineMath> est grande, plus l&apos;option est
          chère (Vega &gt; 0). La corrélation amplifie le risque total, l&apos;acheteur de l'option
          Composite bénéficie d&apos;une corrélation forte.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Cas particulier limite
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Si <InlineMath>{'\\rho = -1'}</InlineMath> et{' '}
          <InlineMath>{'\\sigma_S = \\sigma_X'}</InlineMath>, la volatilité composite s&apos;annule
          : l&apos;actif <InlineMath>{'S \\times X'}</InlineMath> devient déterministe. C&apos;est le
          cas limite où la hausse de l&apos;action est parfaitement compensée par la baisse du dollar.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 4 — Hedging dynamique et Cross-Gamma
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="hedging" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        4. Hedging dynamique et Cross-Gamma sur le Quanto
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Pour couvrir un Quanto, le trader achète l&apos;action <InlineMath>S</InlineMath> en dollars
        et doit couvrir dynamiquement le risque de change sur la valeur de marché (Mark-to-Market)
        du portefeuille. Ce rebalancement permanent entre exposition action et exposition change
        génère un P&amp;L de Cross-Gamma.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          La formule du P&amp;L de Cross-Gamma
        </p>
        <BlockMath>
          {'d\\Pi \\propto \\left(\\rho_{\\text{réal}} - \\rho_{\\text{impl}}\\right) \\times \\sigma_S \\times \\sigma_X \\times S \\times X \\, dt'}
        </BlockMath>
        <p className="text-gray-700 text-sm leading-relaxed mt-3">
          C&apos;est l&apos;analogue exact du Gamma scalping, mais en dimension 2 : au lieu de parier
          sur la volatilité réalisée d&apos;un seul actif, la dynamique du portefeuille est proportionnelle à la{' '}
          <strong>covariance réalisée</strong> entre l&apos;action et le change.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex-1">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            {'ρ_réal > ρ_impl'}
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            L&apos;action et le dollar ont davantage bougé dans le même snes que prévu. Le trader qui a vendu
            de la corrélation (via un Call Quanto) perd sur le rebalancement, il doit racheter du
            change à un prix défavorable.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex-1">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            {'ρ_réal < ρ_impl'}
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            La corrélation s&apos;est avérée plus faible qu&apos;anticipée. Le vendeur de Call Quanto
            gagne sur le hedging dynamique, la garantie de change lors des rebalancements lui a coûté moins cher que prévu.
          </p>
        </div>
      </div>

      <div className="border-l-4 border-blue-400 pl-5 py-1 my-8">
        <p className="text-gray-700 italic leading-relaxed">
          Le Quanto est donc fondamentalement un produit de corrélation. Son pricing est un pari
          sur le drift ajusté, son hedging est un pari sur la covariance réalisée.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 5 — Synthèse
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="synthese" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        5. Synthèse
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Les deux structures s&apos;opposent sur chaque dimension clé.
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 border border-gray-300">
              <th className="text-left px-4 py-3 font-semibold text-gray-700 border border-gray-300">
                Caractéristique
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 border border-gray-300">
                Quanto
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 border border-gray-300">
                Composite
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-gray-300">
              <td className="px-4 py-3 text-gray-600 border border-gray-300">Drift sous <InlineMath>{'\\mathbb{Q}_{EUR}'}</InlineMath></td>
              <td className="px-4 py-3 text-gray-700 border border-gray-300">
                <InlineMath>{'r_{USD} - q - \\rho\\sigma_S\\sigma_X'}</InlineMath>
              </td>
              <td className="px-4 py-3 text-gray-700 border border-gray-300">
                <InlineMath>{'r_{EUR} - q'}</InlineMath>
              </td>
            </tr>
            <tr className="bg-gray-50 border border-gray-300">
              <td className="px-4 py-3 text-gray-600 border border-gray-300">Volatilité</td>
              <td className="px-4 py-3 text-gray-700 border border-gray-300">
                <InlineMath>{'\\sigma_S'}</InlineMath> (inchangée)
              </td>
              <td className="px-4 py-3 text-gray-700 border border-gray-300">
                <InlineMath>{'\\sqrt{\\sigma_S^2 + \\sigma_X^2 + 2\\rho\\sigma_S\\sigma_X}'}</InlineMath>
              </td>
            </tr>
            <tr className="border border-gray-300">
              <td className="px-4 py-3 text-gray-600 border border-gray-300">Rôle de <InlineMath>{'\\rho'}</InlineMath></td>
              <td className="px-4 py-3 text-gray-700 border border-gray-300">Impact sur le drift (forward)</td>
              <td className="px-4 py-3 text-gray-700 border border-gray-300">Impact sur la volatilité</td>
            </tr>
            <tr className="bg-gray-50 border border-gray-300">
              <td className="px-4 py-3 text-gray-600 border border-gray-300">Exposition à <InlineMath>{'\\rho'}</InlineMath></td>
              <td className="px-4 py-3 text-gray-700 border border-gray-300">Short <InlineMath>{'\\rho'}</InlineMath> (Call) et Long <InlineMath>{'\\rho'}</InlineMath> (Put)</td>
              <td className="px-4 py-3 text-gray-700 border border-gray-300">Long <InlineMath>{'\\rho'}</InlineMath> (Call et Put)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Moyen mnémotechnque
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Le payoff nous donne énormément d&apos;indices pour retenir les caractéristiques de chaque produit.
          <br />
          Si le taux de change est dans la fonction max(.), c&apos;est que la corrélation agit sur la volatilité totale. Si elle est en dehors, c'est qu'elle agit sur le drift.
          <br />
          D'autre part, pour savoir si le taux sans risque est domestique ou étranger, il suffit de regarder la monnaie du strike : si le strike est en euros, c'est que le taux sans risque est européen, sinon c'est le taux américain.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          En résumé
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Le <strong>Quanto</strong> est un pari sur le drift ajusté : la correl déplace le
          forward. Le <strong>Composite</strong> est un pari sur la vol totale : la
          correl amplifie le risque. Dans les deux cas, <InlineMath>{'\\rho'}</InlineMath> est
          la variable clé, mais elle agit sur des canaux différents.
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Un quiz sur le Module 7 sera bientôt disponible.
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-7-quanto-fx/correlation-fx" className="text-blue-600 hover:underline text-sm">
          ← Corrélation Indice et FX
        </a>
        <div />
      </div>

    </article>
  );
}
