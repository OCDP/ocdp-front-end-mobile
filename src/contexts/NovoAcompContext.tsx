import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction
  } from "react";
  
  interface NovoAcompContextProps {
    idNovoAcomp: number;
    setIdNovoAcomp?: Dispatch<SetStateAction<number>>;
  }
  
  
  const defaultLocais = {
    idNovoAcomp: null,
  };
  
  
  const NovoAcompContext = createContext<NovoAcompContextProps>(defaultLocais);
  
  export function NovoAcompProvider({ children }) {
    const [idNovoAcomp, setIdNovoAcomp] = useState();

    
  
    return (
      <NovoAcompContext.Provider
        value={{
          idNovoAcomp,
          setIdNovoAcomp,
        }}
      >
        {children}
      </NovoAcompContext.Provider>
    );
  }
  
  export const NovoAcompConsumer = NovoAcompContext.Consumer;
  
  export default NovoAcompContext;
  