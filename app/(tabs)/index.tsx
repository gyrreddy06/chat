import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Bell } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Theme from '@/constants/Theme';
import StatusIndicator from '@/components/ui/StatusIndicator';
import AnimatedView from '@/components/ui/AnimatedView';

const mockChats = [
  {
    id: '1',
    name: 'Sarah Johnson',
    lastMessage: 'Did you see that new movie? It was 🔥',
    time: '2m',
    unreadCount: 3,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'online',
  },
  // Add more mock chats here
];

export default function ChatsScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const navigateToChat = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  const renderChatItem = ({ item, index }) => (
    <AnimatedView
      entering="slide"
      style={{ transform: [{ translateY: index * 10 }] }}
    >
      <Pressable
        style={[styles.chatItem, { backgroundColor: colors.background }]}
        onPress={() => navigateToChat(item.id)}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <StatusIndicator status={item.status} size="sm" />
        </View>
        
        <View style={styles.chatInfo}>
          <Text style={[styles.name, { color: colors.text.primary }]}>
            {item.name}
          </Text>
          <Text style={[styles.lastMessage, { color: colors.text.secondary }]}>
            {item.lastMessage}
          </Text>
        </View>
        
        <View style={styles.metaInfo}>
          <Text style={[styles.time, { color: colors.text.secondary }]}>
            {item.time}
          </Text>
          {item.unreadCount > 0 && (
            <View style={[styles.badge, { backgroundColor: colors.primary.pink }]}>
              <Text style={styles.badgeText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </Pressable>
    </AnimatedView>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          Messages
        </Text>
        <Pressable style={styles.notificationButton}>
          <Bell size={24} color={colors.text.primary} />
        </Pressable>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.dark.card }]}>
          <Search size={20} color={colors.text.secondary} />
          <Text style={[styles.searchPlaceholder, { color: colors.text.secondary }]}>
            Search conversations...
          </Text>
        </View>
      </View>

      <FlatList
        data={mockChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: Theme.typography.fontFamily.primary.bold,
  },
  notificationButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  searchPlaceholder: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: Theme.typography.fontFamily.secondary.regular,
  },
  listContent: {
    paddingHorizontal: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: Theme.typography.fontFamily.primary.semiBold,
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: Theme.typography.fontFamily.secondary.regular,
  },
  metaInfo: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 12,
    fontFamily: Theme.typography.fontFamily.secondary.regular,
    marginBottom: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontFamily: Theme.typography.fontFamily.primary.bold,
  },
});