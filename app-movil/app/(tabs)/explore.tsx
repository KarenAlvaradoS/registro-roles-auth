import React, { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://haematogenous-lorene-diffusive.ngrok-free.dev";
const PROTECTED_PATH = "/api/protected";

export default function ExploreScreen() {
  const [data, setData] = useState<any>(null);

  const cargarZona = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      Alert.alert("Sin sesión", "Primero inicia sesión en Home.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}${PROTECTED_PATH}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();

      if (!res.ok) {
        Alert.alert("Error", json.message || "No autorizado");
        return;
      }

      setData(json);
    } catch {
      Alert.alert("Error", "No se pudo conectar");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "800", marginBottom: 20 }}>
        🔐 Zona protegida
      </Text>

      <Pressable
        onPress={cargarZona}
        style={{
          backgroundColor: "#2563EB",
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>
          Entrar a la zona protegida
        </Text>
      </Pressable>

      {data && (
        <Text style={{ marginTop: 20 }}>
          Respuesta del servidor:
          {"\n"}
          {JSON.stringify(data, null, 2)}
        </Text>
      )}
    </View>
  );
}
