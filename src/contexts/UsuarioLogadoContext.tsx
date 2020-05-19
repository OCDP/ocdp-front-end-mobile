import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { UsuarioInterface } from "../utils/models/UsuarioInterface";

interface UsuarioLogadoContextProps {
  usuarioLogado: UsuarioInterface;
  setUsuarioLogado?: Dispatch<SetStateAction<UsuarioInterface>>;
  logout: () => void;
}

const defaultUsuarioLogado = {
  usuarioLogado: null,
  logout: () => {},
};

const UsuarioLogadoContext = createContext<UsuarioLogadoContextProps>(
  defaultUsuarioLogado
);

export function UsuarioLogadoProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const logout = () => {
    setUsuarioLogado({} as UsuarioInterface);
  };

  return (
    <UsuarioLogadoContext.Provider
      value={{
        usuarioLogado,
        setUsuarioLogado,
        logout,
      }}
    >
      {children}
    </UsuarioLogadoContext.Provider>
  );
}

export const UsuarioLogadoConsumer = UsuarioLogadoContext.Consumer;

export default UsuarioLogadoContext;
