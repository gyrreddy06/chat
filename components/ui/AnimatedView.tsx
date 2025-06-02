import React from 'react';
import Animated, { 
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutRight,
} from 'react-native-reanimated';

type AnimatedViewProps = {
  children: React.ReactNode;
  entering?: 'fade' | 'slide' | 'none';
  exiting?: 'fade' | 'slide' | 'none';
  style?: any;
};

const AnimatedView: React.FC<AnimatedViewProps> = ({
  children,
  entering = 'fade',
  exiting = 'fade',
  style,
}) => {
  const getEnteringAnimation = () => {
    switch (entering) {
      case 'slide':
        return SlideInRight;
      case 'fade':
        return FadeIn;
      default:
        return undefined;
    }
  };

  const getExitingAnimation = () => {
    switch (exiting) {
      case 'slide':
        return SlideOutRight;
      case 'fade':
        return FadeOut;
      default:
        return undefined;
    }
  };

  return (
    <Animated.View
      entering={getEnteringAnimation()}
      exiting={getExitingAnimation()}
      style={style}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedView;