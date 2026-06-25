import { Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>SpaceX App</Text>
      <Text style={styles.subtitle}>Home screen temporaire</Text>

      <Pressable
        onPress={async () => {
          router.replace('/splash');
        }}
        style={styles.resetButton}
      >
        <Text style={styles.resetText}>Revoir le splash</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontFamily: 'RobotoCondensed_800ExtraBold',
  },
  subtitle: {
    color: '#D9D9D9',
    marginTop: 8,
    fontFamily: 'RobotoCondensed_400Regular',
  },
  resetButton: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  resetText: {
    color: '#AAAAAA',
    fontSize: 14,
    fontFamily: 'RobotoCondensed_400Regular',
  },
});
