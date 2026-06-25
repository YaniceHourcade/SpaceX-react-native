import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');
const animationImage = require('../../assets/images/animation.png');

// 👇 dimensions réelles du fichier image (telles qu'enregistrées dans l'asset)
const { width: imageNaturalWidth, height: imageNaturalHeight } =
  Image.resolveAssetSource(animationImage);

// 👇 on affiche l'image en pleine largeur, en conservant ses proportions d'origine
const renderedImageWidth = width;
const renderedImageHeight = width * (imageNaturalHeight / imageNaturalWidth);

// 👇 on scrolle exactement assez pour amener le bas de l'image au bas de l'écran
const splashTargetY = -Math.max(renderedImageHeight - height, 0);

const HOLD_DURATION = 800;

export default function Splash() {
  const router = useRouter();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    router.prefetch('/onboarding');

    let holdTimeout: ReturnType<typeof setTimeout>;

    animation.setValue(0);
    const anim = Animated.timing(animation, {
      toValue: splashTargetY,
      duration: 6000,
      useNativeDriver: true,
    });

    anim.start(() => {
      holdTimeout = setTimeout(() => {
        router.replace('/onboarding');
      }, HOLD_DURATION);
    });

    return () => {
      anim.stop();
      clearTimeout(holdTimeout);
    };
  }, [animation, router]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.clip}>
        <Animated.Image
          source={animationImage}
          style={[
            styles.image,
            {
              width: renderedImageWidth,
              height: renderedImageHeight,
              transform: [{ translateY: animation }],
            },
          ]}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  clip: { flex: 1, overflow: 'hidden' },
  image: { position: 'absolute', top: 0, left: 0 },
});