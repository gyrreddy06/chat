import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Plus, Bell } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';
import Theme from '@/constants/Theme';
import StatusIndicator from '@/components/ui/StatusIndicator';

type ChatPreview = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  isGroup: boolean;
};

const mockChats: ChatPreview[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    lastMessage: 'Did you see that new movie? It was 🔥',
    time: '2m',
    unreadCount: 3,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'online',
    isGroup: false,
  },
  {
    id: '2',
    name: 'Festival Squad',
    lastMessage: 'Alex: Who\'s going to the concert this weekend?',
    time: '45m',
    unreadCount: 12,
    avatar: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'online',
    isGroup: true,
  },
  {
    id: '3',
    name: 'Mike Chen',
    lastMessage: 'Just sent you the homework files',
    time: '2h',
    unreadCount: 0,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'away',
    isGroup: false,
  },
  {
    id: '4',
    name: 'Gaming Crew',
    lastMessage: 'Jessica: Let\'s play tonight at 8pm',
    time: '5h',
    unreadCount: 0,
    avatar: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'online',
    isGroup: true,
  },
  {
    id: '5',
    name: 'Taylor Wilson',
    lastMessage: 'Can you help me with the math problem?',
    time: 'Yesterday',
    unreadCount: 0,
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'offline',
    isGroup: false,
  },
];

export default function ChatsScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const navigateToChat = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  const renderChatItem = ({ item }: { item: ChatPreview }) => (
    <Pressable
      style={[
        styles.chatItem,
        { backgroundColor: colors.background },
      ]}
      onPress={() => navigateToChat(item.id)}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.statusIndicator}>
          <StatusIndicator status={item.status} size="sm" pulsate={item.status === 'online'} />
        </View>
      </View>
      
      <View style={styles.chatInfo}>
        <View style={styles.topRow}>
          <Text
            style={[
              styles.chatName,
              { color: colors.text.primary, fontFamily: Theme.typography.fontFamily.primary.semiBold },
            ]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text
            style={[
              styles.timeText,
              { color: colors.text.secondary, fontFamily: Theme.typography.fontFamily.secondary.regular },
            ]}
          >
            {item.time}
          </Text>
        </View>
        
        <View style={styles.bottomRow}>
          <Text
            style={[
              styles.lastMessage,
              { color: colors.text.secondary, fontFamily: Theme.typography.fontFamily.secondary.regular },
            ]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          
          {item.unreadCount > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: colors.primary.pink }]}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              { color: colors.text.primary, fontFamily: Theme.typography.fontFamily.primary.bold },
            ]}
          >
            VibeChat
          </Text>
          <Pressable style={styles.iconButton}>
            <Bell size={24} color={colors.text.primary} />
          </Pressable>
        </View>
        
        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchBar,
              { backgroundColor: colors.dark.card },
            ]}
          >
            <Search size={20} color={colors.text.secondary} />
            <Text
              style={[
                styles.searchPlaceholder,
                { color: colors.text.secondary, fontFamily: Theme.typography.fontFamily.secondary.regular },
              ]}
            >
              Search conversations...
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={mockChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: Theme.spacing.xl,
    paddingBottom: Theme.spacing.lg,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.typography.fontSize['2xl'],
  },
  iconButton: {
    padding: Theme.spacing.xs,
  },
  searchContainer: {
    marginBottom: Theme.spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.pill,
  },
  searchPlaceholder: {
    marginLeft: Theme.spacing.sm,
    fontSize: Theme.typography.fontSize.md,
  },
  chatList: {
    paddingHorizontal: Theme.spacing.xl,
    paddingBottom: 100,
  },
  chatItem: {
    flexDirection: 'row',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Theme.spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#121212',
    borderRadius: 10,
    padding: 2,
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: Theme.typography.fontSize.md,
    flex: 1,
  },
  timeText: {
    fontSize: Theme.typography.fontSize.xs,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: Theme.typography.fontSize.sm,
    flex: 1,
    marginRight: Theme.spacing.sm,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontFamily: Theme.typography.fontFamily.primary.bold,
  },
});