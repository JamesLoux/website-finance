import Link from 'next/link'
import { InlineMath, BlockMath } from '../../../components/Math'

export const metadata = {
  title: 'CMS & Ajustement de Convexité | Fixed Income II',
  description: 'Constant Maturity Swaps, intuition de la convexité, ajustement et réplication par Carr-Madan.',
}

export default function CMS() {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">

      {/* Fil d'Ariane */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/cours" className="hover:underline">Cours</Link>
        {' › '}
        <span>Fixed Income II</span>
        {' › '}
        <span className="text-gray-700 font-medium">CMS & Ajustement de Convexité</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Constant Maturity Swap
      </h1>
      <p className="text-gray-600 leading-relaxed mb-10">
        Le Constant Maturity Swap (CMS) permet de traiter un taux de swap long terme comme s&apos;il s&apos;agissait d&apos;un taux court,
        payé à fréquence semestrielle. Derrière cette mécanique simple, il y a un concept qui s'insère :
        l&apos;ajustement de convexité.
      </p>

      {/* ── Section 1 ── */}
      <h2 id="mecanique" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        1. Mécanique du CMS
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Dans un swap classique (IRS), on échange un taux fixe contre un taux court (Euribor 6M).
        Dans un CMS, au moins l&apos;une des jambes paie un taux de swap long terme,
        mais <strong>révisé et payé à une fréquence courte</strong>.
      </p>
      <p className="text-gray-600 leading-relaxed mb-6">
        Exemple : tous les 6 mois, on observe le taux de l&apos;IRS 10 ans sur le marché.
        Ce chiffre devient le taux variable pour le semestre. Le payoff versé à la fin
        de chaque période est :
      </p>

      <div className="bg-gray-100 px-8 py-6 rounded-xl mb-6 text-center">
        <BlockMath>{'Payoff = N \\times S_{10y}(Fixing) \\times \\delta'}</BlockMath>
        <p className="text-sm text-gray-500 mt-2">
          où <InlineMath>{'\\delta'}</InlineMath> est la fraction d&apos;année (0,5 pour un semestre)
          et <InlineMath>{'S_{10y}(Fixing)'}</InlineMath> est le taux IRS 10 ans observé à la date de fixing.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-2">
          Le Steepener (CMS Spread)
        </p>
        <p className="text-gray-700 leading-relaxed">
          La stratégie classique des fonds macroéconomiques. Un trader reçoit le CMS 10 ans
          et paie le CMS 2 ans. Si la courbe des taux se pentifie (c&apos;est-à-dire si l&apos;écart
          entre taux longs et taux courts s&apos;agrandit) le trader gagne de l&apos;argent.
        </p>
      </div>

      {/* ── Section 2 ── */}
      <h2 id="intuition-convexite" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        2. L&apos;intuition de la convexité : le vrai swap vs le CMS
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Pour pricer ce flux, on serait tenté de prendre simplement le taux swap forward anticipé
        et de l&apos;actualiser. C&apos;est faux, et c'est tout l&apos;enjeu.
      </p>
      <p className="text-gray-600 leading-relaxed mb-6">
        Il y a un <strong>décalage de nature</strong> : on utilise un taux conçu pour être payé
        sur 10 ans, mais on le paie en une seule fois dans 6 mois. Pour comprendre l&apos;impact
        de ce décalage, comparons un investisseur dans un vrai Swap 10 ans et un investisseur
        qui reçoit le CMS 10 ans, en partant d&apos;un taux à 3&nbsp;%.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-5">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Scénario haussier : taux explosent à 10&nbsp;%
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            <strong>Vrai Swap 10 ans :</strong> vous recevez 10&nbsp;% pendant 10 ans,
            mais l&apos;actualisation à 10&nbsp;% est violente. Les gains lointains (dans 8, 9 ans)
            sont écrasés. L&apos;actualisation agit comme un <em>frein</em> : plus vous gagnez,
            moins vos gains futurs valent cher.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            <strong>CMS 10 ans :</strong> le produit observe les 10&nbsp;% et vous les verse
            cash à la fin du semestre. Vous prenez le pactole sans subir le poids
            de l&apos;actualisation sur 10 ans.
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-5">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Scénario baissier : taux s&apos;effondrent à 1&nbsp;%
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            <strong>Vrai Swap 10 ans :</strong> vous recevez seulement 1&nbsp;% au lieu des 3&nbsp;% espérés.
            Mais comme les taux sont bas, l&apos;actualisation est très faible, vos pertes lointaines
            pèsent lourd (l'actualisation ne diminue pas la perte). L&apos;effet est <em>accélérateur</em> : plus vous perdez,
            plus la perte coûte cher.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            <strong>CMS 10 ans :</strong> vous recevez 1&nbsp;% pour ce semestre. C&apos;est un manque
            à gagner immédiat, mais vous ne subissez pas le poids d&apos;une perte actualisée
            sur une décennie.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-2">
          Bilan
        </p>
        <p className="text-gray-700 leading-relaxed">
          Le CMS vous donne la performance brute d&apos;un taux long, mais avec un profil asymétrique
          avantageux : plus de gains nets à la hausse, moins de poids relatif à la baisse.
          Cet avantage a un prix, et c&apos;est ce que mesure l&apos;ajustement de convexité que l'on va ajouter au prix du CMS.
        </p>
      </div>

      {/* ── Section 3 ── */}
      <h2 id="ajustement-convexite" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        3. L&apos;ajustement de convexité
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        Puisque le CMS offre structurellement ce profil asymétrique favorable,
        le marché va vous le faire payer. On rajoute une surprime
        au taux forward théorique. Le taux coté du CMS s&apos;écrit :
      </p>

      <div className="bg-gray-100 px-8 py-6 rounded-xl mb-6 text-center">
        <BlockMath>{'\\text{Taux CMS} = \\text{Taux Forward} + \\text{Ajustement de Convexité}'}</BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-2">
          Exemple de marché
        </p>
        <p className="text-gray-700 leading-relaxed">
          Si le taux forward classique est à 3,00&nbsp;%, le marché pricerait le CMS à 3,40&nbsp;%.
          Ces 40 points de base supplémentaires sont l&apos;ajustement de convexité, la valeur
          financière du décalage d&apos;actualisation décrit ci-dessus.
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-10">
        Cet ajustement croît avec deux facteurs : la <strong>volatilité</strong> (plus les taux
        bougent fort, plus l&apos;effet de courbure s&apos;amplifie) et le <strong>temps</strong> (plus
        le paiement est lointain, plus l&apos;ajustement est exposé).
      </p>

      {/* ── Section 4 ── */}
      <h2 id="carr-madan" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        4. La réplication statique : le théorème de Carr-Madan
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Afin de couvrir ce profil asymétrique, un simple Forward (FRA) est insuffisant
        car c&apos;est un instrument <em>linéaire</em> (une droite) alors que la valeur du CMS
        est une <em>convexe</em> (une courbe). Sur les marchés de taux, le seul instrument
        qui fabrique de la convexité (du Gamma) est <strong>l&apos;option : ici le Swaption</strong>.
      </p>
      <p className="text-gray-600 leading-relaxed mb-6">
        Le théorème de Carr-Madan formalise cette intuition : tout profil de gain convexe
        peut être répliqué exactement par une position linéaire (le Forward)
        et une somme continue de Swaptions couvrant tous les strikes possibles,
        chacune pondérée par la courbure locale du payoff cible à ce strike.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        Cette logique est identique à la réplication statique du Variance Swap par un portefeuille 
        de Calls et Puts OTM. La pondération <InlineMath>{'1/K^2'}</InlineMath> joue 
        le même rôle que <InlineMath>{'w(K)'}</InlineMath> ici. 
        Voir la page{' '}
        <a href="/cours/module-6-volatilite/variance-swap-vix" className="text-blue-600 hover:underline">
          Variance Swap &amp; VIX
        </a>
        {' '}pour la démonstration complète.
      </p>

      <div className="bg-gray-100 px-8 py-6 rounded-xl mb-6">
        <BlockMath>
          {'CA = \\int_{0}^{S_{Fwd}} w(K) \\cdot \\text{Receiver}(K)\\, dK + \\int_{S_{Fwd}}^{\\infty} w(K) \\cdot \\text{Payer}(K)\\, dK'}
        </BlockMath>
        <p className="text-sm text-gray-500 mt-3 text-center">
          où <InlineMath>{'w(K)'}</InlineMath> est la dérivée seconde du payoff cible :
          la courbure locale à chaque strike <InlineMath>{'K'}</InlineMath>.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-2">
          En pratique sur le desk
        </p>
        <p className="text-gray-700 leading-relaxed">
          L&apos;intégrale devient une somme discrète des Swaptions cotées sur le marché
          (tous les 25 ou 50 bps de strike), chacune multipliée par son poids de réplication{' '}
          <InlineMath>{'w(K)'}</InlineMath>. Plus le CMS a de la convexité à un niveau de taux donné,
          plus on achète de Swaptions à ce strike.
        </p>
      </div>

      {/* ── Section 5 ── */}
      <h2 id="sabr" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        5. Modélisation et limites
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        La réplication de Carr-Madan exige de valoriser des Swaptions très éloignées
        de la monnaie (les strikes extrêmes de l&apos;intégrale). Ces options posent
        deux problèmes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-5">
          <p className="text-sm font-semibold text-gray-700 mb-2">Illiquidité des strikes extrêmes</p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Les Swaptions très OTM (strike à 0,5&nbsp;% ou à 8&nbsp;% quand le marché est à 3&nbsp;%)
            ne se traitent presque pas. Les cotations ne sont pas fiables,
            le quant doit <em>extrapoler</em> le smile de volatilité au-delà des strikes observés,
            avec toute l&apos;incertitude que cela implique.
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-5">
          <p className="text-sm font-semibold text-gray-700 mb-2">Insuffisance du modèle flat</p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Utiliser une volatilité constante (Bachelier flat) revient à supposer que
            le sourire de volatilité est parfaitement plat. C&apos;est faux en pratique :
            les Swaptions OTM ont une volatilité implicite différente des Swaptions ATM,
            ce qui biaise le calcul de l&apos;ajustement de convexité.
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        C&apos;est pourquoi les quants utilisent le modèle <strong>SABR</strong> pour calibrer
        précisément le sourire de volatilité sur l&apos;ensemble des strikes, y compris
        les plus extrêmes. SABR permet d&apos;extrapoler le smile de façon cohérente
        et de valoriser correctement les Swaptions périphériques nécessaires
        au calcul de l'ajustement de convexité.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-2">
          Conclusion
        </p>
        <p className="text-gray-700 leading-relaxed">
          Le CMS est un instrument en apparence simple (payer un taux long à fréquence courte)
          mais la non-linéarité entre prix et taux génère
          un biais systématique que seul un portefeuille de Swaptions peut répliquer exactement.
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Un quiz sur le Module 5 sera bientôt disponible.
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-5-fixed-income-2/bond-options-swaptions" className="text-blue-600 hover:underline text-sm">
          ← Bond Options & Swaptions
        </a>
        <a href="/cours/module-5-fixed-income-2/convertible-bond" className="text-blue-600 hover:underline text-sm">
          Convertible Bond →
        </a>
      </div>

    </article>
  )
}
