import { useState, useEffect, useRef, useCallback } from 'react';
import { BridgeConnection } from '../types';

const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = 8765;

function useBridge() {
  const [connection, setConnection] = useState<BridgeConnection>({
    status: 'disconnected',
    host: DEFAULT_HOST,
    port: DEFAULT_PORT,
  });
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    setConnection((prev) => ({ ...prev, status: 'connecting' }));

    const url = `ws://${DEFAULT_HOST}:${DEFAULT_PORT}`;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnection({ status: 'connected', host: DEFAULT_HOST, port: DEFAULT_PORT });
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setConnection((prev) => ({
          ...prev,
          status: 'connected',
          tempo: data.tempo,
          key: data.key,
        }));
      } catch {
        // Ignore non-JSON messages
      }
    };

    ws.onclose = () => {
      setConnection((prev) => ({ ...prev, status: 'disconnected' }));
      // Auto-reconnect after 3 seconds
      reconnectTimeoutRef.current = window.setTimeout(() => {
        connect();
      }, 3000);
    };

    ws.onerror = () => {
      setConnection((prev) => ({ ...prev, status: 'error' }));
    };
  }, []);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setConnection({ status: 'disconnected', host: DEFAULT_HOST, port: DEFAULT_PORT });
  }, []);

  const sendCommand = useCallback((command: string, payload: Record<string, unknown> = {}) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ command, ...payload }));
    }
  }, []);

  useEffect(() => {
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return { connection, connect, disconnect, sendCommand };
}

export default useBridge;
