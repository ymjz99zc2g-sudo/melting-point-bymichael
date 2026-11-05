# AGENTS.md — Melting Point Chronicles

This document provides context for AI agents and developers working on this codebase.

## Project Overview

Nigerian school RPG web prototype. TanStack Start (React) + Tailwind CSS + custom game CSS.

## Directory Structure

```
src/
  routes/          # File-based routes (TanStack Router auto-generates routeTree.gen.ts)
    __root.tsx     # HTML shell + NavBar + AppLayout + GameProvider wrapper
    index.tsx      # Landing page
    avatar.tsx     # Character selection screen
    game.tsx       # Main playable game screen (world map + HUD + joystick)
    gallery.tsx    # Character art gallery
    credits.tsx    # Credits and about page
    controls.tsx   # How to play / controls reference
    settings.tsx   # Settings (audio, graphics, save/reset)
    roadmap.tsx    # Development roadmap
  data/
    gameData.ts    # All game constants: characters, locations, NPCs, chapters, endings
  store/
    gameStore.tsx  # React Context + localStorage save/load (useGame hook)
  styles.css       # All game UI styles (custom CSS, no Tailwind utilities used directly)
```

## Key Conventions

- **Global state**: `useGame()` hook from `src/store/gameStore.tsx`. Wraps the entire app in `GameProvider` inside `__root.tsx`.
- **All game data** lives in `src/data/gameData.ts` — characters, NPCs, locations, etc.
- **Styles**: Custom CSS classes in `styles.css` with CSS variables (`--bg-deep`, `--accent`, etc.). Tailwind is imported but game UI uses hand-written CSS.
- **Fonts**: Orbitron (titles), Rajdhani (UI labels), Nunito (body) — loaded from Google Fonts in `__root.tsx`.
- **Images**: All character images are hosted on postimg.cc and referenced by URL in `gameData.ts`.

## Game Screen Architecture

The `/game` route renders a full-viewport world map (CSS-based). Locations are positioned with absolute % coordinates. Player sprite moves via joystick (touch) or WASD/Arrow keys using a `setInterval` game loop. NPC dialogue triggers when player is within ~12% distance of a location that has an NPC.

## State Persistence

`GameState` in `gameStore.tsx` auto-saves to `localStorage` every 10 seconds. Manual save available in-game and on Settings page.

## Adding New Characters

Add to `CHARACTERS` array in `gameData.ts` with: `id`, `name`, `title`, `description`, `ability`, `abilityDesc`, `stats`, `image`, `color`, `accent`, `phrases`, `outfit`, `isDefault`.

## Adding New Locations

Add to `LOCATIONS` array in `gameData.ts`. Positions are `x`/`y` percentages (0-100) on the world map. Add corresponding NPC to `NPCS` array if needed.
