import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Importa el hook de navegación
import useUserStore from "../store";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const navigation = useNavigation(); // Instancia de navegación

  const handleLoginUser = async () => {
    try {
      const response = await fetch("https://back-fastapi.onrender.com/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.json();
      setUser(data);
      alert("Sesión iniciada como: " + data.name);

      // Redirigir a la pantalla principal
      navigation.navigate("Inicio"); // Aquí rediriges a la pantalla principal
    } catch (error) {
      console.error("Error iniciando sesión:", error);
      alert("No se pudo iniciar sesión");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email del Usuario:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Ingrese el email del usuario"
      />
      <Button title="Iniciar Sesión" onPress={handleLoginUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default LoginForm;
