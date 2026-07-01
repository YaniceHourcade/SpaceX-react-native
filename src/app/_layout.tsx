import { Slot } from 'expo-router';
import {
  useFonts,
  RobotoCondensed_300Light,
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
    RobotoCondensed_300Light,
    RobotoCondensed_400Regular,
    RobotoCondensed_500Medium,
    RobotoCondensed_700Bold,
    RobotoCondensed_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Slot />;
}