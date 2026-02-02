import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { getOnboardingDone } from "../utils/onboarding";
import { getToken } from "../utils/auth";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const done = await getOnboardingDone();

      if (!done) {
        router.replace("/onboarding/welcome");
        return;
      }

      const token = await getToken();

      if (token) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
}