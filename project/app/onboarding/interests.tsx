import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Music, Film, Book, Heart, Gamepad2, GraduationCap, Rocket, Bike, Check, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Theme from '@/constants/Theme';

export default function InterestsScreen() {
  const { colors } = useTheme();
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);

  const interests = [
    { id: 1, name: 'Music', icon: <Music size={24} color="white" /> },
    { id: 2, name: 'Movies', icon: <Film size={24} color="white" /> },
    { id: 3, name: 'Books', icon: <Book size={24} color="white" /> },
    { id: 4, name: 'Dating', icon: <Heart size={24} color="white" /> },
    { id: 5, name: 'Gaming', icon: <Gamepad2 size={24} color="white" /> },
    { id: 6, name: 'Education', icon: <GraduationCap size={24} color="white" /> },
    { id: 7, name: 'Technology', icon: <Rocket size={24} color="white" /> },
    { id: 8, name: 'Sports', icon: <Bike size={24} color="white" /> },
  ];

  const toggleInterest = (id: number) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const navigateToMain = () => {
    router.replace('/(tabs)');
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
          Select Your Interests
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
          We'll help you connect with like-minded people
        </Text>
      </View>

      <ScrollView
        style={styles.interestsContainer}
        contentContainerStyle={styles.interestsContent}
      >
        {interests.map((interest) => (
          <Pressable
            key={interest.id}
            style={[
              styles.interestCard,
              {
                backgroundColor: selectedInterests.includes(interest.id)
                  ? colors.primary.blue
                  : colors.dark.card,
                borderColor: selectedInterests.includes(interest.id)
                  ? colors.primary.pink
                  : 'transparent',
              },
            ]}
            onPress={() => toggleInterest(interest.id)}
          >
            <View style={styles.interestContent}>
              <View style={styles.interestIcon}>{interest.icon}</View>
              <Text
                style={[
                  styles.interestName,
                  {
                    color: colors.text.primary,
                    fontFamily: Theme.typography.fontFamily.primary.medium,
                  },
                ]}
              >
                {interest.name}
              </Text>
            </View>
            {selectedInterests.includes(interest.id) && (
              <View
                style={[
                  styles.checkmark,
                  { backgroundColor: colors.primary.pink },
                ]}
              >
                <Check size={16} color="white" />
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable onPress={navigateToMain}>
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
              Start Chatting
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
  interestsContainer: {
    flex: 1,
  },
  interestsContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: Theme.spacing.xl,
  },
  interestCard: {
    width: '48%',
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Theme.shadows.sm,
  },
  interestContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interestIcon: {
    marginRight: Theme.spacing.sm,
  },
  interestName: {
    fontSize: Theme.typography.fontSize.md,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
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