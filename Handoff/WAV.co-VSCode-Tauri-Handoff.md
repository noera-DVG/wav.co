# WAV.co — VSCode + Tauri Handoff

> **Copy-paste this entire document into a new chat to start fresh.**
> No account logins, no App Store, no Xcode. FOSS-only toolchain.

---

## 1. Prerequisites (one-time setup)

### Install Rust toolchain (FOSS, MIT)

```bash
brew install rustup
rustup-init   # accept defaults
source "$HOME/.cargo/env"
```

### Install Node.js (FOSS, MIT)

```bash
brew install node
```

### Verify

```bash
rustc --version    # should show 1.x+
cargo --version    # should show 1.x+
node --version     # should show 20.x+
npm --version      # should show 10.x+
```

**That's it.** No Apple ID, no Xcode, no logins.

---

## 2. Project Structure (what will be generated)

```
WAV.co/
├── src-tauri/                          # Rust backend
│   ├── Cargo.toml                      # Dependencies
│   ├── tauri.conf.json                 # App config (name, icon, bundle)
│   ├── build.rs                        # Build script
│   ├── src/
│   │   └── lib.rs                      # Rust backend (WebSocket bridge client)
│   ├── capabilities/
│   │   └── default.toml                # Permission caps
│   ├── icons/
│   │   ├── 32x32.png
│   │   ├── 128x128.png
│   │   ├── 128x128@2x.png
│   │   ├── icon.icns                   # macOS icon
│   │   └── icon.ico                    # Windows icon
│   └── Cargo.lock
├── src/                                # Frontend (React + TypeScript)
│   ├── App.tsx                         # Main app shell
│   ├── main.tsx                        # Entry point
│   ├── index.css                       # Global styles (dark theme)
│   ├── components/
│   │   ├── Sidebar.tsx                 # Navigation panel (10 workflow steps)
│   │   ├── BridgeStatus.tsx            # WebSocket connection indicator
│   │   └── TabContent.tsx              # Tab router
│   ├── views/
│   │   ├── SetupView.tsx               # 1. Ableton Bridge setup
│   │   ├── InstrumentsView.tsx         # 2. Synth presets browser
│   │   ├── StandardFXView.tsx          # 3. Effect chain library
│   │   ├── PerformanceToolsView.tsx    # 4. Live performance techniques
│   │   ├── AutomationView.tsx          # 5. Parameter automation maps
│   │   ├── EditVariationView.tsx       # 6. Variation builder
│   │   ├── BuildDropView.tsx           # 7. Arrangement builder
│   │   ├── GainStagingView.tsx         # 8. Level management
│   │   ├── MixMasterView.tsx           # 9. Mix/mastering tools
│   │   └── TemplatesView.tsx           # 10. Project starters
│   ├── data/
│   │   ├── effectChains.json           # Effect chain library (Basic/Med/Adv x 3 genres)
│   │   ├── theoryHub.json              # Theory reference cards, scales, chords
│   │   ├── presets.json                # Instrument presets
│   │   └── templates.json              # Template definitions
│   ├── hooks/
│   │   └── useBridge.ts                # WebSocket bridge hook
│   └── types/
│       └── index.ts                    # TypeScript type definitions
├── index.html                          # HTML entry point
├── package.json                        # npm dependencies
├── vite.config.ts                      # Vite build config
├── tsconfig.json                       # TypeScript config
├── tsconfig.node.json
└── README.md
```

---

## 3. Core Identity

- **App name:** WAV.co
- **Platform:** macOS native via Tauri (Rust backend + React frontend)
- **Distribution:** single ZIP containing `WAV.co.app`; double-click to open
- **License target:** MIT (FOSS)
- **Genre focus:** Progressive House, Trance, Techno

---

## 4. Navigation Order (Production Workflow)

1. **Setup** — Ableton bridge connection
2. **Instruments** — Synth preset browser
3. **Standard FX** — Effect chain library (Basic / Medium / Advanced per genre)
4. **Performance Tools** — Live performance techniques
5. **Automation** — Parameter automation maps
6. **Edit / Variation** — Variation builder
7. **Build / Drop** — Arrangement builder
8. **Gain Staging** — Level management
9. **Mix / Master** — Mix and mastering tools
10. **Templates** — Starter project definitions

---

## 5. Key Assets

### Effect Chain Library

Stored as `src/data/effectChains.json`. Structure:

