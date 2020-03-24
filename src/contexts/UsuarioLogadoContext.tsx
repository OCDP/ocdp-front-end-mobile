import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction
} from "react";
import { usuarioInterface } from "../utils/models/usuarioInterface";

interface UsuarioLogadoContextProps {
  usuarioLogado: any;
  setUsuarioLogado?: Dispatch<SetStateAction<[]>>;
}

const defaultUsuarioLogado = {
  usuarioLogado: []
};

const UsuarioLogadoContext = createContext<UsuarioLogadoContextProps>(
  defaultUsuarioLogado
);

export function UsuarioLogadoProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState([]);

  return (
    <UsuarioLogadoContext.Provider
      value={{
        usuarioLogado,
        setUsuarioLogado
      }}
    >
      {children}
    </UsuarioLogadoContext.Provider>
  );
}

export const UsuarioLogadoConsumer = UsuarioLogadoContext.Consumer;

export default UsuarioLogadoContext;
