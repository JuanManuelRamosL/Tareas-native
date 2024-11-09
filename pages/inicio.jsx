import React, { useEffect } from "react";
import Layout from "../Layout";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  Platform, // Para obtener las dimensiones de la pantalla
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useUserStore from "../store";

const { width } = Dimensions.get("window"); // Obtener el ancho de la pantalla

export function InicioScreen() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserInStorage = async () => {
      try {
        // Si no hay usuario en el estado global, buscamos en el almacenamiento
        if (!user) {
          let storedUser = null;

          if (Platform.OS === "web") {
            // En web usamos localStorage
            storedUser = localStorage.getItem("user");
          } else {
            // En React Native usamos AsyncStorage
            storedUser = await AsyncStorage.getItem("user");
          }

          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser); // Establecemos el usuario en el estado global
            console.log("Usuario cargado desde el almacenamiento:", parsedUser);
          }
        }
      } catch (error) {
        console.error("Error al cargar el usuario del almacenamiento:", error);
      }
    };

    checkUserInStorage();
  }, [user, setUser]);

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Imagen de fondo para la sección hero */}
        <ImageBackground
          source={{
            uri: "https://img.freepik.com/vector-premium/fondo-espacio-trabajo-oficina-cafe-tableta-cuadernos-papel_259139-73.jpg",
          }}
          style={styles.hero}
          resizeMode="cover"
        >
          <Text style={styles.title}>
            App definitiva para gestionar tus tareas
          </Text>
          <Text style={styles.subtitle}>
            Organiza tu trabajo y colabora en equipo de forma fácil y eficiente.
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate("Crear")}
          >
            <Text style={styles.ctaButtonText}>Empieza Ahora. ¡Es Gratis!</Text>
          </TouchableOpacity>
        </ImageBackground>

        {/* Sección de características */}
        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Características</Text>
          <View style={styles.featureList}>
            <View style={styles.feature}>
              <Text style={styles.featureTitle}>Gestión de Tareas</Text>
              <Text style={styles.featureDescription}>
                Crear, asignar y seguir el progreso de las tareas fácilmente.
              </Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureTitle}>Colaboración en Equipo</Text>
              <Text style={styles.featureDescription}>
                Invita a tus compañeros y trabaja en proyectos de manera
                conjunta.
              </Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureTitle}>Integraciones</Text>
              <Text style={styles.featureDescription}>
                Conéctate con otras herramientas que ya usas.
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 Tu Gestor de Tareas. Todos los derechos reservados.
          </Text>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f4f4f4",
  },
  hero: {
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginLeft: 13,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 20,
    color: "black",
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: "#ff4757",
    padding: 15,
    borderRadius: 18,
    marginTop: 20,
  },
  ctaButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  features: {
    padding: 40,
    alignItems: "center",
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  featureList: {
    flexDirection: "row",
    flexWrap: "wrap", // Permite que los elementos se ajusten a varias filas
    justifyContent: "space-around",
    width: "100%",
  },
  feature: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: width * 0.35, // Ajuste del ancho para que sea responsivo
    marginBottom: 20,
    alignItems: "center",
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  featureDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  footer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#333",
  },
  footerText: {
    color: "white",
  },
});
