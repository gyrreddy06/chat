import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, User, Upload, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Theme from '@/constants/Theme';

export default function AvatarScreen() {
  const { colors } = useTheme();
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  const avatarOptions = [
    { id: 1, name: 'Photo', icon: <Camera size={24} color="white" /> },
    { id: 2, name: 'Default', icon: <User size={24} color="white" /> },
    { id: 3, name: 'Upload', icon: <Upload size={24} color="white" /> },
  ];

  const navigateToNextScreen = () => {
    router.push('/onboarding/interests');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text.primary,
              fontFamily: Theme.typography.fontFamily.primary.bold,
            },
          ]}
        >
          Create Your Avatar
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              color: colors.text.secondary,
              fontFamily: Theme.typography.fontFamily.secondary.regular,
            },
          ]}
        >
          Show your unique style to the world
        </Text>
      </View>

      <View style={styles.avatarContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.avatarGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.avatarInner}>
            <User
              size={64}
              color={colors.text.primary}
              strokeWidth={1.5}
            />
          </View>
        </LinearGradient>
      </View>

      <View style={styles.optionsContainer}>
        {avatarOptions.map((option) => (
          <Pressable
            key={option.id}
            style={[
              styles.optionButton,
              {
                backgroundColor: selectedAvatar === option.id
                  ? colors.primary.blue
                  : colors.dark.card,
                borderColor: selectedAvatar === option.id
                  ? colors.primary.pink
                  : 'transparent',
              },
            ]}
            onPress={() => setSelectedAvatar(option.id)}
          >
            <View style={styles.optionIcon}>{option.icon}</View>
            <Text
              style={[
                styles.optionText,
                {
                  color: colors.text.primary,
                  fontFamily: Theme.typography.fontFamily.primary.medium,
                },
              ]}
            >
              {option.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.filtersContainer}>
        <Text
          style={[
            styles.filtersTitle,
            {
              color: colors.text.primary,
              fontFamily: Theme.typography.fontFamily.primary.semiBold,
            },
          ]}
        >
          AR Filters
        </Text>
        <View style={styles.filtersRow}>
          {[1, 2, 3, 4].map((filter) => (
            <Pressable
              key={filter}
              style={[
                styles.filterItem,
                { backgroundColor: colors.dark.card },
              ]}
            >
              <View
                style={[
                  styles.filterPreview,
                  { backgroundColor: colors.dark.surface },
                ]}
              />
              <Text
                style={[
                  styles.filterName,
                  {
                    color: colors.text.secondary,
                    fontFamily: Theme.typography.fontFamily.secondary.regular,
                  },
                ]}
              >
                Filter {filter}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={navigateToNextScreen}>
          <LinearGradient
            colors={colors.gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text
              style={[
                styles.buttonText,
                { fontFamily: Theme.typography.fontFamily.primary.bold },
              ]}
            >
              Continue
            </Text>
            <ChevronRight size={20} color="white" />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.xl,
  },
  header: {
    marginTop: Theme.spacing['2xl'],
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  title: {
    fontSize: Theme.typography.fontSize['2xl'],
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: Theme.typography.fontSize.md,
    textAlign: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: Theme.spacing.xl,
  },
  avatarGradient: {
    width: 150,
    height: 150,
    borderRadius: 75,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.xl,
  },
  optionButton: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 2,
    ...Theme.shadows.sm,
  },
  optionIcon: {
    marginBottom: Theme.spacing.xs,
  },
  optionText: {
    fontSize: Theme.typography.fontSize.sm,
  },
  filtersContainer: {
    marginBottom: Theme.spacing.xl,
  },
  filtersTitle: {
    fontSize: Theme.typography.fontSize.lg,
    marginBottom: Theme.spacing.md,
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterItem: {
    width: '22%',
    borderRadius: Theme.borderRadius.md,
    overflow: 'hidden',
    ...Theme.shadows.sm,
  },
  filterPreview: {
    height: 60,
    width: '100%',
  },
  filterName: {
    fontSize: Theme.typography.fontSize.xs,
    textAlign: 'center',
    paddingVertical: Theme.spacing.xs,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: Theme.spacing.xl,
  },
  button: {
    flexDirection: 'row',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    borderRadius: Theme.borderRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    ...Theme.shadows.md,
  },
  buttonText: {
    color: 'white',
    fontSize: Theme.typography.fontSize.lg,
    marginRight: Theme.spacing.xs,
  },
});