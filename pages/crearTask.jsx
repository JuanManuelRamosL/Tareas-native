import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Picker,
} from "react-native"; // Importa Picker
import axios from "axios";
import useUserStore from "../store";
import { useNavigation } from "@react-navigation/native";

const CreateTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(""); // Estado para el ID del usuario seleccionado
  const [imagen, setImagen] = useState("");
  const workspaces = useUserStore((state) => state.workspaces);
  const workspaceActual = useUserStore((state) => state.workspaceActual);
  const navigation = useNavigation();

  // Filtrar el workspace actual
  const selectedWorkspace = workspaces.find(
    (workspace) => workspace.id === workspaceActual
  );

  const handleCreateTask = async () => {
    try {
      const requestBody = {
        title: title,
        description: description,
        workspace_id: workspaceActual,
        image_url: imagen,
      };

      const response = await axios.post(
        `https://back-fastapi.onrender.com/workspaces/${workspaceActual}/tasks/?user_id=${userId}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert("Tarea creada: " + response.data.title);

      if (selectedWorkspace) {
        navigation.navigate("Workspace", { workspace: selectedWorkspace });
      } else {
        alert("Workspace no encontrado");
      }
    } catch (error) {
      console.error("Error creando la tarea:", error);
      alert("No se pudo crear la tarea");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título de la Tarea:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Ingrese el título de la tarea"
      />
      <Text style={styles.label}>Descripción de la Tarea:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Ingrese la descripción de la tarea"
      />
      <TextInput
        style={styles.input}
        value={imagen}
        onChangeText={setImagen}
        placeholder="url Imagen (opcional)"
      />

      {/* Picker para seleccionar el usuario */}
      {selectedWorkspace && selectedWorkspace.users.length > 0 ? (
        <>
          <Text style={styles.label}>Seleccionar Usuario:</Text>
          <Picker
            selectedValue={userId}
            style={styles.picker}
            onValueChange={(itemValue) => setUserId(itemValue)}
          >
            <Picker.Item label="Seleccione un usuario" value="" />
            {selectedWorkspace.users.map((user) => (
              <Picker.Item
                key={user.id}
                label={`${user.name} (${user.email})`}
                value={user.id}
              />
            ))}
          </Picker>
        </>
      ) : (
        <Text>No hay usuarios disponibles en este workspace.</Text>
      )}

      <Button title="Crear Tarea" onPress={handleCreateTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 12,
  },
});

export default CreateTaskForm;
