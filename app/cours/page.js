'use client'

const CARD_W = 208
const CONN_W = 64
const ROW_W = CARD_W * 3 + CONN_W * 2  // 752

export default function CoursPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-semibold text-gray-900 mb-3">Cours</h1>
      <p className="text-gray-600 mb-8">
        Un parcours progressif en 8 modules qui suit un chemin narratif (plutôt qu&apos;une progression dans la difficulté).
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
          <Node num="4" title="Taux & Crédit" subs={[
            { label: 'Swaps & Flux' },
            { label: 'Produits de courbe' },
            { label: 'Modèles de taux' },
          ]} />
          <HConn />
          <Node num="5" title="Produits equity" subs={[
            { label: 'Vanilles & Combinaisons' },
            { label: 'Options exotiques' },
            { label: 'Produits structurés' },
          ]} />
          <HConn />
          <Node num="6" title="Volatilité" active subs={[
            { label: 'Vol implicite & Nappes', href: '/cours/module-6-volatilite/vol-implicite-nappes' },
            { label: 'Vol stochastique', href: '/cours/module-6-volatilite/vol-stochastique' },
            { label: 'Variance Swap & VIX', href: '/cours/module-6-volatilite/variance-swap-vix' },
            { label: 'Skew Delta', href: '/cours/module-6-volatilite/skew-delta' },
          ]} />
        </Row>

        {/* Virage gauche */}
        <VConn side="left" />

        {/* Rangée 7 → 8 (gauche à droite) */}
        <Row>
          <Node num="7" title="Quanto & FX" active subs={[
            { label: 'Corrélation Indice & FX', href: '/cours/module-7-quanto-fx/correlation-fx' },
            { label: 'Options Quanto & Composite', href: '/cours/module-7-quanto-fx/options-quanto' },
          ]} />
          <HConn />
          <Node num="8" title="Macro" active subs={[
            { label: 'Fonctionnement de la Fed', href: '/cours/module-8-macro/plomberie-fed' },
            { label: 'Politique monétaire', href: '/cours/module-8-macro/politique-monetaire' },
          ]} />
          {/* Fantômes pour aligner sur 3 colonnes */}
          <HConn invisible />
          <div style={{ width: CARD_W, flexShrink: 0 }} />
        </Row>

      </div>
    </main>
  )
}

/* ── Composants internes ── */

function Row({ children, reverse = false }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: reverse ? 'row-reverse' : 'row',
      alignItems: 'flex-start',
    }}>
      {children}
    </div>
  )
}

function Node({ num, title, subs = [], active = false }) {
  const borderColor = active ? '#2563eb' : '#bfdbfe'
  const numColor    = active ? '#2563eb' : '#bfdbfe'
  const titleColor  = active ? '#111827' : '#9ca3af'
  const bgBottom    = active ? '#eff6ff' : '#f9fafb'
  const sepColor    = active ? '#bfdbfe' : '#e0eeff'

  return (
    <div style={{
      width: CARD_W,
      border: `1.5px solid ${borderColor}`,
      borderRadius: 12,
      backgroundColor: '#ffffff',
      overflow: 'hidden',
      flexShrink: 0,
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
      <div style={{ backgroundColor: bgBottom, padding: '8px 14px', display: 'flex', flexDirection: 'column', gap: 5 }}>
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

function HConn({ invisible = false }) {
  return (
    <div style={{
      width: CONN_W,
      height: 2,
      backgroundColor: invisible ? 'transparent' : '#d1d5db',
      flexShrink: 0,
      alignSelf: 'flex-start',
      marginTop: 22,
    }} />
  )
}

function VConn({ side }) {
  return (
    <div style={{
      display: 'flex',
      width: ROW_W,
      height: 32,
      justifyContent: side === 'right' ? 'flex-end' : 'flex-start',
      paddingRight: side === 'right' ? CARD_W / 2 - 1 : 0,
      paddingLeft:  side === 'left'  ? CARD_W / 2 - 1 : 0,
    }}>
      <div style={{ width: 2, backgroundColor: '#d1d5db' }} />
    </div>
  )
}
