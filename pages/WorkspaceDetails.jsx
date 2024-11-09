import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Importar iconos
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import useUserStore from "../store";

const WorkspaceDetails = ({ route }) => {
  const { workspace } = route.params;
  const setTask = useUserStore((state) => state.setTask);
  const task = useUserStore((state) => state.task);
  const navigation = useNavigation();
  const workspaceActual = useUserStore((state) => state.workspaceActual);
  console.log(task);
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `https://back-fastapi.onrender.com/workspaces/${workspaceActual}/tasks`
      );
      setTask(response.data);
    } catch (error) {
      console.error("Error obteniendo las tareas del workspace:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await axios.put(
        `https://back-fastapi.onrender.com/tasks/${taskId}/status`,
        { new_status: newStatus }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error actualizando el estado de la tarea:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `https://back-fastapi.onrender.com/tasks/${taskId}`
      );
      fetchTasks();
      if (response.status === 200) {
        console.log(response.data.message); // Mensaje de éxito
      } else {
        console.error("Error al eliminar la tarea");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const assignedTasks = task?.filter((t) => t.status === "asignada") || [];
  const inProgressTasks = task?.filter((t) => t.status === "en proceso") || [];
  const underReviewTasks = task?.filter((t) => t.status === "revisión") || [];
  const completedTasks = task?.filter((t) => t.status === "finalizada") || [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.workspaceTitle}>Workspace: {workspace.name}</Text>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.columnHeader}>Asignada</Text>
          <Text style={styles.columnHeader}>En Proceso</Text>
          <Text style={styles.columnHeader}>Revisión</Text>
          <Text style={styles.columnHeader}>Finalizada</Text>
        </View>

        <View style={styles.tableBody}>
          <View style={styles.column}>
            {assignedTasks.length > 0 ? (
              assignedTasks.map((task) => (
                <View key={task.id} style={styles.card}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("TaskDetails", { task })}
                  >
                    <Text style={styles.cardTitle}>{task.title}</Text>
                  </TouchableOpacity>
                  <Text style={styles.cardDescription}>{task.description}</Text>
                  <Image
                    source={{
                      uri: task.image_url,
                    }}
                    style={styles.imagen}
                  ></Image>
                  <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={() => updateTaskStatus(task.id, "IN_PROGRESS")}
                  >
                    <Icon name="arrow-forward" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text>No hay tareas asignadas.</Text>
            )}
          </View>

          <View style={styles.column}>
            {inProgressTasks.length > 0 ? (
              inProgressTasks.map((task) => (
                <View key={task.id} style={styles.card}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("TaskDetails", { task })}
                  >
                    <Text style={styles.cardTitle}>{task.title}</Text>
                  </TouchableOpacity>
                  <Text style={styles.cardDescription}>{task.description}</Text>
                  <Image
                    source={{
                      uri: task.image_url,
                    }}
                    style={styles.imagen}
                  ></Image>
                  <View style={styles.arrowContainer}>
                    <TouchableOpacity
                      style={styles.arrowButton}
                      onPress={() => updateTaskStatus(task.id, "ASSIGNED")}
                    >
                      <Icon name="arrow-back" size={20} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.arrowButton}
                      onPress={() => updateTaskStatus(task.id, "UNDER_REVIEW")}
                    >
                      <Icon name="arrow-forward" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text>No hay tareas en proceso.</Text>
            )}
          </View>

          <View style={styles.column}>
            {underReviewTasks.length > 0 ? (
              underReviewTasks.map((task) => (
                <View key={task.id} style={styles.card}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("TaskDetails", { task })}
                  >
                    <Text style={styles.cardTitle}>{task.title}</Text>
                  </TouchableOpacity>
                  <Text style={styles.cardDescription}>{task.description}</Text>
                  <Image
                    source={{
                      uri: task.image_url,
                    }}
                    style={styles.imagen}
                  ></Image>
                  <View style={styles.arrowContainer}>
                    <TouchableOpacity
                      style={styles.arrowButton}
                      onPress={() => updateTaskStatus(task.id, "IN_PROGRESS")}
                    >
                      <Icon name="arrow-back" size={20} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.arrowButton}
                      onPress={() => updateTaskStatus(task.id, "COMPLETED")}
                    >
                      <Icon name="arrow-forward" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text>No hay tareas en revisión.</Text>
            )}
          </View>

          <View style={styles.column}>
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <View key={task.id} style={styles.card}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("TaskDetails", { task })}
                  >
                    <Text style={styles.cardTitle}>{task.title}</Text>
                  </TouchableOpacity>
                  <Text style={styles.cardDescription}>{task.description}</Text>
                  <Image
                    source={{
                      uri: task.image_url,
                    }}
                    style={styles.imagen}
                  ></Image>
                  <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={() => updateTaskStatus(task.id, "UNDER_REVIEW")}
                  >
                    <Icon name="arrow-back" size={20} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteTask(task.id)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteButtonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text>No hay tareas finalizadas.</Text>
            )}
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.createTaskButton}
        onPress={() => navigation.navigate("CreateTask")}
      >
        <Text style={styles.createTaskButtonText}>Crear Tarea</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f4f4f4",
    flex: 1,
  },
  workspaceTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  table: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#eee",
    paddingVertical: 10,
  },
  columnHeader: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  tableBody: {
    flexDirection: "row",
  },
  column: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
  arrowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  arrowButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  createTaskButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  createTaskButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FF4C4C", // Rojo para indicar eliminación
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center", // Centra el texto en el botón
    marginTop: 10,
  },
  deleteButtonText: {
    color: "#fff", // Texto blanco
    fontSize: 16,
    fontWeight: "bold", // Hace el texto más visible
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default WorkspaceDetails;
