const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const crypto = require('crypto');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8081",
    methods: ["GET", "POST"]
  }
});

// In-memory storage for messages and user data
const messages = new Map();
const users = new Map();
const typingUsers = new Map();

// Generate a unique room ID for group chats
const createRoomId = () => crypto.randomBytes(16).toString('hex');

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user registration
  socket.on('register', ({ userId, username, avatar }) => {
    users.set(socket.id, { userId, username, avatar, online: true });
    socket.broadcast.emit('user_status', { userId, status: 'online' });
  });

  // Join a chat room (private or group)
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // Handle new messages
  socket.on('send_message', (data) => {
    const { roomId, message, type } = data;
    const user = users.get(socket.id);
    
    if (!user) return;

    const messageData = {
      id: crypto.randomBytes(16).toString('hex'),
      sender: user.userId,
      senderName: user.username,
      senderAvatar: user.avatar,
      message,
      type,
      timestamp: new Date().toISOString(),
      read: false
    };

    // Store message
    if (!messages.has(roomId)) {
      messages.set(roomId, []);
    }
    messages.get(roomId).push(messageData);

    // Broadcast to room
    io.to(roomId).emit('new_message', messageData);
  });

  // Handle typing indicators
  socket.on('typing_start', ({ roomId }) => {
    const user = users.get(socket.id);
    if (!user) return;

    if (!typingUsers.has(roomId)) {
      typingUsers.set(roomId, new Set());
    }
    typingUsers.get(roomId).add(user.userId);
    
    socket.to(roomId).emit('typing_update', {
      roomId,
      users: Array.from(typingUsers.get(roomId))
    });
  });

  socket.on('typing_end', ({ roomId }) => {
    const user = users.get(socket.id);
    if (!user) return;

    if (typingUsers.has(roomId)) {
      typingUsers.get(roomId).delete(user.userId);
      
      socket.to(roomId).emit('typing_update', {
        roomId,
        users: Array.from(typingUsers.get(roomId))
      });
    }
  });

  // Handle read receipts
  socket.on('mark_read', ({ roomId, messageIds }) => {
    const roomMessages = messages.get(roomId);
    if (!roomMessages) return;

    messageIds.forEach(messageId => {
      const message = roomMessages.find(m => m.id === messageId);
      if (message) {
        message.read = true;
      }
    });

    io.to(roomId).emit('messages_read', { roomId, messageIds });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      user.online = false;
      socket.broadcast.emit('user_status', { userId: user.userId, status: 'offline' });
      users.delete(socket.id);
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});