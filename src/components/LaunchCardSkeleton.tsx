import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export function LaunchCardSkeleton() {
  const opacity = useSharedValue(0.35);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 700 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View style={styles.dateLine} />
      <View style={styles.titleLine} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 180,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#ffffff1a',
    marginBottom: 14,
    padding: 20,
    justifyContent: 'flex-end',
  },
  dateLine: {
    width: '35%',
    height: 12,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
    marginBottom: 14,
  },
  titleLine: {
    width: '75%',
    height: 24,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
  },
});