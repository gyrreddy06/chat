import { create } from 'zustand';
import { Socket } from 'socket.io-client';

interface Message {
  id: string;
  sender: string;
  senderName: string;
  senderAvatar: string;
  message: string;
  type: string;
  timestamp: string;
  read: boolean;
}

interface ChatRoom {
  id: string;
  name: string;
  lastMessage?: Message;
  unreadCount: number;
  messages: Message[];
  typingUsers: string[];
}

interface ChatState {
  rooms: Map<string, ChatRoom>;
  activeRoom: string | null;
  addMessage: (roomId: string, message: Message) => void;
  setActiveRoom: (roomId: string) => void;
  updateTypingUsers: (roomId: string, users: string[]) => void;
  markMessagesRead: (roomId: string, messageIds: string[]) => void;
  initializeSocket: (socket: Socket) => void;
}

const useChatStore = create<ChatState>((set, get) => ({
  rooms: new Map(),
  activeRoom: null,

  addMessage: (roomId, message) => {
    set((state) => {
      const rooms = new Map(state.rooms);
      const room = rooms.get(roomId) || {
        id: roomId,
        name: 'New Chat',
        unreadCount: 0,
        messages: [],
        typingUsers: [],
      };

      room.messages.push(message);
      room.lastMessage = message;
      
      if (!message.read && message.sender !== 'me') {
        room.unreadCount += 1;
      }

      rooms.set(roomId, room);
      return { rooms };
    });
  },

  setActiveRoom: (roomId) => {
    set({ activeRoom: roomId });
  },

  updateTypingUsers: (roomId, users) => {
    set((state) => {
      const rooms = new Map(state.rooms);
      const room = rooms.get(roomId);
      if (room) {
        room.typingUsers = users;
        rooms.set(roomId, room);
      }
      return { rooms };
    });
  },

  markMessagesRead: (roomId, messageIds) => {
    set((state) => {
      const rooms = new Map(state.rooms);
      const room = rooms.get(roomId);
      if (room) {
        room.messages = room.messages.map(msg => 
          messageIds.includes(msg.id) ? { ...msg, read: true } : msg
        );
        room.unreadCount = room.messages.filter(msg => !msg.read).length;
        rooms.set(roomId, room);
      }
      return { rooms };
    });
  },

  initializeSocket: (socket: Socket) => {
    socket.on('new_message', (message: Message) => {
      get().addMessage(message.sender, message);
    });

    socket.on('typing_update', ({ roomId, users }) => {
      get().updateTypingUsers(roomId, users);
    });

    socket.on('messages_read', ({ roomId, messageIds }) => {
      get().markMessagesRead(roomId, messageIds);
    });
  },
}));

export default useChatStore;