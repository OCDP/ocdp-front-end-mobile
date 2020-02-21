import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext
} from "react";

export interface Paciente {
  nome: string;
  dtNasci: Date;
  sexo: string;
  email: string;
  telCell: string;
  telResp: string;
  nmMae: string;
  cidade: string;
  bairro: string;
}

interface PacienteContextProps {
  nome: string;
  setNome?: Dispatch<SetStateAction<string>>;
  dtNasci: Date;
  setDtNasci?: Dispatch<SetStateAction<Date>>;
  sexo: string;
  setSexo?: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail?: Dispatch<SetStateAction<string>>;
  telCell: string;
  setTelCell?: Dispatch<SetStateAction<string>>;
  telResp: string;
  setTelResp?: Dispatch<SetStateAction<string>>;
  nmMae: string;
  setNmMae?: Dispatch<SetStateAction<string>>;
  cidade: string;
  setCidade?: Dispatch<SetStateAction<string>>;
  bairro: string;
  setBairro?: Dispatch<SetStateAction<string>>;
  flush?: () => void;
}

const defaultPaciente: Paciente = {
  nome: null,
  dtNasci: null,
  sexo: null,
  email: null,
  telCell: null,
  telResp: null,
  nmMae: null,
  cidade: null,
  bairro: null
};

const PacienteContext = createContext<PacienteContextProps>(defaultPaciente);

export function PacienteProvider({ children }) {
  const [nome, setNome] = useState<string>(null);
  const [dtNasci, setDtNasci] = useState<Date>(null);
  const [sexo, setSexo] = useState<string>(null);
  const [email, setEmail] = useState<string>(null);
  const [telCell, setTelCell] = useState<string>(null);
  const [telResp, setTelResp] = useState<string>(null);
  const [nmMae, setNmMae] = useState<string>(null);
  const [cidade, setCidade] = useState<string>(null);
  const [bairro, setBairro] = useState<string>(null);

  const flush = () => {
    setNome(defaultPaciente.nome);
    setDtNasci(defaultPaciente.dtNasci);
    setSexo(defaultPaciente.sexo);
    setEmail(defaultPaciente.email);
    setTelCell(defaultPaciente.telCell);
    setTelResp(defaultPaciente.telCell);
    setNmMae(defaultPaciente.nmMae);
    setCidade(defaultPaciente.cidade);
    setBairro(defaultPaciente.bairro);
  };

  return (
    <PacienteContext.Provider
      value={{
        nome,
        setNome,
        dtNasci,
        setDtNasci,
        sexo,
        setSexo,
        email,
        setEmail,
        telCell,
        setTelCell,
        telResp,
        setTelResp,
        nmMae,
        setNmMae,
        cidade,
        setCidade,
        bairro,
        setBairro,
        flush
      }}
    >
      {children}
    </PacienteContext.Provider>
  );
}

export function usePaciente(): Paciente {
  const {
    nome,
    dtNasci,
    sexo,
    email,
    telCell,
    telResp,
    nmMae,
    cidade,
    bairro
  } = useContext(PacienteContext);
  return {
    nome,
    dtNasci,
    sexo,
    email,
    telCell,
    telResp,
    nmMae,
    cidade,
    bairro
  };
}

export const PacienteConsumer = PacienteContext.Consumer;

export const useFlushPaciente = () => {
  const { flush } = useContext(PacienteContext);
  return flush;
};

export default PacienteContext;
