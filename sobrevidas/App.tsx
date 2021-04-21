import React from 'react';
import {AppProvider} from './src/contexts/AppContext';
import {UsuarioLogadoProvider} from './src/contexts/UsuarioLogadoContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppRouter from './src/routes/AppRouter';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import customColors from './src/themes/customColors.json';
import mapping from './src/themes/mapping.json';

import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {CustomThemeContext} from './src/contexts/CustomThemeContext';

const App = () => {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <CustomThemeContext.Provider value={{theme, toggleTheme}}>
      <ApplicationProvider
        customMapping={{...mapping}}
        {...eva}
        theme={{...eva[theme], ...customColors}}>
        <IconRegistry icons={EvaIconsPack} />
        <SafeAreaProvider>
          <AppProvider>
            <UsuarioLogadoProvider>
              <AppRouter />
            </UsuarioLogadoProvider>
          </AppProvider>
        </SafeAreaProvider>
      </ApplicationProvider>
    </CustomThemeContext.Provider>
  );
};

export default App;
