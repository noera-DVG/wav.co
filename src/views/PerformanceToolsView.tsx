import { useState } from 'react';

interface Technique {
  title: string;
  description: string;
  tips: string[];
  difficulty: 'Basic' | 'Medium' | 'Advanced';
}

interface PerformanceTechniques {
  genre: string;
  techniques: Technique[];
}

const performanceData: PerformanceTechniques[] = [
  {
    genre: 'Progressive House',
    techniques: [
      {
        title: 'Gradual Filter Opening',
        description: 'Slowly open a low-pass filter over 8-16 bars to build energy naturally.',
        tips: ['Start with cutoff at 20% and open to 80% over 16 bars', 'Use automation curves (logarithmic) for more natural feel', 'Combine with reverb decay increase for extra space'],
        difficulty: 'Basic',
      },
      {
        title: 'Layer Addition',
        description: 'Add elements one at a time to create progressive energy building.',
        tips: ['Start with drums, add bass, then pads, then lead', 'Each layer should enter on a bar boundary', 'Use volume automation to make each entry feel intentional'],
        difficulty: 'Basic',
      },
      {
        title: 'Reverse Reverb Swells',
        description: 'Create atmospheric swells into transitions using reverse reverb.',
        tips: ['Record a sound, apply heavy reverb, reverse the audio', 'Crossfade into the next section at the swell peak', 'Works great on pads, vocals, and percussive elements'],
        difficulty: 'Medium',
      },
      {
        title: 'Sidechain Pumping Variation',
        description: 'Modulate sidechain intensity to create dynamic movement.',
        tips: ['Start subtle (3dB) and increase to 8dB before the drop', 'Automate sidechain release time for variation', 'Try different attack times on different elements'],
        difficulty: 'Medium',
      },
      {
        title: 'White Noise Rises',
        description: 'Use filtered white noise sweeps for buildups.',
        tips: ['High-pass filter the noise and automate the cutoff upward', 'Add a drum roll or snare build underneath', 'Cut the noise just before the drop for impact'],
        difficulty: 'Basic',
      },
      {
        title: 'Harmonic Tension Building',
        description: 'Use suspended chords and tension notes to create harmonic anticipation.',
        tips: ['Use sus2/sus4 chords leading to the tonic', 'Add a dominant 7th or 9th for extra tension', 'Resolve on the drop for maximum release'],
        difficulty: 'Advanced',
      },
    ],
  },
  {
    genre: 'Trance',
    techniques: [
      {
        title: 'Euphoric Lead Layering',
        description: 'Stack multiple supersaw leads with slight detuning for maximum euphoria.',
        tips: ['Layer 3-5 saws with slightly different detune values', 'Pan some layers L/R for width', 'Use a bright EQ curve with emphasis on 2-4kHz'],
        difficulty: 'Medium',
      },
      {
        title: 'Breakdown to Drop Transition',
        description: 'Create dramatic breakdown-to-drop moments with silence and impact.',
        tips: ['Use a 1-bar silence before the drop for maximum impact', 'Add a reverse cymbal or riser leading into the drop', 'Layer a sub drop with the lead for fullness'],
        difficulty: 'Medium',
      },
      {
        title: 'Arpeggiated Buildups',
        description: 'Use arpeggios with increasing rate or range to build energy.',
        tips: ['Start with slow 1/4 notes and increase to 1/16', 'Expand octave range as energy builds', 'Combine with filter opening on the lead'],
        difficulty: 'Advanced',
      },
      {
        title: 'Vocal Chord Processing',
        description: 'Process vocals as instruments with trance-style effects.',
        tips: ['Add heavy reverb (4-6s decay) with delay send', 'Use pitch correction for ethereal effect', 'Sidechain vocals to the kick for pumping effect'],
        difficulty: 'Medium',
      },
      {
        title: 'Acid Line Automation',
        description: 'Automate filter cutoff and resonance on acid bass lines.',
        tips: ['Use LFO modulation on cutoff for movement', 'Automate resonance increases before drops', 'Try different waveforms (saw, square) for variety'],
        difficulty: 'Advanced',
      },
      {
        title: 'Trance Stack Chords',
        description: 'Create wide, powerful chord stacks for trance leads.',
        tips: ['Use major chords for uplifting, minor for dark trance', 'Stack 3-4 octaves of the same chord', 'Add unison detuned layers for thickness'],
        difficulty: 'Advanced',
      },
    ],
  },
  {
    genre: 'Techno',
    techniques: [
      {
        title: 'Minimal Element Manipulation',
        description: 'Subtly change one element at a time in a minimal arrangement.',
        tips: ['Remove or add one element every 16 bars', 'Automate filter cutoff or effects send on existing elements', 'Use muting patterns for variation instead of adding new elements'],
        difficulty: 'Basic',
      },
      {
        title: 'Percussive Layering',
        description: 'Layer multiple percussion sounds for complex rhythmic patterns.',
        tips: ['Combine 3-5 percussion sounds per pattern slot', 'Use different velocities for human feel', 'Pan percussion elements for spatial width'],
        difficulty: 'Basic',
      },
      {
        title: 'Filter Automation Patterns',
        description: 'Create rhythmic filter patterns through automation.',
        tips: ['Automate filter cutoff in 16th note patterns', 'Combine with resonance peaks for accentuation', 'Use different filter types (LP, HP, BP) for variety'],
        difficulty: 'Medium',
      },
      {
        title: 'Noise and Texture Layering',
        description: 'Add noise beds and texture layers for depth and atmosphere.',
        tips: ['Use filtered white/pink noise as background texture', 'Automate noise filter for subtle movement', 'Layer vinyl crackle or tape hiss for warmth'],
        difficulty: 'Medium',
      },
      {
        title: 'Modular-Style Sequencing',
        description: 'Create evolving sequences using modular-style techniques.',
        tips: ['Use step sequencers with probability/randomization', 'Route LFOs to multiple parameters for complex modulation', 'Record automation manually for organic feel'],
        difficulty: 'Advanced',
      },
      {
        title: 'Tension and Release Architecture',
        description: 'Build long-form tension and release structures for peak moments.',
        tips: ['Plan 32-64 bar tension sections', 'Use multiple layers of build (filter, density, volume)', 'Release with a sudden drop or minimal section'],
        difficulty: 'Advanced',
      },
    ],
  },
];

