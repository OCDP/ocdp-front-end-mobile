import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface BotaoProps {
  bloqBotaoAnterior: boolean
  setBloqBotaoAnterior?: Dispatch<SetStateAction<boolean>>;
  bloqBotaoProximo: boolean
  setBloqBotaoProximo?: Dispatch<SetStateAction<boolean>>;
}

const defaultBotao = {
  bloqBotaoAnterior: true,
  bloqBotaoProximo: true,
};

const BotaoContext = createContext<BotaoProps>(
  defaultBotao
);

export function BotaoProvider({ children }) {
  const [bloqBotaoAnterior, setBloqBotaoAnterior] = useState();
  const [bloqBotaoProximo, setBloqBotaoProximo] = useState();

  return (
    <BotaoContext.Provider
      value={{
        bloqBotaoAnterior,
        setBloqBotaoAnterior,
        bloqBotaoProximo,
        setBloqBotaoProximo,
      }}
    >
      {children}
    </BotaoContext.Provider>
  );
}

export const BotaoConsumer = BotaoContext.Consumer;

export default BotaoContext;
