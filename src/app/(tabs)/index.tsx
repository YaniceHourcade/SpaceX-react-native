import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useAsyncStorage } from '../../hooks/use-async-storage';

export default function Home() {
  const router = useRouter();
  const [onboardingCompleted, setOnboardingCompleted, onboardingCompletedLoading] =
    useAsyncStorage('onboardingCompleted', false);

  useFocusEffect(
    useCallback(() => {
      if (!onboardingCompleted && !onboardingCompletedLoading) {
        router.replace('/onboarding');
      }
    }, [onboardingCompleted, onboardingCompletedLoading, router]),
  );

  if (!onboardingCompleted || onboardingCompletedLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>SpaceX App</Text>
      <Text style={styles.subtitle}>Home screen temporaire</Text>

      <Pressable
        onPress={async () => {
          await setOnboardingCompleted(false);
          router.replace('/onboarding');
        }}
        style={styles.resetButton}
      >
        <Text style={styles.resetText}>Revoir l&apos;onboarding</Text>
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
  },
  resetButton: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  resetText: {
    color: '#AAAAAA',
    fontSize: 14,
  },
});
