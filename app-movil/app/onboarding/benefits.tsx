import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

function Bullet({ text }: { text: string }) {
  return (
    <View style={{ flexDirection: "row", gap: 10, marginTop: 10, alignItems: "center" }}>
      <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: "#22C55E" }} />
      <Text style={{ fontSize: 15, opacity: 0.8 }}>{text}</Text>
    </View>
  );
}

export default function BenefitsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#F59E0B", padding: 18, justifyContent: "center" }}>
      <View style={{ backgroundColor: "white", borderRadius: 22, padding: 22 }}>
        <Text style={{ fontSize: 26, fontWeight: "900", textAlign: "center" }}>
          Beneficios ✨
        </Text>

        <Text style={{ textAlign: "center", marginTop: 10, opacity: 0.7, fontSize: 15 }}>
          Antes de comenzar, mira lo que podrás hacer:
        </Text>

        <View style={{ marginTop: 14 }}>
          <Bullet text="Registro rápido y seguro" />
          <Bullet text="Validación de datos en tiempo real" />
          <Bullet text="Acceso protegido con JWT" />
        </View>

        {/* Indicador */}
        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 18, gap: 6 }}>
          <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: "#E5E7EB" }} />
          <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: "#22C55E" }} />
          <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: "#E5E7EB" }} />
        </View>

        {/* Botones */}
        <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
          <Pressable
            onPress={() => router.back()}
            style={{
              flex: 1,
              backgroundColor: "#E5E7EB",
              padding: 14,
              borderRadius: 14,
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "800" }}>Atrás</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/onboarding/access")}
            style={{
              flex: 1,
              backgroundColor: "#22C55E",
              padding: 14,
              borderRadius: 14,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "800" }}>Siguiente</Text>
          </Pressable>
        </View>

        <Pressable onPress={() => router.replace("/login")} style={{ marginTop: 12 }}>
          <Text style={{ textAlign: "center", opacity: 0.7, fontWeight: "700" }}>
            Saltar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}