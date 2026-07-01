import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { colors } from '../constants/colors';
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
    <Animated.View
      entering={animated ? FadeInUp.delay(index * 70).duration(350) : undefined}
      style={[styles.card, large && styles.largeCard]}
    >
      <Pressable style={styles.pressable} onPress={() => console.log('Launch:', launch.name)}>
        {imageUri ? (
          <ImageBackground
            source={{ uri: imageUri }}
            style={styles.imageBackground}
            imageStyle={styles.image}
            resizeMode="cover"
          >
            <CardContent date={date} title={launch.name} />
          </ImageBackground>
        ) : (
          <View style={styles.emptyImage}>
            <CardContent date={date} title={launch.name} />
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

type CardContentProps = {
  date: string;
  title: string;
};

function CardContent({ date, title }: CardContentProps) {
  return (
    <>
      <LinearGradient
        colors={[colors.gradientTransparent, colors.gradientDark]}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.content}>
        <Text style={styles.date}>{date}</Text>

        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
      </View>
    </>
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
  card: {
    height: 116,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.cardBackground,
    marginBottom: 14,
  },
  largeCard: {
    height: 150,
  },
  pressable: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  image: {
    borderRadius: 12,
  },
  emptyImage: {
    flex: 1,
    backgroundColor: colors.emptyCardBackground,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  date: {
    color: colors.accentBlue,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});