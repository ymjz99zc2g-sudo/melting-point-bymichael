import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { CHARACTERS, COVER_POSTER, ISI_OWU_IMG } from '../data/gameData'

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
})

const ALL_GALLERY = [
  { id: 'cover', label: 'Game Cover Poster', role: 'Official Cover', img: COVER_POSTER, isCover: true },
  ...CHARACTERS.map(c => ({ id: c.id, label: c.name, role: c.title, img: c.image, isCover: false })),
  { id: 'isowu', label: 'Isi Owu', role: 'Final Boss Teacher', img: ISI_OWU_IMG, isCover: false },
]

function GalleryPage() {
  const [modal, setModal] = useState<string | null>(null)

  return (
    <div className="mpc-page">
      <div className="mpc-page-hero">
        <h1 className="mpc-title">CHARACTER GALLERY</h1>
        <p className="mpc-subtitle">
          The official cast of Melting Point Chronicles. Tap any image to view full size.
        </p>
      </div>

      <div className="gallery-grid">
        {ALL_GALLERY.map(item => (
          <div
            key={item.id}
            className={`gallery-item${item.isCover ? ' gallery-cover' : ''}`}
            onClick={() => setModal(item.img)}
          >
            <img src={item.img} alt={item.label} loading="lazy" />
            <div className="gallery-label">
              <div style={{ fontWeight: 700 }}>{item.label}</div>
              <div style={{ fontSize: '0.72rem', opacity: 0.7 }}>{item.role}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Lore blurbs */}
      <div style={{ marginTop: '48px' }}>
        <div className="mpc-section-title">🎨 ART NOTES</div>
        <div className="mpc-card-grid">
          {[
            { title: 'Visual Style', desc: 'Hybrid anime + stylized 3D. Think Roblox freedom meets Sword Art Online emotion set in a Nigerian secondary school.' },
            { title: 'Character Design', desc: 'Each character has a distinct silhouette and outfit that reflects their personality. Michael\'s ROLLING LOUD hoodie is iconic.' },
            { title: 'Color Language', desc: 'School uniform is cream + scarlet. Aura effects use gold to purple spectrum. Isi Owu\'s scenes use harsh red tones.' },
            { title: 'Future Art', desc: 'More character renders loading: Chidinma, Kelechi, Adaeze, Samuel, Emeka, and more NPC classmates.' },
          ].map(item => (
            <div key={item.title} className="mpc-card">
              <div style={{ fontFamily: 'var(--font-title)', fontSize: '0.85rem', color: 'var(--accent)', marginBottom: '8px', letterSpacing: '1px' }}>
                {item.title}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div className="gallery-modal" onClick={() => setModal(null)}>
          <img src={modal} alt="Full view" />
        </div>
      )}
    </div>
  )
}
