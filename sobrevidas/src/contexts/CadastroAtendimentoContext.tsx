import React, {createContext, useState} from 'react';

const CadastroAtendimentoContext = createContext(
  {} as Contexts.CadastroAtendimentoContext,
);

export const CadastroAtendimentoProvider: React.FC = ({children}: any) => {
  const [atendimento, setAtendimento] = useState<Models.Atendimento>(
    {} as Models.Atendimento,
  );

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

export const CadastroAcompanhamentoConsumer =
  CadastroAtendimentoContext.Consumer;

export default CadastroAtendimentoContext;
