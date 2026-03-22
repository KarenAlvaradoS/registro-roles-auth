import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { TextInput, Button, View } from "react-native";

// Simulamos un login simple
const LoginMock = () => {
  let email = "";
  let password = "";

  return (
    <View>
      <TextInput
        placeholder="Correo"
        onChangeText={(text) => (email = text)}
      />
      <TextInput
        placeholder="Contraseña"
        onChangeText={(text) => (password = text)}
      />
      <Button
        title="Login"
        onPress={() => {
          if (!email || !password) {
            console.log("Error");
          } else {
            console.log("Login correcto");
          }
        }}
      />
    </View>
  );
};

describe("Login Integration", () => {
  test("permite escribir y presionar login", () => {
    const { getByPlaceholderText, getByText } = render(<LoginMock />);

    fireEvent.changeText(getByPlaceholderText("Correo"), "test@mail.com");
    fireEvent.changeText(getByPlaceholderText("Contraseña"), "123456");

    fireEvent.press(getByText("Login"));
  });
});