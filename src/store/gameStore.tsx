import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface GameState {
  selectedCharacter: string | null;
  playerName: string;
  aura: number;
  xp: number;
  level: number;
  reputation: number;
  skills: { academics: number; sports: number; technology: number; leadership: number };
  completedQuests: string[];
  unlockedAreas: string[];
  activeLocation: string;
  tutorialBeaten: boolean;
  dialoguesSeen: string[];
  settings: { soundOn: boolean; musicOn: boolean; graphicsQuality: string; language: string };
  inventory: string[];
  activeChapter: number;
}

const defaultState: GameState = {
  selectedCharacter: null,
  playerName: "",
  aura: 0,
  xp: 0,
  level: 1,
  reputation: 50,
  skills: { academics: 1, sports: 1, technology: 1, leadership: 1 },
  completedQuests: [],
  unlockedAreas: ["gate", "assembly", "classroom", "cafeteria", "football", "library", "computer"],
  activeLocation: "gate",
  tutorialBeaten: false,
  dialoguesSeen: [],
  settings: { soundOn: true, musicOn: true, graphicsQuality: "high", language: "english" },
  inventory: [],
  activeChapter: 1,
};

const SAVE_KEY = "mpc_save_v1";

function loadSave(): GameState {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) return { ...defaultState, ...JSON.parse(raw) };
  } catch {}
  return defaultState;
}

interface GameContextType {
  state: GameState;
  setState: (s: Partial<GameState>) => void;
  gainAura: (amount: number) => void;
  gainXP: (amount: number) => void;
  gainRep: (amount: number) => void;
  completeQuest: (id: string) => void;
  seeDialogue: (id: string) => void;
  unlockArea: (id: string) => void;
  resetGame: () => void;
  save: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setStateRaw] = useState<GameState>(loadSave);

  const setState = (updates: Partial<GameState>) => {
    setStateRaw(prev => {
      const next = { ...prev, ...updates };
      return next;
    });
  };

  const save = () => {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch {}
  };

  useEffect(() => {
    const t = setInterval(save, 10000);
    return () => clearInterval(t);
  }, [state]);

  const gainAura = (amount: number) => {
    setState({ aura: Math.min(9999, state.aura + amount) });
  };

  const gainXP = (amount: number) => {
    const newXP = state.xp + amount;
    const newLevel = Math.floor(newXP / 200) + 1;
    setState({ xp: newXP, level: newLevel });
  };

  const gainRep = (amount: number) => {
    setState({ reputation: Math.min(100, Math.max(0, state.reputation + amount)) });
  };

  const completeQuest = (id: string) => {
    if (!state.completedQuests.includes(id)) {
      setState({ completedQuests: [...state.completedQuests, id] });
    }
  };

  const seeDialogue = (id: string) => {
    if (!state.dialoguesSeen.includes(id)) {
      setState({ dialoguesSeen: [...state.dialoguesSeen, id] });
    }
  };

  const unlockArea = (id: string) => {
    if (!state.unlockedAreas.includes(id)) {
      setState({ unlockedAreas: [...state.unlockedAreas, id] });
    }
  };

  const resetGame = () => {
    localStorage.removeItem(SAVE_KEY);
    setStateRaw(defaultState);
  };

  return (
    <GameContext.Provider value={{ state, setState, gainAura, gainXP, gainRep, completeQuest, seeDialogue, unlockArea, resetGame, save }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be inside GameProvider");
  return ctx;
}

export function getAuraLevel(aura: number) {
  if (aura >= 1500) return { name: "Aura King", color: "#fbbf24", glow: "0 0 20px #fbbf24" };
  if (aura >= 900) return { name: "Legendary", color: "#ef4444", glow: "0 0 16px #ef4444" };
  if (aura >= 500) return { name: "Elite", color: "#f59e0b", glow: "0 0 12px #f59e0b" };
  if (aura >= 250) return { name: "Focused", color: "#8b5cf6", glow: "0 0 10px #8b5cf6" };
  if (aura >= 100) return { name: "Rising", color: "#3b82f6", glow: "0 0 8px #3b82f6" };
  return { name: "Dormant", color: "#6b7280", glow: "none" };
}

export function getRepLabel(rep: number) {
  if (rep >= 80) return { label: "Legend o! 🌟", color: "#fbbf24" };
  if (rep >= 60) return { label: "Good person", color: "#34d399" };
  if (rep >= 40) return { label: "Known face", color: "#93c5fd" };
  if (rep >= 20) return { label: "Trouble boy 😬", color: "#fb923c" };
  return { label: "Security! 🚨", color: "#f87171" };
}
