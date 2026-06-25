import { StyleSheet, Pressable, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
          onPress={() => console.log('Favoris')}
          hitSlop={10}
        >
          <Ionicons name="bookmark-outline" size={24} color="#ffffff" />
        </Pressable>

        <Pressable
          style={styles.iconButton}
          onPress={() => console.log('IA')}
          hitSlop={10}
        >
          <Ionicons name="sparkles-outline" size={24} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 163.58,
    height: 20,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});