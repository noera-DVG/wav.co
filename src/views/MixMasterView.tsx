import { useState } from 'react';

interface MixTool {
  id: string;
  name: string;
  category: string;
  description: string;
  settings: { name: string; value: string; note: string }[];
  tips: string[];
}

interface MasteringTool {
  id: string;
  name: string;
  description: string;
  target: string;
  settings: { name: string; value: string; note: string }[];
  tips: string[];
}

const mixTools: MixTool[] = [
  { id: 'mix-1', name: 'EQ Cleaning', category: 'EQ', description: 'Clean up frequency conflicts between elements', settings: [{ name: 'Low Cut (Kick)', value: '30-40 Hz', note: 'Remove subsonic' }, { name: 'Low Cut (Non-Kick)', value: '80-120 Hz', note: 'Make room for kick' }, { name: 'High Cut (Full Mix)', value: '18-20 kHz', note: 'Remove ultrasonic' }, { name: 'Mid Scoop', value: '-2 dB @ 300-500 Hz', note: 'Reduce mud' }], tips: ['Cut before you boost', 'Use a spectrum analyzer', 'Check in mono'] },
  { id: 'mix-2', name: 'Sidechain Compression', category: 'Dynamics', description: 'Create space between kick and bass/other elements', settings: [{ name: 'Kick Source', value: 'Kick track', note: 'Use a clean kick' }, { name: 'Ratio', value: '4:1 - 8:1', note: 'Higher for more pumping' }, { name: 'Attack', value: '1-10 ms', note: 'Fast for punch' }, { name: 'Release', value: '100-300 ms', note: 'Sync to tempo' }], tips: ['Try different sidechain sources', 'Automate sidechain amount', 'Use multiband sidechain for precision'] },
  { id: 'mix-3', name: 'Stereo Imaging', category: 'Spatial', description: 'Create width while maintaining mono compatibility', settings: [{ name: 'Kick/Bass', value: 'Mono', note: 'Keep low end mono' }, { name: 'Pads', value: 'Wide (80-100%)', note: 'Max width for atmosphere' }, { name: 'Leads', value: 'Moderate (40-60%)', note: 'Slight width for presence' }, { name: 'Vocals', value: 'Mono', note: 'Center for clarity' }], tips: ['Check phase correlation', 'Use mid-side processing', 'Keep essential elements centered'] },
  { id: 'mix-4', name: 'Reverb Management', category: 'Spatial', description: 'Control reverb to maintain clarity', settings: [{ name: 'Send Levels', value: '-12 to -6 dB', note: 'Start low, increase as needed' }, { name: 'Decay Times', value: '1.5-3.0 s', note: 'Shorter for clarity' }, { name: 'Pre-Delay', value: '20-40 ms', note: 'Keeps transients clear' }, { name: 'EQ on Reverb', value: 'HP 400 Hz, LP 8 kHz', note: 'Remove mud and fizz' }], tips: ['Use different reverbs for different elements', 'High-pass reverb returns', 'Automate reverb sends per section'] },
  { id: 'mix-5', name: 'Saturation & Harmonics', category: 'Color', description: 'Add warmth and presence through saturation', settings: [{ name: 'Tape Saturation', value: '0.5-1.0 dB', note: 'Subtle on mix buss' }, { name: 'Tube Saturation', value: '1-2 dB', note: 'On leads and vocals' }, { name: 'Exciter', value: '10-20%', note: 'On high frequencies' }, { name: 'Harmonic Generator', value: '2nd harmonic', note: 'Adds warmth' }], tips: ['Less is more with saturation', 'Check in mono after saturation', 'Use on individual tracks before buss'] },
  { id: 'mix-6', name: 'Dynamic EQ', category: 'Dynamics', description: 'Frequency-specific dynamic processing', settings: [{ name: 'Mud Cut', value: '250-400 Hz, -3 dB', note: 'Dynamic cut when mud appears' }, { name: 'Harshness Cut', value: '2-4 kHz, -2 dB', note: 'Reduce harshness dynamically' }, { name: 'Low End Control', value: '60-100 Hz, -2 dB', note: 'Control bass peaks' }, { name: 'Air Boost', value: '10-16 kHz, +2 dB', note: 'Dynamic air enhancement' }], tips: ['Use dynamic EQ instead of static EQ for problem frequencies', 'Set high threshold for subtle correction', 'Use wide Q for natural sound'] },
];

