import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePastLaunches, useUpcomingLaunches } from '../hooks/useLaunches';
import { HomeTopBar } from '../components/HomeTopBar';
import { LaunchCard } from '../components/LaunchCard';
import { LaunchCardSkeleton } from '../components/LaunchCardSkeleton';

export default function Home() {
  const {
    launches: upcomingLaunches,
    loading: upcomingLoading,
    error: upcomingError,
    fetch: refetchUpcoming,
  } = useUpcomingLaunches({ limit: 10 });

  const {
    launches: pastLaunches,
    loading: pastLoading,
    error: pastError,
    fetch: refetchPast,
  } = usePastLaunches({ limit: 100 });

  const loading = upcomingLoading || pastLoading;
  const error = upcomingError || pastError;

  const handleRefresh = async () => {
    await Promise.all([refetchUpcoming(), refetchPast()]);
  };

  const upcomingLaunch = upcomingLaunches[0];

  return (
     <SafeAreaView style={styles.container} edges={['top']}>
      <HomeTopBar />
      <FlatList
        data={pastLaunches}
        keyExtractor={(launch) => launch.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        windowSize={7}
        maxToRenderPerBatch={6}
        initialNumToRender={3}
        removeClippedSubviews={true}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            tintColor="#FFFFFF"
          />
        }
        ListHeaderComponent={
          <>
            {loading && !upcomingLaunch && pastLaunches.length === 0 ? (
              <>
                <Text style={styles.sectionTitle}>UPCOMING LAUNCH</Text>
                <LaunchCardSkeleton />
                <Text style={styles.sectionTitle}>PAST LAUNCHES</Text>
                <LaunchCardSkeleton />
              </>
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
                <LaunchCard launch={upcomingLaunch} />
              </>
            ) : null}


            {pastLaunches.length > 0 ? (
                <Text style={styles.sectionTitle}>PAST LAUNCHES</Text>
            ) : null}
          </>
        }
        renderItem={({ item }) => <LaunchCard launch={item} />}
        ListEmptyComponent={
          !loading && !error ? (
            <Text style={styles.emptyText}>Aucun lancement à afficher.</Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 32,
  },
  sectionTitle: {
    color: '#ffffff',
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 14,
    letterSpacing: 1.5,
    paddingBottom: 15,
    paddingTop: 8,
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
  emptyText: {
    color: '#AAAAAA',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 12,
  },
});