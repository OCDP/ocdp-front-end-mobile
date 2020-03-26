import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction
} from "react";
import { fatoresInterface } from "../utils/models/FatoresInterface";

interface FatoresContextProps {
  fatores: Array<fatoresInterface>;
  setFatores?: Dispatch<SetStateAction<[]>>;
}


const defaultFatores = {
  fatores: []
};


const FatoresContext = createContext<FatoresContextProps>(defaultFatores);

export function FatoresProvider({ children }) {
  const [fatores, setFatores] = useState();

  return (
    <FatoresContext.Provider
      value={{
        fatores,
        setFatores
      }}
    >
      {children}
    </FatoresContext.Provider>
  );
}

export const FatoresConsumer = FatoresContext.Consumer;

export default FatoresContext;
