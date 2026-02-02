import { View, Text, TextInput, Pressable, ActivityIndicator, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { API_URL } from "../constants/api";
import { registerSchema } from "../validation/registerSchema";

type ErrorMap = Record<string, string>;

export default function RegisterScreen() {
  const [nombres, setNombres] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<ErrorMap>({});
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setMsg(null);

    // ✅ CORREGIDO: el schema espera "name", no "nombres"
    const result = registerSchema.safeParse({
      name: nombres,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      const fieldErrors: ErrorMap = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (key) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      setLoading(true);

      const payload = {
        name: nombres.trim(),
        email: email.trim(),
        password,
        roleName: "user", // ✅ tu backend lo espera
      };

      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // ✅ más robusto: intenta leer texto y parsear JSON si existe
      const raw = await res.text();
      let data: any = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        data = {};
      }

      if (!res.ok) {
        const message = data?.message || raw || `Registro falló (${res.status})`;
        setMsg(message);
        Alert.alert("❌ Registro falló", message);
        return;
      }

      Alert.alert("✅ Registro OK", "Cuenta creada. Ahora inicia sesión.");
      router.replace("/login");
    } catch (e: any) {
      setMsg("Error de conexión (revisa backend/ngrok/internet).");
      Alert.alert("Conexión", "No se pudo conectar al servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 26, marginBottom: 20, fontWeight: "bold" }}>Registro</Text>

      <TextInput
        placeholder="Nombres"
        value={nombres}
        onChangeText={setNombres}
        style={{ borderWidth: 1, marginBottom: 4, padding: 8 }}
      />
      {/* ✅ CORREGIDO: el error viene como "name" */}
      {errors.name ? <Text style={{ color: "red" }}>{errors.name}</Text> : null}

      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={{ borderWidth: 1, marginBottom: 4, padding: 8 }}
      />
      {errors.email ? <Text style={{ color: "red" }}>{errors.email}</Text> : null}

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 4, padding: 8 }}
      />
      {errors.password ? <Text style={{ color: "red" }}>{errors.password}</Text> : null}

      <TextInput
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 4, padding: 8 }}
      />
      {errors.confirmPassword ? <Text style={{ color: "red" }}>{errors.confirmPassword}</Text> : null}

      {msg ? <Text style={{ color: "red", marginTop: 8 }}>{msg}</Text> : null}

      <Pressable
        onPress={handleSubmit}
        disabled={loading}
        style={{
          backgroundColor: loading ? "#9CA3AF" : "#22C55E",
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
          marginTop: 12,
        }}
      >
        {loading ? <ActivityIndicator /> : <Text style={{ color: "white", fontWeight: "800" }}>Crear cuenta</Text>}
      </Pressable>

      <Pressable onPress={() => router.replace("/login")} style={{ marginTop: 16 }}>
        <Text style={{ textAlign: "center" }}>
          ¿Ya tienes cuenta? <Text style={{ fontWeight: "bold" }}>Inicia sesión</Text>
        </Text>
      </Pressable>
    </View>
  );
}
