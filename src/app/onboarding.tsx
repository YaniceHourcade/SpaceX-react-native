import { useRouter } from 'expo-router';
import { View } from 'react-native';
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

  const onComplete = async () => {
    await setOnboardingCompleted(true);
    router.replace('/');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <StatusBar style="light" />
      <Slider items={items} onComplete={onComplete} />
    </View>
  );
}
