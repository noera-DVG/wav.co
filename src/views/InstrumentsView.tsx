import { useState } from 'react';
import { PresetInfo } from '../types';

const presets: PresetInfo[] = [
  // Progressive House
  { id: 'ph-synth-1', name: 'Warm Pad', genre: 'Progressive House', category: 'Pads', description: 'Warm, evolving pad with gentle filter sweep', parameters: { cutoff: 3200, resonance: 0.2, detune: 0.05, attack: 0.8, release: 2.5 } },
  { id: 'ph-synth-2', name: 'Acid Bass', genre: 'Progressive House', category: 'Bass', description: 'TB-303 inspired acid bass with resonance', parameters: { cutoff: 800, resonance: 0.85, unison: 3, drive: 0.4 } },
  { id: 'ph-synth-3', name: 'Supersaw Lead', genre: 'Progressive House', category: 'Leads', description: 'Rich supersaw lead for main melodies', parameters: { detune: 0.12, unison: 7, cutoff: 5500, resonance: 0.15, attack: 0.02, release: 0.5 } },
  { id: 'ph-synth-4', name: 'Pluck Stab', genre: 'Progressive House', category: 'Stabs', description: 'Sharp pluck for rhythmic hits', parameters: { attack: 0.005, decay: 0.3, cutoff: 4000, resonance: 0.3, release: 0.4 } },
  { id: 'ph-synth-5', name: 'Ambient Text', genre: 'Progressive House', category: 'Textures', description: 'Atmospheric texture layer', parameters: { cutoff: 2000, resonance: 0.1, detune: 0.08, attack: 1.5, release: 4.0, lfoRate: 0.15 } },
  { id: 'ph-synth-6', name: 'Reese Bass', genre: 'Progressive House', category: 'Bass', description: 'Deep Reese bass with movement', parameters: { detune: 0.15, unison: 5, cutoff: 600, resonance: 0.25, drive: 0.6 } },
  { id: 'ph-synth-7', name: 'Organ Stab', genre: 'Progressive House', category: 'Stabs', description: 'Vintage organ stab for breakdowns', parameters: { attack: 0.01, decay: 0.5, cutoff: 3500, resonance: 0.1, release: 0.6 } },
  { id: 'ph-synth-8', name: 'Chord Stab', genre: 'Progressive House', category: 'Chords', description: 'Full chord stab for drops', parameters: { attack: 0.01, decay: 0.8, cutoff: 6000, resonance: 0.2, release: 1.0 } },
  // Trance
  { id: 'tr-synth-1', name: 'Uplifting Lead', genre: 'Trance', category: 'Leads', description: 'Euphoric supersaw lead for trance', parameters: { detune: 0.1, unison: 9, cutoff: 7000, resonance: 0.3, attack: 0.01, release: 0.8, lfoRate: 0.5 } },
  { id: 'tr-synth-2', name: 'Pluck Trance', genre: 'Trance', category: 'Plucks', description: 'Classic trance pluck with delay', parameters: { attack: 0.003, decay: 0.6, cutoff: 5000, resonance: 0.4, release: 0.3 } },
  { id: 'tr-synth-3', name: 'Atmospheric Pad', genre: 'Trance', category: 'Pads', description: 'Ethereal pad for breakdowns', parameters: { cutoff: 2500, resonance: 0.1, detune: 0.06, attack: 2.0, release: 5.0 } },
  { id: 'tr-synth-4', name: 'Acid Bass Trance', genre: 'Trance', category: 'Bass', description: 'Driving acid bass for trance', parameters: { cutoff: 1200, resonance: 0.9, unison: 2, drive: 0.5 } },
  { id: 'tr-synth-5', name: 'Arp Lead', genre: 'Trance', category: 'Arps', description: 'Bright arpeggiated lead', parameters: { attack: 0.005, decay: 0.2, cutoff: 6500, resonance: 0.2, release: 0.15 } },
  { id: 'tr-synth-6', name: 'Vocal Chord', genre: 'Trance', category: 'Chords', description: 'Vowel-like chord synth', parameters: { cutoff: 3000, resonance: 0.3, detune: 0.04, attack: 0.1, release: 1.5 } },
  { id: 'tr-synth-7', name: 'Squelch Bass', genre: 'Trance', category: 'Bass', description: 'Squelchy bass for buildups', parameters: { cutoff: 900, resonance: 0.95, drive: 0.7, envelope: 0.6 } },
  { id: 'tr-synth-8', name: 'Ethereal Texture', genre: 'Trance', category: 'Textures', description: 'Spacey texture layer', parameters: { cutoff: 1800, resonance: 0.05, detune: 0.1, attack: 3.0, release: 6.0 } },
  // Techno
  { id: 'tk-synth-1', name: 'Dark Lead', genre: 'Techno', category: 'Leads', description: 'Industrial dark lead synth', parameters: { detune: 0.08, unison: 4, cutoff: 4000, resonance: 0.5, attack: 0.005, release: 0.3 } },
  { id: 'tk-synth-2', name: 'Acid Techno', genre: 'Techno', category: 'Bass', description: 'Classic acid 909 bass', parameters: { cutoff: 700, resonance: 0.92, drive: 0.6, envelope: 0.7 } },
  { id: 'tk-synth-3', name: 'Noise Hit', genre: 'Techno', category: 'FX', description: 'Noise-based percussive hit', parameters: { attack: 0.001, decay: 0.4, cutoff: 8000, resonance: 0.1, release: 0.2 } },
  { id: 'tk-synth-4', name: 'Industrial Pad', genre: 'Techno', category: 'Pads', description: 'Gritty industrial pad', parameters: { cutoff: 2200, resonance: 0.4, detune: 0.12, attack: 1.0, release: 3.0 } },
  { id: 'tk-synth-5', name: 'Metallic Perc', genre: 'Techno', category: 'Percussion', description: 'Metallic percussion sound', parameters: { attack: 0.001, decay: 0.15, cutoff: 6000, resonance: 0.6, release: 0.1 } },
  { id: 'tk-synth-6', name: 'Sub Bass', genre: 'Techno', category: 'Bass', description: 'Deep sub bass for techno', parameters: { cutoff: 150, resonance: 0.0, detune: 0.0, attack: 0.01, release: 0.2 } },
  { id: 'tk-synth-7', name: 'Wobbly Bass', genre: 'Techno', category: 'Bass', description: 'Wobbling bass with LFO modulation', parameters: { cutoff: 500, resonance: 0.3, detune: 0.05, lfoRate: 3.5, lfoDepth: 0.6 } },
  { id: 'tk-synth-8', name: 'Stab FX', genre: 'Techno', category: 'FX', description: 'Sharp stab for accents', parameters: { attack: 0.002, decay: 0.25, cutoff: 7000, resonance: 0.35, release: 0.15 } },
];

