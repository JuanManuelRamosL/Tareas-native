import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
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
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
          <View style={styles.spacer}></View>
          <TouchableOpacity style={styles.button2} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
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
    backgroundColor: "#f7f7f7", // Fondo claro
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333", // Texto oscuro
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50", // Verde para el botón
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: "100%", // Ancho completo con margen
    maxWidth: 300,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Sombra en Android
  },
  button2: {
    backgroundColor: "#21618c", // Verde para el botón
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: "100%", // Ancho completo con margen
    maxWidth: 300,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Sombra en Android
  },
  buttonText: {
    color: "#fff", // Texto blanco
    fontSize: 18,
    fontWeight: "600",
  },
  spacer: {
    height: 20, // Espacio entre botones
  },
});

export default UserAuthScreen;
