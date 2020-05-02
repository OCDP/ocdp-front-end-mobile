import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import BemVindo from "../pages/BemVindo.page";
import LoginPage from "../pages/Login";
import HomeScreen from "../pages/Home.page";
import { PacienteProvider } from "../contexts/PacienteContext";
import { UsuarioLogadoProvider } from "../contexts/UsuarioLogadoContext";
import CadastrarPaciente from "../pages/CadastrarPaciente.page";
import SafeAreaLayout from "../components/SafeAreaLayout";
import { FatoresProvider } from "../contexts/FatoresRiscoContext";
import { LocaisProvider } from "../contexts/LocaisContext";
import { PostFatoresProvider } from "../contexts/PostFatoresContext";
import { NovoAcompProvider } from "../contexts/NovoAcompContext";
import Introducao from "../pages/Introducao";
import { LesoesRegiaoProvider } from "../contexts/LesoesRegioesContext";
import { IntervencaoProvider } from "../contexts/IntervencaoContext";
import { BotaoProvider } from "../contexts/BotoesContext";

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <PacienteProvider>
      <UsuarioLogadoProvider>
        <FatoresProvider>
          <PostFatoresProvider>
            <LocaisProvider>
              <NovoAcompProvider>
                <IntervencaoProvider>
                  <BotaoProvider>

                    <LesoesRegiaoProvider>
                      <SafeAreaLayout style={{ flex: 1 }} insets="top">
                        <Drawer.Navigator
                          initialRouteName="BemVindo"
                          drawerContent={(props) => CustomDrawerContent(props)}
                        >
                          <Drawer.Screen name="BemVindo" component={BemVindo} />
                          <Drawer.Screen name="Login" component={LoginPage} />
                          <Drawer.Screen name="Introducao" component={Introducao} />
                          <Drawer.Screen name="Home" component={HomeScreen} />
                          <Drawer.Screen
                            name="CadastrarPaciente"
                            component={CadastrarPaciente}
                          />
                        </Drawer.Navigator>
                      </SafeAreaLayout>
                    </LesoesRegiaoProvider>
                  </BotaoProvider>
                </IntervencaoProvider>
              </NovoAcompProvider>
            </LocaisProvider>
          </PostFatoresProvider>
        </FatoresProvider>
      </UsuarioLogadoProvider>
    </PacienteProvider>
  </NavigationContainer>
);
