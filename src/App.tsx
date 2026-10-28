import { useState } from 'react';
import Sidebar from './components/Sidebar';
import BridgeStatus from './components/BridgeStatus';
import TabContent from './components/TabContent';
import { SidebarItem } from './types';

const sidebarItems: SidebarItem[] = [
  { id: 1, title: 'Setup', subtitle: 'Ableton Bridge', symbol: 'lightning.fill' },
  { id: 2, title: 'Instruments', subtitle: 'Synth Presets', symbol: 'speaker.wave.3.fill' },
  { id: 3, title: 'Standard FX', subtitle: 'Effect Chains', symbol: 'slider.horizontal.3' },
  { id: 4, title: 'Performance', subtitle: 'Live Techniques', symbol: 'play.circle.fill' },
  { id: 5, title: 'Automation', subtitle: 'Parameter Maps', symbol: 'ellipsis.path' },
  { id: 6, title: 'Edit / Variation', subtitle: 'Variation Builder', symbol: 'rectangle.stack.fill' },
  { id: 7, title: 'Build / Drop', subtitle: 'Arrangement', symbol: 'arrow.up.circle.fill' },
  { id: 8, title: 'Gain Staging', subtitle: 'Level Management', symbol: 'gauge.high' },
  { id: 9, title: 'Mix / Master', subtitle: 'Mix Tools', symbol: 'waveform.fill' },
  { id: 10, title: 'Templates', subtitle: 'Project Starters', symbol: 'doc.fill' },
];

function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [activeGenre, setActiveGenre] = useState<'Progressive House' | 'Trance' | 'Techno'>('Progressive House');

  return (
    <div className="app-container">
      <Sidebar
        items={sidebarItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeGenre={activeGenre}
        onGenreChange={setActiveGenre}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <BridgeStatus />
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <TabContent tabId={activeTab} genre={activeGenre} />
        </div>
      </div>
    </div>
  );
}

export default App;
