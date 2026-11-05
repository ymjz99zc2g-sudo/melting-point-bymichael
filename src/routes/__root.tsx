import { HeadContent, Scripts, createRootRoute, Outlet, Link, useRouterState } from '@tanstack/react-router'
import { useState } from 'react';
import { GameProvider, useGame } from '../store/gameStore';
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
      { name: 'theme-color', content: '#0f0a1e' },
      { title: 'Melting Point Chronicles | School RPG' },
      { name: 'description', content: 'Nigerian school RPG — anime vibes, Roblox freedom, Minecraft exploration. Made by Michael.' },
    ],
  }),
  shellComponent: RootDocument,
})

function NavBar() {
  const { state } = useGame();
  const routerState = useRouterState();
  const path = routerState.location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/avatar', label: 'Characters', icon: '👤' },
    { to: '/game', label: '▶ Play', icon: '🎮' },
    { to: '/gallery', label: 'Gallery', icon: '🖼️' },
    { to: '/credits', label: 'Credits', icon: '🎬' },
    { to: '/controls', label: 'Controls', icon: '🕹️' },
    { to: '/settings', label: 'Settings', icon: '⚙️' },
    { to: '/roadmap', label: 'Roadmap', icon: '🗺️' },
  ];

  return (
    <nav className="mpc-nav">
      <div className="mpc-nav-inner">
        <Link to="/" className="mpc-logo">
          <span className="mpc-logo-aura">⚡</span>
          <span className="mpc-logo-text">MPC</span>
        </Link>

        <div className="mpc-nav-links">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} className={`mpc-nav-link${path === l.to ? ' active' : ''}`}>
              {l.icon} {l.label}
            </Link>
          ))}
        </div>

        {state.selectedCharacter && (
          <div className="mpc-mini-hud">
            <span className="mpc-mini-aura">⚡{state.aura}</span>
            <span className="mpc-mini-lvl">Lv{state.level}</span>
          </div>
        )}

        <button className="mpc-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="mpc-mobile-menu" onClick={() => setMenuOpen(false)}>
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} className={`mpc-mobile-link${path === l.to ? ' active' : ''}`}>
              <span className="mpc-mobile-icon">{l.icon}</span>
              <span>{l.label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

function AppLayout() {
  return (
    <GameProvider>
      <div className="mpc-app">
        <NavBar />
        <main className="mpc-main">
          <Outlet />
        </main>
        <footer className="mpc-footer">
          <div className="mpc-footer-inner">
            <p>⚡ Melting Point Chronicles v4.2</p>
            <p>Made with 🔥 by Michael — Still developing tho 🥴</p>
            <p style={{fontSize:'0.7rem',opacity:0.5}}>© 2024 Melting Point College. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </GameProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AppLayout />
        <Scripts />
      </body>
    </html>
  )
}
