import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { AtendimentosInterface } from "../utils/models/AtendimentosInterface";

interface AtendimentosContextProps {
  atendimento: AtendimentosInterface;
  setAtendimento?: Dispatch<SetStateAction<AtendimentosInterface>>;
}

const defaultAtendimento = {
  atendimento: null,
};

const AtendimentoContext = createContext<AtendimentosContextProps>(
  defaultAtendimento
);

export function AtendimentoProvider({ children }) {
  const [atendimento, setAtendimento] = useState(null);

  return (
    <AtendimentoContext.Provider
      value={{
        atendimento,
        setAtendimento,
      }}
    >
      {children}
    </AtendimentoContext.Provider>
  );
}

export const AtendimentoConsumer = AtendimentoContext.Consumer;

export default AtendimentoContext;
