# 🎛️ WAV.co — Music Production Assistant

![MIT License](https://img.shields.io/badge/License-MIT-brightgreen.svg)
![macOS](https://img.shields.io/badge/Platform-macOS-000000.svg?logo=apple&labelColor=%231a1a2e)
![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)

> **FOSS-only toolchain. No Apple ID. No Xcode. No App Store.**

WAV.co is a native macOS music production assistant built with Tauri (Rust + React), designed for Progressive House, Trance, and Techno producers.

---

## 📦 Installation Guide

### Step 1: Download WAV.co

Download the latest release from the [Releases](https://github.com/noera-DVG/wav.co/releases) page:
- **WAV.co-v1.0.0.zip** (contains `WAV.co.app`)

Or build from source following the [Development](#development) section below.

### Step 2: Install on macOS

1. **Open the ZIP file** (double-click `WAV.co-v1.0.0.zip`)
2. **Drag `WAV.co.app`** to your `Applications` folder
3. **Open WAV.co** from Applications (or double-click in Downloads)

> 💡 **First-timeopen warning?** Right-click `WAV.co.app` → **Open** → Click **Open** again

### Step 3: Verify Installation

Launch WAV.co and you should see:
- Main window with sidebar navigation
- 10 workflow tabs (Setup, Instruments, FX, etc.)
- Bridge status indicator in sidebar

---

## 🎹 Ableton Live Integration Guide

WAV.co connects to Ableton Live via WebSocket for seamless workflow integration.

### Prerequisites
- Ableton Live 11 or later
- Python 3 (included with macOS)

### Setup Instructions

#### 1. Locate Ableton's User Library

Open Finder and navigate to:
```
~/Music/Ableton/User Library/Remote Scripts/
```

> 💡 **Can't find it?** In Ableton: Preferences → File Paths → Show User Library in Finder

#### 2. Create WAV.co Folder

In the `Remote Scripts` folder, create a new folder named:
```
WAV.co
```

#### 3. Copy Bridge Script

Copy the bridge script to the new folder:
```bash
cp src-tauri/resources/bridge/wavco_bridge.py ~/Music/Ableton/User\ Library/Remote\ Scripts/WAV.co/
```

> 💡 **Or manually:** Copy `wavco_bridge.py` from the WAV.co GitHub repository and paste it into your `WAV.co` folder

#### 4. Configure Ableton

1. **Restart Ableton Live** (or close and reopen)
2. Go to **Preferences → Link/MIDI/Sync**
3. In the **Control Surfaces** section, select:
   - **WAV.co** from the dropdown menu
4. Click **OK**

#### 5. Connect WAV.co to Ableton

1. Launch **WAV.co** application
2. In the sidebar, locate the **Bridge Status** indicator
3. Click **Connect**
4. You should see: **"Connected to Ableton Live"**

---

## 🔌 Bridge Features

Once connected, the bridge enables:
- **Automation mapping** from WAV.co to Ableton
- **Clip launching** triggered by WAV.co controls
- **Device parameter synchronization**
- **Master track control**

---

## 🛠️ Development

### Prerequisites

```bash
# Rust toolchain (FOSS, MIT)
brew install rustup
rustup-init   # accept defaults
source "$HOME/.cargo/env"

# Node.js (FOSS, MIT)
brew install node

# Verify installations
rustc --version    # should show 1.x+
cargo --version    # should show 1.x+
node --version     # should show 20.x+
npm --version      # should show 10.x+
```

### Clone and Run

```bash
# Clone repository
git clone https://github.com/noera-DVG/wav.co.git
cd wav.co

# Install dependencies
npm install

# Start development server
npm run tauri dev
```

This starts:
- Vite dev server on `http://localhost:1420`
- Tauri app window with hot-reload

### Build Production Package

```bash
npm run tauri build
```

Output: `src-tauri/target/release/bundle/macos/WAV.co.app`

---

## 📂 Project Structure

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
└── README.md
```

---

## ✨ Features

- **10-Step Production Workflow** — Setup → Instruments → FX → Performance → Automation → Variation → Arrangement → Gain Staging → Mix/Master → Templates
- **27 Effect Chains** — Basic, Medium, and Advanced chains for each genre
- **Theory Hub** — Scales, chords, modal interchange, tension mapping
- **3 Project Templates** — Full arrangement starters for each genre
- **Ableton Bridge** — Optional WebSocket bridge to Ableton Live 11+
- **Dark Theme** — Immersive production environment
- **Offline-First** — Everything runs locally, no internet required

---

## 🎨 UI/UX

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

---

## 📋 App Metadata

| Property | Value |
|----------|-------|
| **Name** | WAV.co |
| **Bundle ID** | `com.wav.co` |
| **Version** | 1.0.0 |
| **License** | MIT |
| **Platform** | macOS (Windows/Linux via Tauri later) |

---

## 📤 Distribution

- **Single ZIP** containing `WAV.co.app`
- **Double-click** to open
- No code signing required for local use
- No notarization needed (FOSS, no network access)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

<details>
<summary>MIT License Text</summary>

```
MIT License

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
</details>

---

## 🙏 Credits

Built with:
- [Tauri v2](https://tauri.app) — Rust + Web frontend framework
- [React](https://react.dev) — UI library
- [Vite](https://vitejs.dev) — Build tool
- [TypeScript](https://www.typescriptlang.org) — Type safety

---

*WAV.co v1.0.0 — FOSS-only. No Apple ID required.*

🔗 **GitHub**: [github.com/noera-DVG/wav.co](https://github.com/noera-DVG/wav.co)