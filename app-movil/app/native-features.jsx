import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { CameraView } from "expo-camera";
import useCameraPermission from "../hooks/useCameraPermission";
import useLocationPermission from "../hooks/useLocationPermission";
import { takePhoto } from "../services/cameraService";
import { getCurrentLocation } from "../services/locationService";

export default function NativeFeaturesScreen() {
  const cameraRef = useRef(null);

  const { status: cameraStatus, requestPermission: requestCameraPermission } =
    useCameraPermission();

  const {
    status: locationStatus,
    requestPermission: requestLocationPermission,
  } = useLocationPermission();

  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState(null);

  const handleTakePhoto = async () => {
    try {
      if (!cameraStatus?.granted) {
        const result = await requestCameraPermission();

        if (!result.granted) {
          Alert.alert("Permiso denegado", "No se concedió acceso a la cámara.");
          return;
        }
      }

      const photo = await takePhoto(cameraRef);
      setPhotoUri(photo.uri);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleGetLocation = async () => {
    try {
      if (!locationStatus?.granted) {
        const result = await requestLocationPermission();

        if (!result.granted) {
          Alert.alert("Permiso denegado", "No se concedió acceso a la ubicación.");
          return;
        }
      }

      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);
    } catch (error) {
      Alert.alert("Error", "No fue posible obtener la ubicación.");
    }
  };

  const getPermissionText = (status) => {
    if (!status) return "Cargando...";
    if (status.granted) return "granted";
    if (status.canAskAgain === false) return "blocked";
    return "denied";
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Semana 13</Text>
      <Text style={styles.subtitle}>Cámara y Geolocalización</Text>

      <Text style={styles.label}>
        Estado permiso cámara: {getPermissionText(cameraStatus)}
      </Text>
      <Text style={styles.label}>
        Estado permiso ubicación: {getPermissionText(locationStatus)}
      </Text>

      <View style={styles.cameraContainer}>
        <CameraView ref={cameraRef} style={styles.camera} facing="back" />
      </View>

      <View style={styles.buttonSpacing}>
        <Button title="Tomar foto" onPress={handleTakePhoto} />
      </View>

      {photoUri && (
        <View style={styles.previewContainer}>
          <Text style={styles.sectionTitle}>Foto capturada</Text>
          <Image source={{ uri: photoUri }} style={styles.preview} />
        </View>
      )}

      <View style={styles.buttonSpacing}>
        <Button title="Obtener ubicación" onPress={handleGetLocation} />
      </View>

      {location && (
        <View style={styles.locationBox}>
          <Text style={styles.sectionTitle}>Ubicación actual</Text>
          <Text>Latitud: {location.latitude}</Text>
          <Text>Longitud: {location.longitude}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    marginBottom: 8,
    fontSize: 15,
  },
  cameraContainer: {
    marginTop: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  camera: {
    width: "100%",
    height: 300,
  },
  buttonSpacing: {
    marginTop: 16,
  },
  previewContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  preview: {
    width: "100%",
    height: 250,
    borderRadius: 12,
  },
  locationBox: {
    marginTop: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
});