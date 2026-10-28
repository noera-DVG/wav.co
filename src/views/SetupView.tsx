import { useState } from 'react';
import useBridge from '../hooks/useBridge';

function SetupView() {
  const { connection, connect, disconnect, sendCommand } = useBridge();
  const [manualHost, setManualHost] = useState('127.0.0.1');
  const [manualPort, setManualPort] = useState('8765');
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);

  const handleManualConnect = () => {
    // In a full implementation, this would connect to custom host/port
    connect();
  };

  const handleSendPreset = (presetName: string) => {
    sendCommand('load_preset', { name: presetName });
  };

  return (
    <div className="main-panel">
      <div className="title" style={{ marginBottom: 8 }}>Setup</div>
      <div className="caption" style={{ marginBottom: 24 }}>
        Connect WAV.co to your Ableton Live session via the WebSocket bridge.
      </div>

      {/* Connection Status Card */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
          <div className="heading">Bridge Connection</div>
          <div className="flex items-center gap-2">
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: connection.status === 'connected' ? '#27ae60' : connection.status === 'connecting' ? '#f39c12' : '#e74c3c',
                boxShadow: `0 0 8px ${connection.status === 'connected' ? '#27ae6066' : '#e74c3c33'}`,
              }}
            />
            <span className="body" style={{ color: connection.status === 'connected' ? '#27ae60' : '#e74c3c' }}>
              {connection.status === 'connected' ? 'Connected' : connection.status === 'connecting' ? 'Connecting...' : 'Disconnected'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
          <input
            className="input"
            style={{ maxWidth: 200 }}
            value={manualHost}
            onChange={(e) => setManualHost(e.target.value)}
            placeholder="Host"
          />
          <input
            className="input"
            style={{ maxWidth: 100 }}
            value={manualPort}
            onChange={(e) => setManualPort(e.target.value)}
            placeholder="Port"
          />
          {connection.status === 'connected' ? (
            <button className="btn" onClick={disconnect}>Disconnect</button>
          ) : (
            <button className="btn btn-primary" onClick={handleManualConnect}>Connect</button>
          )}
        </div>

        {connection.status === 'connected' && (
          <div className="flex gap-4">
            <div className="card" style={{ flex: 1, padding: '12px 16px' }}>
              <div className="small">Tempo</div>
              <div className="heading" style={{ color: '#27ae60' }}>{connection.tempo || '—'}</div>
            </div>
            <div className="card" style={{ flex: 1, padding: '12px 16px' }}>
              <div className="small">Key</div>
              <div className="heading" style={{ color: '#27ae60' }}>{connection.key || '—'}</div>
            </div>
            <div className="card" style={{ flex: 1, padding: '12px 16px' }}>
              <div className="small">Address</div>
              <div className="body">{connection.host}:{connection.port}</div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Preset Load */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="heading" style={{ marginBottom: 12 }}>Quick Preset Load</div>
        <div className="flex gap-2 flex-wrap">
          {['Warm Pad', 'Acid Bass', 'Lead Supersaw', 'Pluck Stab', 'Ambient Text'].map((preset) => (
            <button
              key={preset}
              className="btn btn-sm"
              onClick={() => handleSendPreset(preset)}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Troubleshooting */}
      <button
        className="btn"
        onClick={() => setShowTroubleshooting(!showTroubleshooting)}
        style={{ width: '100%' }}
      >
        {showTroubleshooting ? 'Hide' : 'Show'} Troubleshooting Guide
      </button>

      {showTroubleshooting && (
        <div className="card" style={{ marginTop: 12 }}>
          <div className="heading" style={{ marginBottom: 12 }}>Troubleshooting</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px 0', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: 12 }}>Problem</th>
                <th style={{ textAlign: 'left', padding: '8px 0', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: 12 }}>Solution</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Port blocked', 'Open System Preferences → Security & Privacy → Firewall → allow incoming connections'],
                ['Live version < 11', 'Requires Ableton Live 11+ (Remote-Scripts API)'],
                ['Bridge crashes', 'View log at ~/Library/Application Support/WAV.co/bridge.log'],
                ['Other issues', 'Contact support via email'],
              ].map(([problem, solution], i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                    <span className="body">{problem}</span>
                  </td>
                  <td style={{ padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                    <span className="caption">{solution}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Bridge Setup Instructions */}
      <div className="card" style={{ marginTop: 24 }}>
        <div className="heading" style={{ marginBottom: 12 }}>Bridge Setup Instructions</div>
        <ol style={{ paddingLeft: 20, lineHeight: 2 }}>
          <li>Download the WAV.co Ableton Remote Script</li>
          <li>Place it in your Ableton User Library: <code style={{ background: 'var(--bg-primary)', padding: '2px 6px', borderRadius: 3, fontSize: 12 }}>~/Music/Ableton/User Library/Remote Scripts/WAV.co/</code></li>
          <li>Restart Ableton Live and select <strong>WAV.co</strong> as your Control Surface</li>
          <li>Click <strong>Connect</strong> in WAV.co</li>
        </ol>
      </div>
    </div>
  );
}

export default SetupView;
