import { useState } from 'react';

interface GainStage {
  name: string;
  targetDb: string;
  currentDb: number;
  peakDb: number;
  rmsDb: number;
  description: string;
  tips: string[];
}

interface GainData {
  genre: string;
  stages: GainStage[];
}

const gainData: GainData[] = [
  {
    genre: 'Progressive House',
    stages: [
      { name: 'Individual Tracks', targetDb: '-6 dB', currentDb: -8, peakDb: -3, rmsDb: -12, description: 'Gain staging for individual tracks', tips: ['Keep peaks below -3 dB', 'Aim for RMS around -12 dB', 'Use gain before effects, not after'] },
      { name: 'Track Buss', targetDb: '-6 dB', currentDb: -5, peakDb: -2, rmsDb: -10, description: 'Summed track buss gain', tips: ['Check each track buss individually', 'Use a limiter on each buss', 'Leave headroom for the mix buss'] },
      { name: 'Mix Buss', targetDb: '-6 dB', currentDb: -4, peakDb: -1, rmsDb: -8, description: 'Overall mix buss level', tips: ['Peak should not exceed -1 dB', 'Target RMS around -8 dB', 'Use a transparent limiter for final ceiling'] },
      { name: 'Master Bus', targetDb: '-3 dBTP', currentDb: -2, peakDb: -1.5, rmsDb: -6, description: 'Final master bus with true peak', tips: ['True peak should not exceed -1 dBTP', 'Target LUFS around -14 for streaming', 'Use a true peak limiter at the end'] },
    ],
  },
  {
    genre: 'Trance',
    stages: [
      { name: 'Individual Tracks', targetDb: '-6 dB', currentDb: -7, peakDb: -2, rmsDb: -11, description: 'Gain staging for individual tracks', tips: ['Leads should peak around -3 dB', 'Bass should be controlled with a compressor', 'Vocals need careful gain staging'] },
      { name: 'Group Busses', targetDb: '-6 dB', currentDb: -5, peakDb: -2, rmsDb: -9, description: 'Grouped track busses', tips: ['Leads buss: -4 dB peak', 'Bass buss: -6 dB peak', 'Drums buss: -3 dB peak'] },
      { name: 'Mix Buss', targetDb: '-6 dB', currentDb: -3, peakDb: -1, rmsDb: -7, description: 'Overall mix buss level', tips: ['Trance mixes are loud — watch peaks', 'Use a bus compressor for glue', 'Leave headroom for mastering'] },
      { name: 'Master Bus', targetDb: '-3 dBTP', currentDb: -1.5, peakDb: -1, rmsDb: -5, description: 'Final master bus with true peak', tips: ['Target LUFS -8 to -6 for trance', 'True peak limiter essential', 'Check on multiple systems'] },
    ],
  },
  {
    genre: 'Techno',
    stages: [
      { name: 'Individual Tracks', targetDb: '-6 dB', currentDb: -9, peakDb: -4, rmsDb: -14, description: 'Gain staging for individual tracks', tips: ['Kick should peak around -2 dB', 'Bass and kick need careful balance', 'Percussion can be hotter (-4 dB peak)'] },
      { name: 'Group Busses', targetDb: '-6 dB', currentDb: -6, peakDb: -3, rmsDb: -10, description: 'Grouped track busses', tips: ['Drums buss: -3 dB peak', 'Bass buss: -5 dB peak', 'FX buss: -8 dB peak'] },
      { name: 'Mix Buss', targetDb: '-6 dB', currentDb: -4, peakDb: -1, rmsDb: -8, description: 'Overall mix buss level', tips: ['Techno mixes need punch', 'Use minimal compression on mix buss', 'Check phase correlation'] },
      { name: 'Master Bus', targetDb: '-3 dBTP', currentDb: -2, peakDb: -1, rmsDb: -6, description: 'Final master bus with true peak', tips: ['Target LUFS -10 to -8 for techno', 'True peak limiter at -1 dBTP', 'Check club system translation'] },
    ],
  },
];

