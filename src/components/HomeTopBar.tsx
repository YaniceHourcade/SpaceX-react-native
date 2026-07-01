import { StyleSheet, Pressable, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export function HomeTopBar() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/spacex-logo-white.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.actions}>
        <Pressable
          style={styles.iconButton}
          onPress={() => router.push('/chatAI')}
          hitSlop={10}
        >
          <Image
            source={require('../../assets/images/bot.png')}
            style={styles.icon}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 72,
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: "transparent",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 163,
    height: 20,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});