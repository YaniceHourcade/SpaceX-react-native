import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Launch } from '../types/spacedevs';

type LaunchCardProps = {
  launch: Launch;
  large?: boolean;
};

export function LaunchCard({ launch, large = false }: LaunchCardProps) {
  const date = formatLaunchDate(launch.net);

  return (
    <ImageBackground
      source={
        launch.image
          ? { uri: launch.image }
          : require('../../assets/images/launch-placeholder.png')
      }
      style={[styles.card, large && styles.largeCard]}
      imageStyle={styles.image}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.85)']}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.content}>
        <Text style={styles.date}>{date}</Text>
        <Text numberOfLines={2} style={styles.title}>
          {launch.name}
        </Text>
      </View>
    </ImageBackground>
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
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#111111',
    marginBottom: 14,
  },
  largeCard: {
    height: 180,
  },
  image: {
    borderRadius: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  date: {
    color: '#60BCF0',
    fontFamily: 'Roboto Condensed',
    fontSize: 9,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Roboto Condensed',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});