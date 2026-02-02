import { View, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function ExploreScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const u = await AsyncStorage.getItem("user");
      setUser(u ? JSON.parse(u) : null);
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#F3F4F6",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "800", marginBottom: 10 }}>
        Explore 🔍
      </Text>

      <Text style={{ textAlign: "center", marginBottom: 20 }}>
        Esta es una pantalla secundaria accesible solo después de iniciar sesión.
      </Text>

      {user && (
        <View
          style={{
            backgroundColor: "white",
            padding: 16,
            borderRadius: 12,
            width: "100%",
          }}
        >
          <Text style={{ fontWeight: "800" }}>Usuario actual</Text>
          <Text>Nombre: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Rol: {user.role}</Text>
        </View>
      )}
    </View>
  );
}
