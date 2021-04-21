import React from 'react';

export const CustomThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});
