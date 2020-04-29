import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction
  } from "react";
  
  interface NovoAcompContextProps {
    idNovoAcomp: number;
    setIdNovoAcomp?: Dispatch<SetStateAction<any>>;
  }
  
  
  const defaultNovoAcomp = {
    idNovoAcomp: undefined,
  };
  
  
  const NovoAcompContext = createContext<NovoAcompContextProps>(defaultNovoAcomp);
  
  export function NovoAcompProvider({ children }) {
    const [idNovoAcomp, setIdNovoAcomp] = useState<number>();

    
  
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
  