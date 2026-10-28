import SetupView from '../views/SetupView';
import InstrumentsView from '../views/InstrumentsView';
import StandardFXView from '../views/StandardFXView';
import PerformanceToolsView from '../views/PerformanceToolsView';
import AutomationView from '../views/AutomationView';
import EditVariationView from '../views/EditVariationView';
import BuildDropView from '../views/BuildDropView';
import GainStagingView from '../views/GainStagingView';
import MixMasterView from '../views/MixMasterView';
import TemplatesView from '../views/TemplatesView';

interface TabContentProps {
  tabId: number;
  genre: 'Progressive House' | 'Trance' | 'Techno';
}

function TabContent({ tabId, genre }: TabContentProps) {
  const views: Record<number, React.ReactNode> = {
    1: <SetupView />,
    2: <InstrumentsView genre={genre} />,
    3: <StandardFXView genre={genre} />,
    4: <PerformanceToolsView genre={genre} />,
    5: <AutomationView genre={genre} />,
    6: <EditVariationView genre={genre} />,
    7: <BuildDropView genre={genre} />,
    8: <GainStagingView genre={genre} />,
    9: <MixMasterView genre={genre} />,
    10: <TemplatesView genre={genre} />,
  };

  return <div className="fade-in">{views[tabId]}</div>;
}

export default TabContent;
