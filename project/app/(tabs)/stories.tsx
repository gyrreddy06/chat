import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Plus, Play } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';
import Theme from '@/constants/Theme';

type StoryItem = {
  id: string;
  username: string;
  avatar: string;
  hasUnseenStory: boolean;
  stories: {
    id: string;
    type: 'image' | 'video';
    url: string;
    timestamp: string;
  }[];
};

const mockStories: StoryItem[] = [
  {
    id: 'your-story',
    username: 'Your Story',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    hasUnseenStory: false,
    stories: [],
  },
  {
    id: '1',
    username: 'sarah_j',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    hasUnseenStory: true,
    stories: [
      {
        id: 's1',
        type: 'image',
        url: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=300',
        timestamp: '2h ago',
      },
    ],
  },
  {
    id: '2',
    username: 'mike_c',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    hasUnseenStory: true,
    stories: [
      {
        id: 's2',
        type: 'image',
        url: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=300',
        timestamp: '4h ago',
      },
    ],
  },
  {
    id: '3',
    username: 'taylor_w',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100',
    hasUnseenStory: true,
    stories: [
      {
        id: 's3',
        type: 'video',
        url: 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=300',
        timestamp: '5h ago',
      },
    ],
  },
  {
    id: '4',
    username: 'alex_m',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
    hasUnseenStory: false,
    stories: [
      {
        id: 's4',
        type: 'image',
        url: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=300',
        timestamp: '23h ago',
      },
    ],
  },
];

const mockFeaturedStories = [
  {
    id: 'f1',
    username: 'festivalvibes',
    title: 'Summer Music Festival',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
    views: 1243,
  },
  {
    id: 'f2',
    username: 'travel_addict',
    title: 'Beach Paradise',
    image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=400',
    views: 856,
  },
  {
    id: 'f3',
    username: 'food_lover',
    title: 'Gourmet Adventure',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
    views: 2198,
  },
];

