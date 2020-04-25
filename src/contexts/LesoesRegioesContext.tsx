import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { LesoesRegiaoInterface } from "../utils/models/LesoesRegiaoInterface";

interface LesoesRegiaoProps {
  lesoesRegioes: Array<LesoesRegiaoInterface>;
  setLesoesRegioes?: Dispatch<SetStateAction<{}>>;
}

const defaultLesoesRegiao = {
  lesoesRegioes: [],
};

const LesoesRegiaoContext = createContext<LesoesRegiaoProps>(
  defaultLesoesRegiao
);

export function LesoesRegiaoProvider({ children }) {
  const [lesoesRegioes, setLesoesRegioes] = useState();

  return (
    <LesoesRegiaoContext.Provider
      value={{
        lesoesRegioes,
        setLesoesRegioes,
      }}
    >
      {children}
    </LesoesRegiaoContext.Provider>
  );
}

export const LesoesRegiaoConsumer = LesoesRegiaoContext.Consumer;

export default LesoesRegiaoContext;
