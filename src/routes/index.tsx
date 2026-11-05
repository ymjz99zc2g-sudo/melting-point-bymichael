import { Link, createFileRoute } from '@tanstack/react-router'
import { useGame } from '../store/gameStore'
import { MICHAEL_REAL, COVER_POSTER } from '../data/gameData'
import { CHARACTERS, CHAPTERS, ENDINGS } from '../data/gameData'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const { state } = useGame()

  return (
    <>
      {/* HERO */}
      <section className="landing-hero">
        <div className="landing-badge">⚡ VERSION 4.2 — NIGERIAN SCHOOL RPG</div>

        <h1 className="mpc-title">MELTING POINT<br />CHRONICLES</h1>
        <p className="mpc-subtitle" style={{ fontFamily: 'var(--font-ui)', marginBottom: '20px' }}>
          Anime vibes · Roblox freedom · Minecraft exploration · Nigerian school life
        </p>

        <div className="landing-poster">
          <img src={COVER_POSTER} alt="Melting Point Chronicles Cover" loading="lazy" />
        </div>

        <div className="pidgin-banner">
          <p>🎮 "Na school life we dey play, but the aura dey real!" ⚡</p>
          <span>Pick your character. Explore the campus. Discover the secrets. Beat Isi Owu.</span>
        </div>

        <div className="landing-stats">
          {[
            { num: '7', label: 'PLAYABLE CHARS' },
            { num: '14', label: 'LOCATIONS' },
            { num: '8', label: 'CHAPTERS' },
            { num: '6', label: 'ENDINGS' },
          ].map(s => (
            <div className="landing-stat" key={s.label}>
              <span className="landing-stat-num">{s.num}</span>
              <span className="landing-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="landing-cta-row">
          <Link to="/avatar" className="cta-btn cta-primary">
            👤 Choose Character
          </Link>
          <Link to="/game" className="cta-btn cta-secondary">
            🎮 Play Now
          </Link>
          <Link to="/gallery" className="cta-btn cta-secondary">
            🖼️ Gallery
          </Link>
        </div>
      </section>

      {/* ABOUT THE GAME */}
      <section className="mpc-page" style={{ paddingTop: '0' }}>

        <div className="mpc-section-title">🎮 ABOUT THE GAME</div>
        <div className="mpc-card" style={{ marginBottom: '32px' }}>
          <p style={{ fontFamily: 'var(--font-body)', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '16px' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Melting Point Chronicles</strong> is a story-driven school adventure RPG
            set in a Nigerian secondary school in PH. You navigate campus life, friendships, exams, and a mysterious force known as <strong className="text-accent">Aura</strong>.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', lineHeight: '1.8', color: 'var(--text-muted)' }}>
            Think: <strong className="text-accent">Roblox</strong> social freedom + <strong style={{ color: '#8b5cf6' }}>Minecraft</strong> exploration +
            <strong style={{ color: '#ec4899' }}> anime emotion</strong> + real Nigerian school drama. The game mixes comedy, mystery, friendship, exams, and boss battles.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
            {['Open World RPG', 'Nigerian PH Setting', 'Anime Style', 'Pidgin Dialogue', 'Boss Battles', 'Multiple Endings', 'Aura System', 'Mobile-First'].map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>

        {/* CHARACTER PREVIEW */}
        <div className="mpc-section-title">👥 MAIN CAST</div>
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '32px', scrollbarWidth: 'none' }}>
          {CHARACTERS.map(c => (
            <div key={c.id} style={{
              flexShrink: 0, width: '140px',
              background: 'var(--bg-card)', border: '1px solid var(--border-glow)',
              borderRadius: '16px', overflow: 'hidden',
              textAlign: 'center',
            }}>
              <div style={{ height: '160px', overflow: 'hidden' }}>
                <img src={c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} loading="lazy" />
              </div>
              <div style={{ padding: '10px 8px' }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{c.name}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: 'var(--accent)', marginTop: '2px' }}>{c.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* GAMEPLAY LOOP */}
        <div className="mpc-section-title">🔄 GAMEPLAY LOOP</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '32px' }}>
          {['🚶 Explore', '→', '💬 Talk to NPCs', '→', '📋 Quests', '→', '⚡ Gain Aura', '→', '🔓 Unlock Areas', '→', '🔮 Discover Lore', '→', '⚔️ Boss Fights'].map((item, i) => (
            item === '→' ? (
              <span key={i} style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>→</span>
            ) : (
              <span key={i} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-glow)',
                padding: '8px 14px', borderRadius: '10px',
                fontFamily: 'var(--font-ui)', fontSize: '0.85rem', fontWeight: 600,
                color: 'var(--text-primary)',
              }}>{item}</span>
            )
          ))}
        </div>

        {/* CHAPTERS */}
        <div className="mpc-section-title">📖 STORY CHAPTERS</div>
        <div className="chapter-list" style={{ marginBottom: '32px' }}>
          {CHAPTERS.map(ch => (
            <div key={ch.num} className={`chapter-item ${ch.status === 'active' ? 'chapter-active' : ''}`}>
              <div className="chapter-num">CH{ch.num}</div>
              <div className="chapter-info">
                <div className="chapter-title">{ch.title}</div>
                <div className="chapter-desc">{ch.desc}</div>
              </div>
              <span className={`chapter-badge ${ch.status === 'active' ? 'badge-active' : 'badge-locked'}`}>
                {ch.status === 'active' ? '▶ ACTIVE' : '🔒'}
              </span>
            </div>
          ))}
        </div>

        {/* ENDINGS */}
        <div className="mpc-section-title">🏁 MULTIPLE ENDINGS</div>
        <div className="endings-grid" style={{ marginBottom: '32px' }}>
          {ENDINGS.map(e => (
            <div key={e.id} className="ending-card">
              <div className="ending-icon">{e.icon}</div>
              <div className="ending-title">{e.title}</div>
              <div className="ending-req">{e.req}</div>
            </div>
          ))}
        </div>

        {/* CREATOR SECTION */}
        <div className="mpc-section-title">👨‍💻 MADE BY MICHAEL</div>
        <div className="creator-section">
          {state.tutorialBeaten ? (
            <div>
              <img src={MICHAEL_REAL} alt="Michael — Creator" className="creator-img" />
              <div className="creator-name">Michael</div>
              <p className="creator-msg">
                This game was made by Michael, also a student like you — we literally went to same school bruv 😂
                so I made this game but am still developing it tho, just trying my best so it's what I decided to do.
                Like I had this stupid idea of all of you, so if you're not in my game please start existing so I'd add you, so check it out 🥴
              </p>
            </div>
          ) : (
            <div className="creator-locked">
              <div className="creator-lock-icon">🔒</div>
              <div className="creator-lock-text">Creator info locked</div>
              <div className="creator-lock-hint">Beat the tutorial level to unlock the creator's message and real photo</div>
              <Link to="/game" className="btn-primary" style={{ marginTop: '12px', display: 'inline-block', textDecoration: 'none' }}>
                ▶ Play & Unlock
              </Link>
            </div>
          )}
        </div>

        {/* PIDGIN PHRASES */}
        <div className="mpc-section-title" style={{ marginTop: '32px' }}>🗣️ PIDGIN PHRASE BANK</div>
        <div className="mpc-card-grid">
          {[
            { char: 'Michael', color: '#f59e0b', phrases: ['I dey waka small', 'Aura don finish o!', 'Backdash! You no fit catch me!', 'I be Aura King', 'We move!'] },
            { char: 'Ifeoma', color: '#ec4899', phrases: ['Wetin dey happen?', 'Make we race!', 'I be Ifeoma!'] },
            { char: 'Amara', color: '#8b5cf6', phrases: ['School get secret wey nobody know', '2am for library…', 'Some things better make you no know'] },
            { char: 'Isi Owu', color: '#ef4444', phrases: ['MICHAEL! WHERE YOUR ASSIGNMENT?!', 'YOU NO FIT RUN!', 'WAEC Guardian form activate!'] },
          ].map(item => (
            <div key={item.char} className="mpc-card">
              <div style={{ fontFamily: 'var(--font-title)', fontSize: '0.85rem', color: item.color, marginBottom: '10px', letterSpacing: '1px' }}>{item.char}</div>
              {item.phrases.map(p => (
                <div key={p} style={{
                  fontFamily: 'var(--font-ui)', fontSize: '0.82rem', color: 'var(--text-muted)',
                  padding: '6px 10px', background: 'rgba(255,255,255,0.03)',
                  borderRadius: '6px', marginBottom: '6px',
                  borderLeft: `2px solid ${item.color}`,
                }}>"{p}"</div>
              ))}
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div className="mpc-title" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', marginBottom: '16px' }}>
            Ready to Join Melting Point? ⚡
          </div>
          <div className="landing-cta-row" style={{ justifyContent: 'center' }}>
            <Link to="/avatar" className="cta-btn cta-primary">Choose Your Avatar →</Link>
            <Link to="/roadmap" className="cta-btn cta-secondary">📍 See Roadmap</Link>
          </div>
        </div>

      </section>
    </>
  )
}
