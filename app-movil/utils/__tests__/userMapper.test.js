import { mapUser } from "../userMapper";

describe("mapUser", () => {
  test("transforma correctamente los datos", () => {
    const result = mapUser({
      id: 1,
      name: " Karen ",
      email: "KAREN@MAIL.COM",
    });

    expect(result).toEqual({
      id: 1,
      name: "Karen",
      email: "karen@mail.com",
    });
  });
});