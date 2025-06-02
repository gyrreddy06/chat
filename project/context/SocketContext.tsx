import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Constants from 'expo-constants';

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  connect: (userId: string, username: string, avatar: string) => void;
  disconnect: () => void;
  joinRoom: (roomId: string) => void;
  sendMessage: (roomId: string, message: string, type: string) => void;
  startTyping: (roomId: string) => void;
  stopTyping: (roomId: string) => void;
  markMessagesRead: (roomId: string, messageIds: string[]) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

const SOCKET_URL = Constants.expoConfig?.extra?.socketUrl || 'http://localhost:3000';

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  const connect = (userId: string, username: string, avatar: string) => {
    if (socket) return;

    const newSocket = io(SOCKET_URL);

    newSocket.on('connect', () => {
      console.log('Socket connected');
      setConnected(true);
      newSocket.emit('register', { userId, username, avatar });
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
      setConnected(false);
    });

    setSocket(newSocket);
  };

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setConnected(false);
    }
  };

  const joinRoom = (roomId: string) => {
    if (socket && connected) {
      socket.emit('join_room', roomId);
    }
  };

  const sendMessage = (roomId: string, message: string, type: string = 'text') => {
    if (socket && connected) {
      socket.emit('send_message', { roomId, message, type });
    }
  };

  const startTyping = (roomId: string) => {
    if (socket && connected) {
      socket.emit('typing_start', { roomId });
    }
  };

  const stopTyping = (roomId: string) => {
    if (socket && connected) {
      socket.emit('typing_end', { roomId });
    }
  };

  const markMessagesRead = (roomId: string, messageIds: string[]) => {
    if (socket && connected) {
      socket.emit('mark_read', { roomId, messageIds });
    }
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        connect,
        disconnect,
        joinRoom,
        sendMessage,
        startTyping,
        stopTyping,
        markMessagesRead,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}