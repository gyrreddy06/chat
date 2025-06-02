import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Search, X, Users, MessageSquare } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';
import Theme from '@/constants/Theme';
import Button from '@/components/ui/Button';

type Contact = {
  id: string;
  name: string;
  avatar: string;
  lastSeen?: string;
};

const mockContacts: Contact[] = [
  { id: '1', name: 'Sarah Johnson', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100', lastSeen: 'Active now' },
  { id: '2', name: 'Mike Chen', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100', lastSeen: '30m ago' },
  { id: '3', name: 'Taylor Wilson', avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100', lastSeen: '2h ago' },
  { id: '4', name: 'Alex Martinez', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100', lastSeen: 'Yesterday' },
  { id: '5', name: 'Jessica Park', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100', lastSeen: 'Active now' },
  { id: '6', name: 'Ryan Cooper', avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100', lastSeen: '10m ago' },
  { id: '7', name: 'Emma Thompson', avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100', lastSeen: '1h ago' },
];

export default function NewChatScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [isGroupChat, setIsGroupChat] = useState(false);

  const filteredContacts = mockContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedContacts.some((selected) => selected.id === contact.id)
  );

  const goBack = () => {
    router.back();
  };

  const toggleContactSelection = (contact: Contact) => {
    if (selectedContacts.some((selected) => selected.id === contact.id)) {
      setSelectedContacts(
        selectedContacts.filter((selected) => selected.id !== contact.id)
      );
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const removeSelectedContact = (id: string) => {
    setSelectedContacts(
      selectedContacts.filter((selected) => selected.id !== id)
    );
  };

  const startChat = () => {
    // In a real app, we would create a chat with the selected contacts
    // and navigate to the chat screen
    if (selectedContacts.length === 1 && !isGroupChat) {
      router.push(`/chat/${selectedContacts[0].id}`);
    } else {
      // Create group chat and navigate to it
      router.push('/chat/2'); // Using mock group chat ID for demo
    }
  };

  const renderContactItem = ({ item }: { item: Contact }) => (
    <Pressable
      style={styles.contactItem}
      onPress={() => toggleContactSelection(item)}
    >
      <Image source={{ uri: item.avatar }} style={styles.contactAvatar} />
      <View style={styles.contactInfo}>
        <Text
          style={[
            styles.contactName,
            { color: colors.text.primary, fontFamily: Theme.typography.fontFamily.primary.medium },
          ]}
        >
          {item.name}
        </Text>
        <Text
          style={[
            styles.lastSeen,
            {
              color:
                item.lastSeen === 'Active now'
                  ? colors.status.online
                  : colors.text.secondary,
              fontFamily: Theme.typography.fontFamily.secondary.regular,
            },
          ]}
        >
          {item.lastSeen}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Pressable onPress={goBack} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.text.primary} />
          </Pressable>
          <Text
            style={[
              styles.title,
              { color: colors.text.primary, fontFamily: Theme.typography.fontFamily.primary.semiBold },
            ]}
          >
            New Chat
          </Text>
        </View>
      </View>

      <View style={styles.toggleContainer}>
        <Pressable
          style={[
            styles.toggleButton,
            !isGroupChat && {
              backgroundColor: colors.primary.blue,
            },
          ]}
          onPress={() => setIsGroupChat(false)}
        >
          <MessageSquare
            size={20}
            color={!isGroupChat ? 'white' : colors.text.secondary}
          />
          <Text
            style={[
              styles.toggleText,
              {
                color: !isGroupChat ? 'white' : colors.text.secondary,
                fontFamily: Theme.typography.fontFamily.primary.medium,
              },
            ]}
          >
            Private Chat
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.toggleButton,
            isGroupChat && {
              backgroundColor: colors.primary.blue,
            },
          ]}
          onPress={() => setIsGroupChat(true)}
        >
          <Users
            size={20}
            color={isGroupChat ? 'white' : colors.text.secondary}
          />
          <Text
            style={[
              styles.toggleText,
              {
                color: isGroupChat ? 'white' : colors.text.secondary,
                fontFamily: Theme.typography.fontFamily.primary.medium,
              },
            ]}
          >
            Group Chat
          </Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.searchContainer,
          { backgroundColor: colors.dark.card },
        ]}
      >
        <Search size={20} color={colors.text.secondary} />
        <TextInput
          style={[
            styles.searchInput,
            { color: colors.text.primary, fontFamily: Theme.typography.fontFamily.secondary.regular },
          ]}
          placeholder="Search contacts..."
          placeholderTextColor={colors.text.secondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery('')}>
            <X size={20} color={colors.text.secondary} />
          </Pressable>
        )}
      </View>

      {selectedContacts.length > 0 && (
        <View style={styles.selectedContactsContainer}>
          <FlatList
            data={selectedContacts}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.selectedContact,
                  { backgroundColor: colors.primary.blue },
                ]}
                onPress={() => removeSelectedContact(item.id)}
              >
                <Image source={{ uri: item.avatar }} style={styles.selectedAvatar} />
                <Text
                  style={[
                    styles.selectedName,
                    { fontFamily: Theme.typography.fontFamily.primary.medium },
                  ]}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <View
                  style={[
                    styles.removeButton,
                    { backgroundColor: colors.primary.pink },
                  ]}
                >
                  <X size={12} color="white" />
                </View>
              </Pressable>
            )}
          />
        </View>
      )}

      {isGroupChat && selectedContacts.length > 0 && (
        <View
          style={[
            styles.groupNameContainer,
            { backgroundColor: colors.dark.card },
          ]}
        >
          <TextInput
            style={[
              styles.groupNameInput,
              { color: colors.text.primary, fontFamily: Theme.typography.fontFamily.secondary.regular },
            ]}
            placeholder="Group name (optional)"
            placeholderTextColor={colors.text.secondary}
          />
        </View>
      )}

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContactItem}
        contentContainerStyle={styles.contactsList}
      />

      {selectedContacts.length > 0 && (
        <View style={styles.buttonContainer}>
          <Button
            title={`Start ${isGroupChat ? 'Group ' : ''}Chat`}
            variant="primary"
            onPress={startChat}
            style={styles.startButton}
          />
        </View>
      )}
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
    paddingBottom: Theme.spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: Theme.spacing.md,
  },
  title: {
    fontSize: Theme.typography.fontSize.xl,
  },
  toggleContainer: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.xl,
    marginBottom: Theme.spacing.lg,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.pill,
    marginRight: Theme.spacing.sm,
  },
  toggleText: {
    marginLeft: Theme.spacing.xs,
    fontSize: Theme.typography.fontSize.sm,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Theme.spacing.xl,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.pill,
    marginBottom: Theme.spacing.lg,
  },
  searchInput: {
    flex: 1,
    marginLeft: Theme.spacing.sm,
    fontSize: Theme.typography.fontSize.md,
  },
  selectedContactsContainer: {
    marginBottom: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
  },
  selectedContact: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.pill,
    marginRight: Theme.spacing.sm,
  },
  selectedAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: Theme.spacing.xs,
  },
  selectedName: {
    color: 'white',
    fontSize: Theme.typography.fontSize.sm,
    maxWidth: 100,
  },
  removeButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Theme.spacing.xs,
  },
  groupNameContainer: {
    marginHorizontal: Theme.spacing.xl,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.lg,
  },
  groupNameInput: {
    fontSize: Theme.typography.fontSize.md,
  },
  contactsList: {
    paddingHorizontal: Theme.spacing.xl,
    paddingBottom: 100,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Theme.spacing.md,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: Theme.typography.fontSize.md,
    marginBottom: 4,
  },
  lastSeen: {
    fontSize: Theme.typography.fontSize.sm,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: Theme.spacing.xl,
  },
  startButton: {
    width: '100%',
  },
});