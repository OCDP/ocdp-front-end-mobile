import React from 'react';
import {AppProvider} from './src/contexts/AppContext';
import {
  UsuarioLogadoConsumer,
  UsuarioLogadoProvider,
} from './src/contexts/UsuarioLogadoContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppRouter from './src/routes/AppRouter';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';

import mapping from './src/themes/mapping.json';

import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {CustomThemeContext} from './src/contexts/CustomThemeContext';

const App = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <UsuarioLogadoProvider>
      <UsuarioLogadoConsumer>
        {({themeColors, usuarioLogado}) => (
          <CustomThemeContext.Provider value={{theme, toggleTheme}}>
            <ApplicationProvider
              customMapping={{...mapping} as any}
              {...eva}
              theme={{
                ...eva[usuarioLogado.id ? theme : 'light'],
                ...themeColors,
              }}>
              <IconRegistry icons={EvaIconsPack} />
              <SafeAreaProvider>
                <AppProvider>
                  <AppRouter />
                </AppProvider>
              </SafeAreaProvider>
            </ApplicationProvider>
          </CustomThemeContext.Provider>
        )}
      </UsuarioLogadoConsumer>
    </UsuarioLogadoProvider>
  );
};

export default App;
