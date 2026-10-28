import { useState } from 'react';

interface TemplateTrack {
  name: string;
  chainId?: string;
  color?: string;
}

interface Template {
  id: string;
  name: string;
  genre: 'Progressive House' | 'Trance' | 'Techno';
  bpm: number;
  key: string;
  structure: string[];
  tracks: TemplateTrack[];
  description: string;
  notes: string[];
}

const templates: Template[] = [
  {
    id: 'ph-template-1',
    name: 'Progressive House — Full Arrangement',
    genre: 'Progressive House',
    bpm: 124,
    key: 'Am',
    structure: ['Intro (16 bars)', 'Build 1 (16 bars)', 'Breakdown 1 (16 bars)', 'Build 2 (16 bars)', 'Drop 1 (32 bars)', 'Break 1 (16 bars)', 'Build 3 (16 bars)', 'Drop 2 (32 bars)', 'Outro (16 bars)'],
    tracks: [
      { name: 'Lead', chainId: 'ph-synth-3', color: '#f39c12' },
      { name: 'Bass', chainId: 'ph-synth-2', color: '#e67e22' },
      { name: 'Drums', chainId: undefined, color: '#c0392b' },
      { name: 'Pads', chainId: 'ph-synth-1', color: '#2980b9' },
      { name: 'FX', chainId: undefined, color: '#8e44ad' },
      { name: 'Vocals', chainId: undefined, color: '#16a085' },
      { name: 'Master', chainId: undefined, color: '#2c3e50' },
    ],
    description: 'Complete progressive house arrangement template with full structure',
    notes: [
      'Start with minimal elements in intro',
      'Build energy gradually through each section',
      'Use filter automation for movement',
      'Keep the drop focused — less is more',
      'Add variation in second drop',
    ],
  },
  {
    id: 'tr-template-1',
    name: 'Trance — Uplift',
    genre: 'Trance',
    bpm: 138,
    key: 'Gm',
    structure: ['Intro (32 bars)', 'Build 1 (16 bars)', 'Breakdown 1 (32 bars)', 'Build 2 (16 bars)', 'Lead Drop (32 bars)', 'Break 1 (16 bars)', 'Build 3 (16 bars)', 'Final Drop (48 bars)', 'Outro (32 bars)'],
    tracks: [
      { name: 'Lead', chainId: 'tr-synth-1', color: '#9b59b6' },
      { name: 'Bass', chainId: 'tr-synth-4', color: '#8e44ad' },
      { name: 'Arp', chainId: 'tr-synth-5', color: '#3498db' },
      { name: 'Drums', chainId: undefined, color: '#e74c3c' },
      { name: 'Pads', chainId: 'tr-synth-3', color: '#2ecc71' },
      { name: 'FX', chainId: undefined, color: '#f39c12' },
      { name: 'Vocals', chainId: undefined, color: '#1abc9c' },
      { name: 'Master', chainId: undefined, color: '#2c3e50' },
    ],
    description: 'Uplifting trance template with emotional breakdowns and euphoric drops',
    notes: [
      'Use major chords for uplifting feel',
      'Breakdown should be emotional and spacious',
      'Lead drop needs maximum energy',
      'Final drop should be the biggest moment',
      'Include vocal elements for emotion',
    ],
  },
  {
    id: 'tk-template-1',
    name: 'Techno — Dark Loop',
    genre: 'Techno',
    bpm: 132,
    key: 'Bm',
    structure: ['16-bar loop with variation layers'],
    tracks: [
      { name: 'Kick', chainId: undefined, color: '#e74c3c' },
      { name: 'Hi-hats', chainId: undefined, color: '#f39c12' },
      { name: 'Percussion', chainId: undefined, color: '#2ecc71' },
      { name: 'Bass', chainId: 'tk-synth-2', color: '#9b59b6' },
      { name: 'Lead', chainId: 'tk-synth-1', color: '#3498db' },
      { name: 'FX', chainId: 'tk-synth-3', color: '#e67e22' },
      { name: 'Filter', chainId: 'tk-synth-7', color: '#1abc9c' },
      { name: 'Master', chainId: undefined, color: '#2c3e50' },
    ],
    description: 'Dark techno 16-bar loop template with variation layers and evolution',
    notes: [
      'Start minimal and add elements gradually',
      'Use automation for evolution within the loop',
      'Percussion is key — layer multiple elements',
      'Acid line adds character',
      'Variation through removal, not just addition',
    ],
  },
];

interface TemplatesViewProps {
  genre: 'Progressive House' | 'Trance' | 'Techno';
}

function TemplatesView({ genre }: TemplatesViewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const genreTemplates = templates.filter((t) => t.genre === genre);

  return (
    <div className="main-panel">
      <div className="title" style={{ marginBottom: 4 }}>Templates</div>
      <div className="caption" style={{ marginBottom: 24 }}>
        Project starters for {genre}
      </div>

      {/* Template Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {genreTemplates.map((template) => (
          <div
            key={template.id}
            className="card"
            style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
            onClick={() => setSelectedTemplate(selectedTemplate === template ? null : template)}
          >
            {/* Template Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="heading">{template.name}</div>
                  <div className="caption" style={{ marginTop: 4 }}>
                    {template.bpm} BPM · {template.key} · {template.structure.length} section{template.structure.length > 1 ? 's' : ''}
                  </div>
                </div>
                <button className="btn btn-primary btn-sm">Load Template</button>
              </div>
            </div>

            {/* Track Layout Visual */}
            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-color)' }}>
              <div className="small" style={{ marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Track Layout ({template.tracks.length} tracks)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {template.tracks.map((track, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px', borderRadius: 4, background: 'var(--bg-primary)' }}>
                    <div
                      style={{
                        width: 4,
                        height: 20,
                        borderRadius: 2,
                        background: track.color || 'var(--border-color)',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div className="body" style={{ fontSize: 13 }}>{track.name}</div>
                      {track.chainId && (
                        <div className="small" style={{ color: 'var(--text-muted)' }}>
                          Chain: {track.chainId}
                        </div>
                      )}
                    </div>
                    <div className="small" style={{ color: 'var(--text-muted)' }}>
                      {track.chainId ? '✓' : '—'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Structure */}
            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-color)' }}>
              <div className="small" style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Structure</div>
              <div className="flex gap-2 flex-wrap">
                {template.structure.map((section, idx) => (
                  <span key={idx} className="badge badge-basic" style={{ background: 'var(--bg-primary)' }}>
                    {section}
                  </span>
                ))}
              </div>
            </div>

            {/* Expanded Details */}
            {selectedTemplate === template && (
              <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-color)', animation: 'fadeIn 0.2s ease-out' }}>
                <div className="body" style={{ marginBottom: 12 }}>{template.description}</div>
                <div className="small" style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Production Notes</div>
                <ul style={{ paddingLeft: 20 }}>
                  {template.notes.map((note, idx) => (
                    <li key={idx} className="body" style={{ marginBottom: 4 }}>{note}</li>
                  ))}
                </ul>
                <div className="flex gap-2" style={{ marginTop: 16 }}>
                  <button className="btn btn-primary btn-sm">Load in Ableton</button>
                  <button className="btn btn-sm">Save as Custom</button>
                  <button className="btn btn-sm">Export .als</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplatesView;
