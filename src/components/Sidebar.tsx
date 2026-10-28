import { SidebarItem } from '../types';

interface SidebarProps {
  items: SidebarItem[];
  activeTab: number;
  onTabChange: (id: number) => void;
  activeGenre: 'Progressive House' | 'Trance' | 'Techno';
  onGenreChange: (genre: 'Progressive House' | 'Trance' | 'Techno') => void;
}

const genreColors: Record<string, string> = {
  'Progressive House': '#f39c12',
  'Trance': '#9b59b6',
  'Techno': '#2ecc71',
};

function Sidebar({ items, activeTab, onTabChange, activeGenre, onGenreChange }: SidebarProps) {
  const accentColor = genreColors[activeGenre];

  return (
    <aside
      className="bg-sidebar"
      style={{
        width: '260px',
        minWidth: '260px',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--border-color)',
        overflowY: 'auto',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '20px 16px 16px',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              fontWeight: 700,
              color: '#1a1a2e',
            }}
          >
            W
          </div>
          <div>
            <div className="title" style={{ fontSize: 18, lineHeight: 1.2 }}>
              WAV<span style={{ color: accentColor }}>.co</span>
            </div>
            <div className="small">Music Production Assistant</div>
          </div>
        </div>
      </div>

      {/* Genre Selector */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)' }}>
        <div className="small" style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Genre Focus
        </div>
        <div className="flex" style={{ gap: 4 }}>
          {(['Progressive House', 'Trance', 'Techno'] as const).map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreChange(genre)}
              style={{
                flex: 1,
                padding: '6px 4px',
                fontSize: 10,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontFamily: 'inherit',
                background: activeGenre === genre ? accentColor + '33' : 'transparent',
                color: activeGenre === genre ? accentColor : 'var(--text-secondary)',
                transition: 'all 0.15s ease',
              }}
            >
              {genre === 'Progressive House' ? 'PH' : genre === 'Trance' ? 'TR' : 'TK'}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Items */}
      <nav style={{ flex: 1, padding: '8px 8px' }}>
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                width: '100%',
                padding: '10px 12px',
                marginBottom: 2,
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontFamily: 'inherit',
                background: isActive ? (accentColor + '18') : 'transparent',
                color: isActive ? accentColor : 'var(--text-secondary)',
                transition: 'all 0.15s ease',
                textAlign: 'left',
                fontSize: 13,
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'var(--bg-hover)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  lineHeight: 1,
                  marginTop: 1,
                  opacity: isActive ? 1 : 0.6,
                }}
              >
                {item.symbol}
              </div>
              <div>
                <div style={{ fontWeight: isActive ? 600 : 500, fontSize: 13 }}>{item.title}</div>
                <div className="small" style={{ opacity: 0.7 }}>{item.subtitle}</div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--border-color)',
          textAlign: 'center',
        }}
      >
        <div className="small">WAV.co v1.0.0 — MIT License</div>
      </div>
    </aside>
  );
}

export default Sidebar;
