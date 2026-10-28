import { useState } from 'react';

interface Variation {
  id: string;
  name: string;
  type: string;
  description: string;
  bars: number;
  changes: string[];
}

interface VariationData {
  genre: string;
  variations: Variation[];
}

const variationData: VariationData[] = [
  {
    genre: 'Progressive House',
    variations: [
      { id: 'ph-v1', name: 'Drum Variation', type: 'Rhythmic', description: 'Remove and add drum elements for variation', bars: 16, changes: ['Remove hi-hats for 4 bars', 'Add open hat on off-beats', 'Remove kick for last 2 bars', 'Add percussion layer'] },
      { id: 'ph-v2', name: 'Filter Variation', type: 'Spectral', description: 'Change filter settings on existing elements', bars: 16, changes: ['Close filter to 40% for 8 bars', 'Add chorus on pad', 'Open filter back to 80%', 'Remove chorus, add delay'] },
      { id: 'ph-v3', name: 'Layer Swap', type: 'Textural', description: 'Replace one element with a similar but different one', bars: 16, changes: ['Replace pluck with arpeggio', 'Keep rhythm pattern identical', 'Add subtle reverb to new element', 'Crossfade over 2 bars'] },
      { id: 'ph-v4', name: 'Rhythm Variation', type: 'Rhythmic', description: 'Modify the rhythmic pattern while keeping the same elements', bars: 16, changes: ['Add 16th note hats', 'Remove kick on bars 3-4', 'Add ghost notes on snare', 'Syncopate bass pattern'] },
      { id: 'ph-v5', name: 'Harmonic Variation', type: 'Harmonic', description: 'Change chord voicing while keeping progression', bars: 16, changes: ['Invert chord voicings', 'Add 9th extensions', 'Change root position to 1st inversion', 'Add passing chords'] },
      { id: 'ph-v6', name: 'Effect Variation', type: 'FX', description: 'Change effect chain settings for variation', bars: 16, changes: ['Increase reverb decay to 5s', 'Add delay throw on bar 8', 'Switch chorus to phaser', 'Reduce delay feedback by 50%'] },
    ],
  },
  {
    genre: 'Trance',
    variations: [
      { id: 'tr-v1', name: 'Lead Variation', type: 'Melodic', description: 'Modify lead melody with variations', bars: 16, changes: ['Add octave jumps in second half', 'Insert grace notes between phrases', 'Change rhythm on bar 3', 'Add sustain to final note'] },
      { id: 'tr-v2', name: 'Breakdown Variation', type: 'Atmospheric', description: 'Create variation in breakdown sections', bars: 32, changes: ['Remove lead, keep pad', 'Add vocal chops', 'Introduce arp layer', 'Bring lead back with delay'] },
      { id: 'tr-v3', name: 'Arp Variation', type: 'Rhythmic', description: 'Modify arpeggiated patterns', bars: 16, changes: ['Change arp pattern direction', 'Add probability to steps', 'Shift octave range', 'Add accent on random steps'] },
      { id: 'tr-v4', name: 'Stack Variation', type: 'Textural', description: 'Change chord stack configuration', bars: 16, changes: ['Add unison layer', 'Remove top octave for 4 bars', 'Add detuned duplicate', 'Switch to open voicing'] },
      { id: 'tr-v5', name: 'Bass Variation', type: 'Rhythmic', description: 'Modify bass pattern for variation', bars: 16, changes: ['Add off-beat bass notes', 'Remove bass for 2 bars', 'Add slide between notes', 'Change bass rhythm pattern'] },
      { id: 'tr-v6', name: 'Transition Variation', type: 'FX', description: 'Create unique transition variations', bars: 8, changes: ['Reverse cymbal + noise rise', 'Snare roll + filter sweep', 'Vocal chop + riser', 'Silence + impact hit'] },
    ],
  },
  {
    genre: 'Techno',
    variations: [
      { id: 'tk-v1', name: 'Percussion Variation', type: 'Rhythmic', description: 'Subtle percussion changes for evolution', bars: 16, changes: ['Remove one percussion layer', 'Add ghost hit on off-beat', 'Change hi-hat pattern', 'Add new percussion element'] },
      { id: 'tk-v2', name: 'Filter Evolution', type: 'Spectral', description: 'Gradual filter changes over multiple sections', bars: 32, changes: ['Close filter by 10% every 8 bars', 'Open filter back over next 16 bars', 'Add resonance peak on transition', 'Switch filter type LP to BP'] },
      { id: 'tk-v3', name: 'Pattern Probability', type: 'Algorithmic', description: 'Use probability-based pattern variation', bars: 16, changes: ['Set 80% probability on hat layer', 'Set 50% on percussion', 'Set 30% on FX hits', 'Record the result for variation'] },
      { id: 'tk-v4', name: 'Element Removal', type: 'Minimal', description: 'Strategic removal for tension building', bars: 16, changes: ['Remove kick for 4 bars', 'Remove bass for 8 bars', 'Keep only hats and texture', 'Bring kick back with impact'] },
      { id: 'tk-v5', name: 'Modulation Change', type: 'Textural', description: 'Change modulation routing for new movement', bars: 16, changes: ['Route LFO to filter instead of pitch', 'Change LFO rate to 1/8', 'Add second LFO to reverb send', 'Randomize LFO phase'] },
      { id: 'tk-v6', name: 'Loop Extension', type: 'Structural', description: 'Extend or contract loop length for variation', bars: 32, changes: ['Extend loop by 4 bars', 'Remove last 2 bars for 8 bars', 'Add fill at bar 12', 'Return to original loop'] },
    ],
  },
];

