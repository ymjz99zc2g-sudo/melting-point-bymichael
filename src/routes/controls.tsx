import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/controls')({
  component: ControlsPage,
})

const MOBILE_CONTROLS = [
  { key: '🕹️ Left Joystick', desc: 'Move your character around the campus' },
  { key: '🅰 A Button', desc: 'Interact with NPCs, pick up items, enter buildings' },
  { key: '⬆️ Jump', desc: 'Jump over obstacles and reach higher platforms' },
  { key: '⚡ Aura', desc: 'Activate your Aura for a power boost (costs Aura points)' },
  { key: '▶▶ Sprint', desc: 'Move faster! Uses energy. Great for escaping Isi Owu.' },
  { key: '💾 Save', desc: 'Manually save your progress (auto-saves every 10s too)' },
]

const KEYBOARD_CONTROLS = [
  { key: 'WASD / Arrows', desc: 'Move character in all directions' },
  { key: 'E / A Button', desc: 'Interact with NPCs and objects nearby' },
  { key: 'F', desc: 'Activate Aura Walk — your signature power move' },
  { key: 'Space', desc: 'Jump / dodge' },
  { key: 'Shift', desc: 'Sprint (hold for speed boost)' },
  { key: 'M', desc: 'Open minimap (full view)' },
  { key: 'I', desc: 'Open inventory' },
  { key: 'Q', desc: 'Open quest tracker' },
  { key: 'Esc / P', desc: 'Pause menu / settings' },
]

const SYSTEMS = [
  {
    title: '⚡ Aura System',
    items: [
      { key: 'Dormant (0-99)', desc: 'Starting state. Normal movement.' },
      { key: 'Rising (100-249)', desc: 'Blue glow. +10% speed.' },
      { key: 'Focused (250-499)', desc: 'Purple aura. Special attacks unlock.' },
      { key: 'Elite (500-899)', desc: 'Golden eyes. Boss weaknesses revealed.' },
      { key: 'Legendary (900-1499)', desc: 'Red aura. All areas unlock.' },
      { key: 'Aura King (1500+)', desc: 'Max power. Secret ending unlocked.' },
    ],
  },
  {
    title: '⭐ Reputation',
    items: [
      { key: 'Legend (80-100)', desc: 'Everyone respects you. Best dialogues and quests.' },
      { key: 'Good (60-79)', desc: 'NPCs are friendly and helpful.' },
      { key: 'Neutral (40-59)', desc: 'Standard interactions.' },
      { key: 'Trouble Boy (20-39)', desc: 'Security watches you. Some areas restricted.' },
      { key: 'Danger (0-19)', desc: 'Isi Owu actively hunts you. Chaos Mode unlocks.' },
    ],
  },
  {
    title: '📚 Skills',
    items: [
      { key: 'Academics', desc: 'Improves exam performance. Needed for Top Student ending.' },
      { key: 'Sports', desc: 'Improves athletics and Football matches.' },
      { key: 'Technology', desc: 'Unlocks computer lab puzzles and hacking.' },
      { key: 'Leadership', desc: 'Boosts reputation gains and NPC loyalty.' },
    ],
  },
]

const MINI_GAMES = [
  { name: 'Exam Survival', emoji: '📝', desc: 'Answer questions fast before time runs out. Isi Owu is watching.' },
  { name: 'Football Match', emoji: '⚽', desc: '1v1 or team match on the field. Win for rep and XP.' },
  { name: 'Coding Challenge', emoji: '💻', desc: 'Debug Trevor\'s code in the computer lab.' },
  { name: 'Cafeteria Rush', emoji: '🍲', desc: 'Get your food before the queue closes. Speed challenge.' },
  { name: 'Rooftop Parkour', emoji: '🌅', desc: 'Jump across rooftop obstacles. Unlocks sunset story scenes.' },
  { name: 'Notebook Hunt', emoji: '📓', desc: 'Find your missing notebook before class starts.' },
  { name: 'Quiz Battles', emoji: '🧠', desc: 'Quiz duel with other students. Use your skills wisely.' },
]

function ControlsPage() {
  return (
    <div className="mpc-page">
      <div className="mpc-page-hero">
        <h1 className="mpc-title">HOW TO PLAY</h1>
        <p className="mpc-subtitle">Everything you need to know to survive Melting Point College.</p>
      </div>

      {/* Quick Start */}
      <div className="mpc-section-title">🚀 QUICK START</div>
      <div className="mpc-card" style={{ marginBottom: '32px' }}>
        <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            'Go to Characters and pick your avatar',
            'Hit Play to enter the campus world',
            'Use the joystick (mobile) or WASD (keyboard) to move around',
            'Walk near glowing NPCs and tap A to start dialogue',
            'Complete quests to earn XP, Aura, and reputation',
            'Unlock new areas as your Aura level rises',
            'Face Isi Owu in the final boss battle',
          ].map((step, i) => (
            <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--accent)', marginRight: '8px' }}>{i + 1}.</strong>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile + Keyboard */}
      <div className="mpc-section-title">🕹️ CONTROLS</div>
      <div className="controls-grid" style={{ marginBottom: '32px' }}>
        <div className="control-card">
          <h3>📱 MOBILE / TOUCH</h3>
          {MOBILE_CONTROLS.map(c => (
            <div key={c.key} className="control-item">
              <span className="control-key">{c.key}</span>
              <span className="control-desc">{c.desc}</span>
            </div>
          ))}
        </div>
        <div className="control-card">
          <h3>⌨️ KEYBOARD</h3>
          {KEYBOARD_CONTROLS.map(c => (
            <div key={c.key} className="control-item">
              <span className="control-key">{c.key}</span>
              <span className="control-desc">{c.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Game Systems */}
      <div className="mpc-section-title">📊 GAME SYSTEMS</div>
      <div className="controls-grid" style={{ marginBottom: '32px' }}>
        {SYSTEMS.map(sys => (
          <div key={sys.title} className="control-card">
            <h3>{sys.title}</h3>
            {sys.items.map(item => (
              <div key={item.key} className="control-item">
                <span className="control-key" style={{ minWidth: 'unset', fontSize: '0.68rem' }}>{item.key}</span>
                <span className="control-desc">{item.desc}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mini-games */}
      <div className="mpc-section-title">🎯 MINI-GAMES</div>
      <div className="mpc-card-grid" style={{ marginBottom: '32px' }}>
        {MINI_GAMES.map(mg => (
          <div key={mg.name} className="mpc-card">
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{mg.emoji}</div>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: '0.82rem', color: 'var(--accent)', marginBottom: '6px', letterSpacing: '1px' }}>{mg.name}</div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{mg.desc}</p>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="mpc-section-title">💡 PRO TIPS</div>
      <div className="mpc-card">
        {[
          '⚡ Activate Aura before talking to Isi Owu — it might just scare him off',
          '🍲 Eat at the cafeteria to restore energy before boss battles',
          '📚 Visit the library with Amara for hidden lore and secret passage clues',
          '💻 Trevor\'s coding challenges are easier if your Technology skill is high',
          '🏃 High Sports skill makes Football events much easier to win',
          '🔒 The Secret Basement only opens after Chapter 5 — Amara knows the way',
          '💾 Save often — Isi Owu\'s surprise tests can drain your progress fast',
        ].map((tip, i) => (
          <div key={i} style={{
            padding: '10px 0', borderBottom: i < 6 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6,
          }}>
            {tip}
          </div>
        ))}
      </div>
    </div>
  )
}
