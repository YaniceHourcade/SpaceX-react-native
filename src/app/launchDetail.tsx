import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { HomeTopBar } from '../components/HomeTopBar';

export default function LaunchDetail() {
  const searchParams = useLocalSearchParams();
  const id = Array.isArray(searchParams.id) ? searchParams.id[0] : searchParams.id;
  const name = Array.isArray(searchParams.name) ? searchParams.name[0] : searchParams.name;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeTopBar />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>{name ?? 'Détails du lancement'}</Text>

        <View style={styles.detailCard}>
          <Image
            source={require('../../assets/images/noImage.png')}
            style={styles.detailImage}
            resizeMode="cover"
          />
          <View style={styles.detailBody}>
            <Text style={styles.detailTitle}>{name ?? 'Nom non disponible'}</Text>
            <Text style={styles.detailSubtitle}>Launch ID</Text>
            <Text style={styles.detailText}>{id ?? 'Inconnu'}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>À propos</Text>
        <Text style={styles.detailText}>
          Cette page affiche un exemple de détail pour le lancement sélectionné.
          Tu peux remplacer ce contenu par des données récupérées via l'API en utilisant l'ID du lancement.
        </Text>

        <Text style={styles.sectionTitle}>Actions</Text>
        <Text style={styles.detailText}>
          Utilise le bouton de retour du navigateur ou la navigation Expo pour revenir à la liste.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 32,
  },
  heading: {
    color: '#FFFFFF',
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 24,
    marginBottom: 10,
  },
  detailCard: {
    backgroundColor: '#111111',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  detailImage: {
    width: '100%',
    height: 180,
  },
  detailBody: {
    padding: 16,
  },
  detailTitle: {
    color: '#FFFFFF',
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 18,
    marginBottom: 8,
  },
  detailSubtitle: {
    color: '#60BCF0',
    fontFamily: 'RobotoCondensed_500Medium',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.3,
    marginBottom: 4,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 16,
    marginBottom: 8,
  },
  detailText: {
    color: '#AAAAAA',
    fontFamily: 'RobotoCondensed_400Regular',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
});