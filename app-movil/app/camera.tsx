import { useRef, useState } from "react";
import { View, Text, Pressable, Image, StyleSheet, Linking } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function CameraScreen() {
  const cameraRef = useRef<any>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const permissionState = !permission
    ? "undetermined"
    : permission.granted
    ? "granted"
    : !permission.canAskAgain
    ? "blocked"
    : "denied";

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
    setPhotoUri(photo.uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Funcionalidad nativa: Cámara</Text>
      <Text style={styles.status}>Estado del permiso: {permissionState}</Text>

      {permissionState === "undetermined" || permissionState === "denied" ? (
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Solicitar permiso de cámara</Text>
        </Pressable>
      ) : null}

      {permissionState === "blocked" ? (
        <Pressable style={styles.button} onPress={() => Linking.openSettings()}>
          <Text style={styles.buttonText}>Abrir configuración</Text>
        </Pressable>
      ) : null}

      {permissionState === "granted" ? (
        <>
          <CameraView ref={cameraRef} style={styles.camera} facing="back" />
          <Pressable style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Tomar foto</Text>
          </Pressable>
        </>
      ) : null}

      {photoUri ? <Image source={{ uri: photoUri }} style={styles.preview} /> : null}
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
  camera: {
    width: "100%",
    height: 320,
    borderRadius: 16,
    overflow: "hidden",
  },
  preview: {
    width: "100%",
    height: 220,
    borderRadius: 16,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});