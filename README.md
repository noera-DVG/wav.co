# 🎛️ WAV.co — Music Production Assistant

![MIT License](https://img.shields.io/badge/License-MIT-brightgreen.svg)
![macOS](https://img.shields.io/badge/Platform-macOS-000000.svg?logo=apple&labelColor=%231a1a2e)
![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)

> **FOSS-only toolchain. No Apple ID. No Xcode. No App Store.**

WAV.co is a native macOS music production assistant built with Tauri (Rust + React), designed for Progressive House, Trance, and Techno producers.

---

## 🚀 Getting Started - 3 Easy Steps

### Option 1: Pre-built App (Easiest - Recommended!)

**No coding needed. Download and go!**

1. **Download WAV.co-v1.0.0.zip** from [Releases](https://github.com/noera-DVG/wav.co/releases)
2. **Double-click** the ZIP file to extract
3. **Drag `WAV.co.app`** to your Applications folder

That's it! Double-click to open and start producing.

> 💡 **First-time open warning?** Right-click `WAV.co.app` → **Open** → Click **Open**

### Option 2: Build from Source (For Developers)

```bash
brew install rustup node
rustup-init && source "$HOME/.cargo/env"
git clone https://github.com/noera-DVG/wav.co.git && cd wav.co
npm install && npm run tauri build
```

---

## 📦 Installation Guide (Detailed)

### macOS

1. **Download** [WAV.co-v1.0.0.zip](https://github.com/noera-DVG/wav.co/releases/download/v1.0.0/WAV.co-v1.0.0.zip)
2. **Extract** the ZIP (double-click)
3. **Move** `WAV.co.app` to Applications
4. **Open** from Applications

> ⚠️ **Security warning?** This is normal for unsigned apps. Right-click → Open

---

## 🎹 Ableton Live Integration Guide

### Prerequisites
- Ableton Live 11+
- Python 3 (pre-installed on macOS)

### Step-by-Step Setup

#### 1. Locate Ableton's User Library
```
~/Music/Ableton/User Library/Remote Scripts/
```

#### 2. Create WAV.co Folder
Create a new folder named exactly `WAV.co` in the Remote Scripts directory

#### 3. Copy Bridge Script
Download `wavco_bridge.py` from [src-tauri/resources/bridge/](https://github.com/noera-DVG/wav.co/tree/main/src-tauri/resources/bridge) and place it in your `WAV.co` folder

#### 4. Configure Ableton
1. Restart Ableton Live
2. Preferences → Link/MIDI/Sync
3. Control Surfaces → Select **WAV.co**
4. Click OK

#### 5. Connect
1. Launch WAV.co app
2. Click **Connect** in sidebar
3. You should see: ✅ **Connected to Ableton Live**

---

## 🔧 Development

### Prerequisites
```bash
brew install rustup node
rustup-init && source "$HOME/.cargo/env"
```

### Build & Run
```bash
git clone https://github.com/noera-DVG/wav.co.git && cd wav.co
npm install && npm run tauri dev  # Development
npm run tauri build               # Production build
```

---

## ✨ Features

- **10-Step Production Workflow**
- **27 Effect Chains** (Basic, Medium, Advanced)
- **Theory Hub** (Scales, chords, modal interchange)
- **3 Project Templates**
- **Ableton Bridge** (Optional WebSocket integration)
- **Dark Theme**, Offline-First

---

## 📂 Repository Structure

```
WAV.co/
├── src-tauri/          # Rust backend
├── src/                # React frontend
├── releases/           # Pre-built apps
│   └── WAV.co.app/
└── INSTALLATION.md     # Detailed installation guide
```

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

Copyright (c) 2026 WAV.co

---

## 📚 Additional Resources

- **Detailed Installation:** See [INSTALLATION.md](INSTALLATION.md)
- **Troubleshooting:** Check the Ableton Bridge section
- **Report Issues:** [GitHub Issues](https://github.com/noera-DVG/wav.co/issues)

---

*WAV.co v1.0.0 — FOSS-only. No Apple ID required.*

🔗 **GitHub**: [github.com/noera-DVG/wav.co](https://github.com/noera-DVG/wav.co)