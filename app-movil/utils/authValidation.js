export function validateLogin(data) {
  const errors = [];

  if (!data.email || !data.email.includes("@")) {
    errors.push("Correo inválido");
  }

  if (!data.password || data.password.length < 6) {
    errors.push("Contraseña inválida");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}