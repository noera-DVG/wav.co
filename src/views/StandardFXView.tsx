import { useState } from 'react';
import { EffectChain } from '../types';

const effectChains: EffectChain[] = [
  // Progressive House Chains
  { id: 'ph-basic-1', name: 'Progressive Pad Wash', genre: 'Progressive House', difficulty: 'Basic', description: 'Warm pad chain with gentle filter automation', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 200 }, { name: 'High Cut', value: 8000 }] }, { name: 'Chorus', parameters: [{ name: 'Rate', value: 0.3 }, { name: 'Depth', value: 0.6 }] }, { name: 'Reverb', parameters: [{ name: 'Decay', value: 3.2 }, { name: 'Damping', value: 0.7 }] }], bpmRange: [110, 126], keySuggestions: ['Am', 'Dm', 'Em', 'F'] },
  { id: 'ph-basic-2', name: 'Deep Bass Groove', genre: 'Progressive House', difficulty: 'Basic', description: 'Sub-bass chain with gentle saturation', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 30 }, { name: 'High Cut', value: 180 }] }, { name: 'Saturator', parameters: [{ name: 'Drive', value: 0.3 }, { name: 'Tone', value: 0.5 }] }, { name: 'Compressor', parameters: [{ name: 'Ratio', value: 4 }, { name: 'Attack', value: 10 }] }], bpmRange: [118, 126], keySuggestions: ['Am', 'Em', 'Bm', 'G'] },
  { id: 'ph-basic-3', name: 'Acid Lead', genre: 'Progressive House', difficulty: 'Basic', description: 'TB-303 inspired acid line with filter automation', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 100 }, { name: 'High Cut', value: 5000 }] }, { name: 'Filter Device', parameters: [{ name: 'Cutoff', value: 0.6 }, { name: 'Resonance', value: 0.8 }] }, { name: 'Reverb', parameters: [{ name: 'Decay', value: 1.5 }, { name: 'Damping', value: 0.5 }] }], bpmRange: [120, 128], keySuggestions: ['Am', 'Dm', 'Em'] },
  { id: 'ph-basic-4', name: 'Rhythmic Pluck', genre: 'Progressive House', difficulty: 'Basic', description: 'Short pluck with delay for rhythmic patterns', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 200 }, { name: 'High Cut', value: 6000 }] }, { name: 'Delay', parameters: [{ name: 'Time', value: 0.375 }, { name: 'Feedback', value: 0.4 }] }, { name: 'Compressor', parameters: [{ name: 'Ratio', value: 3 }, { name: 'Attack', value: 5 }] }], bpmRange: [118, 126], keySuggestions: ['Am', 'F', 'C', 'G'] },
  { id: 'ph-med-1', name: 'Evolving Texture', genre: 'Progressive House', difficulty: 'Medium', description: 'Layered evolving texture with multiple modulations', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 150 }, { name: 'High Cut', value: 7000 }] }, { name: 'Auto Filter', parameters: [{ name: 'Cutoff', value: 0.4 }, { name: 'LFO Rate', value: 0.15 }] }, { name: 'Chorus', parameters: [{ name: 'Rate', value: 0.2 }, { name: 'Depth', value: 0.5 }] }, { name: 'Reverb', parameters: [{ name: 'Decay', value: 4.0 }, { name: 'Damping', value: 0.6 }] }, { name: 'Pedal', parameters: [{ name: 'Drive', value: 0.2 }, { name: 'Tone', value: 0.7 }] }], bpmRange: [118, 126], keySuggestions: ['Am', 'Dm', 'F', 'Em'] },
  { id: 'ph-med-2', name: 'Driving Bass', genre: 'Progressive House', difficulty: 'Medium', description: 'Punchy driving bass with sidechain and saturation', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 25 }, { name: 'High Cut', value: 200 }] }, { name: 'Saturator', parameters: [{ name: 'Drive', value: 0.4 }, { name: 'Tone', value: 0.6 }] }, { name: 'Compressor', parameters: [{ name: 'Ratio', value: 6 }, { name: 'Attack', value: 1 }] }, { name: 'Sidechain', parameters: [{ name: 'Amount', value: 0.7 }, { name: 'Release', value: 0.3 }] }], bpmRange: [122, 128], keySuggestions: ['Am', 'Em', 'Bm'] },
  { id: 'ph-med-3', name: 'Atmospheric Lead', genre: 'Progressive House', difficulty: 'Medium', description: 'Layered lead with reverb, delay, and modulation', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 300 }, { name: 'High Cut', value: 8000 }] }, { name: 'Chorus', parameters: [{ name: 'Rate', value: 0.4 }, { name: 'Depth', value: 0.7 }] }, { name: 'Delay', parameters: [{ name: 'Time', value: 0.5 }, { name: 'Feedback', value: 0.35 }] }, { name: 'Reverb', parameters: [{ name: 'Decay', value: 3.5 }, { name: 'Damping', value: 0.8 }] }], bpmRange: [118, 126], keySuggestions: ['Am', 'Dm', 'F', 'G'] },
  { id: 'ph-adv-1', name: 'Complex Arp', genre: 'Progressive House', difficulty: 'Advanced', description: 'Multi-layered arpeggiator with complex modulation', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 200 }, { name: 'High Cut', value: 7500 }] }, { name: 'Arpeggiator', parameters: [{ name: 'Rate', value: 1/6 }, { name: 'Octave', value: 2 }] }, { name: 'Auto Filter', parameters: [{ name: 'Cutoff', value: 0.5 }, { name: 'LFO Rate', value: 0.25 }] }, { name: 'Delay', parameters: [{ name: 'Time', value: 0.25 }, { name: 'Feedback', value: 0.5 }] }, { name: 'Reverb', parameters: [{ name: 'Decay', value: 2.8 }, { name: 'Damping', value: 0.65 }] }, { name: 'Granular', parameters: [{ name: 'Size', value: 0.3 }, { name: 'Density', value: 0.5 }] }], bpmRange: [120, 126], keySuggestions: ['Am', 'Dm', 'Em', 'F#m'] },
  { id: 'ph-adv-2', name: 'Spectral Pad', genre: 'Progressive House', difficulty: 'Advanced', description: 'Spectral processing pad with granular textures', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 100 }, { name: 'High Cut', value: 9000 }] }, { name: 'Granular', parameters: [{ name: 'Size', value: 0.4 }, { name: 'Density', value: 0.6 }] }, { name: 'Spectral Delay', parameters: [{ name: 'Time', value: 0.75 }, { name: 'Feedback', value: 0.45 }] }, { name: 'Reverb', parameters: [{ name: 'Decay', value: 5.0 }, { name: 'Damping', value: 0.9 }] }, { name: 'Frequency Shifter', parameters: [{ name: 'Shift', value: 0.15 }, { name: 'Mix', value: 0.3 }] }], bpmRange: [110, 124], keySuggestions: ['Am', 'Dm', 'F', 'Cm'] },
  // Trance Chains
  { id: 'tr-basic-1', name: 'Uplifting Pad', genre: 'Trance', difficulty: 'Basic', description: 'Bright uplifting pad for trance energy', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 200 }, { name: 'High Cut', value: 8500 }] }, { name: 'Chorus', parameters: [{ name: 'Rate', value: 0.5 }, { name: 'Depth', value: 0.7 }] }, { name: 'Reverb', parameters: [{ name: 'Decay', value: 3.5 }, { name: 'Damping', value: 0.8 }] }], bpmRange: [132, 142], keySuggestions: ['Gm', 'Cm', 'Dm', 'Am'] },
  { id: 'tr-basic-2', name: 'Trance Bass', genre: 'Trance', difficulty: 'Basic', description: 'Driving trance bass with sub layer', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 20 }, { name: 'High Cut', value: 160 }] }, { name: 'Saturator', parameters: [{ name: 'Drive', value: 0.35 }, { name: 'Tone', value: 0.55 }] }, { name: 'Compressor', parameters: [{ name: 'Ratio', value: 4 }, { name: 'Attack', value: 5 }] }], bpmRange: [134, 142], keySuggestions: ['Gm', 'Dm', 'Am', 'Em'] },
  { id: 'tr-basic-3', name: 'Trance Lead', genre: 'Trance', difficulty: 'Basic', description: 'Classic supersaw lead for trance', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 100 }, { name: 'High Cut', value: 9000 }] }, { name: 'Chorus', parameters: [{ name: 'Rate', value: 0.6 }, { name: 'Depth', value: 0.8 }] }, { name: 'Delay', parameters: [{ name: 'Time', value: 0.375 }, { name: 'Feedback', value: 0.3 }] }], bpmRange: [136, 142], keySuggestions: ['Gm', 'Cm', 'Am'] },
  { id: 'tr-basic-4', name: 'Trance Pluck', genre: 'Trance', difficulty: 'Basic', description: 'Punchy trance pluck with delay', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 300 }, { name: 'High Cut', value: 7000 }] }, { name: 'Delay', parameters: [{ name: 'Time', value: 0.25 }, { name: 'Feedback', value: 0.45 }] }, { name: 'Reverb', parameters: [{ name: 'Decay', value: 2.0 }, { name: 'Damping', value: 0.6 }] }], bpmRange: [136, 142], keySuggestions: ['Gm', 'Am', 'Dm', 'Em'] },
  { id: 'tr-med-1', name: 'Euphoric Lead', genre: 'Trance', difficulty: 'Medium', description: 'Layered euphoric lead with multiple effects', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 150 }, { name: 'High Cut', value: 8000 }] }, { name: 'Chorus', parameters: [{ name: 'Rate', value: 0.4 }, { name: 'Depth', value: 0.65 }] }, { name: 'Delay', parameters: [{ name: 'Time', value: 0.5 }, { name: 'Feedback', value: 0.4 }] }, { name: 'Reverb', parameters: [{ name: 'Decay', value: 4.0 }, { name: 'Damping', value: 0.85 }] }, { name: 'Pedal', parameters: [{ name: 'Drive', value: 0.25 }, { name: 'Tone', value: 0.6 }] }], bpmRange: [136, 142], keySuggestions: ['Gm', 'Cm', 'Am', 'Dm'] },
  { id: 'tr-med-2', name: 'Breakdown Atmosphere', genre: 'Trance', difficulty: 'Medium', description: 'Ethereal breakdown pad with modulation', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 100 }, { name: 'High Cut', value: 6000 }] }, { name: 'Auto Filter', parameters: [{ name: 'Cutoff', value: 0.3 }, { name: 'LFO Rate', value: 0.1 }] }, { name: 'Reverb', parameters: [{ name: 'Decay', value: 5.0 }, { name: 'Damping', value: 0.9 }] }, { name: 'Delay', parameters: [{ name: 'Time', value: 0.75 }, { name: 'Feedback', value: 0.5 }] }], bpmRange: [132, 140], keySuggestions: ['Gm', 'Am', 'Cm', 'Em'] },
  { id: 'tr-med-3', name: 'Acid Trance', genre: 'Trance', difficulty: 'Medium', description: 'Acid bass with filter automation for trance', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 80 }, { name: 'High Cut', value: 4000 }] }, { name: 'Filter Device', parameters: [{ name: 'Cutoff', value: 0.55 }, { name: 'Resonance', value: 0.88 }] }, { name: 'Saturator', parameters: [{ name: 'Drive', value: 0.45 }, { name: 'Tone', value: 0.5 }] }, { name: 'Compressor', parameters: [{ name: 'Ratio', value: 5 }, { name: 'Attack', value: 2 }] }], bpmRange: [138, 144], keySuggestions: ['Gm', 'Dm', 'Am'] },
  // Techno Chains
  { id: 'tk-basic-1', name: 'Dark Pad', genre: 'Techno', difficulty: 'Basic', description: 'Dark, moody pad for techno', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 150 }, { name: 'High Cut', value: 6000 }] }, { name: 'Reverb', parameters: [{ name: 'Decay', value: 3.0 }, { name: 'Damping', value: 0.5 }] }, { name: 'Chorus', parameters: [{ name: 'Rate', value: 0.2 }, { name: 'Depth', value: 0.4 }] }], bpmRange: [124, 136], keySuggestions: ['Bm', 'F#m', 'Cm', 'Gm'] },
  { id: 'tk-basic-2', name: 'Techno Bass', genre: 'Techno', difficulty: 'Basic', description: 'Deep, punchy techno bass', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 20 }, { name: 'High Cut', value: 150 }] }, { name: 'Saturator', parameters: [{ name: 'Drive', value: 0.5 }, { name: 'Tone', value: 0.4 }] }, { name: 'Compressor', parameters: [{ name: 'Ratio', value: 8 }, { name: 'Attack', value: 1 }] }], bpmRange: [128, 136], keySuggestions: ['Bm', 'F#m', 'Cm'] },
  { id: 'tk-basic-3', name: 'Industrial Hit', genre: 'Techno', difficulty: 'Basic', description: 'Industrial percussive hit with distortion', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 100 }, { name: 'High Cut', value: 8000 }] }, { name: 'Saturator', parameters: [{ name: 'Drive', value: 0.7 }, { name: 'Tone', value: 0.3 }] }, { name: 'Compressor', parameters: [{ name: 'Ratio', value: 4 }, { name: 'Attack', value: 0.5 }] }], bpmRange: [130, 136], keySuggestions: ['Bm', 'Cm', 'F#m'] },
  { id: 'tk-basic-4', name: 'Techno Lead', genre: 'Techno', difficulty: 'Basic', description: 'Raw techno lead with filter', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 200 }, { name: 'High Cut', value: 7000 }] }, { name: 'Filter Device', parameters: [{ name: 'Cutoff', value: 0.45 }, { name: 'Resonance', value: 0.6 }] }, { name: 'Delay', parameters: [{ name: 'Time', value: 0.25 }, { name: 'Feedback', value: 0.35 }] }], bpmRange: [128, 136], keySuggestions: ['Bm', 'F#m', 'Cm', 'Gm'] },
  { id: 'tk-med-1', name: 'Acid Techno', genre: 'Techno', difficulty: 'Medium', description: 'Classic acid 909 with filter automation', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 60 }, { name: 'High Cut', value: 5000 }] }, { name: 'Filter Device', parameters: [{ name: 'Cutoff', value: 0.5 }, { name: 'Resonance', value: 0.92 }] }, { name: 'Saturator', parameters: [{ name: 'Drive', value: 0.6 }, { name: 'Tone', value: 0.35 }] }, { name: 'Compressor', parameters: [{ name: 'Ratio', value: 6 }, { name: 'Attack', value: 1 }] }, { name: 'Reverb', parameters: [{ name: 'Decay', value: 1.0 }, { name: 'Damping', value: 0.4 }] }], bpmRange: [130, 138], keySuggestions: ['Bm', 'F#m', 'Cm'] },
  { id: 'tk-med-2', name: 'Industrial Atmosphere', genre: 'Techno', difficulty: 'Medium', description: 'Gritty industrial texture with noise', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 100 }, { name: 'High Cut', value: 7000 }] }, { name: 'Saturator', parameters: [{ name: 'Drive', value: 0.55 }, { name: 'Tone', value: 0.45 }] }, { name: 'Reverb', parameters: [{ name: 'Decay', value: 2.5 }, { name: 'Damping', value: 0.55 }] }, { name: 'Frequency Shifter', parameters: [{ name: 'Shift', value: 0.1 }, { name: 'Mix', value: 0.25 }] }], bpmRange: [128, 136], keySuggestions: ['Bm', 'Cm', 'F#m', 'Gm'] },
  { id: 'tk-med-3', name: 'Wobble Bass', genre: 'Techno', difficulty: 'Medium', description: 'Wobbling bass with LFO modulation', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 25 }, { name: 'High Cut', value: 180 }] }, { name: 'Auto Filter', parameters: [{ name: 'Cutoff', value: 0.35 }, { name: 'LFO Rate', value: 0.58 }] }, { name: 'Saturator', parameters: [{ name: 'Drive', value: 0.4 }, { name: 'Tone', value: 0.5 }] }, { name: 'Compressor', parameters: [{ name: 'Ratio', value: 6 }, { name: 'Attack', value: 2 }] }], bpmRange: [130, 136], keySuggestions: ['Bm', 'F#m', 'Cm'] },
  // Techno Advanced
  { id: 'tk-adv-1', name: 'Modular Lead', genre: 'Techno', difficulty: 'Advanced', description: 'Multi-oscillator lead with complex modulation', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 150 }, { name: 'High Cut', value: 8000 }] }, { name: 'Auto Filter', parameters: [{ name: 'Cutoff', value: 0.4 }, { name: 'LFO Rate', value: 0.3 }] }, { name: 'Saturator', parameters: [{ name: 'Drive', value: 0.5 }, { name: 'Tone', value: 0.4 }] }, { name: 'Delay', parameters: [{ name: 'Time', value: 0.375 }, { name: 'Feedback', value: 0.4 }] }, { name: 'Reverb', parameters: [{ name: 'Decay', value: 2.0 }, { name: 'Damping', value: 0.5 }] }, { name: 'Granular', parameters: [{ name: 'Size', value: 0.25 }, { name: 'Density', value: 0.45 }] }], bpmRange: [130, 138], keySuggestions: ['Bm', 'F#m', 'Cm', 'Gm'] },
  { id: 'tk-adv-2', name: 'Spectral Techno', genre: 'Techno', difficulty: 'Advanced', description: 'Spectral processing for evolving techno textures', devices: [{ name: 'EQ Eight', parameters: [{ name: 'Low Cut', value: 80 }, { name: 'High Cut', value: 9000 }] }, { name: 'Granular', parameters: [{ name: 'Size', value: 0.35 }, { name: 'Density', value: 0.55 }] }, { name: 'Spectral Delay', parameters: [{ name: 'Time', value: 0.6 }, { name: 'Feedback', value: 0.4 }] }, { name: 'Reverb', parameters: [{ name: 'Decay', value: 4.0 }, { name: 'Damping', value: 0.7 }] }, { name: 'Frequency Shifter', parameters: [{ name: 'Shift', value: 0.12 }, { name: 'Mix', value: 0.2 }] }], bpmRange: [128, 136], keySuggestions: ['Bm', 'Cm', 'F#m', 'Gm'] },
];

