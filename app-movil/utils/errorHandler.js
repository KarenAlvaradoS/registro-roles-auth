export function getErrorMessage(error) {
  if (error?.message) {
    return error.message;
  }

  return "Error desconocido";
}