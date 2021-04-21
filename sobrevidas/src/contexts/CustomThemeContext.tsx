import {ThemeType} from '@ui-kitten/components';
import React, {createContext, useState} from 'react';
import {theme1} from '../themes/theme1';
import {theme2} from '../themes/theme2';

export type ThemeName = 'theme1' | 'theme2';

export interface AppTheme {
  vars: ThemeType;
  name: ThemeName;
}

const defaultTheme: AppTheme = {
  name: 'theme1',
  vars: theme1,
};

interface CustomThemeContext {
  theme: AppTheme;
  switchTheme: (newTheme: ThemeName) => void;
}

const CustomThemeContext = createContext({} as CustomThemeContext);

export const CustomThemeProvider: React.FC = ({children}) => {
  const [theme, setTheme] = useState<AppTheme>(defaultTheme);

  function switchTheme(name: ThemeName) {
    const themes = {
      theme1: theme1,
      theme2: theme2,
    } as any;
    let vars = themes[name];
    if (!vars) {
      setTheme(defaultTheme);
    } else {
      setTheme({vars, name});
    }
  }

  return (
    <CustomThemeContext.Provider
      value={{
        theme,
        switchTheme,
      }}>
      {children}
    </CustomThemeContext.Provider>
  );
};

export const CustomThemeConsumer = CustomThemeContext.Consumer;

export default CustomThemeContext;
