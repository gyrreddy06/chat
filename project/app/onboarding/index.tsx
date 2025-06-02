import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageSquare } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Theme from '@/constants/Theme';

export default function WelcomeScreen() {
  const { colors } = useTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const navigateToNextScreen = () => {
    router.push('/onboarding/avatar');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.logoBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MessageSquare 
            size={64} 
            color="white" 
            strokeWidth={2.5} 
          />
        </LinearGradient>
        <Animated.Text
          style={[
            styles.appName,
            {
              color: colors.text.primary,
              fontFamily: Theme.typography.fontFamily.primary.bold,
              opacity: fadeAnim,
            },
          ]}
        >
          VibeChat
        </Animated.Text>
        <Animated.Text
          style={[
            styles.tagline,
            {
              color: colors.text.secondary,
              fontFamily: Theme.typography.fontFamily.secondary.regular,
              opacity: fadeAnim,
            },
          ]}
        >
          Connect with your vibe tribe
        </Animated.Text>
      </Animated.View>

      <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
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
              Get Started
            </Text>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: Theme.borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.lg,
  },
  appName: {
    fontSize: Theme.typography.fontSize['3xl'],
    marginBottom: Theme.spacing.xs,
  },
  tagline: {
    fontSize: Theme.typography.fontSize.lg,
    textAlign: 'center',
    marginHorizontal: Theme.spacing.xl,
  },
  buttonContainer: {
    width: '100%',
    marginTop: Theme.spacing['2xl'],
  },
  button: {
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
  },
});