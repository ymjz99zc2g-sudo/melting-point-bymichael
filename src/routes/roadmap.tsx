import { createFileRoute, Link } from '@tanstack/react-router'
import { ROADMAP } from '../data/gameData'

export const Route = createFileRoute('/roadmap')({
  component: RoadmapPage,
})

function RoadmapPage() {
  const icons = { done: '✅', building: '🔨', planned: '🗓️' }
  const labels = { done: 'COMPLETE', building: 'IN PROGRESS', planned: 'PLANNED' }
  const colors = { done: '#34d399', building: '#f59e0b', planned: 'rgba(255,255,255,0.3)' }

  return (
    <div className="mpc-page">
      <div className="mpc-page-hero">
        <h1 className="mpc-title">FUTURE ROADMAP</h1>
        <p className="mpc-subtitle">
          Melting Point Chronicles is actively being built. Here's where we're going.
        </p>
        <div style={{
          display: 'inline-flex', gap: '8px', alignItems: 'center', marginTop: '16px',
          background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
          padding: '8px 16px', borderRadius: '20px',
          fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'var(--accent)',
        }}>
          🔨 Currently Building: Phase 2 — Full Web Game
        </div>
      </div>

      {/* Roadmap */}
      <div className="mpc-section-title">📍 DEVELOPMENT PHASES</div>
      <div className="roadmap-track" style={{ marginBottom: '40px' }}>
        {ROADMAP.map(phase => (
          <div key={phase.phase} className="roadmap-item">
            <div className={`roadmap-dot ${phase.status}`}>
              {icons[phase.status as keyof typeof icons]}
            </div>
            <div className="roadmap-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <div className="roadmap-phase">{phase.phase}</div>
                <span style={{
                  fontFamily: 'var(--font-title)', fontSize: '0.62rem',
                  color: colors[phase.status as keyof typeof colors],
                  background: `${colors[phase.status as keyof typeof colors]}22`,
                  padding: '2px 8px', borderRadius: '20px', letterSpacing: '1px',
                  border: `1px solid ${colors[phase.status as keyof typeof colors]}44`,
                }}>
                  {labels[phase.status as keyof typeof labels]}
                </span>
              </div>
              <div className="roadmap-title">{phase.title}</div>
              <div className="roadmap-items">
                {phase.items.map(item => (
                  <span key={item} className="roadmap-tag">
                    {phase.status === 'done' ? '✅ ' : phase.status === 'building' ? '🔨 ' : '⏳ '}
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feature wishlist */}
      <div className="mpc-section-title">💡 COMING FEATURES</div>
      <div className="mpc-card-grid" style={{ marginBottom: '32px' }}>
        {[
          { icon: '📱', title: 'Android App', desc: 'Native Android build with offline play. First mobile version targeting late 2024.' },
          { icon: '👥', title: 'Multiplayer Campus', desc: 'Walk around the campus with real other players. Roblox-style social experience.' },
          { icon: '🎵', title: 'Afrobeats Soundtrack', desc: 'Full Nigerian music soundtrack. Afrobeats in the cafeteria. Amapiano for rooftop scenes.' },
          { icon: '🌍', title: 'More NPCs', desc: 'Chidinma, Kelechi, Adaeze, Samuel, Emeka, and many more classmates entering the game.' },
          { icon: '⚔️', title: 'All Boss Phases', desc: 'Isi Owu Phase 2 (Exam Mode) and Phase 3 (WAEC Guardian Form) — full 3-phase boss battle.' },
          { icon: '🔮', title: 'Secret Basement', desc: 'Full underground area with Aura relics, hidden lore, and the truth about the school.' },
          { icon: '🏆', title: 'All 6 Endings', desc: 'Complete branching story. Your choices, skills, and reputation determine your fate.' },
          { icon: '🍎', title: 'iOS Version', desc: 'App Store release planned for Phase 4. Cross-platform progression.' },
        ].map(f => (
          <div key={f.title} className="mpc-card">
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{f.icon}</div>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: '0.82rem', color: 'var(--accent)', marginBottom: '6px', letterSpacing: '1px' }}>{f.title}</div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Request feature */}
      <div className="mpc-section-title">📣 SHARE YOUR IDEA</div>
      <div className="mpc-card" style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '16px' }}>
          Got a character idea? A location you want added? A pidgin phrase that should be in the game?
          <br />
          <strong style={{ color: 'var(--accent)' }}>Michael wants to hear it.</strong> This is a community game.
        </p>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          "If you're not in my game, please start existing so I'd add you" — Michael 🥴
        </div>
        <div style={{ marginTop: '20px' }}>
          <Link to="/credits" className="cta-btn cta-primary" style={{ fontSize: '0.82rem' }}>
            📬 Contact / Credits
          </Link>
        </div>
      </div>
    </div>
  )
}
