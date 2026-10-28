import { useState } from 'react';

interface ArrangementSection {
  name: string;
  bars: number;
  energy: number;
  elements: string[];
  description: string;
}

interface ArrangementTemplate {
  genre: string;
  bpm: number;
  key: string;
  sections: ArrangementSection[];
}

const arrangementTemplates: ArrangementTemplate[] = [
  {
    genre: 'Progressive House',
    bpm: 124,
    key: 'Am',
    sections: [
      { name: 'Intro', bars: 16, energy: 20, elements: ['Kick', 'Hi-hats', 'Percussion'], description: 'Gradual intro with kick and subtle percussion' },
      { name: 'Build 1', bars: 16, energy: 40, elements: ['Kick', 'Hi-hats', 'Bass', 'Pad'], description: 'Add bass and pad, start filter automation' },
      { name: 'Breakdown 1', bars: 16, energy: 30, elements: ['Pad', 'Vocal chops', 'Reversed FX'], description: 'Remove drums, atmospheric breakdown' },
      { name: 'Build 2', bars: 16, energy: 60, elements: ['Kick', 'Hi-hats', 'Bass', 'Lead', 'Riser'], description: 'Build back with lead and riser' },
      { name: 'Drop 1', bars: 32, energy: 80, elements: ['Kick', 'Hi-hats', 'Bass', 'Lead', 'Pad', 'Percussion'], description: 'Main groove with lead melody' },
      { name: 'Break 1', bars: 16, energy: 40, elements: ['Bass', 'Pad', 'Percussion'], description: 'Remove lead, keep groove going' },
      { name: 'Build 3', bars: 16, energy: 65, elements: ['Kick', 'Hi-hats', 'Bass', 'Lead', 'Snare Roll'], description: 'Stronger build with snare roll' },
      { name: 'Drop 2', bars: 32, energy: 90, elements: ['Kick', 'Hi-hats', 'Bass', 'Lead', 'Pad', 'Percussion', 'FX'], description: 'Enhanced drop with additional elements' },
      { name: 'Outro', bars: 16, energy: 20, elements: ['Kick', 'Hi-hats', 'Percussion'], description: 'Gradual outro, remove elements one by one' },
    ],
  },
  {
    genre: 'Trance',
    bpm: 138,
    key: 'Gm',
    sections: [
      { name: 'Intro', bars: 32, energy: 15, elements: ['Kick', 'Hi-hats', 'Noise'], description: 'Long intro with kick and noise texture' },
      { name: 'Build 1', bars: 16, energy: 35, elements: ['Kick', 'Hi-hats', 'Bass', 'Arp'], description: 'Add bass and arp for energy' },
      { name: 'Breakdown 1', bars: 32, energy: 20, elements: ['Pad', 'Vocal', 'Atmosphere'], description: 'Ethereal breakdown with vocal' },
      { name: 'Build 2', bars: 16, energy: 55, elements: ['Kick', 'Hi-hats', 'Bass', 'Lead', 'Riser'], description: 'Build with lead and riser' },
      { name: 'Lead Drop', bars: 32, energy: 85, elements: ['Kick', 'Hi-hats', 'Bass', 'Lead', 'Pad', 'Arp'], description: 'Main euphoric lead drop' },
      { name: 'Break 1', bars: 16, energy: 35, elements: ['Bass', 'Pad', 'Vocal chops'], description: 'Break with vocal chops' },
      { name: 'Build 3', bars: 16, energy: 65, elements: ['Kick', 'Hi-hats', 'Bass', 'Lead', 'Snare Roll'], description: 'Strong build with arp acceleration' },
      { name: 'Final Drop', bars: 48, energy: 100, elements: ['Kick', 'Hi-hats', 'Bass', 'Lead', 'Pad', 'Arp', 'Vocal', 'FX'], description: 'Maximum energy final drop' },
      { name: 'Outro', bars: 32, energy: 15, elements: ['Kick', 'Hi-hats', 'Noise'], description: 'Long trance outro' },
    ],
  },
  {
    genre: 'Techno',
    bpm: 132,
    key: 'Bm',
    sections: [
      { name: 'Intro', bars: 16, energy: 25, elements: ['Kick', 'Hi-hats', 'Percussion'], description: 'Minimal intro with kick and hats' },
      { name: 'Section A', bars: 32, energy: 50, elements: ['Kick', 'Hi-hats', 'Percussion', 'Bass'], description: 'Add bass, establish groove' },
      { name: 'Section B', bars: 32, energy: 55, elements: ['Kick', 'Hi-hats', 'Percussion', 'Bass', 'Acid'], description: 'Add acid line' },
      { name: 'Tension', bars: 16, energy: 60, elements: ['Kick', 'Hi-hats', 'Bass', 'Noise'], description: 'Remove acid, build tension' },
      { name: 'Peak', bars: 32, energy: 85, elements: ['Kick', 'Hi-hats', 'Percussion', 'Bass', 'Acid', 'Lead'], description: 'Maximum energy with all elements' },
      { name: 'Section C', bars: 32, energy: 65, elements: ['Kick', 'Hi-hats', 'Percussion', 'Bass', 'Lead'], description: 'Remove acid, keep lead' },
      { name: 'Breakdown', bars: 16, energy: 25, elements: ['Percussion', 'Texture'], description: 'Minimal breakdown' },
      { name: 'Final Peak', bars: 48, energy: 95, elements: ['Kick', 'Hi-hats', 'Percussion', 'Bass', 'Acid', 'Lead', 'FX'], description: 'Extended final peak section' },
      { name: 'Outro', bars: 16, energy: 20, elements: ['Kick', 'Hi-hats'], description: 'Minimal outro' },
    ],
  },
];