interface InstrumentsViewProps {
  genre: 'Progressive House' | 'Trance' | 'Techno';
}

function InstrumentsView({ genre }: InstrumentsViewProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPreset, setSelectedPreset] = useState<PresetInfo | null>(null);

  const filteredPresets = presets.filter((p) => {
    const matchesGenre = p.genre === genre;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesGenre && matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(presets.filter((p) => p.genre === genre).map((p) => p.category)))];

  return (
    <div className="main-panel">
      <div className="title" style={{ marginBottom: 4 }}>Instruments</div>
      <div className="caption" style={{ marginBottom: 24 }}>
        Browse and preview synth presets for {genre}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-3" style={{ marginBottom: 20 }}>
        <input
          className="input"
          style={{ maxWidth: 250 }}
          placeholder="Search presets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="select" style={{ maxWidth: 160 }} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
          ))}
        </select>
      </div>

      {/* Preset Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
        {filteredPresets.map((preset) => (
          <div
            key={preset.id}
            className="card"
            onClick={() => setSelectedPreset(preset)}
            style={{ cursor: 'pointer' }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
              <div className="body" style={{ fontWeight: 600 }}>{preset.name}</div>
              <span className={`badge badge-${preset.category === 'Bass' ? 'basic' : preset.category === 'Leads' ? 'medium' : 'advanced'}`}>
                {preset.category}
              </span>
            </div>
            <div className="caption">{preset.description}</div>
          </div>
        ))}
      </div>

      {/* Preset Detail Panel */}
      {selectedPreset && (
        <div className="card" style={{ marginTop: 20, animation: 'fadeIn 0.2s ease-out' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
            <div className="heading">{selectedPreset.name}</div>
            <button className="btn btn-sm" onClick={() => setSelectedPreset(null)}>Close</button>
          </div>
          <div className="body" style={{ marginBottom: 16 }}>{selectedPreset.description}</div>
          <div className="small" style={{ marginBottom: 12 }}>Parameters</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
            {Object.entries(selectedPreset.parameters).map(([key, value]) => (
              <div key={key}>
                <div className="small" style={{ marginBottom: 4, textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</div>
                <div className="body">{value}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2" style={{ marginTop: 16 }}>
            <button className="btn btn-primary btn-sm">Load in Ableton</button>
            <button className="btn btn-sm">Save as Custom</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InstrumentsView;
