import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { usePastLaunches, useUpcomingLaunches } from '../hooks/useLaunches';
import { HomeTopBar } from '../components/HomeTopBar';
import { LaunchCard } from '../components/LaunchCard';

export function HomeScreen() {
  const {
    launches: upcomingLaunches,
    loading: upcomingLoading,
    error: upcomingError,
    fetch: refetchUpcoming,
  } = useUpcomingLaunches({ limit: 5 });

  const {
    launches: pastLaunches,
    loading: pastLoading,
    error: pastError,
    fetch: refetchPast,
  } = usePastLaunches({ limit: 5 });

  const loading = upcomingLoading || pastLoading;
  const error = upcomingError || pastError;

  const handleRefresh = async () => {
    await Promise.all([refetchUpcoming(), refetchPast()]);
  };

  const upcomingLaunch = upcomingLaunches[0];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />

      <HomeTopBar />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            tintColor="#FFFFFF"
          />
        }
      >
        {loading && !upcomingLaunch && pastLaunches.length === 0 ? (
          <View style={styles.center}>
            <ActivityIndicator color="#FFFFFF" />
            <Text style={styles.loadingText}>Chargement des lancements...</Text>
          </View>
        ) : null}

        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorTitle}>Erreur</Text>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {upcomingLaunch ? (
          <>
            <Text style={styles.sectionTitle}>UPCOMING LAUNCH</Text>
            <LaunchCard launch={upcomingLaunch} large />
          </>
        ) : null}

        <Text style={styles.sectionTitle}>PAST LAUNCHES</Text>

        {pastLaunches.map((launch) => (
          <LaunchCard key={launch.id} launch={launch} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 32,
  },
  sectionTitle: {
    color: '#ffffff',
    fontFamily: 'Roboto Condensed',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 10,
    textTransform: 'uppercase',
    opacity: 0.6,
  },
  center: {
    minHeight: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#AAAAAA',
    marginTop: 12,
    fontSize: 13,
  },
  errorBox: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  errorTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
    marginBottom: 4,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 13,
  },
});