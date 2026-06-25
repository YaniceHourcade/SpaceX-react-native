import { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');
const animationImage = require('../../assets/images/animation.png');
const splashTargetY = -height * 2.2;

export const options = {
  animation: 'slide_from_right',
};

export default function Splash() {
  const router = useRouter();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: splashTargetY,
      duration: 6000,
      useNativeDriver: true,
    }).start(() => {
      router.replace('/onboarding');
    });
  }, [animation, router]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.clip}>
        <Animated.Image
          source={animationImage}
          style={[styles.image, { transform: [{ translateY: animation }] }]}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  clip: {
    flex: 1,
    overflow: 'hidden',
  },
  image: {
    width,
    height: height * 3,
    position: 'absolute',
    top: 175,
    left: 0,
  },
});