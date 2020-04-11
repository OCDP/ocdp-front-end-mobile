import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { usuarioInterface } from "../utils/models/usuarioInterface";

interface UsuarioLogadoContextProps {
  usuarioLogado: usuarioInterface;
  setUsuarioLogado?: Dispatch<SetStateAction<usuarioInterface>>;
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
