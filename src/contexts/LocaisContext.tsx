import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction
  } from "react";
  import { locaisInterface } from "../utils/models/locaisInterface";
  
  interface LocaisContextProps {
    locais: Array<locaisInterface>;
    setLocais?: Dispatch<SetStateAction<[]>>;
  }
  
  
  const defaultLocais = {
    locais: []
  };
  
  
  const LocaisContext = createContext<LocaisContextProps>(defaultLocais);
  
  export function LocaisProvider({ children }) {
    const [locais, setLocais] = useState();
  
    return (
      <LocaisContext.Provider
        value={{
          locais,
          setLocais
        }}
      >
        {children}
      </LocaisContext.Provider>
    );
  }
  
  export const LocaisConsumer = LocaisContext.Consumer;
  
  export default LocaisContext;
  