import { useEffect } from "react";
import { useCameraPermissions } from "expo-camera";

export default function useCameraPermission() {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    // se puede verificar automáticamente
  }, []);

  const getState = () => {
    if (!permission) return "undetermined";
    if (permission.granted) return "granted";
    if (!permission.canAskAgain) return "blocked";
    return "denied";
  };

  return {
    permission,
    state: getState(),
    requestPermission,
  };
}