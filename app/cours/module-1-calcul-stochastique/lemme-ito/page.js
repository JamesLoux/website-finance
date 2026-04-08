// Page de cours : Module 1 — Lemme d'Itô

import Link from 'next/link';
import { InlineMath, BlockMath } from '../../../components/Math';

export const metadata = {
  title: "Lemme d'Itô — Finance according to James",
  description:
    "Formalisme du Lemme d'Itô, réduction stochastique et application au Mouvement Brownien Géométrique.",
};

export default function LemmeItoPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Fil d'Ariane ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/cours" className="hover:text-blue-600 transition-colors">Cours</Link>
        <span>/</span>
        <span className="text-gray-500">Module 1 — Calcul stochastique</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Lemme d&apos;Itô</span>
      </nav>

      {/* ── Titre ── */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Le Lemme d&apos;Itô
      </h1>

      {/* ── Introduction ── */}
      <p className="text-lg text-gray-600 leading-relaxed mb-10">
        Le calcul différentiel classique repose sur une hypothèse implicite : les fonctions sont
        suffisamment lisses pour que les termes d&apos;ordre supérieur soient négligeables. Sur les
        marchés financiers, cette hypothèse s&apos;effondre. Le Lemme d&apos;Itô est la{' '}
        <strong>règle de dérivation en chaîne du calcul stochastique</strong> — l&apos;outil qui permet
        de manipuler des fonctions de processus aléatoires.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — Pourquoi le calcul classique échoue
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="echec-calcul-classique" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">
        1. Pourquoi le calcul classique échoue
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        En calcul déterministe (Newton/Leibniz), si <InlineMath>{'y = f(x)'}</InlineMath>, une
        variation infinitésimale s&apos;écrit <InlineMath>{'dy = f\'(x)dx'}</InlineMath>. Ce calcul
        repose sur l&apos;hypothèse que les termes d&apos;ordre supérieur{' '}
        <InlineMath>{'(dx)^2'}</InlineMath> sont négligeables.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Sur les marchés financiers, le prix d&apos;un actif <InlineMath>S_t</InlineMath> suit un
        Mouvement Brownien — une trajectoire partout continue mais nulle part dérivable. Plus
        précisément : une trajectoire brownienne varie typiquement en{' '}
        <InlineMath>{`\\sqrt{dt}`}</InlineMath>, et non en <InlineMath>dt</InlineMath>. Sa
        &ldquo;dérivée&rdquo; au sens classique serait{' '}
        <InlineMath>{`\\frac{\\sqrt{dt}}{dt} = \\frac{1}{\\sqrt{dt}} \\to \\infty`}</InlineMath>.
        Le calcul de Newton est littéralement inapplicable.
      </p>

      <p className="text-gray-600 leading-relaxed mb-10">
        Le Lemme d&apos;Itô est l&apos;ajustement nécessaire pour dériver une fonction qui dépend d&apos;un
        processus stochastique.
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — Formalisme du Lemme d'Itô
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="formalisme" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        2. Formalisme du Lemme d&apos;Itô
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Considérons un processus de diffusion <InlineMath>X_t</InlineMath> dont la dynamique est :
      </p>

      <BlockMath>{`dX_t = \\mu \\, dt + \\sigma \\, dW_t`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        où <InlineMath>{`\\mu`}</InlineMath> est le drift (tendance) et{' '}
        <InlineMath>{`\\sigma`}</InlineMath> la volatilité.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Pour toute fonction <InlineMath>{'f(t, X_t)'}</InlineMath> deux fois dérivable, la
        variation <InlineMath>df</InlineMath> est donnée par le développement de Taylor au second
        ordre :
      </p>

      <BlockMath>{`df = \\frac{\\partial f}{\\partial t} dt + \\frac{\\partial f}{\\partial x} dX_t + \\frac{1}{2} \\frac{\\partial^2 f}{\\partial x^2} (dX_t)^2`}</BlockMath>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — La réduction stochastique
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="reduction-stochastique" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        3. La réduction stochastique
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        C&apos;est ici que la propriété clé{' '}
        <InlineMath>{'(dW_t)^2 = dt'}</InlineMath> qu'on a vu au chapitre précédent change tout. Développons le terme{' '}
        <InlineMath>{'(dX_t)^2'}</InlineMath> :
      </p>

      <BlockMath>{`(dX_t)^2 = (\\mu \\, dt + \\sigma \\, dW_t)^2 = \\mu^2 dt^2 + 2\\mu\\sigma \\, dt \\, dW_t + \\sigma^2 (dW_t)^2`}</BlockMath>

      {/* Boîte bleue — règles de simplification */}
      <div className="bg-blue-50 border border-blue-300 rounded-xl p-6 mb-6">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">
          Règles de simplification à l&apos;ordre dt
        </p>
        <ul className="space-y-3">
          <li className="text-gray-700 text-sm leading-relaxed">
            <InlineMath>{'dt^2 \\to 0'}</InlineMath> — infiniment petit d&apos;ordre 2
          </li>
          <li className="text-gray-700 text-sm leading-relaxed">
            <InlineMath>{'dt \\cdot dW_t \\to 0'}</InlineMath> — ordre{' '}
            <InlineMath>{'dt^{3/2}'}</InlineMath>
          </li>
          <li className="text-gray-700 text-sm leading-relaxed">
            <InlineMath>{'(dW_t)^2 \\to dt'}</InlineMath> — variation quadratique du Mouvement
            Brownien (vu au chapitre précédent)
          </li>
        </ul>
      </div>

      <p className="text-gray-600 leading-relaxed mb-10">
        On obtient la relation fondamentale :{' '}
        <InlineMath>{'(dX_t)^2 = \\sigma^2 \\, dt'}</InlineMath>
      </p>

      {/* ══════════════════════════════════════════════════════════════
          Section 4 — La formule finale et l'interprétation des risques
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="formule-finale" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        4. La formule finale et l&apos;interprétation des risques
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        En réinjectant <InlineMath>{'(dX_t)^2 = \\sigma^2 dt'}</InlineMath> dans le développement
        de Taylor, en regroupant les termes en <InlineMath>dt</InlineMath> et en développant{' '}
        <InlineMath>{'dX_t = \\mu \\, dt + \\sigma \\, dW_t'}</InlineMath>, on obtient la formule d&apos;Itô :
      </p>

      <BlockMath>{`df = \\left( \\frac{\\partial f}{\\partial t} + \\mu \\frac{\\partial f}{\\partial x} + \\frac{1}{2} \\sigma^2 \\frac{\\partial^2 f}{\\partial x^2} \\right) dt + \\sigma \\frac{\\partial f}{\\partial x} \\, dW_t`}</BlockMath>

      {/* Encadré amber */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
          Sans le terme Gamma
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          Sans le terme <InlineMath>{'\\frac{1}{2}\\sigma^2 f\'\''}</InlineMath>, un teneur de
          marché qui price une option sous-estime systématiquement sa valeur. C&apos;est précisément
          le Gamma d&apos;Itô qui rend le pricing cohérent.
        </p>
      </div>

      {/* Tableau */}
      <div className="overflow-hidden border border-gray-300 rounded-xl mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Terme</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Sensibilité financière</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Rôle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-3 border-b border-gray-300 font-mono text-gray-700">
                <InlineMath>{'\\frac{\\partial f}{\\partial t}'}</InlineMath>
              </td>
              <td className="px-4 py-3 border-b border-gray-300 text-gray-600">
                <InlineMath>{`\\Theta`}</InlineMath>
              </td>
              <td className="px-4 py-3 border-b border-gray-300 text-gray-600">Dépréciation temporelle du contrat</td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-gray-300 font-mono text-gray-700">
                <InlineMath>{'\\frac{\\partial f}{\\partial x}'}</InlineMath>
              </td>
              <td className="px-4 py-3 border-b border-gray-300 text-gray-600">
                <InlineMath>{`\\Delta`}</InlineMath>
              </td>
              <td className="px-4 py-3 border-b border-gray-300 text-gray-600">Sensibilité au mouvement du sous-jacent</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-gray-700">
                <InlineMath>{'\\frac{1}{2}\\frac{\\partial^2 f}{\\partial x^2}'}</InlineMath>
              </td>
              <td className="px-4 py-3 text-gray-600">
                <InlineMath>{`\\Gamma`}</InlineMath>
              </td>
              <td className="px-4 py-3 text-gray-600">Convexité — ajustement d&apos;Itô</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          Section 5 — Application : résolution du MBG
      ══════════════════════════════════════════════════════════════ */}
      <h2 id="application-gbm" className="text-2xl font-bold text-gray-900 mt-14 mb-6 scroll-mt-24">
        5. Application — Résolution du Mouvement Brownien Géométrique
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Le modèle standard pour le prix d&apos;une action <InlineMath>S_t</InlineMath> est le
        Mouvement Brownien Géométrique. Sa dynamique est décrite par l&apos;EDS suivante :
      </p>

      <BlockMath>{`dS_t = \\mu S_t \\, dt + \\sigma S_t \\, dW_t`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-8">
        Pour résoudre cette équation et trouver la valeur de <InlineMath>S_t</InlineMath>, nous
        appliquons le Lemme d&apos;Itô à la fonction{' '}
        <InlineMath>{'f(S_t) = \\ln(S_t)'}</InlineMath>.
      </p>

      {/* Sous-section 1 */}
      <p className="font-semibold text-gray-800 mt-6 mb-3">
        1. Calcul des dérivées partielles
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        Appliquons le formalisme à <InlineMath>{'f(x) = \\ln(x)'}</InlineMath> :
      </p>

      <ul className="space-y-2 mb-8 pl-4">
        <li className="text-gray-600 text-sm leading-relaxed">
          Dérivée temporelle :{' '}
          <InlineMath>{'\\frac{\\partial f}{\\partial t} = 0'}</InlineMath>
        </li>
        <li className="text-gray-600 text-sm leading-relaxed">
          Delta <InlineMath>{'(\\Delta)'}</InlineMath> :{' '}
          <InlineMath>{'\\frac{\\partial f}{\\partial s} = \\frac{1}{S_t}'}</InlineMath>
        </li>
        <li className="text-gray-600 text-sm leading-relaxed">
          Gamma <InlineMath>{'(\\Gamma)'}</InlineMath> :{' '}
          <InlineMath>{'\\frac{\\partial^2 f}{\\partial s^2} = -\\frac{1}{S_t^2}'}</InlineMath>
        </li>
      </ul>

      {/* Sous-section 2 */}
      <p className="font-semibold text-gray-800 mt-6 mb-3">
        2. Application du Lemme d&apos;Itô
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        En injectant ces dérivées dans la formule générale :
      </p>

      <BlockMath>{`d(\\ln S_t) = \\left( 0 + \\mu S_t \\cdot \\frac{1}{S_t} + \\frac{1}{2} \\sigma^2 S_t^2 \\cdot \\left( -\\frac{1}{S_t^2} \\right) \\right) dt + \\sigma S_t \\cdot \\frac{1}{S_t} \\, dW_t`}</BlockMath>

      <p className="text-gray-600 leading-relaxed mb-4">
        Après simplification des termes <InlineMath>S_t</InlineMath> :
      </p>

      <BlockMath>{`d(\\ln S_t) = \\left( \\mu - \\frac{1}{2} \\sigma^2 \\right) dt + \\sigma \\, dW_t`}</BlockMath>

      {/* Sous-section 3 */}
      <p className="font-semibold text-gray-800 mt-6 mb-3">
        3. Intégration et solution explicite
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        En intégrant entre <InlineMath>0</InlineMath> et <InlineMath>T</InlineMath> :
      </p>

      <BlockMath>{`\\ln(S_T) - \\ln(S_0) = \\int_0^T \\left( \\mu - \\frac{1}{2} \\sigma^2 \\right) dt + \\int_0^T \\sigma \\, dW_t`}</BlockMath>

      <BlockMath>{`\\ln\\left(\\frac{S_T}{S_0}\\right) = \\left( \\mu - \\frac{1}{2} \\sigma^2 \\right)T + \\sigma W_T`}</BlockMath>

      {/* Formule finale encadrée */}
      <div className="bg-gray-100 border border-gray-300 rounded-xl px-8 py-6 mb-8 text-center text-gray-900">
        <BlockMath>{`S_T = S_0 \\exp\\left( \\left( \\mu - \\frac{1}{2} \\sigma^2 \\right)T + \\sigma W_T \\right)`}</BlockMath>
      </div>

      {/* Sous-section 4 */}
      <p className="font-semibold text-gray-800 mt-6 mb-3">
        4. Pourquoi le terme <InlineMath>{'-\\frac{1}{2}\\sigma^2'}</InlineMath> ?
      </p>

      {/* Boîte 1 */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-4">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          L&apos;ajustement de convexité
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          En calcul classique, la solution serait <InlineMath>{'S_0 e^{\\mu T}'}</InlineMath>. En
          calcul stochastique, le terme <InlineMath>{'-\\frac{1}{2}\\sigma^2'}</InlineMath>{' '}
          apparaît mécaniquement, dû à la courbure de la fonction logarithmique. C&apos;est
          l&apos;ajustement d&apos;Itô — inévitable dès que la trajectoire est stochastique.
        </p>
      </div>

      {/* Boîte 2 */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-4">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Moyenne vs Médiane
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          L&apos;espérance du prix est bien{' '}
          <InlineMath>{'\\mathbb{E}[S_T] = S_0 e^{\\mu T}'}</InlineMath>. Mais à cause de la
          volatilité, la trajectoire typique (la médiane) est plus basse, dictée par le drift
          ajusté <InlineMath>{'\\left(\\mu - \\frac{1}{2}\\sigma^2\\right)'}</InlineMath>.
          Exemple concret : si <InlineMath>{'\\mu = 10\\%'}</InlineMath> et{' '}
          <InlineMath>{'\\sigma = 20\\%'}</InlineMath>, le drift effectif des log-prix est{' '}
          <InlineMath>{'10\\% - \\frac{(20\\%)^2}{2} = 8\\%'}</InlineMath>. Un teneur de marché
          qui ignorerait ce terme sur-estimerait systématiquement le drift de son sous-jacent.
        </p>
      </div>

      {/* Boîte 3 */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-4">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Distribution log-normale
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Cette démonstration prouve que les prix suivent une loi log-normale. Cela garantit
          mathématiquement que <InlineMath>{'S_t > 0'}</InlineMath> pour tout{' '}
          <InlineMath>t</InlineMath> — une propriété indispensable pour modéliser une action ou
          une devise.
        </p>
      </div>

      {/* ── Lien quiz ── */}
      <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-gray-700">
        Le quiz du Module 1 est disponible — <a href="/quiz/module-1" className="text-blue-600 hover:underline font-medium">S&apos;entraîner →</a>
      </div>

      {/* ── Navigation Précédent / Suivant ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-300">
        <a href="/cours/module-1-calcul-stochastique/mouvement-brownien" className="text-blue-600 hover:underline text-sm">
          ← Le Mouvement Brownien
        </a>
        <a href="/cours/module-1-calcul-stochastique/girsanov-risque-neutre" className="text-blue-600 hover:underline text-sm">
          Girsanov &amp; Risque-Neutre →
        </a>
      </div>

    </article>
  );
}
