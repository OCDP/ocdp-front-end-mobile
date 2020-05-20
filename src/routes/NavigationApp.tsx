import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import BemVindo from "../pages/BemVindo.page";
import LoginPage from "../pages/Login";
import HomeScreen from "../pages/Home.page";
import CadastrarPaciente from "../pages/CadastrarPaciente.page";
import SafeAreaLayout from "../components/SafeAreaLayout";
import Introducao from "../pages/Introducao.page";
import Historico from "../pages/Historico.page";
import PerfilUsuarioPage from "../pages/PerfilUsuario.page";
import { PacienteProvider } from "../contexts/PacienteContext";
import UsuarioLogadoContext, {
  UsuarioLogadoConsumer,
} from "../contexts/UsuarioLogadoContext";
import { FatoresProvider } from "../contexts/FatoresRiscoContext";
import { LocaisProvider } from "../contexts/LocaisContext";
import { PostFatoresProvider } from "../contexts/PostFatoresContext";
import { NovoAcompProvider } from "../contexts/NovoAcompContext";
import { LesoesRegiaoProvider } from "../contexts/LesoesRegioesContext";
import { IntervencaoProvider } from "../contexts/IntervencaoContext";
import { AtendimentoProvider } from "../contexts/AtendimentosContext";
import { BotaoProvider } from "../contexts/BotoesContext";
import CadastrarResultados from "../pages/CadastrarResultados";
import { View, StyleSheet } from "react-native";
import Logo from "../assets/vectors/Logo.jsx";
import { Button, Text } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppConsumer } from "../contexts/AppContext";
import LightTheme from "../themes/LightTheme";

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView>
      <View>
        <View
          style={{
            height: 150,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo size={150} />
        </View>
        <View style={styles.containerGeralMenu}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Introducao");
            }}
          >
            <View style={styles.containerItemMenu}>
              <View>
                <Text style={styles.textMenu}>Introducao</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          >
            <View style={styles.containerItemMenu}>
              <View>
                <Text style={styles.textMenu}>Home</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("CadastrarPaciente");
            }}
          >
            <View style={styles.containerItemMenu}>
              <View>
                <Text style={styles.textMenu}>Cadastro paciente</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.btnLogout}>
          <UsuarioLogadoConsumer>
            {({ logout }) => (
              <AppConsumer>
                {({ setTheme, defaultTheme }) => (
                  <Button
                    onPress={() => {
                      logout();
                      setTheme(defaultTheme);
                      props.navigation.navigate("Login");
                    }}
                  >
                    sair
                  </Button>
                )}
              </AppConsumer>
            )}
          </UsuarioLogadoConsumer>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  containerGeralMenu: { marginTop: 16 },
  containerItemMenu: {
    marginVertical: 4,
    marginHorizontal: 8,
    padding: 8,
    backgroundColor: "#0F729A",
    borderRadius: 8,
    height: 45,
    justifyContent: "center",
  },
  textMenu: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  btnLogout: {
    marginHorizontal: 32,
    marginTop: 32,
  },
});

const Drawer = createDrawerNavigator();
export const AppNavigator = () => (
  <NavigationContainer>
    <PacienteProvider>
      <FatoresProvider>
        <PostFatoresProvider>
          <LocaisProvider>
            <NovoAcompProvider>
              <IntervencaoProvider>
                <BotaoProvider>
                  <LesoesRegiaoProvider>
                    <AtendimentoProvider>
                      <SafeAreaLayout style={{ flex: 1 }} insets="top">
                        <Drawer.Navigator
                          edgeWidth={0}
                          initialRouteName="BemVindo"
                          drawerContent={CustomDrawerContent}
                        >
                          <Drawer.Screen
                            name="Introducao"
                            component={Introducao}
                          />
                          <Drawer.Screen name="Home" component={HomeScreen} />
                          <Drawer.Screen
                            name="CadastrarResultados"
                            component={CadastrarResultados}
                          />
                          <Drawer.Screen
                            name="CadastrarPaciente"
                            component={CadastrarPaciente}
                          />
                          <Drawer.Screen name="BemVindo" component={BemVindo} />
                          <Drawer.Screen name="Login" component={LoginPage} />
                          <Drawer.Screen
                            name="Historico"
                            component={Historico}
                          />
                          <Drawer.Screen
                            name="PerfilUsuario"
                            component={PerfilUsuarioPage}
                          />
                        </Drawer.Navigator>
                      </SafeAreaLayout>
                    </AtendimentoProvider>
                  </LesoesRegiaoProvider>
                </BotaoProvider>
              </IntervencaoProvider>
            </NovoAcompProvider>
          </LocaisProvider>
        </PostFatoresProvider>
      </FatoresProvider>
    </PacienteProvider>
  </NavigationContainer>
);
