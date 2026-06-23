import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = '@spacex_onboarding_seen';

export async function hasSeenOnboarding() {
  const value = await AsyncStorage.getItem(ONBOARDING_KEY);
  return value === 'true';
}

export async function setOnboardingSeen() {
  await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
}

export async function resetOnboarding() {
  await AsyncStorage.removeItem(ONBOARDING_KEY);
}