import { useState, useEffect, useCallback } from 'react';
import SecureWebSocket from './utils/secureWebSocket';

let socket = null;
let listeners = new Map();

export function useWebSocket(url) {
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(async () => {
    if (socket) return;

    socket = new SecureWebSocket(url);
    await socket.connect();

    socket.onopen = () => setIsConnected(true);
    socket.onclose = () => setIsConnected(false);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (listeners.has(data.type)) {
        listeners.get(data.type).forEach(callback => callback(data));
      }
    };
  }, [url]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      connect();
    }
    return () => {
      if (socket) {
        socket.close();
        socket = null;
      }
    };
  }, [connect]);

  const send = useCallback((message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open');
    }
  }, []);

  const addListener = useCallback((type, callback) => {
    if (!listeners.has(type)) {
      listeners.set(type, new Set());
    }
    listeners.get(type).add(callback);
    return () => listeners.get(type).delete(callback);
  }, []);

  return { isConnected, send, addListener };
}
