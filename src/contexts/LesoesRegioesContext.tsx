import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { LesoesRegiaoInterface } from "../utils/models/LesoesRegiaoInterface";

interface LesoesRegiaoProps {
  lesoesRegioes: Array<LesoesRegiaoInterface>;
  setLesoesRegioes?: Dispatch<SetStateAction<{}>>;
  flush?: () => void;
}

const defaultLesoesRegiao = {
  lesoesRegioes: [],
};

const LesoesRegiaoContext = createContext<LesoesRegiaoProps>(
  defaultLesoesRegiao
);

export function LesoesRegiaoProvider({ children }) {
  const [lesoesRegioes, setLesoesRegioes] = useState();

  const flush = () => {
    setLesoesRegioes(defaultLesoesRegiao.lesoesRegioes);
  };

  return (
    <LesoesRegiaoContext.Provider
      value={{
        lesoesRegioes,
        setLesoesRegioes,
        flush
      }}
    >
      {children}
    </LesoesRegiaoContext.Provider>
  );
}

export const useFlushLesoesRegioes = () => {
  const { flush } = useContext(LesoesRegiaoContext);
  return flush;
};

export const LesoesRegiaoConsumer = LesoesRegiaoContext.Consumer;

export default LesoesRegiaoContext;
