import { View, Text, TextInput, Pressable, ActivityIndicator, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/api";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setMsg(null);

    if (!email.trim() || !password) {
      setMsg("Escribe email y contraseña.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMsg(data?.message || "Login falló.");
        return;
      }

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      Alert.alert("✅ Login OK", `Bienvenido/a ${data?.user?.name ?? ""}`);

      router.replace("/(tabs)");
    } catch (e) {
      setMsg("Error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 26, marginBottom: 20, fontWeight: "bold" }}>
        Iniciar sesión
      </Text>

      {/* EMAIL */}
      <TextInput
        testID="input-email"
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      {/* PASSWORD */}
      <TextInput
        testID="input-password"
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      {/* MENSAJE ERROR */}
      {msg ? (
        <Text style={{ color: "red", marginBottom: 10 }}>{msg}</Text>
      ) : null}

      {/* BOTÓN LOGIN */}
      <Pressable
        testID="btn-login"
        onPress={login}
        disabled={loading}
        style={{
          backgroundColor: loading ? "#9CA3AF" : "#22C55E",
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={{ color: "white", fontWeight: "800" }}>Entrar</Text>
        )}
      </Pressable>

      {/* TEXTO ÉXITO (solo para pruebas) */}
      {!loading && !msg ? (
        <Text testID="login-success" style={{ marginTop: 10, color: "green" }}>
          Login listo
        </Text>
      ) : null}

      {/* REGISTRO */}
      <Pressable onPress={() => router.replace("/register")} style={{ marginTop: 16 }}>
        <Text style={{ textAlign: "center" }}>
          ¿No tienes cuenta? <Text style={{ fontWeight: "bold" }}>Regístrate</Text>
        </Text>
      </Pressable>
    </View>
  );
}