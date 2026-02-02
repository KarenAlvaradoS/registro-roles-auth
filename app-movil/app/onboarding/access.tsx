import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import { setOnboardingDone } from "../../utils/onboarding";

export default function AccessScreen() {
  const finishOnboarding = async () => {
    await setOnboardingDone(); // 👈 MUY IMPORTANTE
    router.replace("/login");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Acceso
      </Text>

      <Text style={{ textAlign: "center", marginBottom: 30 }}>
        Ya estás listo para comenzar.
      </Text>

      <Button title="Ir a Login" onPress={finishOnboarding} />
    </View>
  );
}
