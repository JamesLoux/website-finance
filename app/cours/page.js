'use client'

const CARD_W = 208
const CONN_W = 64
const ROW_W = CARD_W * 3 + CONN_W * 2  // 752

export default function CoursPage() {
  return (
    <>
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: -1,
      backgroundColor: '#ffffff',
      backgroundImage: [
        'linear-gradient(rgba(37,99,235,0.10) 1px, transparent 1px)',
        'linear-gradient(90deg, rgba(37,99,235,0.10) 1px, transparent 1px)',
        'linear-gradient(rgba(37,99,235,0.045) 1px, transparent 1px)',
        'linear-gradient(90deg, rgba(37,99,235,0.045) 1px, transparent 1px)',
      ].join(', '),
      backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
      pointerEvents: 'none',
    }} />
    <main className="max-w-4xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-semibold text-gray-900 mb-3">Cours</h1>
      <p className="text-gray-600 mb-8">
        Un parcours progressif en 12 modules qui suit un chemin narratif (plutôt qu&apos;une progression dans la difficulté).
      </p>

      {/* Disclaimer */}
      <div style={{
        borderLeft: '3px solid #378ADD',
        borderRadius: '0 8px 8px 0',
        borderTop: '0.5px solid #e5e7eb',
        borderRight: '0.5px solid #e5e7eb',
        borderBottom: '0.5px solid #e5e7eb',
        padding: '0.75rem 1rem',
        marginBottom: '3rem',
        fontSize: '13px',
        color: '#4b5563',
        lineHeight: '1.6',
        backgroundColor: '#f9fafb',
      }}>
        <strong style={{ color: '#111827', fontWeight: 500 }}>À noter :</strong> ces cours
        s&apos;adressent à un public de niveau Bac+5 / Master en mathématiques appliquées.
        Ils mobilisent le calcul stochastique, l&apos;analyse fonctionnelle et les
        probabilités. Une solide base en maths est indispensable pour en tirer
        pleinement parti.
      </div>

      {/* Chemin serpent */}
      <div style={{ display: 'flex', flexDirection: 'column', width: ROW_W, margin: '0 auto' }}>

        {/* Rangée 1 → 3 (gauche à droite) */}
        <Row>
          <Node num="1" title="Calcul stochastique" active subs={[
            { label: 'Mouvement brownien', href: '/cours/module-1-calcul-stochastique/mouvement-brownien' },
            { label: "Lemme d'Itô", href: '/cours/module-1-calcul-stochastique/lemme-ito' },
            { label: 'Girsanov & Risque-Neutre', href: '/cours/module-1-calcul-stochastique/girsanov-risque-neutre' },
          ]} />
          <HConn />
          <Node num="2" title="Pricing" active subs={[
            { label: 'Équation de Black-Scholes', href: '/cours/module-2-pricing/equation-black-scholes' },
            { label: 'Formule de Black-Scholes', href: '/cours/module-2-pricing/probabilites-d1-d2' },
            { label: 'Modèles de diffusion', href: '/cours/module-2-pricing/modeles-diffusion' },
            { label: 'Monte-Carlo', href: '/cours/module-2-pricing/monte-carlo' },
          ]} />
          <HConn />
          <Node num="3" title="The Greeks" active subs={[
            { label: "L'essentiel des Greeks", href: '/cours/module-3-grecques/grecques-premier-ordre' },
            { label: 'Quelques démonstrations', href: '/cours/module-3-grecques/grecques-second-ordre' },
            { label: 'Arbitrage Theta-Gamma', href: '/cours/module-3-grecques/arbitrage-theta-gamma' },
          ]} />
        </Row>

        {/* Virage droite */}
        <VConn side="right" />

        {/* Rangée 4 → 6 (droite à gauche) */}
        <Row reverse>
          <Node num="4" title="Fixed Income I" active subs={[
            { label: 'Obligations & Bases', href: '/cours/module-4-taux-credit/obligations-bases' },
            { label: 'Duration & Convexité', href: '/cours/module-4-taux-credit/duration-convexite' },
            { label: 'Fwd Rate Agreement', href: '/cours/module-4-taux-credit/fwd-rate-agreement' },
            { label: 'Interest Rate Swap', href: '/cours/module-4-taux-credit/interest-rate-swap' },
          ]} />
          <HConn reverse />
          <Node num="5" title="Fixed Income II" active subs={[
            { label: 'Cap & Floor', href: '/cours/module-5-fixed-income-2/cap-floor' },
            { label: 'Bond Options & Swaptions', href: '/cours/module-5-fixed-income-2/bond-options-swaptions' },
            { label: 'CMS', href: '/cours/module-5-fixed-income-2/cms' },
            { label: 'Convertible Bond', href: '/cours/module-5-fixed-income-2/convertible-bond' },
            { label: 'Range Accrual', href: '/cours/module-5-fixed-income-2/range-accrual' },
            { label: 'Modèle de taux', href: '/cours/module-5-fixed-income-2/modele-taux' },
          ]} />
          <HConn reverse />
          <Node num="6" title="Fixed Income III" active subs={[
            { label: 'FX Swap', href: '/cours/module-6-fixed-income-3/fx-swap' },
            { label: 'CDS', href: '/cours/module-6-fixed-income-3/cds' },
            { label: 'Inflation Swap', href: '/cours/module-6-fixed-income-3/inflation-swap' },
            { label: 'TRS', href: '/cours/module-6-fixed-income-3/trs' },
          ]} />
        </Row>

        {/* Virage gauche */}
        <VConn side="left" />

        {/* Rangée 7 → 9 (gauche à droite) */}
        <Row>
          <Node num="7" title="Equity I" subs={[
            { label: 'Delta-One et Cash' },
            { label: 'Options Vanilles' },
            { label: 'Stratégies Optionnelles' },
          ]} />
          <HConn />
          <Node num="8" title="Equity II" subs={[
            { label: 'Digitales & Barrières' },
            { label: 'Path-Dependence' },
          ]} />
          <HConn />
          <Node num="9" title="Equity III" subs={[
            { label: 'Capital Garanti & Participation' },
            { label: 'Yield Enhancement' },
            { label: 'Multi-Asset & Corrélation' },
          ]} />
        </Row>

        {/* Virage droite */}
        <VConn side="right" />

        {/* Rangée 10 → 12 (droite à gauche) */}
        <Row reverse>
          <Node num="10" title="Volatilité" active subs={[
            { label: 'Vol implicite & Nappes', href: '/cours/module-6-volatilite/vol-implicite-nappes' },
            { label: 'Vol stochastique', href: '/cours/module-6-volatilite/vol-stochastique' },
            { label: 'Variance Swap & VIX', href: '/cours/module-6-volatilite/variance-swap-vix' },
            { label: 'Skew Delta', href: '/cours/module-6-volatilite/skew-delta' },
          ]} />
          <HConn reverse />
          <Node num="11" title="Quanto & FX" active subs={[
            { label: 'Corrélation Indice & FX', href: '/cours/module-7-quanto-fx/correlation-fx' },
            { label: 'Options Quanto & Composite', href: '/cours/module-7-quanto-fx/options-quanto' },
          ]} />
          <HConn reverse />
          <Node num="12" title="Macro" active subs={[
            { label: 'Fonctionnement de la Fed', href: '/cours/module-8-macro/plomberie-fed' },
            { label: 'Politique monétaire', href: '/cours/module-8-macro/politique-monetaire' },
          ]} />
        </Row>

      </div>
    </main>
    </>
  )
}

