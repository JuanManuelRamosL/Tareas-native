import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import useUserStore from "../store";

const CreateWorkspaceScreen = () => {
  const navigation = useNavigation();
  const [workspaceName, setWorkspaceName] = useState("");
  const [existingWorkspaceId, setExistingWorkspaceId] = useState("");
  const user = useUserStore((state) => state.user);

  const createWorkspace = async () => {
    try {
      // Crear el workspace
      const response = await axios.post(
        "https://back-fastapi.onrender.com/workspaces/",
        {
          name: workspaceName,
        }
      );

      const createdWorkspaceId = response.data.id;

      // Asociar el workspace al usuario creador
      await axios.post(
        `https://back-fastapi.onrender.com/users/${user.id}/workspaces/${createdWorkspaceId}/add`
      );

      alert("Workspace creado y asignado al usuario: " + response.data.name);
      // Redirigir a la pantalla de tareas o workspace
      navigation.navigate("Tasks");
    } catch (error) {
      console.error("Error creando el workspace:", error);
      alert("No se pudo crear el workspace");
    }
  };

  const accessExistingWorkspace = () => {
    // Aquí puedes agregar la lógica para acceder a un workspace existente
    alert("Accediendo al workspace con ID: " + existingWorkspaceId);
    // Redirige a la pantalla de tareas o muestra el workspace
    navigation.navigate("Tasks");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Workspace</Text>
      <TextInput
        style={styles.input}
        value={workspaceName}
        onChangeText={setWorkspaceName}
        placeholder="Ingrese el nombre del nuevo workspace"
      />
      <Button title="Crear Workspace" onPress={createWorkspace} />
      <Text style={styles.label}>O ingresar ID de un workspace existente:</Text>
      <TextInput
        style={styles.input}
        value={existingWorkspaceId}
        onChangeText={setExistingWorkspaceId}
        placeholder="Ingrese el ID del workspace"
        keyboardType="numeric"
      />
      <Button title="Entrar al Workspace" onPress={accessExistingWorkspace} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default CreateWorkspaceScreen;
