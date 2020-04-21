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
    dataSugeridaAcompanhamento: string,
    setDataSugeridaAcompanhamento?: Dispatch<SetStateAction<string>>;
    dataSugeridaTratamento: string,
    setDataSugeridaTratamento?: Dispatch<SetStateAction<string>>;
  }
  
  
  const defaultLocais = {
    nomesLocaisAtendido: [],
    tiposLocaisAtendido: [],
    nomesLocaisEncaminhado: [],
    tiposLocaisEncaminhado: [],
    dataSugeridaAcompanhamento: null,
    dataSugeridaTratamento: null,
  };
  
  
  const LocaisContext = createContext<LocaisContextProps>(defaultLocais);
  
  export function LocaisProvider({ children }) {
    const [nomesLocaisAtendido, setNomesLocaisAtendido] = useState();
    const [tiposLocaisAtendido, setTiposLocaisAtendido] = useState();
    const [nomesLocaisEncaminhado, setNomesLocaisEncaminhado] = useState();
    const [tiposLocaisEncaminhado, setTiposLocaisEncaminhado] = useState();
    const [dataSugeridaAcompanhamento, setDataSugeridaAcompanhamento] = useState();
    const [dataSugeridaTratamento, setDataSugeridaTratamento] = useState();

    
  
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
          setTiposLocaisEncaminhado,
          dataSugeridaAcompanhamento,
          setDataSugeridaAcompanhamento,
          dataSugeridaTratamento,
          setDataSugeridaTratamento
        }}
      >
        {children}
      </LocaisContext.Provider>
    );
  }
  
  export const LocaisConsumer = LocaisContext.Consumer;
  
  export default LocaisContext;
  