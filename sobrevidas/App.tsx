import React from 'react';
import {AppProvider} from './src/contexts/AppContext';
import {UsuarioLogadoProvider} from './src/contexts/UsuarioLogadoContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'react-native-elements';
import AppNavigator from './src/routes/AppNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider useDark={true}>
        <AppProvider>
          <UsuarioLogadoProvider>{<AppNavigator />}</UsuarioLogadoProvider>
        </AppProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
