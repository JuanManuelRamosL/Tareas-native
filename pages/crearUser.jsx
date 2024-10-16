import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RegisterForm from "../components/register";
import LoginForm from "../components/loguin";

const UserAuthScreen = () => {
  const [screen, setScreen] = useState(""); // Estado para determinar qué form mostrar

  const handleRegister = () => {
    setScreen("register");
  };

  const handleLogin = () => {
    setScreen("login");
  };

  return (
    <View style={styles.container}>
      {screen === "" ? (
        // Si no se ha seleccionado ningún formulario, muestra los botones
        <>
          <Text style={styles.title}>Bienvenido a la App</Text>
          <Button
            title="Registrarse"
            onPress={handleRegister}
            style={styles.button}
          />
          <View style={styles.spacer}></View>
          <Button
            title="Iniciar Sesión"
            onPress={handleLogin}
            style={styles.button}
          />
        </>
      ) : screen === "register" ? (
        // Muestra el formulario de registro si se selecciona "Registrarse"
        <RegisterForm />
      ) : (
        // Muestra el formulario de login si se selecciona "Iniciar Sesión"
        <LoginForm />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
  spacer: {
    height: 20,
  },
});

export default UserAuthScreen;
