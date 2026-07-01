import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '../constants/colors';

type LaunchCardSkeletonProps = {
  large?: boolean;
};

export function LaunchCardSkeleton({ large = false }: LaunchCardSkeletonProps) {
  const opacity = useSharedValue(0.35);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 700 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.card, large && styles.largeCard, animatedStyle]}>
      <View style={styles.dateLine} />
      <View style={styles.titleLine} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 116,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    marginBottom: 14,
    paddingHorizontal: 16,
    paddingBottom: 14,
    justifyContent: 'flex-end',
  },
  largeCard: {
    height: 150,
  },
  dateLine: {
    width: 90,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.emptyCardBackground,
    marginBottom: 8,
  },
  titleLine: {
    width: '70%',
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.emptyCardBackground,
  },
});