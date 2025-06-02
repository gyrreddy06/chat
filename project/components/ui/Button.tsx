import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';
import Theme from '@/constants/Theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
}) => {
  const { colors } = useTheme();

  const getSizeStyle = (size: ButtonSize): ViewStyle => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: Theme.spacing.xs,
          paddingHorizontal: Theme.spacing.md,
        };
      case 'lg':
        return {
          paddingVertical: Theme.spacing.lg,
          paddingHorizontal: Theme.spacing.xl,
        };
      default:
        return {
          paddingVertical: Theme.spacing.md,
          paddingHorizontal: Theme.spacing.lg,
        };
    }
  };

  const getTextSize = (size: ButtonSize): number => {
    switch (size) {
      case 'sm':
        return Theme.typography.fontSize.sm;
      case 'lg':
        return Theme.typography.fontSize.lg;
      default:
        return Theme.typography.fontSize.md;
    }
  };

  const renderButtonContent = () => {
    const textColor = variant === 'ghost' || variant === 'outline' 
      ? colors.primary.blue 
      : 'white';

    return (
      <>
        {loading ? (
          <ActivityIndicator 
            color={textColor} 
            size={size === 'sm' ? 'small' : 'small'} 
          />
        ) : (
          <Pressable
            style={[
              styles.contentContainer,
              { opacity: disabled ? 0.6 : 1 },
            ]}
            onPress={disabled ? undefined : onPress}
          >
            {icon && iconPosition === 'left' && <>{icon}</>}
            <Text
              style={[
                styles.text,
                {
                  color: textColor,
                  fontSize: getTextSize(size),
                  fontFamily: Theme.typography.fontFamily.primary.semiBold,
                  marginLeft: icon && iconPosition === 'left' ? Theme.spacing.sm : 0,
                  marginRight: icon && iconPosition === 'right' ? Theme.spacing.sm : 0,
                },
                textStyle,
              ]}
            >
              {title}
            </Text>
            {icon && iconPosition === 'right' && <>{icon}</>}
          </Pressable>
        )}
      </>
    );
  };

  if (variant === 'primary' || variant === 'secondary') {
    const gradientColors = variant === 'primary'
      ? colors.gradients.primary
      : colors.gradients.secondary;

    return (
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.container,
          styles.gradient,
          getSizeStyle(size),
          style,
        ]}
      >
        {renderButtonContent()}
      </LinearGradient>
    );
  }

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: colors.primary.blue,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      default:
        return {
          backgroundColor: colors.primary.blue,
        };
    }
  };

  return (
    <Pressable
      style={[
        styles.container,
        getVariantStyle(),
        getSizeStyle(size),
        { opacity: disabled ? 0.6 : 1 },
        style,
      ]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled || loading}
    >
      {renderButtonContent()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.borderRadius.pill,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.sm,
  },
  gradient: {
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default Button;