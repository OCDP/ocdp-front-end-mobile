import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction
} from "react";

interface ProcedimentoInterface{
    nome: string;
    observacao: string;
}

interface IntervencaoContextProps {
    confirmaRastreamento: boolean;
    setConfirmaRastreamento?: Dispatch<SetStateAction<boolean>>;
    hipoteseDiagnostico: string;
    setHipoteseDiagnostico?: Dispatch<SetStateAction<string>>;
    observacao: string;
    setObservacao?: Dispatch<SetStateAction<string>>;
    procedimento: Array<ProcedimentoInterface>
    setProcedimento?: Dispatch<SetStateAction<[]>>;
  }

  
  const defaultIntervencao = {
    confirmaRastreamento: null,
    hipoteseDiagnostico: null,
    observacao: null,
    procedimento: []
  };
  
  
  const IntervencaoContext = createContext<IntervencaoContextProps>(defaultIntervencao);
  
  export function IntervencaoProvider({ children }) {
    const [confirmaRastreamento,setConfirmaRastreamento ] = useState<boolean>();
    const [hipoteseDiagnostico, setHipoteseDiagnostico] = useState<string>();
    const [observacao, setObservacao] = useState<string>();
    const [procedimento, setProcedimento] = useState<any>()
    
  
    return (
      <IntervencaoContext.Provider
        value={{
          confirmaRastreamento,
          setConfirmaRastreamento,
          hipoteseDiagnostico, 
          setHipoteseDiagnostico,
          observacao, 
          setObservacao,
          procedimento, 
          setProcedimento
        }}
      >
        {children}
      </IntervencaoContext.Provider>
    );
  }
  
  export const IntervencaoConsumer = IntervencaoContext.Consumer;
  
  export default IntervencaoContext;
  