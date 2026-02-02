import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function WelcomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#F59E0B", padding: 18, justifyContent: "center" }}>
      <View style={{ backgroundColor: "white", borderRadius: 22, padding: 22 }}>
        <Text style={{ fontSize: 28, fontWeight: "900", textAlign: "center" }}>
          Bienvenida 👋
        </Text>

        <Text style={{ textAlign: "center", marginTop: 10, opacity: 0.7, fontSize: 15 }}>
          Te ayudaremos a crear tu cuenta con validaciones seguras y una mejor experiencia.
        </Text>

        {/* Indicador */}
        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 18, gap: 6 }}>
          <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: "#22C55E" }} />
          <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: "#E5E7EB" }} />
          <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: "#E5E7EB" }} />
        </View>

        {/* Botones */}
        <Pressable
          onPress={() => router.push("/onboarding/benefits")}
          style={{
            marginTop: 22,
            backgroundColor: "#22C55E",
            padding: 14,
            borderRadius: 14,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "800" }}>Siguiente</Text>
        </Pressable>

        <Pressable onPress={() => router.replace("/login")} style={{ marginTop: 12 }}>
          <Text style={{ textAlign: "center", opacity: 0.7, fontWeight: "700" }}>
            Saltar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
