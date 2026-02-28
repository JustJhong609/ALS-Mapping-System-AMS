/**
 * Reusable animated components powered by React Native Reanimated 3.
 * Import these wrappers to add entrance animations throughout the app.
 */
import React, { useEffect } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  FadeOut,
  SlideInDown,
  SlideInRight,
  ZoomIn,
  Layout,
} from 'react-native-reanimated';

// ── Re-export prebuilt entering/exiting animations ─────
export {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  FadeOut,
  SlideInDown,
  SlideInRight,
  ZoomIn,
  Layout,
};

// ── Animated wrapper: fade + slide up on mount ─────────
interface AnimatedCardProps {
  children: React.ReactNode;
  index?: number;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  index = 0,
  delay = 0,
  style,
}) => {
  const baseDelay = delay + index * 80;

  return (
    <Animated.View
      entering={FadeInDown.delay(baseDelay).duration(400).springify().damping(15)}
      style={style}>
      {children}
    </Animated.View>
  );
};

// ── Animated wrapper: fade in from left ────────────────
export const AnimatedSlideIn: React.FC<AnimatedCardProps> = ({
  children,
  index = 0,
  delay = 0,
  style,
}) => {
  const baseDelay = delay + index * 60;

  return (
    <Animated.View
      entering={FadeInLeft.delay(baseDelay).duration(350).springify().damping(14)}
      style={style}>
      {children}
    </Animated.View>
  );
};

// ── Animated wrapper: scale in (zoom) ──────────────────
export const AnimatedZoom: React.FC<AnimatedCardProps> = ({
  children,
  index = 0,
  delay = 0,
  style,
}) => {
  const baseDelay = delay + index * 100;

  return (
    <Animated.View
      entering={ZoomIn.delay(baseDelay).duration(350).springify().damping(12)}
      style={style}>
      {children}
    </Animated.View>
  );
};

// ── Animated wrapper: simple fade ──────────────────────
export const AnimatedFade: React.FC<AnimatedCardProps> = ({
  children,
  index = 0,
  delay = 0,
  style,
}) => {
  const baseDelay = delay + index * 80;

  return (
    <Animated.View
      entering={FadeIn.delay(baseDelay).duration(400)}
      style={style}>
      {children}
    </Animated.View>
  );
};

// ── Stagger helper: wrap children with increasing delays
export const staggerDelay = (index: number, base = 100, step = 80) =>
  base + index * step;

// ── Animated bar (for charts) ──────────────────────────
interface AnimatedBarProps {
  widthPct: number;
  color: string;
  height?: number;
  delay?: number;
}

export const AnimatedBar: React.FC<AnimatedBarProps> = ({
  widthPct,
  color,
  height = 8,
  delay = 0,
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(widthPct, {
        duration: 600,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [widthPct]);

  const animStyle = useAnimatedStyle(() => ({
    width: `${Math.max(progress.value, 0)}%`,
    height,
    borderRadius: height / 2,
    backgroundColor: color,
  }));

  return <Animated.View style={animStyle} />;
};

// ── Animated counter (numbers counting up) ─────────────
interface AnimatedCounterProps {
  to: number;
  duration?: number;
  delay?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: any;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  to,
  duration = 800,
  delay = 0,
  style,
  textStyle,
}) => {
  const count = useSharedValue(0);

  useEffect(() => {
    count.value = withDelay(
      delay,
      withTiming(to, {
        duration,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [to]);

  const animTextStyle = useAnimatedStyle(() => ({
    // This triggers re-render but we use it for the value
  }));

  // For simplicity, we just use the entering animation on the container
  return (
    <Animated.View
      entering={ZoomIn.delay(delay).duration(400).springify()}
      style={style}>
      <Animated.Text style={textStyle}>{to}</Animated.Text>
    </Animated.View>
  );
};