export default function StoriesScreen() {
  const { colors } = useTheme();

  const renderStoryCircle = (story: StoryItem, index: number) => {
    const isYourStory = story.id === 'your-story';

    return (
      <Pressable key={story.id} style={styles.storyItem}>
        <View style={styles.storyAvatarContainer}>
          {story.hasUnseenStory ? (
            <LinearGradient
              colors={colors.gradients.primary}
              style={styles.storyRing}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
            </LinearGradient>
          ) : (
            <View
              style={[
                styles.storyRing,
                {
                  backgroundColor: isYourStory ? 'transparent' : colors.dark.card,
                  borderWidth: isYourStory ? 0 : 1,
                  borderColor: colors.text.muted,
                },
              ]}
            >
              <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
              {isYourStory && (
                <View style={styles.addStoryButton}>
                  <LinearGradient
                    colors={colors.gradients.primary}
                    style={styles.addButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Plus size={16} color="white" />
                  </LinearGradient>
                </View>
              )}
            </View>
          )}
        </View>
        <Text
          style={[
            styles.storyUsername,
            {
              color: colors.text.primary,
              fontFamily: Theme.typography.fontFamily.secondary.regular,
            },
          ]}
          numberOfLines={1}
        >
          {story.username}
        </Text>
      </Pressable>
    );
  };

  const renderFeaturedStory = (story, index) => (
    <Pressable
      key={story.id}
      style={[styles.featuredStoryItem, { backgroundColor: colors.dark.card }]}
    >
      <Image source={{ uri: story.image }} style={styles.featuredStoryImage} />
      <View style={styles.featuredStoryOverlay}>
        <View style={styles.featuredStoryHeader}>
          <Text
            style={[
              styles.featuredStoryTitle,
              { fontFamily: Theme.typography.fontFamily.primary.bold },
            ]}
          >
            {story.title}
          </Text>
          <Text
            style={[
              styles.featuredStoryUsername,
              { fontFamily: Theme.typography.fontFamily.secondary.regular },
            ]}
          >
            @{story.username}
          </Text>
        </View>
        <View style={styles.featuredStoryFooter}>
          <Text
            style={[
              styles.featuredStoryViews,
              { fontFamily: Theme.typography.fontFamily.secondary.regular },
            ]}
          >
            {story.views} views
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: colors.text.primary, fontFamily: Theme.typography.fontFamily.primary.bold },
          ]}
        >
          Stories
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesContainer}
        >
          {mockStories.map(renderStoryCircle)}
        </ScrollView>

        <View style={styles.featuredContainer}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text.primary, fontFamily: Theme.typography.fontFamily.primary.semiBold },
            ]}
          >
            Featured Stories
          </Text>
          <View style={styles.featuredStoriesGrid}>
            {mockFeaturedStories.map(renderFeaturedStory)}
          </View>
        </View>

        <View style={styles.trendingContainer}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text.primary, fontFamily: Theme.typography.fontFamily.primary.semiBold },
            ]}
          >
            Trending Now
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingStoriesContainer}
          >
            {[...mockFeaturedStories, ...mockFeaturedStories].map((story, index) => (
              <Pressable
                key={`trending-${story.id}-${index}`}
                style={[
                  styles.trendingStoryItem,
                  { backgroundColor: colors.dark.card },
                ]}
              >
                <Image
                  source={{ uri: story.image }}
                  style={styles.trendingStoryImage}
                />
                {story.username === 'travel_addict' && (
                  <View style={styles.videoIndicator}>
                    <View style={styles.playButton}>
                      <Play size={12} color="white" fill="white" />
                    </View>
                  </View>
                )}
                <View style={styles.trendingStoryFooter}>
                  <Text
                    style={[
                      styles.trendingStoryTitle,
                      { fontFamily: Theme.typography.fontFamily.primary.semiBold },
                    ]}
                    numberOfLines={1}
                  >
                    {story.title}
                  </Text>
                  <Text
                    style={[
                      styles.trendingStoryUsername,
                      { fontFamily: Theme.typography.fontFamily.secondary.regular },
                    ]}
                    numberOfLines={1}
                  >
                    @{story.username}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
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
  },
  storiesContainer: {
    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.lg,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: Theme.spacing.lg,
    width: 70,
  },
  storyAvatarContainer: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyRing: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#121212',
  },
  addStoryButton: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    zIndex: 10,
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#121212',
  },
  storyUsername: {
    marginTop: Theme.spacing.xs,
    fontSize: Theme.typography.fontSize.xs,
    textAlign: 'center',
    width: 70,
  },
  featuredContainer: {
    paddingHorizontal: Theme.spacing.xl,
    marginBottom: Theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: Theme.typography.fontSize.lg,
    marginBottom: Theme.spacing.md,
  },
  featuredStoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featuredStoryItem: {
    width: '48%',
    height: 200,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
    overflow: 'hidden',
    ...Theme.shadows.sm,
  },
  featuredStoryImage: {
    width: '100%',
    height: '100%',
  },
  featuredStoryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
    padding: Theme.spacing.sm,
  },
  featuredStoryHeader: {
    marginTop: 'auto',
  },
  featuredStoryTitle: {
    color: 'white',
    fontSize: Theme.typography.fontSize.md,
    marginBottom: 2,
  },
  featuredStoryUsername: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: Theme.typography.fontSize.xs,
  },
  featuredStoryFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  featuredStoryViews: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: Theme.typography.fontSize.xs,
  },
  trendingContainer: {
    paddingHorizontal: Theme.spacing.xl,
    marginBottom: 100,
  },
  trendingStoriesContainer: {
    paddingBottom: Theme.spacing.xl,
  },
  trendingStoryItem: {
    width: 150,
    height: 200,
    borderRadius: Theme.borderRadius.md,
    marginRight: Theme.spacing.md,
    overflow: 'hidden',
    ...Theme.shadows.sm,
  },
  trendingStoryImage: {
    width: '100%',
    height: 150,
  },
  videoIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  playButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendingStoryFooter: {
    padding: Theme.spacing.xs,
  },
  trendingStoryTitle: {
    color: 'white',
    fontSize: Theme.typography.fontSize.sm,
  },
  trendingStoryUsername: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: Theme.typography.fontSize.xs,
  },
});