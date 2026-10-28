import { useState } from 'react';
import { BridgeConnection, BridgeStatusState } from '../types';

function BridgeStatus() {
  const [connection, setConnection] = useState<BridgeConnection>({
    status: 'disconnected',
    host: '127.0.0.1',
    port: 8765,
  });

  const statusColors: Record<BridgeStatusState, string> = {
    disconnected: '#e74c3c',
    connecting: '#f39c12',
    connected: '#27ae60',
    error: '#e74c3c',
  };

  const statusLabels: Record<BridgeStatusState, string> = {
    disconnected: 'Click to connect',
    connecting: 'Connecting...',
    connected: 'Connected',
    error: 'Error',
  };

  const handleConnect = () => {
    // In a full implementation, this would initiate WebSocket connection
    setConnection({ ...connection, status: 'connecting' });
    setTimeout(() => {
      setConnection({
        status: 'connected',
        host: '127.0.0.1',
        port: 8765,
        tempo: 128,
        key: 'Am',
      });
    }, 1500);
  };

  return (
    <div
      className="flex items-center justify-between"
      style={{
        height: 36,
        padding: '0 16px',
        borderBottom: '1px solid var(--border-color)',
        background: 'rgba(22, 33, 62, 0.5)',
        fontSize: 12,
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onClick={connection.status === 'disconnected' ? handleConnect : undefined}
    >
      <div className="flex items-center gap-2">
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: statusColors[connection.status],
            boxShadow: `0 0 6px ${statusColors[connection.status]}66`,
          }}
        />
        <span style={{ color: 'var(--text-secondary)' }}>
          Bridge ({connection.host}:{connection.port})
        </span>
        <span style={{ color: statusColors[connection.status], fontWeight: 500 }}>
          {statusLabels[connection.status]}
        </span>
        {connection.tempo && (
          <>
            <span style={{ color: 'var(--text-muted)' }}>|</span>
            <span style={{ color: 'var(--text-secondary)' }}>
              {connection.tempo} BPM · {connection.key}
            </span>
          </>
        )}
      </div>
      <span className="small">Ableton Live 11+</span>
    </div>
  );
}

export default BridgeStatus;
