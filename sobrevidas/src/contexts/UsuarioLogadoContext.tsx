import React, {createContext, useCallback, useState} from 'react';

const UsuarioLogadoContext = createContext({} as Contexts.UsuarioLogadoContext);

export const UsuarioLogadoProvider: React.FC = ({children}) => {
  const [usuarioLogado, setUsuarioLogado] = useState<Models.Usuario>(
    {} as Models.Usuario,
  );

  const [userTest, setUserTest] = useState<Models.Login>({} as Models.Login);

  const logout = useCallback(() => {
    setUsuarioLogado({} as Models.Usuario);
  }, []);

  return (
    <UsuarioLogadoContext.Provider
      value={{
        usuarioLogado,
        setUsuarioLogado,
        logout,
        userTest,
        setUserTest,
      }}>
      {children}
    </UsuarioLogadoContext.Provider>
  );
};

export const AppConsumer = UsuarioLogadoContext.Consumer;

export default UsuarioLogadoContext;
