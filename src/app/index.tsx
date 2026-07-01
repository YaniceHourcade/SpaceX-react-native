import { useEffect } from 'react';
import { useRouter } from 'expo-router';

import { useAsyncStorage } from '../hooks/use-async-storage';

export default function Home() {
  const router = useRouter();
  const [onboardingCompleted, , onboardingCompletedLoading] = useAsyncStorage('onboardingCompleted', false);

  useEffect(() => {
    if (onboardingCompletedLoading) {
      return;
    }

    if (onboardingCompleted) {
      router.replace('/(tabs)');
      return;
    }

    router.replace('/splash');
  }, [onboardingCompleted, onboardingCompletedLoading, router]);

  return null;
}
