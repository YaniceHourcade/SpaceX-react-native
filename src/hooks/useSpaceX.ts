import { useState, useEffect, useCallback } from "react";
import { SpaceXAgency } from "../types/spacedevs";
import { spacedevsApi } from "../api/spacex";

export function useSpaceX() {
  const [data, setData] = useState<SpaceXAgency | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await spacedevsApi.spacexAgency());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
