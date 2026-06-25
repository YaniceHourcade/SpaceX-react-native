import { useState, useEffect, useCallback } from "react";
import { Rocket } from "../types/spacedevs";
import { spacedevsApi } from "../api/spacex";

export function useRocketById(id: number | null) {
  const [data, setData] = useState<Rocket | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      setData(await spacedevsApi.rocketById(id));
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
