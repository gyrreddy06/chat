import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Switch } from 'react-native';
import { Moon, Sun, Bell, Lock, Globe, Brush as BrushIcon, Camera, MessageSquare, Settings, LogOut } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';
import Theme from '@/constants/Theme';
import Button from '@/components/ui/Button';

export default function ProfileScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);

  const userProfile = {
    name: 'Jamie Wilson',
    username: '@jamie_w',
    bio: 'Living life one vibe at a time ✨ | Music lover | Travel enthusiast',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    stats: {
      friends: 289,
      posts: 74,
      reactions: 1.2,
    },
  };

  const renderProfileStat = (label: string, value: number | string) => (
    <View style={styles.statItem}>
      <Text
        style={[
          styles.statValue,
          {
            color: colors.text.primary,
            fontFamily: Theme.typography.fontFamily.primary.bold,
          },
        ]}
      >
        {typeof value === 'number' && value >= 1000
          ? `${(value / 1000).toFixed(1)}k`
          : value}
      </Text>
      <Text
        style={[
          styles.statLabel,
          {
            color: colors.text.secondary,
            fontFamily: Theme.typography.fontFamily.secondary.regular,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );

  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    description: string,
    toggle?: {
      value: boolean;
      onToggle: () => void;
    }
  ) => (
    <View
      style={[
        styles.settingItem,
        { borderBottomColor: 'rgba(255,255,255,0.1)' },
      ]}
    >
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingContent}>
        <Text
          style={[
            styles.settingTitle,
            {
              color: colors.text.primary,
              fontFamily: Theme.typography.fontFamily.primary.medium,
            },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.settingDescription,
            {
              color: colors.text.secondary,
              fontFamily: Theme.typography.fontFamily.secondary.regular,
            },
          ]}
        >
          {description}
        </Text>
      </View>
      {toggle && (
        <Switch
          value={toggle.value}
          onValueChange={toggle.onToggle}
          trackColor={{ false: colors.dark.card, true: colors.primary.blue }}
          thumbColor="white"
        />
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
              <Pressable style={styles.cameraButton}>
                <Camera size={18} color="white" />
              </Pressable>
            </View>
            <Text
              style={[
                styles.profileName,
                { fontFamily: Theme.typography.fontFamily.primary.bold },
              ]}
            >
              {userProfile.name}
            </Text>
            <Text
              style={[
                styles.username,
                { fontFamily: Theme.typography.fontFamily.secondary.regular },
              ]}
            >
              {userProfile.username}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.bioContainer}>
          <Text
            style={[
              styles.bioText,
              {
                color: colors.text.primary,
                fontFamily: Theme.typography.fontFamily.secondary.regular,
              },
            ]}
          >
            {userProfile.bio}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          {renderProfileStat('Friends', userProfile.stats.friends)}
          {renderProfileStat('Posts', userProfile.stats.posts)}
          {renderProfileStat('Reactions', `${userProfile.stats.reactions}k`)}
        </View>

        <View style={styles.actionsContainer}>
          <Button 
            title="Edit Profile" 
            variant="primary" 
            size="md" 
            onPress={() => {}} 
            style={styles.actionButton}
          />
          <Button 
            title="Share Profile" 
            variant="outline" 
            size="md" 
            onPress={() => {}} 
            style={styles.actionButton}
          />
        </View>

        <View
          style={[
            styles.settingsContainer,
            { backgroundColor: colors.dark.surface },
          ]}
        >
          <Text
            style={[
              styles.settingsTitle,
              {
                color: colors.text.primary,
                fontFamily: Theme.typography.fontFamily.primary.semiBold,
              },
            ]}
          >
            Settings
          </Text>

          {renderSettingItem(
            isDark ? <Moon size={24} color={colors.primary.blue} /> : <Sun size={24} color={colors.primary.blue} />,
            'Dark Mode',
            'Switch between light and dark themes',
            {
              value: isDark,
              onToggle: toggleTheme,
            }
          )}

          {renderSettingItem(
            <BrushIcon size={24} color={colors.primary.pink} />,
            'Chat Appearance',
            'Customize chat backgrounds and bubbles'
          )}

          {renderSettingItem(
            <Bell size={24} color={colors.secondary.green} />,
            'Notifications',
            'Manage notification preferences',
            {
              value: notificationsEnabled,
              onToggle: () => setNotificationsEnabled(!notificationsEnabled),
            }
          )}

          {renderSettingItem(
            <Lock size={24} color={colors.secondary.purple} />,
            'Privacy',
            'Control who can see your profile and content',
            {
              value: privateProfile,
              onToggle: () => setPrivateProfile(!privateProfile),
            }
          )}

          {renderSettingItem(
            <Globe size={24} color={colors.primary.blue} />,
            'Language',
            'Change app language'
          )}

          {renderSettingItem(
            <MessageSquare size={24} color={colors.primary.pink} />,
            'Chat Settings',
            'Manage read receipts and typing indicators'
          )}
        </View>

        <Pressable
          style={[
            styles.logoutButton,
            { backgroundColor: colors.dark.card },
          ]}
        >
          <LogOut size={20} color={colors.functional.error} />
          <Text
            style={[
              styles.logoutText,
              {
                color: colors.functional.error,
                fontFamily: Theme.typography.fontFamily.primary.medium,
              },
            ]}
          >
            Log Out
          </Text>
        </Pressable>

        <View style={styles.footer}>
          <Text
            style={[
              styles.footerText,
              {
                color: colors.text.muted,
                fontFamily: Theme.typography.fontFamily.secondary.regular,
              },
            ]}
          >
            VibeChat v1.0.0
          </Text>
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
    height: 200,
    justifyContent: 'flex-end',
  },
  headerContent: {
    alignItems: 'center',
    paddingBottom: Theme.spacing.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Theme.spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1E90FF',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  profileName: {
    color: 'white',
    fontSize: Theme.typography.fontSize.xl,
    marginBottom: 2,
  },
  username: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: Theme.typography.fontSize.md,
  },
  bioContainer: {
    paddingHorizontal: Theme.spacing.xl,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
  },
  bioText: {
    textAlign: 'center',
    fontSize: Theme.typography.fontSize.md,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.xl,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: Theme.typography.fontSize.xl,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: Theme.typography.fontSize.sm,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.xl,
    marginBottom: Theme.spacing.xl,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: Theme.spacing.xs,
  },
  settingsContainer: {
    borderRadius: Theme.borderRadius.lg,
    marginHorizontal: Theme.spacing.xl,
    marginBottom: Theme.spacing.xl,
    padding: Theme.spacing.lg,
    ...Theme.shadows.md,
  },
  settingsTitle: {
    fontSize: Theme.typography.fontSize.lg,
    marginBottom: Theme.spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingIcon: {
    marginRight: Theme.spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: Theme.typography.fontSize.md,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: Theme.typography.fontSize.sm,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Theme.spacing.xl,
    marginBottom: Theme.spacing.xl,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    ...Theme.shadows.sm,
  },
  logoutText: {
    fontSize: Theme.typography.fontSize.md,
    marginLeft: Theme.spacing.sm,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 120,
  },
  footerText: {
    fontSize: Theme.typography.fontSize.xs,
  },
});