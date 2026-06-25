import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function Layout() {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" options={{ animation: 'none' }} />
      <Stack.Screen name="splash" options={{ animation: 'fade' }} />
    </Stack>
  );
}