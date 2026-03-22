import { getErrorMessage } from "../errorHandler";

describe("getErrorMessage", () => {
  test("devuelve mensaje del error", () => {
    const error = new Error("Falló");

    expect(getErrorMessage(error)).toBe("Falló");
  });

  test("devuelve mensaje por defecto", () => {
    expect(getErrorMessage(null)).toBe("Error desconocido");
  });
});