/* ── Composants internes ── */

function Row({ children, reverse = false }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: reverse ? 'row-reverse' : 'row',
      alignItems: 'stretch',
    }}>
      {children}
    </div>
  )
}

function Node({ num, title, subs = [], active = false }) {
  const borderColor = active ? '#1d4ed8' : '#bfdbfe'
  const numColor    = active ? '#2563eb' : '#bfdbfe'
  const titleColor  = active ? '#111827' : '#9ca3af'
  const bgBottom    = active ? '#eff6ff' : '#f9fafb'
  const sepColor    = active ? '#bfdbfe' : '#e0eeff'

  return (
    <div style={{
      width: CARD_W,
      border: `${active ? 2 : 1.5}px solid ${borderColor}`,
      borderRadius: 12,
      backgroundColor: '#ffffff',
      overflow: 'hidden',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Partie haute : numéro + titre */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px' }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: numColor, flexShrink: 0, lineHeight: 1 }}>
          {num}
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: titleColor, lineHeight: 1.3 }}>
          {title}
        </span>
      </div>
      {/* Séparateur */}
      <div style={{ height: 1, backgroundColor: sepColor }} />
      {/* Partie basse : sous-pages */}
      <div style={{ backgroundColor: bgBottom, padding: '8px 14px', display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
        {subs.map((s, i) =>
          s.href ? (
            <a key={i} href={s.href} style={{ fontSize: 12, color: '#2563eb', textDecoration: 'none', lineHeight: 1.4 }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
            >
              {s.label}
            </a>
          ) : (
            <span key={i} style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.4 }}>{s.label}</span>
          )
        )}
      </div>
    </div>
  )
}

function HConn({ invisible = false, reverse = false }) {
  const ARROW = 8
  const color = '#9ca3af'
  const sw = 6
  const svgH = 20
  const cy = svgH / 2

  if (invisible) {
    return <div style={{ width: CONN_W, height: svgH, flexShrink: 0, alignSelf: 'flex-start', marginTop: 12 }} />
  }

  return (
    <svg
      width={CONN_W}
      height={svgH}
      viewBox={`0 0 ${CONN_W} ${svgH}`}
      style={{ flexShrink: 0, alignSelf: 'flex-start', marginTop: 12 }}
    >
      {reverse ? (
        <>
          <line x1={CONN_W} y1={cy} x2={ARROW + 1} y2={cy} stroke={color} strokeWidth={sw} />
          <polygon points={`0,${cy} ${ARROW},${cy - ARROW} ${ARROW},${cy + ARROW}`} fill={color} />
        </>
      ) : (
        <>
          <line x1={0} y1={cy} x2={CONN_W - ARROW - 1} y2={cy} stroke={color} strokeWidth={sw} />
          <polygon points={`${CONN_W},${cy} ${CONN_W - ARROW},${cy - ARROW} ${CONN_W - ARROW},${cy + ARROW}`} fill={color} />
        </>
      )}
    </svg>
  )
}

function VConn({ side }) {
  const isRight = side === 'right'
  const lineX = isRight ? ROW_W - CARD_W / 2 : CARD_W / 2
  const ARROW = 8
  const color = '#9ca3af'
  const sw = 6
  const svgH = 40

  return (
    <svg width={ROW_W} height={svgH} viewBox={`0 0 ${ROW_W} ${svgH}`}>
      <line x1={lineX} y1={0} x2={lineX} y2={svgH - ARROW} stroke={color} strokeWidth={sw} />
      <polygon
        points={`${lineX},${svgH} ${lineX - ARROW},${svgH - ARROW} ${lineX + ARROW},${svgH - ARROW}`}
        fill={color}
      />
    </svg>
  )
}
