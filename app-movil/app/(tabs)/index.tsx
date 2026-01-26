import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://haematogenous-lorene-diffusive.ngrok-free.dev";
const LOGIN_PATH = "/api/auth/login";
const REGISTER_PATH = "/api/auth/register";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function HomeScreen() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("estefania@test.com");
  const [password, setPassword] = useState("");

  // ✅ Rol para registro
  const [role, setRole] = useState<"user" | "admin">("user");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const saveSession = async (data: any) => {
    if (data?.token) {
      await AsyncStorage.setItem("token", data.token);
      setToken(data.token);
    }
    if (data?.user) {
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    }
  };

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
  };

  useEffect(() => {
    loadSession();
  }, []);

  const login = async () => {
    setMsg(null);
    if (!email.trim() || !password) return setMsg("Escribe email y contraseña.");

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}${LOGIN_PATH}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) return setMsg(data?.message || "Login falló.");

      await saveSession(data);
      Alert.alert("✅ Login OK", `Bienvenida ${data?.user?.name || ""}`);
    } catch {
      setMsg("Error de conexión (revisa ngrok / internet).");
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    setMsg(null);

    // Tu backend exige roleName, así que lo mandamos siempre
    if (!name.trim() || !email.trim() || !password) {
      return setMsg("Completa nombre, email y contraseña.");
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}${REGISTER_PATH}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          roleName: role, // ✅ CLAVE: tu backend espera roleName
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) return setMsg(data?.message || "Registro falló.");

      Alert.alert("✅ Registro OK", `Usuario creado como: ${role}\nAhora inicia sesión.`);
      setMode("login");
      setPassword("");
    } catch {
      setMsg("Error de conexión (revisa ngrok / internet).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F59E0B",
        padding: 18,
        justifyContent: "center",
      }}
    >
      <View style={{ backgroundColor: "white", borderRadius: 18, padding: 18 }}>
        <Text style={{ fontSize: 26, fontWeight: "800", textAlign: "center" }}>
          Sistema de{"\n"}Autenticación
        </Text>

        <Text style={{ textAlign: "center", marginTop: 8, opacity: 0.65 }}>
          Registro • Login • JWT • Zona protegida
        </Text>

        <Text style={{ marginTop: 10, fontSize: 12, opacity: 0.6 }}>
          API: {API_URL}
        </Text>

        {/* ✅ Mostrar usuario y rol */}
        {user ? (
          <View
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 12,
              backgroundColor: "#F3F4F6",
            }}
          >
            <Text style={{ fontWeight: "800" }}>Sesión activa</Text>
            <Text>Nombre: {user.name}</Text>
            <Text>Email: {user.email}</Text>
            <Text style={{ fontWeight: "800" }}>Rol: {user.role}</Text>
            <Text style={{ marginTop: 6, fontSize: 12, opacity: 0.6 }}>
              Token guardado: {token ? "Sí ✅" : "No ❌"}
            </Text>

            <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
              <Pressable
                onPress={logout}
                style={{
                  flex: 1,
                  backgroundColor: "#EF4444",
                  padding: 12,
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "800" }}>
                  Cerrar sesión
                </Text>
              </Pressable>

              <Pressable
                onPress={loadSession}
                style={{
                  flex: 1,
                  backgroundColor: "#2563EB",
                  padding: 12,
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "800" }}>
                  Cargar sesión
                </Text>
              </Pressable>
            </View>
          </View>
        ) : null}

        {/* Toggle Login/Registro */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 14,
            backgroundColor: "#F3F4F6",
            borderRadius: 12,
            padding: 4,
          }}
        >
          <Pressable
            onPress={() => setMode("register")}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 10,
              backgroundColor: mode === "register" ? "#22C55E" : "transparent",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: mode === "register" ? "white" : "black",
                fontWeight: "700",
              }}
            >
              Registro
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setMode("login")}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 10,
              backgroundColor: mode === "login" ? "#22C55E" : "transparent",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: mode === "login" ? "white" : "black",
                fontWeight: "700",
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>

        {/* Inputs */}
        <View style={{ marginTop: 14, gap: 10 }}>
          {mode === "register" ? (
            <>
              <TextInput
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
                style={{
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  borderRadius: 12,
                  padding: 12,
                }}
              />

              {/* ✅ Selector de rol */}
              <Text style={{ fontWeight: "700", marginTop: 4 }}>
                Selecciona tu rol
              </Text>

              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable
                  onPress={() => setRole("user")}
                  style={{
                    flex: 1,
                    padding: 12,
                    borderRadius: 12,
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: role === "user" ? "#22C55E" : "#E5E7EB",
                    backgroundColor: role === "user" ? "#DCFCE7" : "white",
                  }}
                >
                  <Text style={{ fontWeight: "800" }}>user</Text>
                </Pressable>

                <Pressable
                  onPress={() => setRole("admin")}
                  style={{
                    flex: 1,
                    padding: 12,
                    borderRadius: 12,
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: role === "admin" ? "#22C55E" : "#E5E7EB",
                    backgroundColor: role === "admin" ? "#DCFCE7" : "white",
                  }}
                >
                  <Text style={{ fontWeight: "800" }}>admin</Text>
                </Pressable>
              </View>
            </>
          ) : null}

          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={{
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 12,
              padding: 12,
            }}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 12,
              padding: 12,
            }}
          />

          {msg ? (
            <Text style={{ color: "#EF4444", textAlign: "center" }}>{msg}</Text>
          ) : null}

          <Pressable
            onPress={mode === "login" ? login : register}
            disabled={loading}
            style={{
              backgroundColor: loading ? "#9CA3AF" : "#22C55E",
              padding: 14,
              borderRadius: 12,
              alignItems: "center",
              marginTop: 6,
            }}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={{ color: "white", fontWeight: "800" }}>
                {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
