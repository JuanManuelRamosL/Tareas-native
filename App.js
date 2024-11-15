import { StyleSheet } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { InicioScreen } from './pages/inicio';
import { UsuarioScreen } from './pages/usuario';
import HomeScreen from './pages/HomeScreen';
import CreateUserForm from './pages/crearUser';
import CreateWorkspaceForm from './pages/crearWorkspace';
import CreateTaskForm from './pages/crearTask';
import WorkspaceDetails from './pages/WorkspaceDetails';
import WorkspacesList from './pages/unirseWorkspace';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import TaskDetails from './pages/taskDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
   
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={InicioScreen} />
      <Stack.Screen name="Usuario" component={UsuarioScreen} />
      <Stack.Screen name="Crear" component={HomeScreen} />
      <Stack.Screen name="Workspace" component={WorkspaceDetails} />
      <Stack.Screen name="Workspace-unirse" component={WorkspacesList} />
      <Stack.Screen name="CreateWorkspace" component={CreateWorkspaceForm} options={{ title: "Crear Workspace" }} />
      <Stack.Screen name="CreateUser" component={CreateUserForm} options={{ title: "Crear Usuario" }} />
      <Stack.Screen name="CreateTask" component={CreateTaskForm} options={{ title: "Crear Tarea" }} />
      <Stack.Screen name="TaskDetails" component={TaskDetails} />
    </Stack.Navigator>
  </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//id android 448429168029-alafamq00fhqflm6dqrp4ov2g6eqrg75.apps.googleusercontent.com