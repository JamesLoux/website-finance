'use client'

export default function CoursPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-semibold text-gray-900 mb-3">Cours</h1>
      <p className="text-gray-600 mb-8">
        Un parcours progressif en 8 modules, du calcul stochastique aux produits exotiques.
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
        probabilités — une solide base en maths est indispensable pour en tirer
        pleinement parti.
      </div>

      {/* Chemin serpent */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        {/* Rangée 1 → 3 (gauche à droite) */}
        <Row>
          <Node num="1" title="Calcul stochastique" subs={['Mouvement brownien', 'Lemme d\'Itô', 'Girsanov & risque-neutre']} href="/cours/module-1-calcul-stochastique/mouvement-brownien" />
          <HConn />
          <Node num="2" title="Pricing" subs={['Équation de Black-Scholes', 'Formule de Black-Scholes', 'Modèles de diffusion', 'Monte-Carlo']} href="/cours/module-2-pricing/equation-black-scholes" />
          <HConn />
          <Node num="3" title="The Greeks" subs={['L\'essentiel des Greeks', 'Quelques démonstrations', 'Arbitrage Theta-Gamma']} href="/cours/module-3-grecques/grecques-premier-ordre" />
        </Row>

        {/* Virage droite */}
        <VConn side="right" cols={3} />

        {/* Rangée 4 → 6 (droite à gauche) */}
        <Row reverse>
          <Node num="4" title="Taux & Crédit" subs={['Swaps & flux', 'Produits de courbe', 'Modèles de taux']} />
          <HConn />
          <Node num="5" title="Produits equity" subs={['Vanilles & combinaisons', 'Options exotiques', 'Produits structurés']} />
          <HConn />
          <Node num="6" title="Volatilité" subs={['Vol implicite & nappes', 'Vol stochastique', 'Variance Swap & VIX', 'Skew Delta']} href="/cours/module-6-volatilite/vol-implicite-nappes" />
        </Row>

        {/* Virage gauche */}
        <VConn side="left" cols={3} />

        {/* Rangée 7 → 8 (gauche à droite) */}
        <Row>
          <Node num="7" title="Quanto & FX" subs={['Options quanto', 'Options composites']} />
          <HConn />
          <Node num="8" title="Macro" subs={['Plomberie Fed', 'Gestion des réserves', 'Politique monétaire']} />
          {/* Fantômes pour aligner sur 3 colonnes */}
          <HConn invisible />
          <Node invisible />
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

function Node({ num, title, subs = [], href, invisible = false }) {
  const content = (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0 4px',
      visibility: invisible ? 'hidden' : 'visible',
    }}>
      <div style={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        border: '1.5px solid #378ADD',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 500,
        color: '#185FA5',
        cursor: href ? 'pointer' : 'default',
        flexShrink: 0,
        transition: href ? 'background 0.15s' : undefined,
      }}
        onMouseEnter={href ? e => e.currentTarget.style.backgroundColor = '#E6F1FB' : undefined}
        onMouseLeave={href ? e => e.currentTarget.style.backgroundColor = '#ffffff' : undefined}
      >
        {num}
      </div>
      <div style={{
        marginTop: 8,
        fontSize: 11,
        fontWeight: 500,
        color: '#111827',
        textAlign: 'center',
        lineHeight: 1.3,
        maxWidth: 90,
      }}>
        {title}
      </div>
      <div style={{ marginTop: 5, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        {subs.map((s, i) => (
          <div key={i} style={{
            fontSize: 10,
            color: '#9ca3af',
            textAlign: 'center',
            lineHeight: 1.3,
            maxWidth: 90,
          }}>
            {s}
          </div>
        ))}
      </div>
    </div>
  )

  if (href) {
    return <a href={href} style={{ flex: 1, textDecoration: 'none', display: 'flex' }}>{content}</a>
  }
  return content
}

function HConn({ invisible = false }) {
  return (
    <div style={{
      flex: 0,
      width: 24,
      height: 1.5,
      backgroundColor: invisible ? 'transparent' : '#d1d5db',
      alignSelf: 'auto',
      marginTop: 28,
      flexShrink: 0,
    }} />
  )
}

function VConn({ side, cols }) {
  const colWidth = `calc(100% / ${cols})`
  const offset = `calc(${colWidth} / 2 - 1px)`
  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: 36,
      justifyContent: side === 'right' ? 'flex-end' : 'flex-start',
      paddingRight: side === 'right' ? offset : 0,
      paddingLeft: side === 'left' ? offset : 0,
    }}>
      <div style={{ width: 1.5, backgroundColor: '#d1d5db' }} />
    </div>
  )
}
