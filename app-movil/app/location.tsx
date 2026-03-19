import { useState } from "react";
import { View, Text, Pressable, StyleSheet, Linking } from "react-native";
import * as Location from "expo-location";

export default function LocationScreen() {
  const [permissionState, setPermissionState] = useState("undetermined");
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  const requestLocationPermission = async () => {
    const result = await Location.requestForegroundPermissionsAsync();

    const state = result.granted
      ? "granted"
      : !result.canAskAgain
      ? "blocked"
      : "denied";

    setPermissionState(state);
  };

  const getLocation = async () => {
    const current = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    setCoords({
      latitude: current.coords.latitude,
      longitude: current.coords.longitude,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Funcionalidad nativa: Geolocalización</Text>
      <Text style={styles.status}>Estado del permiso: {permissionState}</Text>

      {(permissionState === "undetermined" || permissionState === "denied") && (
        <Pressable style={styles.button} onPress={requestLocationPermission}>
          <Text style={styles.buttonText}>Solicitar permiso de ubicación</Text>
        </Pressable>
      )}

      {permissionState === "blocked" && (
        <Pressable style={styles.button} onPress={() => Linking.openSettings()}>
          <Text style={styles.buttonText}>Abrir configuración</Text>
        </Pressable>
      )}

      {permissionState === "granted" && (
        <Pressable style={styles.button} onPress={getLocation}>
          <Text style={styles.buttonText}>Obtener ubicación actual</Text>
        </Pressable>
      )}

      {coords && (
        <View style={styles.card}>
          <Text>Latitud: {coords.latitude}</Text>
          <Text>Longitud: {coords.longitude}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    gap: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  status: {
    fontSize: 16,
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#16A34A",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});