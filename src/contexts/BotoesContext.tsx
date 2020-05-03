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
  auxBloqBotaoProximo: boolean;
  setAuxBloqBotaoProximo?: Dispatch<SetStateAction<boolean>>
  auxBloqBotaoProximo2: boolean;
  setAuxBloqBotaoProximo2?: Dispatch<SetStateAction<boolean>>
}

const defaultBotao = {
  bloqBotaoAnterior: true,
  bloqBotaoProximo: true,
  auxBloqBotaoProximo: true,
  auxBloqBotaoProximo2: true,
};

const BotaoContext = createContext<BotaoProps>(
  defaultBotao
);

export function BotaoProvider({ children }) {
  const [bloqBotaoAnterior, setBloqBotaoAnterior] = useState();
  const [bloqBotaoProximo, setBloqBotaoProximo] = useState();
  const [auxBloqBotaoProximo, setAuxBloqBotaoProximo] = useState()
  const [auxBloqBotaoProximo2, setAuxBloqBotaoProximo2] = useState()

  return (
    <BotaoContext.Provider
      value={{
        bloqBotaoAnterior,
        setBloqBotaoAnterior,
        bloqBotaoProximo,
        setBloqBotaoProximo,
        auxBloqBotaoProximo, 
        setAuxBloqBotaoProximo,
        auxBloqBotaoProximo2, 
        setAuxBloqBotaoProximo2
      }}
    >
      {children}
    </BotaoContext.Provider>
  );
}

export const BotaoConsumer = BotaoContext.Consumer;

export default BotaoContext;
