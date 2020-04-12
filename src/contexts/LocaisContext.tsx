import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction
  } from "react";
import { NomesLocaisInterfaces } from "../utils/models/NomesLocaisInterface";
import { TiposLocaisInterfaces } from "../utils/models/TiposLocaisInterface";
  
  interface LocaisContextProps {
    nomesLocais: Array<NomesLocaisInterfaces>;
    setNomesLocais?: Dispatch<SetStateAction<{}>>;
    tiposLocais: Array<TiposLocaisInterfaces>;
    setTiposLocais?: Dispatch<SetStateAction<{}>>;
  }
  
  
  const defaultLocais = {
    nomesLocais: [],
    tiposLocais: []
  };
  
  
  const LocaisContext = createContext<LocaisContextProps>(defaultLocais);
  
  export function LocaisProvider({ children }) {
    const [nomesLocais, setNomesLocais] = useState();
    const [tiposLocais, setTiposLocais] = useState();

  
    return (
      <LocaisContext.Provider
        value={{
          nomesLocais,
          setNomesLocais,
          tiposLocais,
          setTiposLocais
        }}
      >
        {children}
      </LocaisContext.Provider>
    );
  }
  
  export const LocaisConsumer = LocaisContext.Consumer;
  
  export default LocaisContext;
  