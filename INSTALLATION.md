# 📦 Installation Guide

## Quick Start (3 steps)

1. **Download** `WAV.co-v1.0.0.zip` from [Releases](https://github.com/noera-DVG/wav.co/releases)
2. **Extract** the ZIP file (double-click)
3. **Move** `WAV.co.app` to your Applications folder

That's it! Double-click to run.

---

## Detailed Installation Instructions

### macOS (Recommended)

#### Option 1: From GitHub Releases (Easiest)

1. Visit [WAV.co Releases](https://github.com/noera-DVG/wav.co/releases)
2. Download the latest release: **WAV.co-v1.0.0.zip**
3. Double-click the downloaded ZIP file to extract it
4. Drag `WAV.co.app` from the extracted folder to your **Applications** folder
5. Open **Applications** and double-click `WAV.co`

> ⚠️ **Security warning?** On first launch, you may see a security warning:
> 
> 1. Right-click (or Ctrl-click) `WAV.co.app`
> 2. Select **Open**
> 3. Click **Open** in the confirmation dialog
>
> This is normal for unsigned applications on macOS.

#### Option 2: Build from Source (For Developers)

If you want to build WAV.co yourself:

```bash
# Prerequisites
brew install rustup
rustup-init  # accept defaults
source "$HOME/.cargo/env"
brew install node

# Clone and build
git clone https://github.com/noera-DVG/wav.co.git
cd wav.co
npm install
npm run tauri build

# The app will be at:
# src-tauri/target/release/bundle/macos/WAV.co.app
```

---

## 🎹 Ableton Live Integration

### System Requirements
- **macOS** or **Windows**
- **Ableton Live 11** or later
- **Python 3** (pre-installed on macOS)

### Step-by-Step Setup

#### 1. Locate Your Ableton User Library

**macOS:**
```
~/Music/Ableton/User Library/Remote Scripts/
```

**Windows:**
```
C:\Users\[Username]\Music\Ableton\User Library\Remote Scripts\
```

**How to find it:**
1. Open Ableton Live
2. Go to **Preferences** (Cmd+P on macOS, Ctrl+P on Windows)
3. Click the **File Paths** tab
4. Click **Show User Library in Finder/Explorer**

#### 2. Create WAV.co Folder

In the `Remote Scripts` folder, create a new folder named exactly:
```
WAV.co
```

> ⚠️ **Important:** The folder name must be exactly `WAV.co` with capital W and C.

#### 3. Copy the Bridge Script

**From GitHub:**
1. Download `wavco_bridge.py` from [src-tauri/resources/bridge/](https://github.com/noera-DVG/wav.co/tree/main/src-tauri/resources/bridge)
2. Place it in your `WAV.co` folder

**Or copy from repository:**
```bash
cp src-tauri/resources/bridge/wavco_bridge.py \
   ~/Music/Ableton/User\ Library/Remote\ Scripts/WAV.co/
```

Your folder structure should look like:
```
User Library/
└── Remote Scripts/
    └── WAV.co/
        └── wavco_bridge.py
```

#### 4. Configure Ableton

1. **Restart Ableton Live** (or close and reopen)
2. Go to **Preferences → Link/MIDI/Sync**
3. Scroll down to **Control Surfaces** section
4. From the dropdown, select: **WAV.co**
5. Click **OK** to save

#### 5. Connect WAV.co App

1. Launch the **WAV.co** application
2. Look for **Bridge Status** in the sidebar
3. Click the **Connect** button
4. You should see: ✅ **Connected to Ableton Live**

---

## 🔍 Troubleshooting

### "WAV.co" doesn't appear in Control Surfaces list

1. **Restart Ableton** completely
2. Verify the script is at: `Remote Scripts/WAV.co/wavco_bridge.py`
3. Check that the folder name is exactly `WAV.co` (capital W and C)
4. Ensure Python 3 is installed: `python3 --version`

### Bridge shows "Disconnected" in WAV.co

1. **Verify Ableton setup:** Control Surfaces → WAV.co selected
2. **Check port 8765** is not blocked: `lsof -i :8765`
3. **Restart both** Ableton and WAV.co
4. Check the log: `~/Library/Application Support/WAV.co/bridge.log`

### "Script Error" in Ableton

1. Open Ableton's Script Log (View → Log File)
2. Look for errors from `wavco_bridge.py`
3. Common fixes:
   - Restart Ableton
   - Re-copy the bridge script
   - Update Python if needed

---

## 📸 Screenshots

### WAV.co Main Interface
![WAV.co Interface](https://raw.githubusercontent.com/noera-DVG/wav.co/main/screenshots/interface.png)

### Bridge Status in Sidebar
![Bridge Status](https://raw.githubusercontent.com/noera-DVG/wav.co/main/screenshots/bridge-status.png)

### Ableton Control Surface Settings
![Ableton Setup](https://raw.githubusercontent.com/noera-DVG/wav.co/main/screenshots/ableton-setup.png)

---

## 🎓 Getting Started with WAV.co

1. **Open WAV.co** from Applications
2. **Setup** tab: Configure your project settings
3. **Instruments** tab: Browse synth presets
4. **FX** tab: Apply effect chains
5. **Performance Tools**: Real-time manipulation
6. **Automation** tab: Create automated parameter changes
7. **Variation** tab: Generate variations
8. **Arrangement** tab: Build your track structure
9. **Gain Staging**: Optimize levels
10. **Mix/Master** tab: Final polish
11. **Templates**: Start from premade arrangements

---

## 📬 Support

For issues or questions:
- [Open an Issue](https://github.com/noera-DVG/wav.co/issues)
- Check the [Ableton Bridge Troubleshooting](#ableton-bridge-troubleshooting) section

---

*WAV.co v1.0.0 — Free and open source under MIT License*