const masteringTools: MasteringTool[] = [
  { id: 'master-1', name: 'EQ Shaping', description: 'Final EQ adjustments for tonal balance', target: 'Genre-appropriate tonal balance', settings: [{ name: 'Broad EQ', value: '±1-2 dB', note: 'Subtle tonal shaping' }, { name: 'High Shelf', value: '+1-2 dB @ 12 kHz', note: 'Add air' }, { name: 'Low Shelf', value: '+0.5-1 dB @ 50 Hz', note: 'Add weight' }, { name: 'De-ess', value: '5-8 kHz', note: 'Control sibilance' }], tips: ['Make small adjustments', 'A/B with reference tracks', 'Check in mono and stereo'] },
  { id: 'master-2', name: 'Multiband Compression', description: 'Control dynamics in specific frequency ranges', target: 'Even frequency balance', settings: [{ name: 'Low Band', value: '20-200 Hz, 2:1', note: 'Control sub bass' }, { name: 'Mid Band', value: '200-4 kHz, 1.5:1', note: 'Glue the mids' }, { name: 'High Band', value: '4-20 kHz, 1.5:1', note: 'Control highs' }, { name: 'Threshold', value: '-20 to -15 dB', note: 'Light compression' }], tips: ['Use transparent settings', 'Look for 1-3 dB of gain reduction', 'Check for pumping artifacts'] },
  { id: 'master-3', name: 'Stereo Widening', description: 'Enhance stereo image for the master', target: 'Wide but mono-compatible', settings: [{ name: 'Mid-Side EQ', value: '+1 dB sides @ 10 kHz', note: 'Add width to highs' }, { name: 'Stereo Imager', value: '110-120%', note: 'Moderate widening' }, { name: 'Low End', value: 'Mono below 120 Hz', note: 'Keep lows mono' }, { name: 'Phase Check', value: 'Correlation > 0.3', note: 'Avoid phase issues' }], tips: ['Always check mono compatibility', 'Don\'t over-widen', 'Use reference tracks for comparison'] },
  { id: 'master-4', name: 'Limiting & Loudness', description: 'Final limiting for competitive loudness', target: 'Genre-appropriate LUFS', settings: [{ name: 'Input Gain', value: 'Adjust for target', note: 'Push until loud enough' }, { name: 'Output Ceiling', value: '-1.0 dBTP', note: 'True peak ceiling' }, { name: 'Target LUFS', value: 'PH: -14, TR: -8, TK: -10', note: 'Genre targets' }, { name: 'Release Time', value: 'Auto or 100-300 ms', note: 'Match to material' }], tips: ['Don\'t sacrifice transients', 'A/B with loud reference tracks', 'Check on multiple systems'] },
];

interface MixMasterViewProps {
  genre: 'Progressive House' | 'Trance' | 'Techno';
}

function MixMasterView({ genre }: MixMasterViewProps) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'mix' | 'master'>('mix');
  const accentColor = genre === 'Progressive House' ? '#f39c12' : genre === 'Trance' ? '#9b59b6' : '#2ecc71';

  const tools = activeTab === 'mix' ? mixTools : masteringTools;

  return (
    <div className="main-panel">
      <div className="title" style={{ marginBottom: 4 }}>Mix / Master</div>
      <div className="caption" style={{ marginBottom: 24 }}>
        Mix and mastering tools for {genre}
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2" style={{ marginBottom: 20 }}>
        <button
          className={`btn btn-sm ${activeTab === 'mix' ? 'btn-primary' : ''}`}
          onClick={() => setActiveTab('mix')}
        >
          Mix Tools
        </button>
        <button
          className={`btn btn-sm ${activeTab === 'master' ? 'btn-primary' : ''}`}
          onClick={() => setActiveTab('master')}
        >
          Mastering Tools
        </button>
      </div>

      {/* Tool Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="card"
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
              <div className="body" style={{ fontWeight: 600 }}>{tool.name}</div>
              <span className="small" style={{ color: accentColor }}>{'category' in tool ? tool.category : 'Mastering'}</span>
            </div>
            <div className="caption">{tool.description}</div>

            {selectedTool === tool.id && (
              <div style={{ marginTop: 14, animation: 'fadeIn 0.2s ease-out' }}>
                <div className="small" style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {activeTab === 'master' ? 'Target' : 'Settings'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {tool.settings.map((setting, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border-color)' }}>
                      <span className="caption">{setting.name}</span>
                      <span className="caption" style={{ color: accentColor }}>{setting.value}</span>
                    </div>
                  ))}
                </div>
                <div className="small" style={{ marginTop: 10, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tips</div>
                <ul style={{ paddingLeft: 16 }}>
                  {tool.tips.map((tip, idx) => (
                    <li key={idx} className="caption" style={{ marginBottom: 3 }}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MixMasterView;
