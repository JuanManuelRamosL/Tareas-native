import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import useUserStore from "../store";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const setUser = useUserStore((state) => state.setUser);

  const handleCreateUser = async () => {
    try {
      const response = await axios.post(
        "https://back-fastapi.onrender.com/users/",
        {
          name: name,
          email: email,
        }
      );
      setUser(response.data);
      console.log(response.data);
      alert("Usuario creado: " + response.data.name);
    } catch (error) {
      console.error("Error creando el usuario:", error);
      alert("No se pudo crear el usuario");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del Usuario:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ingrese el nombre del usuario"
      />
      <Text style={styles.label}>Email del Usuario:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Ingrese el email del usuario"
      />
      <Button title="Crear Usuario" onPress={handleCreateUser} />
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

export default RegisterForm;
