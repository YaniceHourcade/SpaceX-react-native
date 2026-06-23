import { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { AppButton } from '../../../components/AppButton';
import { ASSETS } from '../../../constants/assets';
import { colors } from '../../../constants/colors';
import { onboardingSlides, OnboardingSlide } from '../data/onboardingSlides';
import { setOnboardingSeen } from '../storage/onboardingStorage';
import React from 'react';

export function OnboardingScreen() {
  const { width, height } = useWindowDimensions();
  const flatListRef = useRef<FlatList<OnboardingSlide>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleStartPress = async () => {
    const isLastSlide = currentIndex === onboardingSlides.length - 1;

    if (!isLastSlide) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      return;
    }

    await setOnboardingSeen();
    router.replace('/home');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={({ item }) => (
          <ImageBackground
            source={item.image}
            style={[styles.slide, { width, height }]}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['rgba(0,0,0,0)', colors.black, colors.black]}
              locations={[0.42, 0.68, 1]}
              style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.content}>
              <Image source={ASSETS.logo} style={styles.logo} resizeMode="contain" />

              <Text style={styles.description}>{item.description}</Text>

              <AppButton onPress={handleStartPress}>START →</AppButton>

              <View style={styles.dots}>
                {onboardingSlides.map((slide, index) => (
                  <View
                    key={slide.id}
                    style={[
                      styles.dot,
                      index === currentIndex ? styles.dotActive : styles.dotInactive,
                    ]}
                  />
                ))}
              </View>
            </View>
          </ImageBackground>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  slide: {
    flex: 1,
    backgroundColor: colors.black,
  },
  content: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 38,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 42,
    marginBottom: 8,
  },
  description: {
    width: 260,
    color: colors.white,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.2,
    marginBottom: 22,
  },
  dots: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 38,
    marginBottom: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 999,
  },
  dotActive: {
    backgroundColor: colors.dotActive,
  },
  dotInactive: {
    backgroundColor: colors.dotInactive,
  },
});