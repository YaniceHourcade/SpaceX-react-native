import { useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { colors } from '../constants/colors';
import { usePastLaunches, useUpcomingLaunches } from '../hooks/useLaunches';
import { Launch } from '../types/spacedevs';
import { HomeTopBar } from '../components/ListHeaderComponent';
import { LaunchCard } from '../components/LaunchCard';
import { LaunchCardSkeleton } from '../components/LaunchCardSkeleton';

type HomeListItem =
  | {
      type: 'section';
      id: string;
      title: string;
    }
  | {
      type: 'launch';
      id: string;
      launch: Launch;
      animationIndex: number;
    }
  | {
      type: 'skeleton';
      id: string;
    }
  | {
      type: 'empty';
      id: string;
      title: string;
      text: string;
    }
  | {
      type: 'error';
      id: string;
      message: string;
    };

export function HomeScreen() {
  const [refreshVersion, setRefreshVersion] = useState(0);

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
  } = usePastLaunches({ limit: 10 });

  const loading = upcomingLoading || pastLoading;
  const error = upcomingError || pastError;

  const handleRefresh = async () => {
    await Promise.all([refetchUpcoming(), refetchPast()]);
    setRefreshVersion((current) => current + 1);
  };

  const listData = useMemo<HomeListItem[]>(() => {
    const items: HomeListItem[] = [];

    if (error) {
      items.push({
        type: 'error',
        id: 'error',
        message: error,
      });
    }

    items.push({
      type: 'section',
      id: 'upcoming-title',
      title: 'UPCOMING LAUNCHES',
    });

    if (upcomingLoading && upcomingLaunches.length === 0) {
      items.push(
        { type: 'skeleton', id: 'upcoming-skeleton-1' },
        { type: 'skeleton', id: 'upcoming-skeleton-2' },
        { type: 'skeleton', id: 'upcoming-skeleton-3' },
      );
    } else if (upcomingLaunches.length > 0) {
      upcomingLaunches.forEach((launch, index) => {
        items.push({
          type: 'launch',
          id: `upcoming-${launch.id}`,
          launch,
          animationIndex: index,
        });
      });
    } else {
      items.push({
        type: 'empty',
        id: 'upcoming-empty',
        title: 'Aucun lancement à venir',
        text: 'Impossible de récupérer les prochains lancements pour le moment.',
      });
    }

    items.push({
      type: 'section',
      id: 'past-title',
      title: 'PAST LAUNCHES',
    });

    if (pastLoading && pastLaunches.length === 0) {
      items.push(
        { type: 'skeleton', id: 'past-skeleton-1' },
        { type: 'skeleton', id: 'past-skeleton-2' },
        { type: 'skeleton', id: 'past-skeleton-3' },
      );
    } else if (pastLaunches.length > 0) {
      pastLaunches.forEach((launch, index) => {
        items.push({
          type: 'launch',
          id: `past-${launch.id}`,
          launch,
          animationIndex: index,
        });
      });
    } else {
      items.push({
        type: 'empty',
        id: 'past-empty',
        title: 'Aucun ancien lancement',
        text: 'Les données sont vides ou n’ont pas pu être récupérées.',
      });
    }

    return items;
  }, [
    error,
    upcomingLoading,
    upcomingLaunches,
    pastLoading,
    pastLaunches,
  ]);

  const renderItem = ({ item }: { item: HomeListItem }) => {
    if (item.type === 'section') {
      return <Text style={styles.sectionTitle}>{item.title}</Text>;
    }

    if (item.type === 'launch') {
      return (
        <LaunchCard
          launch={item.launch}
          index={item.animationIndex}
          animated
        />
      );
    }

    if (item.type === 'skeleton') {
      return <LaunchCardSkeleton />;
    }

    if (item.type === 'error') {
      return (
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>Erreur</Text>
          <Text style={styles.errorText}>{item.message}</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyTitle}>{item.title}</Text>
        <Text style={styles.emptyText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />

      <HomeTopBar />

      <FlatList
        data={listData}
        keyExtractor={(item) => `${item.id}-${refreshVersion}`}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            tintColor={colors.white}
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={8}
        maxToRenderPerBatch={5}
        windowSize={7}
        removeClippedSubviews
        extraData={refreshVersion}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 32,
  },
  sectionTitle: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 10,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  errorBox: {
    backgroundColor: colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  errorTitle: {
    color: colors.textPrimary,
    fontWeight: '800',
    marginBottom: 4,
  },
  errorText: {
    color: colors.error,
    fontSize: 13,
  },
  emptyBox: {
    minHeight: 120,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    padding: 16,
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontWeight: '800',
    fontSize: 15,
    marginBottom: 8,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
  },
});