import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  Button,
} from "react-native";
import Layout from "../Layout";
import useUserStore from "../store";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export const UsuarioScreen = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Función para obtener las tareas del usuario desde el backend
  const fetchUserTasks = async () => {
    try {
      const response = await fetch(
        `https://back-fastapi.onrender.com/users/${user.id}/tasks`
      );
      const data = await response.json();
      setTareas(data); // Actualizamos el estado con las tareas obtenidas
      setLoading(false); // Desactivar el indicador de carga
    } catch (error) {
      console.error("Error fetching user tasks:", error);
      setLoading(false); // En caso de error, también desactivamos el indicador de carga
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserTasks(); // Llamar a la función cuando se carga el componente
    }
  }, [user]);

  // Función para cerrar sesión
  const handleLogout = async () => {
    setUser(null);

    try {
      // Limpiar el usuario de localStorage o AsyncStorage
      if (Platform.OS === "web") {
        localStorage.removeItem("user");
      } else {
        await AsyncStorage.removeItem("user");
      }
      alert("Sesión cerrada");
      navigation.navigate("Inicio");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Layout>
      {user ? (
        <View style={styles.container}>
          {/* Foto de perfil */}
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/6073/6073873.png",
            }}
            style={styles.profileImage}
          />

          {/* Información del usuario */}
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
          {/* Indicador de carga */}
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              {/* Tareas asignadas */}
              <Text style={styles.tasksTitle}>Tareas Asignadas:</Text>
              {tareas.length > 0 ? (
                <FlatList
                  data={tareas}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                      <Text style={styles.taskTitle}>{item.title}</Text>
                      <Text style={styles.taskDescription}>
                        {item.description}
                      </Text>
                    </View>
                  )}
                />
              ) : (
                <Text>No tienes tareas asignadas.</Text>
              )}
            </>
          )}
        </View>
      ) : null}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    fontSize: 18,
    color: "gray",
    marginBottom: 20,
  },
  tasksTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  taskItem: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    width: "100%",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 14,
    color: "gray",
  },
  logoutButton: {
    position: "absolute",
    top: -15,
    right: 5,
    backgroundColor: "#ff4d4f", // Color rojo para resaltar el botón de logout
    paddingVertical: 12,
    paddingHorizontal: 7,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000", // Sombra para añadir profundidad
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3, // Elevación en Android
    marginTop: 20,
    marginLeft: 5,
  },
  logoutButtonText: {
    color: "#fff", // Texto blanco para buen contraste
    fontSize: 16,
    fontWeight: "bold",
  },
});
