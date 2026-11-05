import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useGame, getAuraLevel, getRepLabel } from '../store/gameStore'
import { CHARACTERS, LOCATIONS, NPCS } from '../data/gameData'

export const Route = createFileRoute('/game')({
  component: GameScreen,
})

interface Toast { id: number; msg: string }
interface DialogueState { npcId: string; lineIndex: number }

function GameScreen() {
  const { state, setState, gainAura, gainXP, gainRep, completeQuest, save } = useGame()
  const char = CHARACTERS.find(c => c.id === state.selectedCharacter) || CHARACTERS[0]
  const auraInfo = getAuraLevel(state.aura)
  const repInfo = getRepLabel(state.reputation)

  const [playerPos, setPlayerPos] = useState({ x: 50, y: 80 })
  const [activeLocation, setActiveLocation] = useState(state.activeLocation)
  const [dialogue, setDialogue] = useState<DialogueState | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [caption, setCaption] = useState('')
  const [activeQuest, setActiveQuest] = useState<string | null>(null)
  const captionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Joystick
  const joystickRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const joystickActive = useRef(false)
  const joystickOrigin = useRef({ x: 0, y: 0 })
  const moveInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const direction = useRef({ x: 0, y: 0 })

  const addToast = useCallback((msg: string) => {
    const id = Date.now()
    setToasts(prev => [...prev.slice(-3), { id, msg }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }, [])

  const showCaption = useCallback((text: string) => {
    setCaption(text)
    if (captionTimerRef.current) clearTimeout(captionTimerRef.current)
    captionTimerRef.current = setTimeout(() => setCaption(''), 3000)
  }, [])

  // Move player
  const movePlayer = useCallback(() => {
    if (Math.abs(direction.current.x) < 0.05 && Math.abs(direction.current.y) < 0.05) return
    setPlayerPos(prev => {
      const speed = 0.8
      const nx = Math.max(5, Math.min(95, prev.x + direction.current.x * speed))
      const ny = Math.max(5, Math.min(95, prev.y + direction.current.y * speed))
      return { x: nx, y: ny }
    })
  }, [])

  useEffect(() => {
    moveInterval.current = setInterval(movePlayer, 50)
    return () => { if (moveInterval.current) clearInterval(moveInterval.current) }
  }, [movePlayer])

  // Check if near a location
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const nearLoc = LOCATIONS.find(loc => {
      const dx = Math.abs(playerPos.x - loc.x)
      const dy = Math.abs(playerPos.y - loc.y)
      return dx < 8 && dy < 8 && state.unlockedAreas.includes(loc.id)
    })
    if (nearLoc && nearLoc.id !== activeLocation) {
      setActiveLocation(nearLoc.id)
      setState({ activeLocation: nearLoc.id })
      setCaption(`📍 ${nearLoc.name} — ${nearLoc.desc}`)
      setTimeout(() => setCaption(''), 3000)
    }
  }, [playerPos, state.unlockedAreas]) // intentional

  // Joystick handlers
  const handleJoystickStart = (clientX: number, clientY: number) => {
    if (!joystickRef.current) return
    joystickActive.current = true
    const rect = joystickRef.current.getBoundingClientRect()
    joystickOrigin.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
  }

  const handleJoystickMove = (clientX: number, clientY: number) => {
    if (!joystickActive.current || !thumbRef.current) return
    const dx = clientX - joystickOrigin.current.x
    const dy = clientY - joystickOrigin.current.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const maxDist = 28
    const clamp = Math.min(dist, maxDist)
    const angle = Math.atan2(dy, dx)
    const tx = Math.cos(angle) * clamp
    const ty = Math.sin(angle) * clamp
    thumbRef.current.style.transform = `translate(${tx}px, ${ty}px)`
    direction.current = {
      x: (clamp / maxDist) * Math.cos(angle),
      y: (clamp / maxDist) * Math.sin(angle),
    }
  }

  const handleJoystickEnd = () => {
    joystickActive.current = false
    direction.current = { x: 0, y: 0 }
    if (thumbRef.current) thumbRef.current.style.transform = 'translate(0, 0)'
  }

  // Keyboard movement
  useEffect(() => {
    const keys = new Set<string>()
    const onKey = (e: KeyboardEvent) => {
      if (e.type === 'keydown') keys.add(e.key.toLowerCase())
      else keys.delete(e.key.toLowerCase())
      const kx = (keys.has('d') || keys.has('arrowright') ? 1 : 0) - (keys.has('a') || keys.has('arrowleft') ? 1 : 0)
      const ky = (keys.has('s') || keys.has('arrowdown') ? 1 : 0) - (keys.has('w') || keys.has('arrowup') ? 1 : 0)
      direction.current = { x: kx, y: ky }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKey)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('keyup', onKey) }
  }, [])

  const handleInteract = () => {
    const nearNpc = NPCS.find(npc => {
      const loc = LOCATIONS.find(l => l.id === npc.location)
      if (!loc) return false
      const dx = Math.abs(playerPos.x - loc.x)
      const dy = Math.abs(playerPos.y - loc.y)
      return dx < 12 && dy < 12
    })
    if (nearNpc) {
      setDialogue({ npcId: nearNpc.id, lineIndex: 0 })
    } else {
      showCaption(char.phrases[Math.floor(Math.random() * char.phrases.length)])
    }
  }

  const handleAura = () => {
    gainAura(5)
    gainXP(10)
    showCaption(`⚡ Aura activated! +5 Aura — ${auraInfo.name}`)
    addToast(`⚡ Aura Walk activate! +5`)
  }

  const handleJump = () => {
    showCaption('🚀 Jump! Backdash!')
    addToast('🦘 "Backdash! You no fit catch me!" 😂')
  }

  const handleSprint = () => {
    showCaption(`💨 Sprint mode! "${char.phrases[0]}"`)
  }

  const handleNextDialogue = () => {
    if (!dialogue) return
    const npc = NPCS.find(n => n.id === dialogue.npcId)
    if (!npc) { setDialogue(null); return }
    const nextIdx = dialogue.lineIndex + 1
    if (nextIdx >= npc.dialogue.length) {
      // Quest unlock
      if (!state.completedQuests.includes(npc.id)) {
        setActiveQuest(npc.quest)
        addToast(`📋 New Quest: ${npc.quest}`)
        gainXP(npc.reward.xp)
        gainAura(npc.reward.aura)
        gainRep(5)
        completeQuest(npc.id)
        addToast(`✅ Quest done! +${npc.reward.xp} XP, +${npc.reward.aura} Aura`)
      }
      setDialogue(null)
    } else {
      setDialogue({ ...dialogue, lineIndex: nextIdx })
    }
  }

  // Redirect if no character selected
  if (!state.selectedCharacter) {
    return (
      <div className="game-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px', padding: '40px' }}>
        <div style={{ fontFamily: 'var(--font-title)', fontSize: '1.5rem', color: 'var(--accent)', textAlign: 'center' }}>
          Choose Your Avatar First!
        </div>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontFamily: 'var(--font-ui)' }}>
          You need to pick a character before you can start playing.
        </p>
        <Link to="/avatar" className="cta-btn cta-primary">👤 Pick Character</Link>
      </div>
    )
  }

  const currentNpc = dialogue ? NPCS.find(n => n.id === dialogue.npcId) : null
  const auraPercent = Math.min(100, (state.aura / 1500) * 100)
  const xpPercent = ((state.xp % 200) / 200) * 100
  const repPercent = state.reputation

  return (
    <div className="game-container">
      {/* Toast notifications */}
      <div className="toast-container">
        {toasts.map(t => <div key={t.id} className="toast">{t.msg}</div>)}
      </div>

      <div className="game-canvas-wrap">
        {/* World Map */}
        <div className="world-map">

          {/* Sky gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(180deg, rgba(255,140,50,0.08) 0%, transparent 40%, rgba(0,100,40,0.15) 100%)',
          }} />

          {/* Grid lines (Minecraft feel) */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }}>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Location nodes */}
          {LOCATIONS.map(loc => {
            const isUnlocked = state.unlockedAreas.includes(loc.id)
            const npc = NPCS.find(n => n.location === loc.id)
            return (
              <div
                key={loc.id}
                className="world-location"
                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                onClick={() => {
                  if (isUnlocked) {
                    setPlayerPos({ x: loc.x, y: loc.y })
                    showCaption(`📍 ${loc.name} — ${loc.desc}`)
                  } else {
                    addToast(`🔒 ${loc.name} locked! Keep exploring.`)
                  }
                }}
              >
                <div className={`location-bubble ${isUnlocked ? '' : 'locked'}`}>
                  {loc.emoji}
                  {npc && isUnlocked && (
                    <span style={{
                      position: 'absolute', top: -4, right: -4,
                      width: 14, height: 14, borderRadius: '50%',
                      background: '#34d399', border: '2px solid var(--bg-deep)',
                      animation: 'pulse-aura 1.5s infinite',
                    }} />
                  )}
                </div>
                <div className="location-name" style={{ color: isUnlocked ? 'var(--text-muted)' : 'rgba(255,255,255,0.2)' }}>
                  {loc.name}
                </div>
              </div>
            )
          })}

          {/* Player sprite */}
          <div
            className="player-sprite"
            style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%` }}
          >
            <div className="player-sprite-inner">
              {char.id === 'michael' ? '🧑' :
               char.id === 'ifeoma' ? '👧' :
               char.id === 'amara' ? '👩' :
               char.id === 'trevor' ? '👦' :
               char.id === 'david' ? '🏃' :
               char.id === 'mike' ? '🧒' : '🧒'}
            </div>
            <div className="player-name-tag">{char.name}</div>
          </div>

          {/* HUD Overlay */}
          <div className="game-hud">

            {/* TOP LEFT */}
            <div className="hud-topleft">
              <div className="hud-panel" style={{ minWidth: '160px' }}>
                <div className="hud-char-name" style={{ color: char.accent }}>{char.name}</div>
                <div className="hud-char-lvl">Level {state.level} · {auraInfo.name}</div>
                <div className="hud-bar-wrap">
                  <div className="hud-bar-label">
                    <span>⚡ Aura</span>
                    <span style={{ color: auraInfo.color }}>{state.aura}</span>
                  </div>
                  <div className="hud-bar">
                    <div className="hud-bar-fill aura-bar-fill" style={{ width: `${auraPercent}%`, boxShadow: auraInfo.glow }} />
                  </div>
                </div>
                <div className="hud-bar-wrap">
                  <div className="hud-bar-label">
                    <span>⭐ Rep</span>
                    <span style={{ color: repInfo.color }}>{repInfo.label}</span>
                  </div>
                  <div className="hud-bar">
                    <div className="hud-bar-fill rep-bar-fill" style={{ width: `${repPercent}%` }} />
                  </div>
                </div>
              </div>
              <div style={{
                fontFamily: 'var(--font-title)', fontSize: '0.65rem',
                color: auraInfo.color, padding: '4px 10px',
                background: 'rgba(0,0,0,0.7)',
                border: `1px solid ${auraInfo.color}`,
                borderRadius: '20px', letterSpacing: '1px',
                boxShadow: auraInfo.glow,
              }}>
                ⚡ {auraInfo.name.toUpperCase()}
              </div>
            </div>

            {/* TOP RIGHT */}
            <div className="hud-topright">
              {/* Minimap */}
              <div className="hud-minimap">
                <svg width="100%" height="100%" viewBox="0 0 100 80">
                  {LOCATIONS.map(loc => (
                    <circle
                      key={loc.id}
                      cx={loc.x}
                      cy={loc.y * 0.8}
                      r="3"
                      fill={state.unlockedAreas.includes(loc.id) ? 'rgba(139,92,246,0.8)' : 'rgba(255,255,255,0.15)'}
                    />
                  ))}
                  <circle
                    cx={playerPos.x}
                    cy={playerPos.y * 0.8}
                    r="4"
                    fill="#f59e0b"
                    style={{ filter: 'drop-shadow(0 0 4px #f59e0b)' }}
                  />
                </svg>
              </div>
              {/* Quest tracker */}
              {activeQuest && (
                <div className="hud-panel hud-quest">
                  <div className="hud-quest-title">📋 ACTIVE QUEST</div>
                  <div className="hud-quest-text">{activeQuest}</div>
                </div>
              )}
            </div>

            {/* BOTTOM CENTER — XP bar + caption */}
            <div className="hud-bottomcenter" style={{ width: '220px', textAlign: 'center' }}>
              {caption && <div className="hud-caption">{caption}</div>}
              <div style={{
                background: 'rgba(15,10,30,0.8)', borderRadius: '20px', padding: '6px 14px',
                marginTop: '8px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '3px' }}>
                  <span>XP</span>
                  <span>{state.xp} / {state.level * 200}</span>
                </div>
                <div className="hud-bar">
                  <div className="hud-bar-fill xp-bar-fill" style={{ width: `${xpPercent}%` }} />
                </div>
              </div>
            </div>

            {/* BOTTOM LEFT — Joystick */}
            <div className="hud-bottomleft">
              <div className="joystick-container" ref={joystickRef}
                onTouchStart={e => { e.preventDefault(); const t = e.touches[0]; handleJoystickStart(t.clientX, t.clientY) }}
                onTouchMove={e => { e.preventDefault(); const t = e.touches[0]; handleJoystickMove(t.clientX, t.clientY) }}
                onTouchEnd={handleJoystickEnd}
                onMouseDown={e => handleJoystickStart(e.clientX, e.clientY)}
                onMouseMove={e => { if (joystickActive.current) handleJoystickMove(e.clientX, e.clientY) }}
                onMouseUp={handleJoystickEnd}
                onMouseLeave={handleJoystickEnd}
              >
                <div className="joystick-base">
                  <div className="joystick-thumb" ref={thumbRef} />
                </div>
              </div>
            </div>

            {/* BOTTOM RIGHT — Action buttons */}
            <div className="hud-bottomright">
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="action-btn btn-interact" onClick={handleInteract} title="Interact [E]">A</button>
                <button className="action-btn btn-jump" onClick={handleJump} title="Jump">↑</button>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="action-btn btn-aura" onClick={handleAura} title="Aura [F]">⚡</button>
                <button className="action-btn btn-sprint" onClick={handleSprint} title="Sprint">▶▶</button>
              </div>
              <button
                onClick={() => { save(); addToast('💾 Game saved! We move!') }}
                style={{
                  background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)',
                  color: 'var(--text-muted)', padding: '6px 12px', borderRadius: '8px',
                  fontFamily: 'var(--font-ui)', fontSize: '0.7rem', cursor: 'pointer',
                  letterSpacing: '1px',
                }}
              >💾 SAVE</button>
            </div>

          </div>

          {/* DIALOGUE BOX */}
          {currentNpc && (
            <div className="dialogue-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <img
                  src={currentNpc.image}
                  alt={currentNpc.name}
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '2px solid var(--accent2)' }}
                />
                <div className="dialogue-speaker">{currentNpc.name}</div>
              </div>
              <div className="dialogue-text">
                {currentNpc.dialogue[dialogue!.lineIndex]}
              </div>
              <div className="dialogue-next">
                <button className="dialogue-btn" onClick={handleNextDialogue}>
                  {dialogue!.lineIndex < currentNpc.dialogue.length - 1 ? 'Next ▶' : 'Got it! ✓'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Bottom info bar */}
      <div style={{
        background: 'rgba(15,10,30,0.95)', borderTop: '1px solid var(--border-glow)',
        padding: '6px 16px', display: 'flex', gap: '16px', alignItems: 'center',
        flexWrap: 'wrap', fontFamily: 'var(--font-ui)', fontSize: '0.72rem', color: 'var(--text-muted)',
      }}>
        <span>📍 {LOCATIONS.find(l => l.id === activeLocation)?.name || 'School Gate'}</span>
        <span>⚡ {state.aura} Aura</span>
        <span>⭐ {state.xp} XP</span>
        <span>🎯 Ch.{state.activeChapter}</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
          <span>WASD/Arrow: Move</span>
          <span>A: Interact</span>
          <span>⚡: Aura</span>
        </span>
      </div>
    </div>
  )
}
