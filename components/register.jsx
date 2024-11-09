import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import axios from "axios";
import useUserStore from "../store";
import { useNavigation } from "@react-navigation/native";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Nuevo estado para la contraseña
  const setUser = useUserStore((state) => state.setUser);
  const navigation = useNavigation();

  const handleCreateUser = async () => {
    try {
      const response = await axios.post(
        "https://back-fastapi.onrender.com/users/",
        {
          name: name,
          email: email,
          password: password, // Incluye el campo de contraseña en la solicitud
        }
      );
      setUser(response.data);
      if (Platform.OS === "web") {
        // Web: Guardar en localStorage
        localStorage.setItem("user", JSON.stringify(response.data));
      } else {
        // React Native: Guardar en AsyncStorage
        await AsyncStorage.setItem("user", JSON.stringify(response.data));
      }
      alert("Sesión iniciada como: " + response.data.name);

      // Redirigir a la pantalla principal
      navigation.navigate("Inicio");
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
        placeholderTextColor="#999"
      />
      <Text style={styles.label}>Email del Usuario:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Ingrese el email del usuario"
        placeholderTextColor="#999"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Ingrese la contraseña"
        placeholderTextColor="#999"
        secureTextEntry={true} // Campo seguro para contraseñas
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
        <Text style={styles.buttonText}>Crear Usuario</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterForm;
