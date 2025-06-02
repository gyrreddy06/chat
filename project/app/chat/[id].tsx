import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, MoveVertical as MoreVertical, Video, Mic, Image as ImageIcon, Smile, Send, Paperclip } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Theme from '@/constants/Theme';
import StatusIndicator from '@/components/ui/StatusIndicator';
import ChatBubble from '@/components/ui/ChatBubble';

// Mock chat data
const mockChats = {
  '1': {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'online',
    isGroup: false,
    messages: [
      {
        id: 'm1',
        text: 'Hey! How are you doing?',
        time: '10:30 AM',
        sender: 'them',
        type: 'text',
        read: true,
      },
      {
        id: 'm2',
        text: 'I\'m good, thanks! Just finished my exams.',
        time: '10:32 AM',
        sender: 'me',
        type: 'text',
        read: true,
      },
      {
        id: 'm3',
        text: 'Check out this cool photo from yesterday!',
        time: '10:33 AM',
        sender: 'them',
        type: 'image',
        mediaUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=300',
        read: true,
      },
      {
        id: 'm4',
        text: 'Wow, that looks amazing! 😍',
        time: '10:34 AM',
        sender: 'me',
        type: 'text',
        read: true,
        reactions: [
          { type: 'heart', count: 1 },
        ],
      },
      {
        id: 'm5',
        text: 'Are you free this weekend? We could go to that new café downtown.',
        time: '10:36 AM',
        sender: 'them',
        type: 'text',
        read: true,
      },
      {
        id: 'm6',
        text: 'Sounds good! What time were you thinking?',
        time: '10:38 AM',
        sender: 'me',
        type: 'text',
        read: false,
      },
    ],
  },
  '2': {
    id: '2',
    name: 'Festival Squad',
    avatar: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'online',
    isGroup: true,
    participants: 12,
    messages: [
      {
        id: 'm1',
        text: 'Who\'s going to the concert this weekend?',
        time: '9:15 AM',
        sender: 'Alex',
        senderAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
        type: 'text',
        read: true,
      },
      {
        id: 'm2',
        text: 'I\'ll be there! Already got my tickets.',
        time: '9:17 AM',
        sender: 'me',
        type: 'text',
        read: true,
      },
      {
        id: 'm3',
        text: 'Same here! So excited!',
        time: '9:18 AM',
        sender: 'Jessica',
        senderAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
        type: 'text',
        read: true,
      },
      {
        id: 'm4',
        text: '',
        time: '9:20 AM',
        sender: 'Alex',
        senderAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
        type: 'voice',
        read: true,
      },
      {
        id: 'm5',
        text: 'Should we meet at 6 PM at the entrance?',
        time: '9:22 AM',
        sender: 'Alex',
        senderAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
        type: 'text',
        read: true,
      },
      {
        id: 'm6',
        text: 'Perfect! See you all there.',
        time: '9:25 AM',
        sender: 'me',
        type: 'text',
        read: false,
      },
    ],
  },
};

export default function ChatScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef(null);

  const chatId = Array.isArray(id) ? id[0] : id || '1';
  const chat = mockChats[chatId];

  const goBack = () => {
    router.back();
  };

  const handleSend = () => {
    if (!message.trim()) return;
    
    // In a real app, we would send the message to the server
    // and add it to the messages list
    setMessage('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Pressable onPress={goBack} style={styles.backButton}>
              <ChevronLeft size={24} color={colors.text.primary} />
            </Pressable>
            
            <View style={styles.profileContainer}>
              <Image source={{ uri: chat.avatar }} style={styles.avatar} />
              <View style={styles.profileInfo}>
                <Text
                  style={[
                    styles.chatName,
                    { color: colors.text.primary, fontFamily: Theme.typography.fontFamily.primary.semiBold },
                  ]}
                >
                  {chat.name}
                </Text>
                <View style={styles.statusContainer}>
                  <StatusIndicator status={chat.status} size="sm" />
                  <Text
                    style={[
                      styles.statusText,
                      { color: colors.text.secondary, fontFamily: Theme.typography.fontFamily.secondary.regular },
                    ]}
                  >
                    {chat.status === 'online' ? 'Online' : chat.status === 'away' ? 'Away' : 'Offline'}
                    {chat.isGroup && ` • ${chat.participants} members`}
                  </Text>
                </View>
              </View>
            </View>
            
            <Pressable style={styles.moreButton}>
              <MoreVertical size={24} color={colors.text.primary} />
            </Pressable>
          </View>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
        >
          {chat.messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg.text}
              time={msg.time}
              type={msg.type}
              isOwn={msg.sender === 'me'}
              mediaUrl={msg.mediaUrl}
              read={msg.read}
              reactions={msg.reactions}
            />
          ))}
        </ScrollView>

        <View
          style={[
            styles.inputContainer,
            { backgroundColor: colors.dark.surface },
          ]}
        >
          <Pressable style={styles.attachButton}>
            <Paperclip size={24} color={colors.text.secondary} />
          </Pressable>
          
          <View
            style={[
              styles.textInputContainer,
              { backgroundColor: colors.dark.card },
            ]}
          >
            <TextInput
              style={[
                styles.input,
                { color: colors.text.primary, fontFamily: Theme.typography.fontFamily.secondary.regular },
              ]}
              placeholder="Type a message..."
              placeholderTextColor={colors.text.secondary}
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <Pressable style={styles.emojiButton}>
              <Smile size={24} color={colors.text.secondary} />
            </Pressable>
          </View>
          
          {message.trim() ? (
            <Pressable style={styles.sendButton} onPress={handleSend}>
              <Send size={24} color={colors.primary.blue} />
            </Pressable>
          ) : (
            <Pressable style={styles.micButton}>
              <Mic size={24} color={colors.primary.blue} />
            </Pressable>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: Theme.spacing.xs,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: Theme.spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Theme.spacing.sm,
  },
  profileInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: Theme.typography.fontSize.md,
    marginBottom: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: Theme.typography.fontSize.xs,
    marginLeft: Theme.spacing.xs,
  },
  moreButton: {
    padding: Theme.spacing.xs,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: Theme.spacing.lg,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  attachButton: {
    padding: Theme.spacing.sm,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Theme.borderRadius.pill,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Platform.OS === 'ios' ? Theme.spacing.xs : 0,
    marginHorizontal: Theme.spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: Theme.typography.fontSize.md,
    maxHeight: 120,
    paddingVertical: Platform.OS === 'ios' ? Theme.spacing.xs : Theme.spacing.sm,
  },
  emojiButton: {
    padding: Theme.spacing.xs,
  },
  sendButton: {
    padding: Theme.spacing.sm,
  },
  micButton: {
    padding: Theme.spacing.sm,
  },
});