interface BuildDropViewProps {
  genre: 'Progressive House' | 'Trance' | 'Techno';
}

function BuildDropView({ genre }: BuildDropViewProps) {
  const template = arrangementTemplates.find((t) => t.genre === genre) || arrangementTemplates[0];
  const [selectedSection, setSelectedSection] = useState<ArrangementSection | null>(null);

  const accentColor = genre === 'Progressive House' ? '#f39c12' : genre === 'Trance' ? '#9b59b6' : '#2ecc71';

  return (
    <div className="main-panel">
      <div className="title" style={{ marginBottom: 4 }}>Build / Drop</div>
      <div className="caption" style={{ marginBottom: 24 }}>
        Arrangement builder · {template.genre} · {template.bpm} BPM · {template.key}
      </div>

      {/* Arrangement Visual */}
      <div className="card" style={{ marginBottom: 20, padding: 0, overflow: 'hidden' }}>
        <div className="small" style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Arrangement Overview ({template.sections.reduce((a, s) => a + s.bars, 0)} bars total)
        </div>
        <div style={{ display: 'flex', height: 60 }}>
          {template.sections.map((section) => {
            const width = (section.bars / template.sections.reduce((a, s) => a + s.bars, 0)) * 100;
            const energyColor = section.energy > 70 ? accentColor : section.energy > 40 ? '#f39c12' : '#27ae60';
            return (
              <div
                key={section.name}
                onClick={() => setSelectedSection(section)}
                style={{
                  width: `${width}%`,
                  minWidth: section.name === 'Outro' || section.name === 'Intro' ? 40 : 50,
                  background: energyColor + (section.energy > 70 ? '44' : '22'),
                  borderRight: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                <div className="small" style={{ textAlign: 'center', lineHeight: 1.2 }}>{section.name}</div>
                <div className="small" style={{ color: 'var(--text-muted)' }}>{section.bars}b</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Energy Graph */}
      <div className="card" style={{ marginBottom: 20, padding: 0, overflow: 'hidden' }}>
        <div className="small" style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Energy Curve
        </div>
        <div style={{ padding: 16, height: 120, position: 'relative' }}>
          <svg width="100%" height="100%" viewBox="0 0 600 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
                <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
              </linearGradient>
            </defs>
            {(() => {
              const totalBars = template.sections.reduce((a, s) => a + s.bars, 0);
              let x = 0;
              const points: string[] = [];
              const areaPoints: string[] = [];
              template.sections.forEach((section) => {
                const w = (section.bars / totalBars) * 600;
                const y = 100 - (section.energy / 100) * 90;
                if (points.length === 0) {
                  points.push(`0,100`);
                  areaPoints.push(`0,100`);
                }
                points.push(`${x + w / 2},${y}`);
                areaPoints.push(`${x + w / 2},${y}`);
                x += w;
                areaPoints.push(`${x},100`);
              });
              return (
                <>
                  <polygon points={areaPoints.join(' ')} fill="url(#energyGrad)" />
                  <polyline points={points.join(' ')} fill="none" stroke={accentColor} strokeWidth="2" />
                </>
              );
            })()}
          </svg>
        </div>
      </div>

      {/* Section Detail */}
      {selectedSection && (
        <div className="card" style={{ animation: 'fadeIn 0.2s ease-out' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
            <div>
              <div className="heading">{selectedSection.name}</div>
              <div className="caption">{selectedSection.bars} bars · Energy: {selectedSection.energy}%</div>
            </div>
            <button className="btn btn-sm" onClick={() => setSelectedSection(null)}>Close</button>
          </div>
          <div className="body" style={{ marginBottom: 16 }}>{selectedSection.description}</div>
          <div className="small" style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Elements</div>
          <div className="flex gap-2 flex-wrap">
            {selectedSection.elements.map((el) => (
              <span key={el} className="badge badge-basic" style={{ background: accentColor + '22', color: accentColor }}>
                {el}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BuildDropView;