```json
[
  {
    "id": "ph-basic-1",
    "name": "Progressive Pad Wash",
    "genre": "Progressive House",
    "difficulty": "Basic",
    "description": "Warm pad chain with gentle filter automation",
    "devices": [
      { "name": "EQ Eight", "parameters": [
        { "name": "Low Cut", "value": 200 },
        { "name": "High Cut", "value": 8000 }
      ]},
      { "name": "Chorus", "parameters": [
        { "name": "Rate", "value": 0.3 },
        { "name": "Depth", "value": 0.6 }
      ]},
      { "name": "Reverb", "parameters": [
        { "name": "Decay", "value": 3.2 },
        { "name": "Damping", "value": 0.7 }
      ]}
    ],
    "bpmRange": [110, 126],
    "keySuggestions": ["Am", "Dm", "Em", "F"]
  }
]
```

**Genre coverage:**
- Progressive House: Basic (4), Medium (3), Advanced (2) = 9 chains
- Trance: Basic (4), Medium (3), Advanced (2) = 9 chains
- Techno: Basic (4), Medium (3), Advanced (2) = 9 chains
- **Total: 27 effect chains**

### Theory Hub

Stored as `src/data/theoryHub.json`. Includes:

- **Circle of Fifths** — EDM-focused key selection
- **Scale library** — Natural Minor, Harmonic Minor, Dorian, Phrygian, Mixolydian, Pentatonic Minor/Major, Blues, Whole Tone, Diminished
- **Modal interchange** — 6 common borrowings with EDM use-cases
- **Tension mapping** — 5-level tension ladder (Baseline -> Release/Drop) with techniques per level
- **Chord progressions** — Genre-specific progression templates
- **EDM key preferences** — Most-used keys with genre notes

### Templates

Stored as `src/data/templates.json`. Three starter templates:

1. **Progressive House - Full Arrangement** (128 BPM, Am)
   - Structure: Intro -> Build -> Drop -> Breakdown -> Build -> Drop -> Outro
   - Track layout: Lead, Bass, Drums, Pads, FX, Vocals, Master
   - Pre-configured effect chains on each track

2. **Trance - Uplift** (138 BPM, Gm)
   - Structure: Intro -> Build -> Lead Drop -> Breakdown -> Vocal -> Build -> Final Drop -> Outro
   - Track layout: Lead, Bass, Arp, Drums, Pads, FX, Vocals, Master
   - Pre-configured effect chains, automation maps included

3. **Techno - Dark Loop** (132 BPM, Bm)
   - Structure: 16-bar loop with variation layers
   - Track layout: Kick, Hi-hats, Percussion, Bass, Lead, FX, Filter, Master
   - Pre-configured effect chains, modulation maps included

---

## 6. Ableton Bridge (Optional)

### Architecture

```
WAV.co App (Tauri + React) <--WebSocket 127.0.0.1:8765--> Ableton Live 11+
                                                              (Remote Script)
  - Stream tempo               <--                              - MIDI clock
  - Stream key                 <--                              - DAW key
  - Track list                 <--                              - Track names
  - Device list                <--                              - Device names
  - Send presets               -->                              - Load chains
```

### Bridge Script

The bridge is a Python script (`src-tauri/resources/bridge/wavco_bridge.py`) that:
- Lives in `src-tauri/resources/bridge/`
- Opens WebSocket on `127.0.0.1:8765`
- Streams tempo, key, track/device list to WAV.co
- Accepts preset load commands from WAV.co
- Uses only macOS built-in Python 3; no external packages
- Uses Ableton's Live API (requires Live 11+)

### Bridge Status in App

- **Connected:** Green dot, shows tempo + key
- **Disconnected:** Red dot, "Click to connect"
- **Error:** Red dot with "Error" label, "Contact Support" button
- **Connecting:** Yellow dot, "Connecting..."

### Troubleshooting (shown in-app)

| Problem | Solution |
|---------|----------|
| Port blocked | Open System Preferences -> Security & Privacy -> Firewall -> allow incoming connections |
| Live version < 11 | Requires Ableton Live 11+ (Remote-Scripts API) |
| Bridge crashes | View log at `~/Library/Application Support/WAV.co/bridge.log` |
| Other issues | "Contact Support" opens email client with pre-filled subject |

---

## 7. UI/UX Specifications

### Color Palette (Dark Theme)

```
Background:        #1a1a2e
Sidebar:           #16213e
Panel:             #0f3460
Accent (PH):       #f39c12 (orange)
Accent (Trance):   #9b59b6 (purple)
Accent (Techno):   #2ecc71 (green)
Text Primary:      #e0e0e0
Text Secondary:    #9e9e9e
Border:            #2a2a4a
Success:           #27ae60
Error:             #e74c3c
Warning:           #f39c12
```

### Typography

- **Font family:** System font (SF Pro Display on macOS)
- **Title:** 24px bold
- **Heading:** 18px semibold
- **Body:** 14px regular
- **Caption:** 12px regular
- **Small:** 10px regular

### Layout

