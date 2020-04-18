import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction
  } from "react";
import { NomesLocaisInterfaces } from "../utils/models/NomesLocaisInterface";
import { TiposLocaisInterfaces } from "../utils/models/TiposLocaisInterface";
  
  interface LocaisContextProps {
    nomesLocaisAtendido: Array<NomesLocaisInterfaces>;
    setNomesLocaisAtendido?: Dispatch<SetStateAction<{}>>;
    tiposLocaisAtendido: Array<TiposLocaisInterfaces>;
    setTiposLocaisAtendido?: Dispatch<SetStateAction<{}>>;
    nomesLocaisEncaminhado: Array<NomesLocaisInterfaces>;
    setNomesLocaisEncaminhado?: Dispatch<SetStateAction<{}>>;
    tiposLocaisEncaminhado: Array<TiposLocaisInterfaces>;
    setTiposLocaisEncaminhado?: Dispatch<SetStateAction<{}>>;
  }
  
  
  const defaultLocais = {
    nomesLocaisAtendido: [],
    tiposLocaisAtendido: [],
    nomesLocaisEncaminhado: [],
    tiposLocaisEncaminhado: []
  };
  
  
  const LocaisContext = createContext<LocaisContextProps>(defaultLocais);
  
  export function LocaisProvider({ children }) {
    const [nomesLocaisAtendido, setNomesLocaisAtendido] = useState();
    const [tiposLocaisAtendido, setTiposLocaisAtendido] = useState();
    const [nomesLocaisEncaminhado, setNomesLocaisEncaminhado] = useState();
    const [tiposLocaisEncaminhado, setTiposLocaisEncaminhado] = useState();

  
    return (
      <LocaisContext.Provider
        value={{
          nomesLocaisAtendido,
          setNomesLocaisAtendido,
          tiposLocaisAtendido,
          setTiposLocaisAtendido,
          nomesLocaisEncaminhado,
          setNomesLocaisEncaminhado,
          tiposLocaisEncaminhado,
          setTiposLocaisEncaminhado
        }}
      >
        {children}
      </LocaisContext.Provider>
    );
  }
  
  export const LocaisConsumer = LocaisContext.Consumer;
  
  export default LocaisContext;
  