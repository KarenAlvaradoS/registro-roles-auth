import { validateLogin } from "../authValidation";

describe("validateLogin", () => {
  test("acepta datos válidos", () => {
    const result = validateLogin({
      email: "test@mail.com",
      password: "123456",
    });

    expect(result.isValid).toBe(true);
  });

  test("rechaza correo inválido", () => {
    const result = validateLogin({
      email: "testmail.com",
      password: "123456",
    });

    expect(result.isValid).toBe(false);
  });
});