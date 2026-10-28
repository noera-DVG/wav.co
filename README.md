# 🎛️ WAV.co — Music Production Assistant

![MIT License](https://img.shields.io/badge/License-MIT-brightgreen.svg)
![macOS](https://img.shields.io/badge/Platform-macOS-000000.svg?logo=apple&labelColor=%231a1a2e)
![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)

> **FOSS-only toolchain. No Apple ID. No Xcode. No App Store.**

WAV.co is a native macOS music production assistant built with Tauri (Rust + React), designed for Progressive House, Trance, and Techno producers.

---

## 🚀 Getting Started

### ⚡ One-Click Installation (Easiest!)

**No coding needed! Download the pre-built app:**

1. **Download:** [WAV.co-v1.0.0.zip](https://github.com/noera-DVG/wav.co/releases/download/v1.0.0/WAV.co-v1.0.0.zip)
2. **Extract:** Double-click the ZIP file
3. **Install:** Drag `WAV.co.app` to your Applications folder

> 💡 **First-time warning?** Right-click `WAV.co.app` → **Open**

### 📖 Documentation

| Document | Purpose |
|----------|---------|
| [QUICK-START.md](./QUICK-START.md) | Fast setup guide (3 steps) |
| [INSTALLATION.md](./INSTALLATION.md) | Detailed installation + Ableton integration |
| [RELEASES.md](./RELEASES.md) | Download links for pre-built apps |

### 🔧 Build from Source (For Developers)

```bash
brew install rustup node
rustup-init && source "$HOME/.cargo/env"
git clone https://github.com/noera-DVG/wav.co.git && cd wav.co
npm install && npm run tauri build
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

## 🎹 Ableton Live Integration

WAV.co connects to Ableton Live via WebSocket for seamless workflow.

**Quick Setup:**
1. Copy `wavco_bridge.py` to `Remote Scripts/WAV.co/`
2. Restart Ableton and select WAV.co in Control Surfaces
3. Click Connect in WAV.co app

**Detailed Instructions:** See [INSTALLATION.md](./INSTALLATION.md)

---

## 📂 Repository Structure

```
WAV.co/
├── src-tauri/          # Rust backend
├── src/                # React frontend
├── QUICK-START.md      # Fast setup guide
├── INSTALLATION.md     # Detailed installation guide
├── RELEASES.md         # Download links
└── README.md           # This file
```

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

Copyright (c) 2026 WAV.co

---

## 📬 Support & Feedback

- [Report Issues](https://github.com/noera-DVG/wav.co/issues)
- Check the Ableton Bridge troubleshooting section in [INSTALLATION.md](./INSTALLATION.md)

---

*WAV.co v1.0.0 — FOSS-only. No Apple ID required.*

🔗 **GitHub**: [github.com/noera-DVG/wav.co](https://github.com/noera-DVG/wav.co)