- **Window:** 1200x800 minimum, resizable
- **Sidebar:** 260px wide, fixed
- **Main panel:** fills remaining width
- **Toolbar:** unified macOS toolbar at top
- **Hidden title bar** for immersive look

### Sidebar Item Format

```
[icon]  Step Title
        Subtitle
```

Icons use SF Symbols:
- Setup: `lightning.fill`
- Instruments: `speaker.wave.3.fill`
- Standard FX: `slider.horizontal.3`
- Performance: `play.circle.fill`
- Automation: `ellipsis.path`
- Edit/Variation: `rectangle.stack.fill`
- Build/Drop: `arrow.up.circle.fill`
- Gain Staging: `gauge.high`
- Mix/Master: `waveform.fill`
- Templates: `doc.fill`

---

## 8. Build & Distribution

### Development

```bash
cd WAV.co
npm install
npm run tauri dev        # Hot-reload development
```

### Production Build

```bash
npm run tauri build
```

Output: `src-tauri/target/release/bundle/macos/WAV.co.app`

### Packaging for Distribution

```bash
# ZIP the .app
cd src-tauri/target/release/bundle/macos/
zip -r WAV.co.app.zip WAV.co.app

# Share the ZIP - recipient double-clicks WAV.co.app to open
```

### App Metadata

- **Bundle ID:** `com.wav.co`
- **Version:** 1.0.0
- **Short version:** 1.0.0
- **Copyright:** 2026 WAV.co

---

## 9. File Permissions & Sandboxing

Tauri apps are sandboxed by default. The app can:
- Read/write to `~/Library/Application Support/WAV.co/`
- Open WebSocket connections to localhost
- Access system menus and notifications

No special entitlements needed for the core workflow.

---

## 10. Deliverables Checklist

- [ ] Tauri project scaffolded (`src-tauri/`)
- [ ] React frontend with Vite (`src/`)
- [ ] All 10 view components
- [ ] Sidebar navigation with workflow steps
- [ ] Dark theme CSS
- [ ] Effect chain JSON data (27 chains x 3 genres)
- [ ] Theory hub JSON data (scales, chords, tension mapping)
- [ ] Templates JSON data (3 project starters)
- [ ] Instrument presets JSON data
- [ ] Bridge WebSocket hook (`useBridge.ts`)
- [ ] Bridge Python script (`wavco_bridge.py`)
- [ ] TypeScript type definitions
- [ ] App icons (32, 128, 256, 512)
- [ ] `tauri.conf.json` configured
- [ ] `Cargo.toml` with dependencies
- [ ] `README.md` with build instructions
- [ ] `.gitignore`
- [ ] Buildable and runnable

---

## 11. What to Do Next

**When you paste this into a new chat, tell the assistant:**

> "Generate the full WAV.co Tauri project. Start with the project scaffold and package.json, then generate each source file."

The assistant should:

1. Create the directory structure
2. Generate all config files (`package.json`, `tsconfig.json`, `vite.config.ts`, `Cargo.toml`, `tauri.conf.json`)
3. Generate the Rust backend (`lib.rs`)
4. Generate the React frontend (all components, views, hooks, data)
5. Generate all JSON data files
6. Generate the bridge Python script
7. Provide build instructions

**Total files to generate: ~45+**

---

## 12. Quick Reference - All Dependencies

### Rust (Cargo.toml)
```toml
[dependencies]
tauri = { version = "2", features = [] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
tokio = { version = "1", features = ["full"] }
ws = "0.9"           # WebSocket client for bridge
reqwest = { version = "0.11", features = ["json"] }
```

### JavaScript (package.json)
```json
{
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "@tauri-apps/api": "^2",
    "@tauri-apps/plugin-shell": "^2"
  },
  "devDependencies": {
    "@tauri-apps/cli": "^2",
    "typescript": "^5",
    "vite": "^5",
    "@vitejs/plugin-react": "^4"
  }
}
```

---

## 13. Notes for the Assistant

- **No external APIs** - everything is self-contained
- **No account logins** - zero authentication
- **No cloud** - all data is local JSON
- **Offline-first** - works fully without internet
- **Ableton bridge is optional** - app works without it
- **Dark theme only** - no light mode
- **macOS only** for v1 (Tauri supports Windows/Linux later)
- **SF Symbols icons** - use Apple's system icon names
- **All JSON data should be comprehensive** - fill in all 27 effect chains, full theory data, and all 3 templates
- **Each view should be functional** - not placeholder text, real interactive UI
- **Effect chains should have "Copy to Clipboard" and "Export .adg" buttons**
- **Theory hub should have interactive scale builder** - select key + scale, see notes and chords
- **Tension mapping should be visual** - a ladder with expandable technique lists
- **Templates should show track layout** - visual track list with preset chains assigned

---

*Handoff generated 2026-10-27. FOSS-only. No Apple ID required.*
