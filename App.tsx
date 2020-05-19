import React, { useContext } from "react";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { mapping } from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "./src/routes/NavigationApp";
import { AppProvider, AppConsumer } from "./src/contexts/AppContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { UsuarioLogadoProvider } from "./src/contexts/UsuarioLogadoContext";

const App = () => {
  return (
    <AppProvider>
      <IconRegistry icons={EvaIconsPack} />
      <AppConsumer>
        {({ theme }) => (
          <ApplicationProvider mapping={mapping} theme={theme.vars}>
            <UsuarioLogadoProvider>
              <SafeAreaProvider>
                <StatusBar barStyle="light-content" />
                <AppNavigator />
              </SafeAreaProvider>
            </UsuarioLogadoProvider>
          </ApplicationProvider>
        )}
      </AppConsumer>
    </AppProvider>
  );
};

export default App;
