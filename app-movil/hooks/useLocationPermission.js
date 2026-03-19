import { useEffect } from "react";
import * as Location from "expo-location";

export default function useLocationPermission() {
  const [permission, setPermission] = useState<Location.PermissionResponse | null>(null);

  const checkPermission = async () => {
    const current = await Location.getForegroundPermissionsAsync();
    setPermission(current);
  };

  const requestPermission = async () => {
    const result = await Location.requestForegroundPermissionsAsync();
    setPermission(result);
    return result;
  };

  const getState = () => {
    if (!permission) return "undetermined";
    if (permission.granted) return "granted";
    if (!permission.canAskAgain) return "blocked";
    return "denied";
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return {
    permission,
    state: getState(),
    requestPermission,
  };
}