import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Launch } from '../types/spacedevs';

type LaunchCardProps = {
  launch: Launch;
  large?: boolean;
  index?: number;
  animated?: boolean;
};

export function LaunchCard({
  launch,
  large = false,
  index = 0,
  animated = true,
}: LaunchCardProps) {
  const date = formatLaunchDate(launch.net);
  const imageUri = launch.image ?? undefined;

  return (
    <Animated.View entering={FadeInUp.duration(350)} style={styles.cardWrapper}>
      <Pressable
        style={styles.pressable}
        onPress={() => console.log('Launch:', launch.name)}
        android_ripple={{ color: '#ffffff0a' }}
      >
        <ImageBackground
          source={
            launch.image
              ? { uri: launch.image }
              : require('../../assets/images/noImage.png')
          }
          style={[styles.card]}
          imageStyle={styles.image}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.43)', 'rgba(0, 0, 0, 0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFillObject}
          />

          <View style={styles.content}>
            <Text style={styles.date}>{date}</Text>
            <Text numberOfLines={2} style={styles.title}>
              {launch.name}
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    </Animated.View>
  );
}

function formatLaunchDate(value?: string | null) {
  if (!value) return 'DATE UNKNOWN';

  const date = new Date(value);

  return date
    .toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
    .toUpperCase();
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 14,
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#ffffff14',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 4,
  },
  card: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ffffff1a',
  },
  pressable: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 12,
  },
  emptyImage: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  date: {
    color: '#60BCF0',
    fontFamily: 'RobotoCondensed_500Medium',
    fontSize: 12,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 17,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});