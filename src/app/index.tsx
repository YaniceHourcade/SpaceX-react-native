import { useEffect } from "react";
import { useRouter } from "expo-router";

import { useAsyncStorage } from "../hooks/use-async-storage";

export default function App() {
  const router = useRouter();

  const [hasSeenOnboarding, , loading] = useAsyncStorage<boolean>(
    "hasSeenOnboarding",
    false,
  );

  useEffect(() => {
    if (loading) return;

    if (hasSeenOnboarding) {
      router.replace("/home");
    } else {
      router.replace("/splash");
    }
  }, [loading, hasSeenOnboarding, router]);

  return null;
}
