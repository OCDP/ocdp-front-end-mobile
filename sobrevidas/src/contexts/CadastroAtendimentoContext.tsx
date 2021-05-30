import React, {createContext, useState} from 'react';

const CadastroAtendimentoContext = createContext(
  {} as Contexts.CadastroAtendimentoContext,
);

export const CadastroAtendimentoProvider: React.FC = ({children}: any) => {
  const [atendimento, setAtendimento] = useState<Models.Atendimento>({
    fatoresDeRisco: [],
    atendimento: {} as Models.AtendimentoObj,
    dataSugeridaAcompanhamento: '',
    regioesLesoes: [],
    dataSugeridaTratamento: '',
  });

  return (
    <CadastroAtendimentoContext.Provider
      value={{
        atendimento,
        setAtendimento,
      }}>
      {children}
    </CadastroAtendimentoContext.Provider>
  );
};

export const CadastroAtendimentoConsumer = CadastroAtendimentoContext.Consumer;

export default CadastroAtendimentoContext;
