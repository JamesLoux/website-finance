import { InlineMath, BlockMath } from '../../../components/Math'

export const metadata = {
  title: 'Courbe des taux & instruments — Module 4',
}

export default function FwdRateAgreement() {
  return (
    <article className="px-6 py-12 max-w-3xl">

      {/* Fil d'Ariane */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/cours" className="hover:underline">Cours</a>
        {' › '}
        <a href="/cours/module-4-taux-credit" className="hover:underline">Fixed Income I</a>
        {' › '}
        <span className="text-gray-700">Courbe des taux & instruments</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Courbe des taux & instruments
      </h1>

      <p className="text-gray-600 leading-relaxed mb-10">
        Les taux spot donnent le coût d'un emprunt <em>aujourd'hui</em>.
        Mais ici on va chercher à fixer dès maintenant
        le taux d'un emprunt qui ne commencera que dans six mois, c'est le taux forward.
        Le FRA est le contrat qui permet de trader ce taux. Et le bootstrapping est
        l'algorithme qui relie tous ces instruments pour construire la courbe zéro-coupon complète.
      </p>

      {/* ── Section 1 ── */}
      <h2 id="du-taux-spot-au-taux-forward" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        1. Du taux spot au taux forward
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le taux forward <InlineMath>{'F(T_1, T_2)'}</InlineMath> est le taux d'un emprunt
        couvrant la période future <InlineMath>{'[T_1, T_2]'}</InlineMath>, fixé dès aujourd'hui.
        Son existence découle strictement de l'absence d'opportunité d'arbitrage (AOA) :
        placer sur <InlineMath>{'T_2'}</InlineMath> aujourd'hui doit revenir exactement au même
        que placer sur <InlineMath>{'T_1'}</InlineMath> aujourd'hui puis se réengager au taux forward
        pour la période restante.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        L'égalité des facteurs d'escompte s'écrit :
      </p>

      <div className="bg-gray-100 rounded-xl px-8 py-6 mb-4 text-center">
        <BlockMath>{'e^{-y_2 T_2} = e^{-y_1 T_1} \\times e^{-F(T_1,\\, T_2)\\,(T_2 - T_1)}'}</BlockMath>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        En isolant <InlineMath>{'F(T_1, T_2)'}</InlineMath> :
      </p>

      <div className="bg-gray-100 rounded-xl px-8 py-6 mb-6 text-center">
        <BlockMath>{'F(T_1, T_2) = \\frac{y_2\\, T_2 - y_1\\, T_1}{T_2 - T_1}'}</BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-3">Exemple chiffré</p>
        <p className="text-gray-700 leading-relaxed">
          Le taux spot à 1 an est <InlineMath>{'y_1 = 2\\%'}</InlineMath>,
          le taux spot à 2 ans est <InlineMath>{'y_2 = 3\\%'}</InlineMath>.
          Le taux forward 1 an dans 1 an vaut :
        </p>
        <div className="mt-4 text-center">
          <BlockMath>{'F(1,2) = \\frac{0{,}03 \\times 2 - 0{,}02 \\times 1}{2 - 1} = 4\\%'}</BlockMath>
        </div>
        <p className="text-gray-600 text-sm mt-2">
          La courbe est normale (montante ou contango) : le marché anticipe une hausse des taux.
          Si la courbe était inversée, on obtiendrait <InlineMath>{'F < y_2'}</InlineMath>.
        </p>
      </div>

      {/* ── Section 2 ── */}
      <h2 id="le-fra" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        2. Le Forward Rate Agreement
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le FRA est le contrat de gré à gré (OTC) qui permet de fixer aujourd'hui
        un taux <InlineMath>{'K'}</InlineMath> contre un taux variable futur <InlineMath>{'L'}</InlineMath>
        sur une période <InlineMath>{'\\delta = T_2 - T_1'}</InlineMath>.
        L'acheteur du FRA paie le taux fixe et reçoit le variable, il se protège
        contre une hausse des taux (vu qu'il gagne si les taux montent).
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le flux théorique généré en <InlineMath>{'T_2'}</InlineMath> est{' '}
        <InlineMath>{'N \\times (L - K) \\times \\delta'}</InlineMath>.
        Mais le FRA est réglé <em>par anticipation</em> en <InlineMath>{'T_1'}</InlineMath>,
        dès que le taux variable est fixé. Ce flux est donc actualisé sur la période{' '}
        <InlineMath>{'\\delta'}</InlineMath> au taux de marché <InlineMath>{'L'}</InlineMath> :
      </p>

      <div className="bg-gray-100 rounded-xl px-8 py-6 mb-4 text-center">
        <BlockMath>{'\\text{Payoff}_{T_1} = N \\times (L - K) \\times \\delta \\times e^{-L\\,\\delta}'}</BlockMath>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-3">Exemple chiffré</p>
        <p className="text-gray-700 leading-relaxed mb-2">
          FRA acheté sur la période 1 an → 1,5 an (<InlineMath>{'\\delta = 0{,}5'}</InlineMath>),
          strike <InlineMath>{'K = 3\\%'}</InlineMath> (comme anticipé par le marché), notionnel <InlineMath>{'N = 1\\,\\text{M€}'}</InlineMath>.
          En <InlineMath>{'T_1'}</InlineMath>, le taux se fixe à <InlineMath>{'L = 4\\%'}</InlineMath> (surprise de 100 bps).
        </p>
        <p className="text-gray-700 leading-relaxed mb-2">
          Le gain brut en <InlineMath>{'T_2'}</InlineMath> serait :{' '}
          <InlineMath>{'1\\,000\\,000 \\times (0{,}04 - 0{,}03) \\times 0{,}5 = 5\\,000\\,\\text{€}'}</InlineMath>.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Paiement immédiat en <InlineMath>{'T_1'}</InlineMath> :{' '}
          <InlineMath>{'5\\,000 \\times e^{-0{,}04 \\times 0{,}5} \\approx 4\\,901\\,\\text{€}'}</InlineMath>.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-3">Pricing d'un FRA</p>
        <p className="text-gray-700 leading-relaxed">
          La valeur d'un FRA acheteur à l'initiation est nulle (le strike <InlineMath>{'K'}</InlineMath> est
          fixé au taux forward théorique). En cours de vie, sa valeur devient :
        </p>
        <div className="mt-4 text-center">
          <BlockMath>{'V_{\\text{FRA}} = N \\times \\delta \\times (F(T_1, T_2) - K) \\times DF(0, T_2)'}</BlockMath>
        </div>
        <p className="text-gray-600 text-sm mt-3">
          où <InlineMath>{'DF(0, T_2) = e^{-y_2 T_2}'}</InlineMath> est le facteur d'escompte jusqu'en <InlineMath>{'T_2'}</InlineMath>.
          Si le taux forward monte au-dessus de <InlineMath>{'K'}</InlineMath>, l'acheteur est en gain.
        </p>
      </div>

      {/* ── Section 3 ── */}
      <h2 id="futures-vs-fra" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        3. Futures sur taux vs FRA
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Les futures sur taux (SOFR, Euribor) sont les équivalents standardisés des FRA,
        et donc sont cotés en Bourse. Leur mécanique de mark-to-market quotidien crée une différence
        subtile mais importante avec les FRA OTC.
      </p>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-10">
        <p className="text-amber-700 font-semibold mb-3">À savoir — l'ajustement de convexité</p>
        <p className="text-gray-700 leading-relaxed mb-3">
          Les gains sur un future sont réinvestis quotidiennement (appels de marge car pas de CCP),
          ce qui génère un rendement sur le rendement. Cette asymétrie rend la position
          short Future plus avantageuse en cas de hausse des taux, ce que le marché
          compense en cotant le future légèrement au-dessus du forward théorique.
          La correction (modèle de Vasicek simplifié) vaut :
        </p>
        <div className="text-center mb-3">
          <BlockMath>{'F_{\\text{forward}} = F_{\\text{future}} - \\tfrac{1}{2}\\,\\sigma^2\\, T_1\\, T_2'}</BlockMath>
        </div>
        <p className="text-gray-600 text-sm">
          Exemple : un future SOFR 2 ans cote un taux implicite de 4,05 %.
          Si le biais de convexité est de 5 bps (<InlineMath>{'\\sigma'}</InlineMath> et maturités données),
          le taux forward réel à injecter dans la courbe sera de 4,00 %.
          Ce biais devient significatif pour les échéances longues (au-delà de 2 ans).
        </p>
      </div>

      {/* ── Section 4 ── */}
      <h2 id="bootstrapping" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-24">
        4. Bootstrapping : construire la courbe zéro-coupon
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Le bootstrapping est l'algorithme qui extrait la courbe des facteurs d'escompte
        continus (discount factor) <InlineMath>{'DF(0, T) = e^{-y_T\\, T}'}</InlineMath> à partir des instruments cotés en marché.
        On part des taux courts (instruments monétaires) et on prolonge la courbe
        pas à pas grâce aux FRA, en s'assurant qu'il n'y a jamais d'arbitrage
        entre deux points adjacents.
      </p>

      {/* Étape 1 */}
      <div className="mb-6">
        <p className="text-gray-900 font-semibold mb-2">Étape 1 — Le point de départ (taux monétaire)</p>
        <p className="text-gray-600 leading-relaxed mb-3">
          On lit le taux spot <InlineMath>{'y_1'}</InlineMath> sur le marché monétaire
          (dépôt, T-Bill) pour obtenir le premier facteur d'escompte :
        </p>
        <div className="bg-gray-100 rounded-xl px-8 py-5 text-center mb-3">
          <BlockMath>{'DF(0, T_1) = e^{-y_1\\, T_1}'}</BlockMath>
        </div>
        <p className="text-gray-500 text-sm">
          Exemple : taux 1 an à 2 %. <InlineMath>{'DF(0,1) = e^{-0{,}02} = 0{,}9802'}</InlineMath>.
        </p>
      </div>

      {/* Étape 2 */}
      <div className="mb-6">
        <p className="text-gray-900 font-semibold mb-2">Étape 2 — L'itération (FRA / futures)</p>
        <p className="text-gray-600 leading-relaxed mb-3">
          Connaissant <InlineMath>{'DF(0, T_1)'}</InlineMath>, on lit la cotation du FRA (ou du future
          corrigé du biais de convexité) couvrant <InlineMath>{'[T_1, T_2]'}</InlineMath>,
          notée <InlineMath>{'F_{1,2}'}</InlineMath>. Par absence d'arbitrage :
        </p>
        <div className="bg-gray-100 rounded-xl px-8 py-5 text-center mb-3">
          <BlockMath>{'DF(0, T_2) = DF(0, T_1) \\times e^{-F_{1,2}\\,(T_2 - T_1)}'}</BlockMath>
        </div>
        <p className="text-gray-500 text-sm">
          Exemple : FRA 1×2 ans coté à 4 %.{' '}
          <InlineMath>{'DF(0,2) = 0{,}9802 \\times e^{-0{,}04} \\approx 0{,}9418'}</InlineMath>.
          On boucle pour <InlineMath>{'T_3, T_4, \\ldots'}</InlineMath>
        </p>
      </div>

      {/* Étape 3 */}
      <div className="mb-8">
        <p className="text-gray-900 font-semibold mb-2">Étape 3 — Interpolation log-linéaire</p>
        <p className="text-gray-600 leading-relaxed mb-3">
          Pour une date intermédiaire <InlineMath>{'t \\in [T_1, T_2]'}</InlineMath>
          non cotée directement, on interpole sur les logarithmes des facteurs d'escompte
          (ce qui revient à interpoler linéairement sur les taux zéro-coupon) :
        </p>
        <div className="bg-gray-100 rounded-xl px-8 py-5 text-center mb-3">
          <BlockMath>{'\\ln DF(0,t) = \\ln DF(0,T_1) + \\frac{t - T_1}{T_2 - T_1}\\,\\bigl(\\ln DF(0,T_2) - \\ln DF(0,T_1)\\bigr)'}</BlockMath>
        </div>
        <p className="text-gray-500 text-sm">
          Cette interpolation garantit que le taux zéro-coupon implicite entre deux points
          cotés est constant, propriété cohérente avec l'absence d'arbitrage calendaire.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <p className="text-blue-600 uppercase tracking-wide text-xs font-semibold mb-3">Lire la courbe en temps réel</p>
        <p className="text-gray-700 leading-relaxed mb-3">
          La courbe des taux US Treasury (1M, 3M, 6M, 1Y, 2Y, 5Y, 10Y, 30Y)
          est publiée quotidiennement par la Réserve fédérale et disponible gratuitement
          sur FRED (Federal Reserve Bank of St. Louis) :
        </p>
        <a
          href="https://fred.stlouisfed.org/graph/?id=DGS1MO,DGS3MO,DGS6MO,DGS1,DGS2,DGS5,DGS10,DGS30"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-600 hover:underline font-medium text-sm"
        >
          Courbe des taux US Treasury — FRED →
        </a>
        <p className="text-gray-500 text-sm mt-3">
          Une courbe normale (montante et contango) reflète des anticipations de hausse ou une prime
          de terme positive. Une courbe inversée (taux courts au-dessus des taux longs)
          est historiquement associée à un ralentissement économique imminent. Pour plus de détails, consulter le module nommé Macro.
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Le quiz du Module 4 est disponible — <a href="/quiz/module-4" className="text-blue-600 hover:underline font-medium">S&apos;entraîner →</a>
      </div>

      {/* ── Navigation ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-4-taux-credit/duration-convexite" className="text-blue-600 hover:underline text-sm">
          ← Duration & Convexité
        </a>
        <a href="/cours/module-4-taux-credit/interest-rate-swap" className="text-blue-600 hover:underline text-sm">
          Interest Rate Swap →
        </a>
      </div>

    </article>
  )
}
