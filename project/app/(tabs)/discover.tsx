import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, TextInput } from 'react-native';
import { Search, Filter, Users, Music, Film, Heart, Gamepad2, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';
import Theme from '@/constants/Theme';

const categories = [
  { id: '1', name: 'Groups', icon: <Users size={20} color="white" /> },
  { id: '2', name: 'Music', icon: <Music size={20} color="white" /> },
  { id: '3', name: 'Movies', icon: <Film size={20} color="white" /> },
  { id: '4', name: 'Dating', icon: <Heart size={20} color="white" /> },
  { id: '5', name: 'Gaming', icon: <Gamepad2 size={20} color="white" /> },
  { id: '6', name: 'Trending', icon: <Sparkles size={20} color="white" /> },
];

const popularGroups = [
  {
    id: '1',
    name: 'Music Festival Squad',
    members: 1254,
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Music',
  },
  {
    id: '2',
    name: 'Photography Enthusiasts',
    members: 3876,
    image: 'https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Art',
  },
  {
    id: '3',
    name: 'Tech Innovators',
    members: 982,
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Technology',
  },
];

const suggestedUsers = [
  {
    id: '1',
    username: 'alex_tech',
    name: 'Alex Mitchell',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
    mutualFriends: 5,
  },
  {
    id: '2',
    username: 'emma_designs',
    name: 'Emma Rodriguez',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    mutualFriends: 3,
  },
  {
    id: '3',
    username: 'jason_music',
    name: 'Jason Parker',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    mutualFriends: 8,
  },
];

export default function DiscoverScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: colors.text.primary, fontFamily: Theme.typography.fontFamily.primary.bold },
          ]}
        >
          Discover
        </Text>

        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchBar,
              { backgroundColor: colors.dark.card },
            ]}
          >
            <Search size={20} color={colors.text.secondary} />
            <TextInput
              placeholder="Search people, groups & more"
              placeholderTextColor={colors.text.secondary}
              style={[
                styles.searchInput,
                { 
                  color: colors.text.primary,
                  fontFamily: Theme.typography.fontFamily.secondary.regular
                },
              ]}
            />
            <Pressable style={styles.filterButton}>
              <Filter size={20} color={colors.text.secondary} />
            </Pressable>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <Pressable
              key={category.id}
              style={[
                styles.categoryItem,
                { backgroundColor: colors.dark.card },
              ]}
            >
              <LinearGradient
                colors={colors.gradients.primary}
                style={styles.categoryIconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {category.icon}
              </LinearGradient>
              <Text
                style={[
                  styles.categoryName,
                  {
                    color: colors.text.primary,
                    fontFamily: Theme.typography.fontFamily.primary.medium,
                  },
                ]}
              >
                {category.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sectionContainer}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text.primary,
                fontFamily: Theme.typography.fontFamily.primary.semiBold,
              },
            ]}
          >
            Popular Groups
          </Text>
          
          <View style={styles.groupsGrid}>
            {popularGroups.map((group) => (
              <Pressable
                key={group.id}
                style={[
                  styles.groupItem,
                  { backgroundColor: colors.dark.card },
                ]}
              >
                <Image source={{ uri: group.image }} style={styles.groupImage} />
                <View style={styles.groupInfo}>
                  <Text
                    style={[
                      styles.groupName,
                      {
                        color: colors.text.primary,
                        fontFamily: Theme.typography.fontFamily.primary.semiBold,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {group.name}
                  </Text>
                  <View style={styles.groupMeta}>
                    <Text
                      style={[
                        styles.groupCategory,
                        {
                          color: colors.primary.pink,
                          fontFamily: Theme.typography.fontFamily.secondary.medium,
                        },
                      ]}
                    >
                      {group.category}
                    </Text>
                    <Text
                      style={[
                        styles.groupMembers,
                        {
                          color: colors.text.secondary,
                          fontFamily: Theme.typography.fontFamily.secondary.regular,
                        },
                      ]}
                    >
                      {group.members} members
                    </Text>
                  </View>
                </View>
                <LinearGradient
                  colors={colors.gradients.primary}
                  style={styles.joinButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text
                    style={[
                      styles.joinButtonText,
                      { fontFamily: Theme.typography.fontFamily.primary.semiBold },
                    ]}
                  >
                    Join
                  </Text>
                </LinearGradient>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={[styles.sectionContainer, styles.lastSection]}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text.primary,
                fontFamily: Theme.typography.fontFamily.primary.semiBold,
              },
            ]}
          >
            People You May Know
          </Text>
          
          <View style={styles.usersContainer}>
            {suggestedUsers.map((user) => (
              <Pressable
                key={user.id}
                style={[
                  styles.userItem,
                  { backgroundColor: colors.dark.card },
                ]}
              >
                <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
                <View style={styles.userInfo}>
                  <Text
                    style={[
                      styles.userName,
                      {
                        color: colors.text.primary,
                        fontFamily: Theme.typography.fontFamily.primary.semiBold,
                      },
                    ]}
                  >
                    {user.name}
                  </Text>
                  <Text
                    style={[
                      styles.userUsername,
                      {
                        color: colors.text.secondary,
                        fontFamily: Theme.typography.fontFamily.secondary.regular,
                      },
                    ]}
                  >
                    @{user.username}
                  </Text>
                  <Text
                    style={[
                      styles.mutualFriends,
                      {
                        color: colors.primary.blue,
                        fontFamily: Theme.typography.fontFamily.secondary.medium,
                      },
                    ]}
                  >
                    {user.mutualFriends} mutual friends
                  </Text>
                </View>
                <LinearGradient
                  colors={colors.gradients.primary}
                  style={styles.addButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text
                    style={[
                      styles.addButtonText,
                      { fontFamily: Theme.typography.fontFamily.primary.semiBold },
                    ]}
                  >
                    Add
                  </Text>
                </LinearGradient>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
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
  title: {
    fontSize: Theme.typography.fontSize['2xl'],
    marginBottom: Theme.spacing.md,
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
  searchInput: {
    flex: 1,
    marginLeft: Theme.spacing.sm,
    fontSize: Theme.typography.fontSize.md,
  },
  filterButton: {
    padding: Theme.spacing.xs,
  },
  categoriesContainer: {
    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.md,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.sm,
    width: 80,
    ...Theme.shadows.sm,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.xs,
  },
  categoryName: {
    fontSize: Theme.typography.fontSize.xs,
    textAlign: 'center',
  },
  sectionContainer: {
    paddingHorizontal: Theme.spacing.xl,
    marginTop: Theme.spacing.xl,
  },
  lastSection: {
    marginBottom: 100,
  },
  sectionTitle: {
    fontSize: Theme.typography.fontSize.lg,
    marginBottom: Theme.spacing.md,
  },
  groupsGrid: {
    gap: Theme.spacing.md,
  },
  groupItem: {
    flexDirection: 'row',
    borderRadius: Theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  groupImage: {
    width: 80,
    height: 80,
  },
  groupInfo: {
    flex: 1,
    padding: Theme.spacing.md,
    justifyContent: 'center',
  },
  groupName: {
    fontSize: Theme.typography.fontSize.md,
    marginBottom: 4,
  },
  groupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupCategory: {
    fontSize: Theme.typography.fontSize.xs,
    marginRight: Theme.spacing.sm,
  },
  groupMembers: {
    fontSize: Theme.typography.fontSize.xs,
  },
  joinButton: {
    alignSelf: 'center',
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.pill,
    marginRight: Theme.spacing.md,
  },
  joinButtonText: {
    color: 'white',
    fontSize: Theme.typography.fontSize.sm,
  },
  usersContainer: {
    gap: Theme.spacing.md,
  },
  userItem: {
    flexDirection: 'row',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Theme.spacing.md,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: Theme.typography.fontSize.md,
  },
  userUsername: {
    fontSize: Theme.typography.fontSize.sm,
    marginBottom: 2,
  },
  mutualFriends: {
    fontSize: Theme.typography.fontSize.xs,
  },
  addButton: {
    alignSelf: 'center',
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.pill,
  },
  addButtonText: {
    color: 'white',
    fontSize: Theme.typography.fontSize.sm,
  },
});