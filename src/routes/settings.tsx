import { createFileRoute } from '@tanstack/react-router'
import { useGame } from '../store/gameStore'
import { useState } from 'react'
import { CHARACTERS } from '../data/gameData'

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
})

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button className={`toggle-btn ${value ? 'on' : 'off'}`} onClick={() => onChange(!value)}>
      <div className={`toggle-dot ${value ? 'on' : 'off'}`} />
    </button>
  )
}

function SettingsPage() {
  const { state, setState, resetGame, save } = useGame()
  const [saved, setSaved] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  const updateSetting = (key: string, val: unknown) => {
    setState({ settings: { ...state.settings, [key]: val } })
  }

  const handleSave = () => {
    save()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const char = CHARACTERS.find(c => c.id === state.selectedCharacter) || CHARACTERS[0]

  return (
    <div className="mpc-page">
      <div className="mpc-page-hero">
        <h1 className="mpc-title">SETTINGS</h1>
        <p className="mpc-subtitle">Customize your Melting Point Chronicles experience.</p>
      </div>

      {/* Player Info */}
      <div className="mpc-section-title">👤 PLAYER PROFILE</div>
      <div className="mpc-card" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          {state.selectedCharacter ? (
            <img
              src={char.image}
              alt={char.name}
              style={{ width: '70px', height: '90px', objectFit: 'cover', objectPosition: 'top', borderRadius: '12px', border: `2px solid ${char.accent}` }}
            />
          ) : (
            <div style={{ width: '70px', height: '90px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '2px solid var(--border-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
              👤
            </div>
          )}
          <div>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: '1rem', color: 'var(--accent)', marginBottom: '4px' }}>
              {state.selectedCharacter ? char.name : 'No character selected'}
            </div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Level {state.level} · {state.xp} XP total
            </div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              ⚡ {state.aura} Aura · ⭐ Rep: {state.reputation}%
            </div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              📋 {state.completedQuests.length} quests done · 🔓 {state.unlockedAreas.length} areas unlocked
            </div>
          </div>
        </div>
      </div>

      {/* Audio */}
      <div className="settings-section">
        <div className="mpc-section-title">🔊 AUDIO</div>
        <div className="mpc-card">
          <div className="settings-row">
            <div>
              <div className="settings-label">Sound Effects</div>
              <div className="settings-desc">UI sounds, step sounds, ability effects</div>
            </div>
            <Toggle value={state.settings.soundOn} onChange={v => updateSetting('soundOn', v)} />
          </div>
          <div className="settings-row">
            <div>
              <div className="settings-label">Background Music</div>
              <div className="settings-desc">Ambient campus soundtrack and battle music</div>
            </div>
            <Toggle value={state.settings.musicOn} onChange={v => updateSetting('musicOn', v)} />
          </div>
        </div>
      </div>

      {/* Graphics */}
      <div className="settings-section">
        <div className="mpc-section-title">🎨 GRAPHICS</div>
        <div className="mpc-card">
          <div className="settings-row">
            <div>
              <div className="settings-label">Quality</div>
              <div className="settings-desc">Affects animations and visual effects</div>
            </div>
            <select
              className="select-btn"
              value={state.settings.graphicsQuality}
              onChange={e => updateSetting('graphicsQuality', e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="ultra">Ultra</option>
            </select>
          </div>
          <div className="settings-row">
            <div>
              <div className="settings-label">Aura Glow Effects</div>
              <div className="settings-desc">Visual glow around high-aura characters</div>
            </div>
            <Toggle value={state.settings.graphicsQuality !== 'low'} onChange={v => updateSetting('graphicsQuality', v ? 'high' : 'low')} />
          </div>
        </div>
      </div>

      {/* Language */}
      <div className="settings-section">
        <div className="mpc-section-title">🗣️ LANGUAGE</div>
        <div className="mpc-card">
          <div className="settings-row">
            <div>
              <div className="settings-label">Dialogue Language</div>
              <div className="settings-desc">Controls how NPCs speak to you</div>
            </div>
            <select
              className="select-btn"
              value={state.settings.language}
              onChange={e => updateSetting('language', e.target.value)}
            >
              <option value="english">English Only</option>
              <option value="pidgin">Full Pidgin</option>
              <option value="mixed">Mix (Recommended)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save/Load */}
      <div className="settings-section">
        <div className="mpc-section-title">💾 SAVE & LOAD</div>
        <div className="mpc-card">
          <div className="settings-row">
            <div>
              <div className="settings-label">Auto-save</div>
              <div className="settings-desc">Game saves automatically every 10 seconds</div>
            </div>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: '#34d399' }}>✅ ON</span>
          </div>
          <div className="settings-row">
            <div>
              <div className="settings-label">Manual Save</div>
              <div className="settings-desc">Save your progress right now</div>
            </div>
            <button className="btn-primary" onClick={handleSave} style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
              {saved ? '✅ Saved!' : '💾 Save Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="settings-section">
        <div className="mpc-section-title" style={{ color: '#ef4444' }}>⚠️ DANGER ZONE</div>
        <div className="mpc-card" style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
          <div className="settings-row">
            <div>
              <div className="settings-label" style={{ color: '#f87171' }}>Reset All Progress</div>
              <div className="settings-desc">Delete all save data. This cannot be undone!</div>
            </div>
            {confirmReset ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="danger-btn"
                  onClick={() => { resetGame(); setConfirmReset(false) }}
                >
                  Confirm Reset
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-ui)' }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button className="danger-btn" onClick={() => setConfirmReset(true)}>
                🗑️ Reset Game
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Version info */}
      <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontSize: '0.75rem', padding: '20px 0' }}>
        <p>Melting Point Chronicles v4.2 (Web Prototype)</p>
        <p style={{ marginTop: '4px', opacity: 0.5 }}>Made by Michael · Still developing 🥴</p>
      </div>
    </div>
  )
}
