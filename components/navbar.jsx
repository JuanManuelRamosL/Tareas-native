import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Importar iconos
import useUserStore from "../store";

const Navbar = () => {
  const navigation = useNavigation();
  const user = useUserStore((state) => state.user);

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Inicio")}
      >
        <Ionicons name="home-outline" size={24} color="#f0f0f0" />
        <Text style={styles.navText}>Inicio</Text>
      </TouchableOpacity>

      {/* Solo mostrar si el usuario está autenticado */}
      {user && (
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Usuario")}
        >
          <Ionicons name="person-outline" size={24} color="#f0f0f0" />
          <Text style={styles.navText}>{user.name}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Crear")}
      >
        <Ionicons name="briefcase-outline" size={24} color="#f0f0f0" />
        <Text style={styles.navText}>Espacios</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#04a1e0", // Color de fondo base
    elevation: 5, // Sombra para dar profundidad
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  navText: {
    color: "#f0f0f0", // Color del texto
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8, // Separar el texto del icono
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  userName: {
    color: "#f0f0f0", // Color del nombre de usuario
    fontSize: 16,
    marginLeft: 8, // Separar el nombre del icono
    fontWeight: "500",
  },
});

export default Navbar;
