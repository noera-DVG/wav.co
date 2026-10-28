# 📦 Releases

## Latest Release: v1.0.0

### Pre-built App Download

Download the ready-to-use app:

- **WAV.co-v1.0.0.zip** - Contains pre-built `WAV.co.app` plus source code
  - Download: [WAV.co-v1.0.0.zip](https://github.com/noera-DVG/wav.co/releases/download/v1.0.0/WAV.co-v1.0.0.zip)

### Installation (3 Steps)

1. **Download** the ZIP file above
2. **Extract** by double-clicking
3. **Drag** `WAV.co.app` to your Applications folder

That's it! Open WAV.co and start producing.

---

## How to Build from Source

If you want to compile WAV.co yourself:

```bash
# Install prerequisites
brew install rustup node

# Set up Rust
rustup-init  # Accept all defaults
source "$HOME/.cargo/env"

# Clone and build
git clone https://github.com/noera-DVG/wav.co.git
cd wav.co
npm install
npm run tauri build

# App will be at:
src-tauri/target/release/bundle/macos/WAV.co.app
```

See [INSTALLATION.md](./INSTALLATION.md) for detailed instructions.

---

## Release Notes

### v1.0.0 (Current)
- First stable release
- 10-Step Production Workflow
- 27 Effect Chains for multiple genres
- Theory Hub with music theory tools
- 3 Project Templates
- Ableton Live Bridge (optional integration)
- Dark theme with genre-specific color accents

---

## Old Releases

No older releases yet.

---

*WAV.co v1.0.0 — MIT License*