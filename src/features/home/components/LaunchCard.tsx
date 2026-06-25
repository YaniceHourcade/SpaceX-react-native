import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Launch } from '../../../types/spacedevs';

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
          : require('../../../../assets/images/launch-placeholder.png')
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
        <Text numberOfLines={1} style={styles.title}>
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
    height: 116,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#111111',
    marginBottom: 14,
  },
  largeCard: {
    height: 150,
  },
  image: {
    borderRadius: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  date: {
    color: '#4EA3FF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});