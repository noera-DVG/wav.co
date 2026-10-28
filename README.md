# WAV.co — Music Production Assistant

![MIT License](https://img.shields.io/badge/License-MIT-brightgreen.svg)
> **FOSS-only toolchain. No Apple ID. No Xcode. No App Store.**

WAV.co is a native macOS music production assistant built with Tauri (Rust + React), designed for Progressive House, Trance, and Techno producers.

## Features

- **10-Step Production Workflow** — Setup → Instruments → FX → Performance → Automation → Variation → Arrangement → Gain Staging → Mix/Master → Templates
- **27 Effect Chains** — Basic, Medium, and Advanced chains for each genre
- **Theory Hub** — Scales, chords, modal interchange, tension mapping
- **3 Project Templates** — Full arrangement starters for each genre
- **Ableton Bridge** — Optional WebSocket bridge to Ableton Live 11+
- **Dark Theme** — Immersive production environment
- **Offline-First** — Everything runs locally, no internet required

## Prerequisites

Install these before building:

```bash
# Rust toolchain (FOSS, MIT)
brew install rustup
rustup-init   # accept defaults
source "$HOME/.cargo/env"

# Node.js (FOSS, MIT)
brew install node
```

### Verify

```bash
rustc --version    # should show 1.x+
cargo --version    # should show 1.x+
node --version     # should show 20.x+
npm --version      # should show 10.x+
```

## Project Structure

```
WAV.co/
├── src-tauri/                    # Rust backend
│   ├── Cargo.toml
│   ├── tauri.conf.json
│   ├── build.rs
│   ├── capabilities/default.toml
│   ├── icons/                    # App icons
│   ├── resources/bridge/         # Ableton bridge script
│   └── src/lib.rs
├── src/                          # React frontend
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── components/               # Sidebar, BridgeStatus, TabContent
│   ├── views/                    # 10 workflow view components
│   ├── hooks/                    # useBridge WebSocket hook
│   ├── types/                    # TypeScript definitions
│   └── data/                     # JSON data files
│       ├── effectChains.json     # 27 effect chains
│       ├── presets.json          # 24 synth presets
│       ├── theoryHub.json        # Music theory reference
│       └── templates.json        # 3 project templates
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Development

```bash
cd WAV.co
npm install
npm run tauri dev        # Hot-reload development
```

This starts:
- Vite dev server on `http://localhost:1420`
- Tauri app window with hot-reload

## Production Build

```bash
npm run tauri build
```

Output: `src-tauri/target/release/bundle/macos/WAV.co.app`

### Package for Distribution

```bash
cd src-tauri/target/release/bundle/macos/
zip -r WAV.co.app.zip WAV.co.app
```

Share the ZIP — recipients double-click `WAV.co.app` to open.

## Ableton Bridge (Optional)

The bridge connects WAV.co to Ableton Live 11+ via WebSocket.

### Setup

1. Place the bridge script in Ableton's User Library:
   ```
   ~/Music/Ableton/User Library/Remote Scripts/WAV.co/
   ```
2. Restart Ableton Live
3. Select **WAV.co** as your Control Surface
4. Click **Connect** in WAV.co

### Bridge Details

- **WebSocket**: `ws://127.0.0.1:8765`
- **Script**: `src-tauri/resources/bridge/wavco_bridge.py`
- **Log**: `~/Library/Application Support/WAV.co/bridge.log`

## UI/UX

### Color Palette

| Role | Color |
|------|-------|
| Background | `#1a1a2e` |
| Sidebar | `#16213e` |
| Panel | `#0f3460` |
| PH Accent | `#f39c12` (orange) |
| Trance Accent | `#9b59b6` (purple) |
| Techno Accent | `#2ecc71` (green) |
| Text Primary | `#e0e0e0` |
| Text Secondary | `#9e9e9e` |
| Border | `#2a2a4a` |

### Layout

- **Window**: 1200×800 minimum, resizable
- **Sidebar**: 260px fixed width
- **Main panel**: fills remaining width
- **Hidden title bar** for immersive look

## App Metadata

- **Name**: WAV.co
- **Bundle ID**: `com.wav.co`
- **Version**: 1.0.0
- **License**: MIT
- **Platform**: macOS (Windows/Linux via Tauri later)

## Distribution

- Single ZIP containing `WAV.co.app`
- Double-click to open
- No code signing required for local use
- No notarization needed (FOSS, no network access)

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```text
Copyright (c) 2026 WAV.co

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Credits

Built with:
- [Tauri v2](https://tauri.app) — Rust + Web frontend framework
- [React](https://react.dev) — UI library
- [Vite](https://vitejs.dev) — Build tool
- [TypeScript](https://www.typescriptlang.org) — Type safety

---

*WAV.co v1.0.0 — FOSS-only. No Apple ID required.*
