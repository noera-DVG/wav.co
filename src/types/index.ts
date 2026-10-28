// WAV.co — TypeScript Type Definitions

export type Genre = 'Progressive House' | 'Trance' | 'Techno';
export type Difficulty = 'Basic' | 'Medium' | 'Advanced';
export type BridgeStatusState = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface DeviceParameter {
  name: string;
  value: number;
}

export interface Device {
  name: string;
  parameters: DeviceParameter[];
}

export interface EffectChain {
  id: string;
  name: string;
  genre: Genre;
  difficulty: Difficulty;
  description: string;
  devices: Device[];
  bpmRange: [number, number];
  keySuggestions: string[];
}

export interface ScaleInfo {
  name: string;
  intervals: number[];
  description: string;
  edmUseCase: string;
}

export interface ChordProgression {
  genre: Genre;
  name: string;
  chords: string[];
  description: string;
}

export interface TensionLevel {
  level: number;
  name: string;
  techniques: string[];
}

export interface TheoryHub {
  circleOfFifths: string[];
  scales: ScaleInfo[];
  modalInterchange: { from: string; to: string; useCase: string }[];
  tensionMapping: TensionLevel[];
  chordProgressions: ChordProgression[];
  edmKeyPreferences: { key: string; genres: Genre[]; notes: string }[];
}

export interface TrackTemplate {
  name: string;
  genre: Genre;
  bpm: number;
  key: string;
  structure: string[];
  tracks: { name: string; chainId?: string }[];
}

export interface PresetInfo {
  id: string;
  name: string;
  genre: Genre;
  category: string;
  description: string;
  parameters: Record<string, number>;
}

export interface SidebarItem {
  id: number;
  title: string;
  subtitle: string;
  symbol: string;
}

export interface BridgeConnection {
  status: BridgeStatusState;
  host: string;
  port: number;
  tempo?: number;
  key?: string;
}
