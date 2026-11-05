import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useGame } from '../store/gameStore'
import { CHARACTERS } from '../data/gameData'

export const Route = createFileRoute('/avatar')({
  component: AvatarPage,
})

function StatBar({ value, max = 10, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="hud-bar" style={{ marginTop: '2px' }}>
      <div
        className="hud-bar-fill"
        style={{ width: `${(value / max) * 100}%`, background: color, transition: 'width 0.5s' }}
      />
    </div>
  )
}

function AvatarPage() {
  const { state, setState, save } = useGame()
  const [selected, setSelected] = useState(state.selectedCharacter || 'michael')
  const [confirmed, setConfirmed] = useState(false)

  const char = CHARACTERS.find(c => c.id === selected) || CHARACTERS[0]

  const handleConfirm = () => {
    setState({ selectedCharacter: selected, playerName: char.name })
    save()
    setConfirmed(true)
    setTimeout(() => setConfirmed(false), 2000)
  }

  return (
    <div className="mpc-page">
      <div className="mpc-page-hero">
        <h1 className="mpc-title">CHOOSE YOUR AVATAR</h1>
        <p className="mpc-subtitle">
          Pick your protagonist. Every character has unique abilities, personal story arcs, and different possible endings.
        </p>
      </div>

      {/* SELECTED CHARACTER SHOWCASE */}
      <div style={{
        display: 'flex', gap: '24px', flexWrap: 'wrap',
        background: 'var(--bg-card)', border: '1px solid var(--border-glow)',
        borderRadius: '20px', padding: '24px', marginBottom: '32px',
        borderColor: char.accent,
        boxShadow: `0 0 30px ${char.accent}22`,
      }}>
        <div style={{ flex: '0 0 auto', width: '160px' }}>
          <img
            src={char.image}
            alt={char.name}
            style={{
              width: '160px', height: '220px', objectFit: 'cover', objectPosition: 'top',
              borderRadius: '16px', border: `2px solid ${char.accent}`,
              boxShadow: `0 0 20px ${char.accent}44`,
            }}
            loading="lazy"
          />
        </div>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '4px' }}>
            {char.isDefault ? '⭐ DEFAULT CHARACTER' : 'PLAYABLE CHARACTER'}
          </div>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.8rem', fontWeight: 900, color: char.accent, marginBottom: '4px' }}>
            {char.name}
          </h2>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            {char.title}
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '16px' }}>
            {char.description}
          </p>

          {/* Ability */}
          <div style={{
            background: `${char.accent}11`, border: `1px solid ${char.accent}44`,
            borderRadius: '10px', padding: '10px 14px', marginBottom: '14px',
          }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '0.82rem', color: char.accent }}>
              ✨ {char.ability}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '3px' }}>{char.abilityDesc}</div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
            {Object.entries(char.stats).map(([key, val]) => (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '3px' }}>
                  <span style={{ textTransform: 'capitalize' }}>{key}</span>
                  <span style={{ color: char.accent }}>{val}/10</span>
                </div>
                <StatBar value={val} color={char.accent} />
              </div>
            ))}
          </div>

          {/* Outfit */}
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            👕 {char.outfit}
          </div>

          {/* Phrases */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            {char.phrases.slice(0, 2).map(p => (
              <span key={p} style={{
                fontSize: '0.72rem', background: 'rgba(255,255,255,0.05)',
                padding: '4px 10px', borderRadius: '20px', color: 'var(--text-muted)',
                fontFamily: 'var(--font-ui)', borderLeft: `2px solid ${char.accent}`,
              }}>"{p}"</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={handleConfirm}
              className="cta-btn cta-primary"
              disabled={confirmed}
              style={{ fontSize: '0.85rem' }}
            >
              {confirmed ? '✅ Avatar Saved!' : `▶ Play as ${char.name}`}
            </button>
            <Link to="/game" className="cta-btn cta-secondary" style={{ fontSize: '0.85rem' }}>
              🎮 Start Game
            </Link>
          </div>
        </div>
      </div>

      {/* CHARACTER GRID */}
      <div className="mpc-section-title">ALL CHARACTERS</div>
      <div className="mpc-card-grid">
        {CHARACTERS.map(c => (
          <div
            key={c.id}
            className={`avatar-card ${selected === c.id ? 'selected' : ''}`}
            onClick={() => setSelected(c.id)}
            style={{ borderColor: selected === c.id ? c.accent : undefined }}
          >
            <div className="avatar-img-wrap">
              <img src={c.image} alt={c.name} loading="lazy" />
            </div>
            <div className="avatar-info">
              <div className="avatar-name">{c.name}</div>
              <div className="avatar-title" style={{ color: c.accent }}>{c.title}</div>
              <div className="avatar-desc">{c.description}</div>
              <div className="avatar-ability">
                <div className="avatar-ability-name">✨ {c.ability}</div>
                <div className="avatar-ability-desc">{c.abilityDesc}</div>
              </div>
              <div className="avatar-stats">
                {Object.entries(c.stats).map(([k, v]) => (
                  <span key={k} className="avatar-stat">{k[0].toUpperCase()}: {v}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontSize: '0.82rem' }}>
        <p>More characters coming in future updates! 🔥</p>
        <p style={{ marginTop: '4px', fontSize: '0.75rem' }}>Chidinma, Kelechi, Adaeze, Samuel, Emeka — and more NPC classmates loading...</p>
      </div>
    </div>
  )
}
