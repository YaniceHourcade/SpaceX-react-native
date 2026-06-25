import { useCallback, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Slider } from '../components/slider';
import { useAsyncStorage } from '../hooks/use-async-storage';

const items = [
  {
    id: '1',
    image: require('../../assets/images/onboarding-2.png'),
    description: 'En avant...',
  },
  {
    id: '2',
    image: require('../../assets/images/onboarding-1.png'),
    description: 'Prêt ?',
  },
  {
    id: '3',
    image: require('../../assets/images/onboarding-3.png'),
    description: 'Décollage !',
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [_, setOnboardingCompleted] = useAsyncStorage('onboardingCompleted', false);
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const [interactionsEnabled, setInteractionsEnabled] = useState(false);

  useFocusEffect(
    useCallback(() => {
      contentOpacity.setValue(0);
      setInteractionsEnabled(false);

      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }).start(() => {
        setInteractionsEnabled(true);
      });
    }, [contentOpacity])
  );

  const onComplete = async () => {
    setOnboardingCompleted(true);
    router.replace("/");
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <StatusBar style="light" />
      <Slider
        items={items}
        onComplete={onComplete}
        contentOpacity={contentOpacity}
        interactionsEnabled={interactionsEnabled}
      />
    </View>
  );
}