interface StandardFXViewProps {
  genre: 'Progressive House' | 'Trance' | 'Techno';
}

function StandardFXView({ genre }: StandardFXViewProps) {
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [selectedChain, setSelectedChain] = useState<EffectChain | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredChains = effectChains.filter((c) => {
    const matchesGenre = c.genre === genre;
    const matchesDifficulty = difficultyFilter === 'All' || c.difficulty === difficultyFilter;
    return matchesGenre && matchesDifficulty;
  });

  const handleCopyToClipboard = (chain: EffectChain) => {
    const text = chain.devices.map((d) => `${d.name}: ${d.parameters.map((p) => `${p.name}=${p.value}`).join(', ')}`).join(' | ');
    navigator.clipboard.writeText(text);
    setCopiedId(chain.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="main-panel">
      <div className="title" style={{ marginBottom: 4 }}>Standard FX</div>
      <div className="caption" style={{ marginBottom: 24 }}>
        Effect chain library for {genre}
      </div>

      {/* Filter */}
      <div className="flex gap-2" style={{ marginBottom: 20 }}>
        {['All', 'Basic', 'Medium', 'Advanced'].map((d) => (
          <button
            key={d}
            className={`btn btn-sm ${d === difficultyFilter ? 'btn-primary' : ''}`}
            onClick={() => setDifficultyFilter(d)}
          >
            {d === 'All' ? 'All' : d}
          </button>
        ))}
      </div>

      {/* Chain List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filteredChains.map((chain) => (
          <div
            key={chain.id}
            className="card"
            style={{ cursor: 'pointer', padding: '14px 16px' }}
            onClick={() => setSelectedChain(chain)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="body" style={{ fontWeight: 600 }}>{chain.name}</div>
                <div className="caption">{chain.description}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`badge badge-${chain.difficulty.toLowerCase()}`}>{chain.difficulty}</span>
                <span className="small">{chain.devices.length} devices</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chain Detail */}
      {selectedChain && (
        <div className="card" style={{ marginTop: 20, animation: 'fadeIn 0.2s ease-out' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
            <div>
              <div className="heading">{selectedChain.name}</div>
              <div className="caption">{selectedChain.genre} · {selectedChain.difficulty} · {selectedChain.bpmRange[0]}-{selectedChain.bpmRange[1]} BPM</div>
            </div>
            <button className="btn btn-sm" onClick={() => setSelectedChain(null)}>Close</button>
          </div>

          <div className="body" style={{ marginBottom: 16 }}>{selectedChain.description}</div>

          <div className="small" style={{ marginBottom: 8 }}>Key Suggestions: {selectedChain.keySuggestions.join(', ')}</div>

          <div className="small" style={{ marginBottom: 12 }}>Device Chain ({selectedChain.devices.length} devices)</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {selectedChain.devices.map((device, idx) => (
              <div key={idx} style={{ background: 'var(--bg-primary)', borderRadius: 6, padding: '10px 14px' }}>
                <div className="body" style={{ fontWeight: 600, marginBottom: 6 }}>
                  {idx + 1}. {device.name}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {device.parameters.map((param, pIdx) => (
                    <span key={pIdx} className="caption" style={{ color: 'var(--text-secondary)' }}>
                      {param.name}: <strong style={{ color: 'var(--text-primary)' }}>{param.value}</strong>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2" style={{ marginTop: 16 }}>
            <button
              className="btn btn-sm"
              onClick={() => handleCopyToClipboard(selectedChain)}
            >
              {copiedId === selectedChain.id ? 'Copied!' : 'Copy to Clipboard'}
            </button>
            <button className="btn btn-sm">Export .adg</button>
            <button className="btn btn-sm">Load in Ableton</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StandardFXView;