interface GainStagingViewProps {
  genre: 'Progressive House' | 'Trance' | 'Techno';
}

function GainStagingView({ genre }: GainStagingViewProps) {
  const [selectedStage, setSelectedStage] = useState<GainStage | null>(null);
  const data = gainData.find((d) => d.genre === genre) || gainData[0];
  const accentColor = genre === 'Progressive House' ? '#f39c12' : genre === 'Trance' ? '#9b59b6' : '#2ecc71';

  return (
    <div className="main-panel">
      <div className="title" style={{ marginBottom: 4 }}>Gain Staging</div>
      <div className="caption" style={{ marginBottom: 24 }}>
        Level management for {genre}
      </div>

      {/* Gain Stages Overview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.stages.map((stage, idx) => {
          const level = Math.abs(stage.currentDb);
          const barWidth = Math.min(level / 10 * 100, 100);
          return (
            <div
              key={idx}
              className="card"
              style={{ cursor: 'pointer', padding: '14px 16px' }}
              onClick={() => setSelectedStage(selectedStage === stage ? null : stage)}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                <div>
                  <div className="body" style={{ fontWeight: 600 }}>{stage.name}</div>
                  <div className="caption">Target: {stage.targetDb}</div>
                </div>
                <div className="flex gap-3">
                  <div className="text-center">
                    <div className="small">Peak</div>
                    <div className="body" style={{ color: stage.peakDb < -2 ? 'var(--success)' : 'var(--warning)' }}>{stage.peakDb} dB</div>
                  </div>
                  <div className="text-center">
                    <div className="small">RMS</div>
                    <div className="body">{stage.rmsDb} dB</div>
                  </div>
                </div>
              </div>

              {/* Level Bar */}
              <div style={{ height: 6, background: 'var(--bg-primary)', borderRadius: 3, overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${barWidth}%`,
                    height: '100%',
                    background: stage.currentDb < -6 ? accentColor : stage.currentDb < -3 ? '#f39c12' : '#e74c3c',
                    borderRadius: 3,
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Stage Detail */}
      {selectedStage && (
        <div className="card" style={{ marginTop: 20, animation: 'fadeIn 0.2s ease-out' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
            <div>
              <div className="heading">{selectedStage.name}</div>
              <div className="caption">Target: {selectedStage.targetDb} · Current: {selectedStage.currentDb} dB</div>
            </div>
            <button className="btn btn-sm" onClick={() => setSelectedStage(null)}>Close</button>
          </div>
          <div className="body" style={{ marginBottom: 16 }}>{selectedStage.description}</div>

          {/* Level Meter Visualization */}
          <div style={{ marginBottom: 16 }}>
            <div className="small" style={{ marginBottom: 6 }}>Level Visualization</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 60 }}>
              {/* Peak */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', height: `${Math.abs(selectedStage.peakDb) / 10 * 100}%`, background: accentColor, borderRadius: 4, transition: 'height 0.3s' }} />
                <div className="small" style={{ marginTop: 4 }}>Peak</div>
                <div className="small">{selectedStage.peakDb} dB</div>
              </div>
              {/* RMS */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', height: `${Math.abs(selectedStage.rmsDb) / 10 * 100}%`, background: accentColor + '88', borderRadius: 4, transition: 'height 0.3s' }} />
                <div className="small" style={{ marginTop: 4 }}>RMS</div>
                <div className="small">{selectedStage.rmsDb} dB</div>
              </div>
              {/* Target */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', height: '60%', background: 'var(--border-color)', borderRadius: 4, border: `1px dashed ${accentColor}` }} />
                <div className="small" style={{ marginTop: 4 }}>Target</div>
                <div className="small">{selectedStage.targetDb}</div>
              </div>
            </div>
          </div>

          <div className="small" style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tips</div>
          <ul style={{ paddingLeft: 20 }}>
            {selectedStage.tips.map((tip, idx) => (
              <li key={idx} className="body" style={{ marginBottom: 6 }}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GainStagingView;
