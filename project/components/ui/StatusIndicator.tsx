import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withRepeat, withSequence, withTiming, withDelay } from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';
import Theme from '@/constants/Theme';

type StatusType = 'online' | 'away' | 'offline';

type StatusIndicatorProps = {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
  pulsate?: boolean;
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'md',
  pulsate = true,
}) => {
  const { colors } = useTheme();

  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case 'online':
        return colors.status.online;
      case 'away':
        return colors.status.away;
      case 'offline':
        return colors.status.offline;
      default:
        return colors.status.offline;
    }
  };

  const getSizeValue = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm':
        return 8;
      case 'md':
        return 12;
      case 'lg':
        return 16;
      default:
        return 12;
    }
  };

  const statusColor = getStatusColor(status);
  const sizeValue = getSizeValue(size);

  const glowAnimatedStyle = useAnimatedStyle(() => {
    if (!pulsate || status === 'offline') return { opacity: 0 };

    return {
      opacity: withRepeat(
        withDelay(
          500,
          withSequence(
            withTiming(0.6, { duration: 1000 }),
            withTiming(0.2, { duration: 1000 })
          )
        ),
        -1,
        true
      ),
    };
  });

  return (
    <View style={[styles.container, { width: sizeValue, height: sizeValue }]}>
      <View
        style={[
          styles.statusDot,
          {
            width: sizeValue,
            height: sizeValue,
            backgroundColor: statusColor,
          },
        ]}
      />
      {status !== 'offline' && (
        <Animated.View
          style={[
            styles.glow,
            {
              width: sizeValue * 2,
              height: sizeValue * 2,
              borderRadius: sizeValue,
              backgroundColor: statusColor,
            },
            glowAnimatedStyle,
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDot: {
    borderRadius: 999,
    position: 'absolute',
    zIndex: 2,
  },
  glow: {
    position: 'absolute',
    zIndex: 1,
    opacity: 0.4,
  },
});

export default StatusIndicator;