import React from 'react';
import {AppProvider} from './src/contexts/AppContext';
import {UsuarioLogadoProvider} from './src/contexts/UsuarioLogadoContext';
import AppNavigator from './src/routes/AppNavigator';

const App = () => {
  return (
    <AppProvider>
      <UsuarioLogadoProvider>{<AppNavigator />}</UsuarioLogadoProvider>
    </AppProvider>
  );
};

export default App;
