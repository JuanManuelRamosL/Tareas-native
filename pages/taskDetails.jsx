import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const TaskDetails = ({ route }) => {
  const { task } = route.params;

  // Función para obtener el color de acuerdo al estado
  const getStatusStyle = (status) => {
    switch (status) {
      case "asignada":
        return styles.statusAssigned;
      case "en proceso":
        return styles.statusInProgress;
      case "revisión":
        return styles.statusUnderReview;
      case "finalizada":
        return styles.statusCompleted;
      default:
        return styles.statusDefault;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri:
              task.image_url ||
              "https://www.shutterstock.com/image-vector/do-list-icon-260nw-555443722.jpg",
          }}
          style={styles.image}
        />
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.label}>Status:</Text>
          <Text style={[styles.status, getStatusStyle(task.status)]}>
            {task.status}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 16,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  status: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "bold",
  },
  // Estilos específicos para cada estado
  statusAssigned: {
    color: "#f1c40f", // Amarillo para ASSIGNED
  },
  statusInProgress: {
    color: "#3498db", // Azul para IN_PROGRESS
  },
  statusUnderReview: {
    color: "#e67e22", // Naranja para UNDER_REVIEW
  },
  statusCompleted: {
    color: "#2ecc71", // Verde para COMPLETED
  },
  statusDefault: {
    color: "#95a5a6", // Gris por defecto
  },
});

export default TaskDetails;
