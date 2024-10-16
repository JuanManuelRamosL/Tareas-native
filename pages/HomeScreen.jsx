import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons"; // Importar iconos
import useUserStore from "../store";

const HomeScreen = () => {
  const navigation = useNavigation();
  const user = useUserStore((state) => state.user); // Obtener usuario del estado global
  const workspaces = useUserStore((state) => state.workspaces); // Obtener los workspaces del estado global
  const setWorkspaces = useUserStore((state) => state.setWorkspaces);

  // Función para obtener todos los workspaces del usuario desde la API
  const fetchWorkspaces = async () => {
    try {
      const response = await axios.get(
        `https://back-fastapi.onrender.com/users/${user.id}/workspaces`
      );
      setWorkspaces(response.data); // Guardar los workspaces en el estado
    } catch (error) {
      console.error("Error obteniendo los workspaces:", error);
    }
  };

  // Ejecutar la llamada a la API cuando el componente se monta y el usuario está disponible
  useEffect(() => {
    if (user) {
      fetchWorkspaces(); // Llamar a la función para obtener los workspaces
    }
  }, [user]);

  // Función para navegar a la pantalla de detalles del workspace
  const handleWorkspacePress = (workspace) => {
    useUserStore.setState({ workspaceActual: workspace.id });
    navigation.navigate("Workspace", { workspace });
  };

  // Renderizar un workspace en la lista
  const renderWorkspace = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleWorkspacePress(item)}
    >
      <Text style={styles.workspaceTitle}>{item.name}</Text>
      <Text style={styles.workspaceId}>ID: {item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido a tus Workspaces</Text>
        <Text style={styles.subtitle}>
          Organiza y colabora en tus proyectos fácilmente
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {user ? (
          <View style={styles.userContainer}>
            <Text style={styles.greeting}>Hola, {user.name}</Text>
            <Text style={styles.subtitle}>Tus Workspaces:</Text>

            {/* Mostrar la lista de workspaces */}
            {workspaces.length > 0 ? (
              <FlatList
                data={workspaces}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderWorkspace}
                style={styles.list}
              />
            ) : (
              <Text style={styles.noWorkspacesText}>
                Aún no tienes workspaces asociados.
              </Text>
            )}

            <TouchableOpacity
              style={styles.createButton}
              onPress={() => navigation.navigate("CreateWorkspace")}
            >
              <Ionicons name="add-circle-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Crear Workspace</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => navigation.navigate("Workspace-unirse")}
            >
              <Ionicons name="people-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Unirse a Workspace</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("CreateUser")}
          >
            <Ionicons name="log-in-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#007bff", // Cambiar color para resaltar el encabezado
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#f8f9fa",
    textAlign: "center",
    marginTop: 5,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  userContainer: {
    width: "100%",
    alignItems: "center",
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 15,
  },
  workspaceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
  },
  workspaceId: {
    fontSize: 14,
    color: "gray",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    width: "100%",
  },
  createButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 50,
    marginVertical: 10,
    width: "90%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  joinButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 50,
    marginVertical: 10,
    width: "90%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: "#6c757d",
    padding: 15,
    borderRadius: 50,
    marginVertical: 10,
    width: "90%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    marginLeft: 10, // Separar el texto del icono
  },
  noWorkspacesText: {
    fontSize: 16,
    color: "#868e96",
    marginTop: 20,
  },
});

export default HomeScreen;
