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
}

const defaultUsuarioLogado = {
  usuarioLogado: null,
};

const UsuarioLogadoContext = createContext<UsuarioLogadoContextProps>(
  defaultUsuarioLogado
);

export function UsuarioLogadoProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  return (
    <UsuarioLogadoContext.Provider
      value={{
        usuarioLogado,
        setUsuarioLogado,
      }}
    >
      {children}
    </UsuarioLogadoContext.Provider>
  );
}

export const UsuarioLogadoConsumer = UsuarioLogadoContext.Consumer;

export default UsuarioLogadoContext;
