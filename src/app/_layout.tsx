import { Stack } from 'expo-router';
import { Text } from 'react-native';
import {
  useFonts,
  RobotoCondensed_400Regular,
  RobotoCondensed_500Medium,
  RobotoCondensed_700Bold,
  RobotoCondensed_800ExtraBold,
} from '@expo-google-fonts/roboto-condensed';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function Layout() {
  const [fontsLoaded] = useFonts({
    RobotoCondensed_400Regular,
    RobotoCondensed_500Medium,
    RobotoCondensed_700Bold,
    RobotoCondensed_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const text = Text as typeof Text & { defaultProps?: { style?: unknown } };
  text.defaultProps = text.defaultProps || {};
  text.defaultProps.style = [
    { fontFamily: 'RobotoCondensed_400Regular' },
    ...(Array.isArray(text.defaultProps.style)
      ? text.defaultProps.style
      : [text.defaultProps.style].filter(Boolean)),
  ];

  return <Stack initialRouteName="index" screenOptions={{ headerShown: false }} />;
}
