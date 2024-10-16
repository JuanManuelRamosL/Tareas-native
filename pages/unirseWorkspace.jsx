import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import axios from "axios";
import useUserStore from "../store";

const WorkspacesList = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useUserStore((state) => state.user);

  // Función para obtener los workspaces desde el backend
  const fetchWorkspaces = async () => {
    try {
      const response = await axios.get(
        "https://back-fastapi.onrender.com/workspaces/"
      ); // Cambia la URL según sea necesario
      console.log(response.data);
      setWorkspaces(response.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      setError("Failed to load workspaces");
    } finally {
      setLoading(false);
    }
  };

  // Función para unirse a un workspace
  const joinWorkspace = async (workspaceId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8001/users/${user.id}/workspaces/${workspaceId}/add`
      );
      alert("Éxito", `Te has unido al workspace con ID: ${workspaceId}`);
      // Opcional: Recargar la lista de workspaces después de unirse
      fetchWorkspaces();
    } catch (error) {
      console.error("Error joining workspace:", error);
      alert("Error", "Hubo un problema al unirse al workspace");
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  // Mostrar indicador de carga mientras se obtienen los datos
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Mostrar mensaje de error en caso de fallo
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Renderiza cada workspace en la lista
  const renderItem = ({ item }) => (
    <View style={styles.workspaceItem}>
      {/* Mostrar el nombre del workspace */}
      <Text style={styles.workspaceTitle}>{item.name}</Text>

      {/* Si hay usuarios, mostrar la lista de usuarios */}
      {item.users && item.users.length > 0 ? (
        <View style={styles.usersContainer}>
          <Text style={styles.usersTitle}>Usuarios:</Text>
          {item.users.map((user) => (
            <Text key={user.id} style={styles.userName}>
              {user.name} ({user.email})
            </Text>
          ))}
        </View>
      ) : (
        <Text style={styles.noUsersText}>
          No hay usuarios en este workspace
        </Text>
      )}
      <Button
        title="Unirse al Workspace"
        onPress={() => joinWorkspace(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workspaces</Text>
      <FlatList
        data={workspaces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  workspaceItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  workspaceTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  workspaceDescription: {
    fontSize: 14,
    color: "#666",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});

export default WorkspacesList;
