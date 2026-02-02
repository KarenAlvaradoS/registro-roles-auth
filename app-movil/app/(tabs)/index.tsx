import { View, Text, Pressable, Alert } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { resetOnboarding } from "../../utils/onboarding"; // ✅ NUEVO

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function TabsHome() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const loadSession = async () => {
    const t = await AsyncStorage.getItem("token");
    const u = await AsyncStorage.getItem("user");
    setToken(t);
    setUser(u ? JSON.parse(u) : null);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setToken(null);
    setUser(null);
    Alert.alert("Listo", "Sesión cerrada.");
    router.replace("/login");
  };

  // ✅ NUEVO: volver a ver onboarding
  const seeOnboardingAgain = async () => {
    await resetOnboarding();
    router.replace("/onboarding/welcome");
  };

  useEffect(() => {
    loadSession();
  }, []);

  return (
    <View style={{ flex: 1, padding: 18, justifyContent: "center", backgroundColor: "#F59E0B" }}>
      <View style={{ backgroundColor: "white", borderRadius: 18, padding: 18 }}>
        <Text style={{ fontSize: 24, fontWeight: "800", textAlign: "center" }}>
          Zona protegida 🔐
        </Text>

        {!token || !user ? (
          <>
            <Text style={{ marginTop: 14, textAlign: "center", color: "#EF4444" }}>
              No hay sesión activa
            </Text>

            <Pressable
              onPress={() => router.replace("/login")}
              style={{
                marginTop: 14,
                backgroundColor: "#22C55E",
                padding: 14,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "800" }}>Ir a Login</Text>
            </Pressable>

            {/* ✅ NUEVO: también puedes verlo aunque no haya sesión */}
            <Pressable
              onPress={seeOnboardingAgain}
              style={{
                marginTop: 10,
                backgroundColor: "#2563EB",
                padding: 14,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "800" }}>
                🔄 Ver onboarding otra vez
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <View style={{ marginTop: 14, padding: 12, borderRadius: 12, backgroundColor: "#F3F4F6" }}>
              <Text style={{ fontWeight: "800" }}>Sesión activa</Text>
              <Text>Nombre: {user.name}</Text>
              <Text>Email: {user.email}</Text>
              <Text style={{ fontWeight: "800" }}>Rol: {user.role}</Text>
              <Text style={{ marginTop: 6, fontSize: 12, opacity: 0.6 }}>
                Token guardado: Sí ✅
              </Text>
            </View>

            {/* ✅ NUEVO: botón onboarding */}
            <Pressable
              onPress={seeOnboardingAgain}
              style={{
                marginTop: 12,
                backgroundColor: "#2563EB",
                padding: 14,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "800" }}>
                🔄 Ver onboarding otra vez
              </Text>
            </Pressable>

            <Pressable
              onPress={logout}
              style={{
                marginTop: 12,
                backgroundColor: "#EF4444",
                padding: 14,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "800" }}>Cerrar sesión</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}
