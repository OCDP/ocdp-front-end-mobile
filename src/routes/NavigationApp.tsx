import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from "@react-navigation/drawer";
import HomeScreen from "../pages/Home.page";
import { PacienteProvider } from "../contexts/PacienteContext";
import CadastrarPaciente from "../pages/CadastrarPaciente.page";
import SafeAreaLayout from "../components/SafeAreaLayout";
import LoginPage from "../pages/Login.page";

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
      <SafeAreaLayout style={{ flex: 1 }} insets="top">
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={props => CustomDrawerContent(props)}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="CadastrarPaciente" component={CadastrarPaciente} />
          <Drawer.Screen name="Login" component={LoginPage} />
        </Drawer.Navigator>
      </SafeAreaLayout>
    </PacienteProvider>
  </NavigationContainer>
);
