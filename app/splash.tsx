import { useEffect } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import { ASSETS } from '../src/constants/assets';
import { colors } from '../src/constants/colors';
import { hasSeenOnboarding } from '../src/features/onboarding/storage/onboardingStorage';
import React from 'react';

const FORCE_ONBOARDING_FOR_TEST = true;

export default function Splash() {
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (FORCE_ONBOARDING_FOR_TEST) {
        router.replace('/onboarding');
        return;
      }

      const seen = await hasSeenOnboarding();
      router.replace(seen ? '/home' : '/onboarding');
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground source={ASSETS.splashBg} style={styles.container} resizeMode="cover">
      <StatusBar style="light" />

      <LinearGradient
        colors={['rgba(0,0,0,0)', colors.black]}
        locations={[0.55, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.logoWrapper}>
        <Image source={ASSETS.logo} style={styles.logo} resizeMode="contain" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  logoWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 220,
    height: 60,
  },
});