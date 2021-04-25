import React, {createContext, useCallback, useState} from 'react';
import primariaColors from '../themes/primariaColors.json';

const UsuarioLogadoContext = createContext({} as Contexts.UsuarioLogadoContext);

export const UsuarioLogadoProvider: React.FC = ({children}: any) => {
  const [usuarioLogado, setUsuarioLogado] = useState<Models.Usuario>(
    {} as Models.Usuario,
  );
  const [themeColors, setThemeColors] = useState(primariaColors);

  const logout = useCallback((navigation: any) => {
    setUsuarioLogado({} as Models.Usuario);
    navigation.push('BemVindoPage');
    setThemeColors(primariaColors);
  }, []);

  return (
    <UsuarioLogadoContext.Provider
      value={{
        usuarioLogado,
        setUsuarioLogado,
        logout,
        themeColors,
        setThemeColors,
      }}>
      {children}
    </UsuarioLogadoContext.Provider>
  );
};

export const UsuarioLogadoConsumer = UsuarioLogadoContext.Consumer;

export default UsuarioLogadoContext;
