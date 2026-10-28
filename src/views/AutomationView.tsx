import { useState } from 'react';

interface AutomationMap {
  title: string;
  description: string;
  parameter: string;
  pattern: string;
  tips: string[];
}

interface AutomationData {
  genre: string;
  maps: AutomationMap[];
}

const automationData: AutomationData[] = [
  {
    genre: 'Progressive House',
    maps: [
      { title: 'Filter Cutoff Sweep', description: 'Gradual filter automation across a section', parameter: 'Filter Cutoff', pattern: 'Exponential rise over 16 bars', tips: ['Use logarithmic curve for natural feel', 'Combine with reverb send automation', 'Start subtle (10%) and build to 70%'] },
      { title: 'Reverb Send Modulation', description: 'Automate reverb send for spatial movement', parameter: 'Reverb Send', pattern: 'Sine wave over 8 bars', tips: ['Sync LFO to tempo (1/4 note)', 'Automate send amount for entry/exit', 'Combine with delay feedback for tails'] },
      { title: 'Delay Feedback Build', description: 'Increase delay feedback during buildups', parameter: 'Delay Feedback', pattern: 'Linear rise over 8 bars', tips: ['Cut delay before the drop', 'Sync delay time to tempo', 'Use ping-pong mode for width'] },
      { title: 'Volume Swell', description: 'Automate track volume for smooth transitions', parameter: 'Track Volume', pattern: 'Logarithmic rise over 4 bars', tips: ['Use crossfades between sections', 'Automate both send and return volumes', 'Combine with filter automation'] },
      { title: 'Chorus Depth Variation', description: 'Modulate chorus depth for evolving textures', parameter: 'Chorus Depth', pattern: 'Slow sine over 32 bars', tips: ['Use very slow LFO rate (0.05-0.1 Hz)', 'Combine with rate automation', 'Works great on pads and leads'] },
      { title: 'Sidechain Intensity', description: 'Vary sidechain pumping depth throughout a track', parameter: 'Sidechain Amount', pattern: 'Step automation (4 bars each)', tips: ['Increase sidechain intensity before drops', 'Reduce during breakdowns for space', 'Try different attack/release combos'] },
    ],
  },
  {
    genre: 'Trance',
    maps: [
      { title: 'Acid Filter Automation', description: 'Dynamic filter automation on acid bass lines', parameter: 'Filter Cutoff', pattern: '16th note LFO pattern', tips: ['Automate resonance peaks on kicks', 'Use different patterns per section', 'Combine with envelope modulation'] },
      { title: 'Lead LFO Modulation', description: 'Layer multiple LFOs on lead parameters', parameter: 'Lead Parameters', pattern: 'Multiple LFOs at different rates', tips: ['Use 3-4 LFOs per lead', 'Route to cutoff, pitch, and filter', 'Randomize LFO start positions for variation'] },
      { title: 'Breakdown Pad Rise', description: 'Gradual pad rise into the drop', parameter: 'Pad Volume + Filter', pattern: 'Logarithmic over 16 bars', tips: ['Open filter and increase volume simultaneously', 'Add reverb tail for atmosphere', 'Include a silence bar before drop'] },
      { title: 'Arp Rate Acceleration', description: 'Speed up arpeggiator leading into drops', parameter: 'Arp Rate', pattern: 'Step acceleration (16 bars)', tips: ['Start at 1/4, end at 1/32', 'Combine with filter opening', 'Add octave jumps at the end'] },
      { title: 'Vocal Delay Throws', description: 'Automated delay throws on vocal phrases', parameter: 'Delay Send', pattern: 'Triggered hits on phrase ends', tips: ['Use tempo-synced delay time', 'Automate feedback for tail length', 'EQ the delay send for clarity'] },
      { title: 'Stacked Chord Evolution', description: 'Gradual chord stack thickening', parameter: 'Unison Detune', pattern: 'Step automation (8 bars each)', tips: ['Start with 2 voices, build to 8', 'Add detune and unison layers', 'Combine with chorus depth increase'] },
    ],
  },
  {
    genre: 'Techno',
    maps: [
      { title: 'Filter Rhythm Patterns', description: 'Rhythmic filter automation for hypnotic patterns', parameter: 'Filter Cutoff', pattern: '16th note gated pattern', tips: ['Use different patterns per section', 'Combine with resonance peaks', 'Automate filter type (LP/HP/BP)'] },
      { title: 'Percussion Muting', description: 'Strategic muting for rhythmic variation', parameter: 'Track Mute', pattern: '16-bar muting pattern', tips: ['Remove elements every 16 bars', 'Add elements back selectively', 'Create tension through subtraction'] },
      { title: 'Noise Texture Sweep', description: 'Automate noise filter for evolving texture', parameter: 'Noise Filter', pattern: 'Slow sine over 32 bars', tips: ['Use very slow LFO (0.05 Hz)', 'Combine with volume automation', 'High-pass noise for subtle background'] },
      { title: 'Reverb Space Manipulation', description: 'Create space through reverb automation', parameter: 'Reverb Send', pattern: 'Step automation per section', tips: ['Increase reverb on breakdowns', 'Cut reverb on drops for punch', 'Automate decay time for transitions'] },
      { title: 'Modulation Matrix Routing', description: 'Complex modulation routing for evolving sounds', parameter: 'Multiple Parameters', pattern: 'Probability-based patterns', tips: ['Use step sequencer with randomization', 'Route LFOs to 3-4 parameters', 'Record automation manually for organic feel'] },
      { title: 'Kick-Sidechain Layering', description: 'Multi-layer sidechain for complex pumping', parameter: 'Multiple Sends', pattern: 'Different timescales per layer', tips: ['Layer fast (1/4) and slow (1 bar) sidechain', 'Automate sidechain amount per section', 'Use different compressors per layer'] },
    ],
  },
];

interface AutomationViewProps {
  genre: 'Progressive House' | 'Trance' | 'Techno';
}

function AutomationView({ genre }: AutomationViewProps) {
  const [selectedMap, setSelectedMap] = useState<AutomationMap | null>(null);
  const data = automationData.find((d) => d.genre === genre) || automationData[0];

  return (
    <div className="main-panel">
      <div className="title" style={{ marginBottom: 4 }}>Automation</div>
      <div className="caption" style={{ marginBottom: 24 }}>
        Parameter automation maps for {genre}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.maps.map((map, idx) => (
          <div
            key={idx}
            className="card"
            style={{ cursor: 'pointer', padding: '14px 16px' }}
            onClick={() => setSelectedMap(selectedMap === map ? null : map)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="body" style={{ fontWeight: 600 }}>{map.title}</div>
                <div className="caption">{map.description}</div>
              </div>
              <span className="small" style={{ color: 'var(--accent-ph)' }}>{map.parameter}</span>
            </div>
            <div className="caption" style={{ marginTop: 6, color: 'var(--text-muted)' }}>
              Pattern: {map.pattern}
            </div>

            {selectedMap === map && (
              <div style={{ marginTop: 14, animation: 'fadeIn 0.2s ease-out' }}>
                <div className="small" style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Implementation Tips</div>
                <ul style={{ paddingLeft: 20 }}>
                  {map.tips.map((tip, tIdx) => (
                    <li key={tIdx} className="body" style={{ marginBottom: 6 }}>{tip}</li>
                  ))}
                </ul>
                <div className="flex gap-2" style={{ marginTop: 12 }}>
                  <button className="btn btn-sm">Save as Template</button>
                  <button className="btn btn-sm">Export Automation</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AutomationView;
