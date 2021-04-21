import React from 'react';
import {AppProvider} from './src/contexts/AppContext';
import {UsuarioLogadoProvider} from './src/contexts/UsuarioLogadoContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppRouter from './src/routes/AppRouter';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {
  CustomThemeProvider,
  CustomThemeConsumer,
} from './src/contexts/CustomThemeContext';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

const App = () => {
  return (
    <CustomThemeProvider>
      <IconRegistry icons={EvaIconsPack} />
      <CustomThemeConsumer>
        {({theme}) => (
          <ApplicationProvider mapping={eva.mapping} theme={theme.vars}>
            <SafeAreaProvider>
              <ApplicationProvider {...eva} theme={eva.dark}>
                <AppProvider>
                  <UsuarioLogadoProvider>
                    <AppRouter />
                  </UsuarioLogadoProvider>
                </AppProvider>
              </ApplicationProvider>
            </SafeAreaProvider>
          </ApplicationProvider>
        )}
      </CustomThemeConsumer>
    </CustomThemeProvider>
  );
};

export default App;
