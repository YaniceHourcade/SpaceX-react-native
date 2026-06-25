import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorage<T>(
  key: string,
  initialValue?: T,
): [T | null, (value: T) => Promise<void>, boolean] {
  const [value, setValue] = useState<T | null>(initialValue ?? null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem(key);
      setValue(stored !== null ? JSON.parse(stored) : (initialValue ?? null));
      setLoading(false);
    };
    load();
  }, [key, initialValue]);

  const save = async (newValue: T) => {
    await AsyncStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save, loading];
}
