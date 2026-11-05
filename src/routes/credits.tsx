import { createFileRoute } from '@tanstack/react-router'
import { CHARACTERS, COVER_POSTER, ISI_OWU_IMG, MICHAEL_REAL } from '../data/gameData'
import { useGame } from '../store/gameStore'

export const Route = createFileRoute('/credits')({
  component: CreditsPage,
})

const FULL_CAST = [
  ...CHARACTERS.map(c => ({ name: c.name, role: c.title, img: c.image, desc: c.description })),
  { name: 'Isi Owu', role: 'Final Boss / Strict Teacher', img: ISI_OWU_IMG, desc: 'The feared teacher with 3 boss phases. WAEC Guardian form activate!' },
  { name: 'Chidinma', role: 'Top Student NPC', img: '', desc: 'Academic champion. Provides exam challenges and study quests. Coming soon.' },
  { name: 'Kelechi', role: 'The Sleeper NPC', img: '', desc: 'Always sleeping in class. Quest: Wake him before Isi Owu arrives!' },
  { name: 'Adaeze', role: 'School Gossip NPC', img: '', desc: 'School gossip specialist. Provides rumors and side quest leads.' },
  { name: 'Samuel', role: 'Transfer Student NPC', img: '', desc: 'New transfer student. Unlocks special side stories.' },
  { name: 'Emeka', role: 'Class Clown NPC', img: '', desc: 'Comedy events master. Lightens the mood in heavy story moments.' },
]

function CreditsPage() {
  const { state } = useGame()

  return (
    <div className="mpc-page">
      <div className="mpc-page-hero">
        <h1 className="mpc-title">CREDITS & ABOUT</h1>
        <p className="mpc-subtitle">The full cast, crew, and story behind Melting Point Chronicles.</p>
      </div>

      {/* Cover */}
      <img src={COVER_POSTER} alt="MPC Cover" className="credits-hero-img" />

      {/* Creator */}
      <div className="mpc-section-title">👨‍💻 CREATOR</div>
      <div className="mpc-card" style={{ marginBottom: '32px', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        {state.tutorialBeaten ? (
          <img src={MICHAEL_REAL} alt="Michael" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent)', boxShadow: '0 0 20px rgba(245,158,11,0.4)' }} />
        ) : (
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '2px solid var(--border-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🔒</div>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem', color: 'var(--accent)', marginBottom: '4px' }}>Michael</div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Game Designer · Developer · Student</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            {state.tutorialBeaten
              ? 'This game was made by Michael, also a student like you — we literally went to same school bruv 😂 so I made this game but am still developing it tho, just trying my best so it\'s what I decided to do. Like I had this stupid idea of all of you, so if you\'re not in my game please start existing so I\'d add you, so check it out 🥴'
              : '🔒 Beat the tutorial to unlock the creator\'s message and real photo!'
            }
          </p>
        </div>
      </div>

      {/* Full Cast */}
      <div className="mpc-section-title">🎭 FULL CAST</div>
      <div className="credits-cast" style={{ marginBottom: '32px' }}>
        {FULL_CAST.map(c => (
          <div key={c.name} className="credits-char">
            {c.img ? (
              <img src={c.img} alt={c.name} loading="lazy" />
            ) : (
              <div style={{ width: '100%', aspectRatio: '2/3', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                🚧
              </div>
            )}
            <div className="credits-char-name">{c.name}</div>
            <div className="credits-char-role">{c.role}</div>
          </div>
        ))}
      </div>

      {/* Game Info */}
      <div className="mpc-section-title">ℹ️ GAME INFO</div>
      <div className="mpc-card-grid" style={{ marginBottom: '32px' }}>
        {[
          { label: 'Title', val: 'Melting Point Chronicles' },
          { label: 'Version', val: '4.2 (Web Prototype)' },
          { label: 'Genre', val: 'Open World School RPG' },
          { label: 'Setting', val: 'Nigerian Secondary School, PH' },
          { label: 'Platform', val: 'Web · Android (coming)' },
          { label: 'Visual Style', val: 'Hybrid Anime + Stylized 3D' },
          { label: 'Language', val: 'English + Nigerian Pidgin' },
          { label: 'Status', val: 'In Development 🔥' },
        ].map(item => (
          <div key={item.label} className="mpc-card" style={{ padding: '14px 16px' }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px', letterSpacing: '1px' }}>{item.label}</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{item.val}</div>
          </div>
        ))}
      </div>

      {/* Thanks */}
      <div className="mpc-section-title">🙏 SPECIAL THANKS</div>
      <div className="mpc-card">
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
          To every student who's ever survived a surprise test from a strict teacher.
          To everyone who ever felt the aura in the school hallways.
          To PH school life for the inspiration.
          And to anyone not yet in the game — <strong style={{ color: 'var(--accent)' }}>please start existing so I can add you</strong> 🥴
        </p>
        <div style={{ marginTop: '16px', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Made with ❤️ + ⚡ Aura + 😂 Pidgin energy
        </div>
      </div>
    </div>
  )
}
