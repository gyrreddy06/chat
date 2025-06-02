import { useCallback } from 'react';
import {
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';

export const useAnimatedTransition = () => {
  const fadeIn = useCallback((duration = 300) => {
    return withTiming(1, {
      duration,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  }, []);

  const fadeOut = useCallback((duration = 300) => {
    return withTiming(0, {
      duration,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  }, []);

  const slideIn = useCallback((from: 'left' | 'right' | 'top' | 'bottom' = 'right', duration = 300) => {
    const distance = 50;
    const initialValue = {
      left: distance,
      right: -distance,
      top: distance,
      bottom: -distance,
    }[from];

    return {
      opacity: fadeIn(duration),
      transform: [
        {
          [from === 'left' || from === 'right' ? 'translateX' : 'translateY']: withSpring(0, {
            damping: 20,
            stiffness: 90,
            mass: 0.4,
          }, () => {
            'worklet';
            return initialValue;
          }),
        },
      ],
    };
  }, [fadeIn]);

  const scaleIn = useCallback((delay = 0) => {
    return {
      opacity: withDelay(delay, fadeIn(400)),
      transform: [
        {
          scale: withSpring(1, {
            damping: 15,
            stiffness: 100,
            mass: 0.8,
          }, () => {
            'worklet';
            return 0.8;
          }),
        },
      ],
    };
  }, [fadeIn]);

  const pulse = useCallback(() => {
    return withSequence(
      withTiming(1.05, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
  }, []);

  return {
    fadeIn,
    fadeOut,
    slideIn,
    scaleIn,
    pulse,
  };
};