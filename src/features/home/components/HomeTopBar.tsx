import { StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function HomeTopBar() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/images/spacex-logo-white.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.actions}>
        <Ionicons name="bookmark-outline" size={20} color="#FFFFFF" />
        <Ionicons name="sparkles-outline" size={20} color="#FFFFFF" />
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
    width: 180,
    height: '100%',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
});