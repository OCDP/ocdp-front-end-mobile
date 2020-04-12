import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction
  } from "react";
import { nomesLocaisInterfaces } from "../utils/models/nomesLocaisInterface";
import { tiposLocaisInterfaces } from "../utils/models/tiposLocaisInterface";
  
  interface LocaisContextProps {
    nomesLocais: Array<nomesLocaisInterfaces>;
    setNomesLocais?: Dispatch<SetStateAction<[]>>;
    tiposLocais: Array<tiposLocaisInterfaces>;
    setTiposLocais?: Dispatch<SetStateAction<[]>>;
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
  