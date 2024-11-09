import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Importa el hook de navegación
import useUserStore from "../store";
// import { useAuth0 } from "react-native-auth0";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const navigation = useNavigation(); // Instancia de navegación

  // const { authorize } = useAuth0();

  /*   const onPress = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  }; */
  // com.juanma_9.tareas://dev-76gyrab4o8b0fc0k.us.auth0.com/android/com.juanma_9.tareas/callback

  const handleLoginUser = async () => {
    try {
      const response = await fetch("https://back-fastapi.onrender.com/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          pasword: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.json();
      setUser(data);
      if (Platform.OS === "web") {
        // Web: Guardar en localStorage
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        // React Native: Guardar en AsyncStorage
        await AsyncStorage.setItem("user", JSON.stringify(data));
      }
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
      <Text style={styles.label}>Email del Usuario</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Ingrese su email"
        placeholderTextColor="#aaa" // Texto de placeholder más claro
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Ingrese la contraseña"
        placeholderTextColor="#999"
        secureTextEntry={true} // Campo seguro para contraseñas
      />
      <TouchableOpacity style={styles.button} onPress={handleLoginUser}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5", // Fondo gris claro
    padding: 20,
  },
  label: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333", // Texto oscuro para el label
    marginBottom: 15,
  },
  input: {
    height: 50,
    width: "100%",
    maxWidth: 400, // Ancho máximo para el input
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    marginBottom: 25,
    backgroundColor: "#fff", // Fondo blanco para el input
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2, // Sombra en Android
  },
  button: {
    backgroundColor: "#3498db", // Azul moderno para el botón
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff", // Texto blanco en el botón
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginForm;