interface PerformanceToolsViewProps {
  genre: 'Progressive House' | 'Trance' | 'Techno';
}

function PerformanceToolsView({ genre }: PerformanceToolsViewProps) {
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const data = performanceData.find((d) => d.genre === genre) || performanceData[0];

  return (
    <div className="main-panel">
      <div className="title" style={{ marginBottom: 4 }}>Performance Tools</div>
      <div className="caption" style={{ marginBottom: 24 }}>
        Live performance techniques for {genre}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.techniques.map((technique, idx) => (
          <div
            key={idx}
            className="card"
            style={{ cursor: 'pointer', padding: '14px 16px' }}
            onClick={() => setSelectedTechnique(selectedTechnique === technique ? null : technique)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="body" style={{ fontWeight: 600 }}>{technique.title}</div>
                <div className="caption">{technique.description}</div>
              </div>
              <span className={`badge badge-${technique.difficulty.toLowerCase()}`}>{technique.difficulty}</span>
            </div>

            {selectedTechnique === technique && (
              <div style={{ marginTop: 14, animation: 'fadeIn 0.2s ease-out' }}>
                <div className="small" style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pro Tips</div>
                <ul style={{ paddingLeft: 20 }}>
                  {technique.tips.map((tip, tIdx) => (
                    <li key={tIdx} className="body" style={{ marginBottom: 6 }}>{tip}</li>
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

export default PerformanceToolsView;
