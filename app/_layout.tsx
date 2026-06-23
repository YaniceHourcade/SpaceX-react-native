import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';

SplashScreen.setOptions({
  duration: 600,
  fade: true,
});

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#000000',
        },
      }}
    />
  );
}