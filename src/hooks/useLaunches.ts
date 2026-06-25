import { useState, useEffect, useCallback } from "react";
import { spacedevsApi } from "../api/spacex";
import { Launch, Paginated } from "../types/spacedevs";

type UselaunchesOptions = {
  limit?: number;
  autoFetch?: boolean;
};

function useLaunches(
  type: "upcoming" | "past",
  { limit = 10, autoFetch = true }: UselaunchesOptions = {},
) {
  const [data, setData] = useState<Paginated<Launch> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result =
        type === "upcoming"
          ? await spacedevsApi.upcomingLaunches(limit)
          : await spacedevsApi.pastLaunches(limit);
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }, [type, limit]);

  useEffect(() => {
    if (autoFetch) fetch();
  }, [autoFetch, fetch]);

  return {
    data,
    launches: data?.results ?? [],
    loading,
    error,
    fetch,
    hasMore: data?.next !== null,
  };
}

export function useUpcomingLaunches(opts?: UselaunchesOptions) {
  return useLaunches("upcoming", opts);
}

export function usePastLaunches(opts?: UselaunchesOptions) {
  return useLaunches("past", opts);
}

export function useLaunchById(id: string | null) {
  const [data, setData] = useState<Launch | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      setData(await spacedevsApi.launchById(id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
