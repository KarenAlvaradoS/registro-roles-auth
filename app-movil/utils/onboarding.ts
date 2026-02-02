import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "onboardingDone";

export async function setOnboardingDone() {
  await AsyncStorage.setItem(KEY, "1");
}

export async function getOnboardingDone() {
  return (await AsyncStorage.getItem(KEY)) === "1";
}

// 👇 ESTA ES LA CLAVE DE LA OPCIÓN 3
export async function resetOnboarding() {
  await AsyncStorage.removeItem("onboardingDone");
}