interface EditVariationViewProps {
  genre: 'Progressive House' | 'Trance' | 'Techno';
}

function EditVariationView({ genre }: EditVariationViewProps) {
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);
  const [selectedSteps, setSelectedSteps] = useState<Set<number>>(new Set());
  const data = variationData.find((d) => d.genre === genre) || variationData[0];

  const toggleStep = (idx: number) => {
    setSelectedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="main-panel">
      <div className="title" style={{ marginBottom: 4 }}>Edit / Variation</div>
      <div className="caption" style={{ marginBottom: 24 }}>
        Variation builder for {genre}
      </div>

      {/* Variation List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
        {data.variations.map((v) => (
          <div
            key={v.id}
            className="card"
            style={{ cursor: 'pointer' }}
            onClick={() => { setSelectedVariation(v); setSelectedSteps(new Set()); }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
              <div className="body" style={{ fontWeight: 600 }}>{v.name}</div>
              <span className="small">{v.bars} bars</span>
            </div>
            <div className="caption">{v.description}</div>
            <div className="small" style={{ marginTop: 4, color: 'var(--accent-ph)' }}>{v.type}</div>
          </div>
        ))}
      </div>

      {/* Variation Detail */}
      {selectedVariation && (
        <div className="card" style={{ marginTop: 20, animation: 'fadeIn 0.2s ease-out' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
            <div>
              <div className="heading">{selectedVariation.name}</div>
              <div className="caption">{selectedVariation.type} · {selectedVariation.bars} bars</div>
            </div>
            <button className="btn btn-sm" onClick={() => setSelectedVariation(null)}>Close</button>
          </div>

          <div className="body" style={{ marginBottom: 16 }}>{selectedVariation.description}</div>

          {/* Step Visualizer */}
          <div className="small" style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Step-by-Step Changes ({selectedVariation.changes.length} steps)
          </div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
            {selectedVariation.changes.map((_, idx) => (
              <div
                key={idx}
                onClick={() => toggleStep(idx)}
                style={{
                  flex: 1,
                  height: 32,
                  borderRadius: 4,
                  background: selectedSteps.has(idx) ? 'var(--accent-ph)' : 'var(--bg-primary)',
                  border: `1px solid ${selectedSteps.has(idx) ? 'var(--accent-ph)' : 'var(--border-color)'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  color: selectedSteps.has(idx) ? '#1a1a2e' : 'var(--text-muted)',
                  fontWeight: 600,
                  transition: 'all 0.15s ease',
                }}
              >
                {idx + 1}
              </div>
            ))}
          </div>

          {/* Step Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {selectedVariation.changes.map((change, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '10px 14px',
                  background: selectedSteps.has(idx) ? 'var(--accent-ph)11' : 'var(--bg-primary)',
                  borderRadius: 6,
                  border: `1px solid ${selectedSteps.has(idx) ? 'var(--accent-ph)44' : 'var(--border-color)'}`,
                  cursor: 'pointer',
                }}
                onClick={() => toggleStep(idx)}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    background: selectedSteps.has(idx) ? 'var(--accent-ph)' : 'var(--bg-panel)',
                    color: selectedSteps.has(idx) ? '#1a1a2e' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </div>
                <div className="body">{change}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2" style={{ marginTop: 16 }}>
            <button className="btn btn-primary btn-sm">Apply Variation</button>
            <button className="btn btn-sm">Save as Template</button>
            <button className="btn btn-sm">Export to Ableton</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditVariationView;
