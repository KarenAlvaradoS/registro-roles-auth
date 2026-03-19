export async function takePhoto(cameraRef) {
  if (!cameraRef?.current) {
    throw new Error("La cámara no está disponible.");
  }

  const photo = await cameraRef.current.takePictureAsync({
    quality: 0.7,
    skipProcessing: false,
  });

  return photo;
}