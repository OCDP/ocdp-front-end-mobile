import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { HistoricoInterface } from "../utils/models/HistoricoInterface";
import { FatoresInterface } from "../utils/models/FatoresInterface";

export interface Paciente {
  historico: Array<HistoricoInterface>;
  listaFatores: Array<FatoresInterface>;
  nome: string;
  cpf: string;
  dtNasci: Date;
  sexo: string;
  email: string;
  telCell: string;
  endereco: string;
  telResp: string;
  nmMae: string;
  cidade: string;
  bairro: BairroInterFace;
  acomp: boolean;
}

interface PacienteContextProps {
  historico: Array<HistoricoInterface>;
  setHistorico?: Dispatch<SetStateAction<[]>>;
  listaFatores: Array<FatoresInterface>;
  setListaFatores?: Dispatch<SetStateAction<[]>>;
  nome: string;
  setNome?: Dispatch<SetStateAction<string>>;
  cpf: string;
  setCpf?: Dispatch<SetStateAction<string>>;
  dtNasci: Date;
  setDtNasci?: Dispatch<SetStateAction<Date>>;
  sexo: string;
  setSexo?: Dispatch<SetStateAction<string>>;
  endereco: string;
  setEndereco?: Dispatch<SetStateAction<string>>;
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
  bairro: BairroInterFace;
  setBairro?: Dispatch<SetStateAction<BairroInterFace>>;
  acomp: boolean;
  setAcomp?: Dispatch<SetStateAction<boolean>>;
  flush?: () => void;
}

interface BairroInterFace{
  id: string;
  nome: string;
}

const defaultPaciente: Paciente = {
  historico: [],
  listaFatores: [],
  nome: null,
  cpf: null,
  dtNasci: null,
  sexo: null,
  email: null,
  endereco: null,
  telCell: null,
  telResp: null,
  nmMae: null,
  cidade: null,
  bairro: {id: null, nome: null},
  acomp: false,
};

const PacienteContext = createContext<PacienteContextProps>(defaultPaciente);

export function PacienteProvider({ children }) {
  const [historico, setHistorico] = useState([]);
  const [listaFatores, setListaFatores] = useState([]);
  const [nome, setNome] = useState<string>(null);
  const [cpf, setCpf] = useState<string>(null);
  const [dtNasci, setDtNasci] = useState<Date>(null);
  const [sexo, setSexo] = useState<string>(null);
  const [email, setEmail] = useState<string>(null);
  const [endereco, setEndereco] = useState<string>(null);
  const [telCell, setTelCell] = useState<string>(null);
  const [telResp, setTelResp] = useState<string>(null);
  const [nmMae, setNmMae] = useState<string>(null);
  const [cidade, setCidade] = useState<string>(null);
  const [bairro, setBairro] = useState<BairroInterFace>({id:null, nome:null});
  const [acomp, setAcomp] = useState<boolean>(false);

  const flush = () => {
    setNome(defaultPaciente.nome);
    setDtNasci(defaultPaciente.dtNasci);
    setSexo(defaultPaciente.sexo);
    setEmail(defaultPaciente.email);
    setEndereco(defaultPaciente.endereco);
    setTelCell(defaultPaciente.telCell);
    setTelResp(defaultPaciente.telCell);
    setNmMae(defaultPaciente.nmMae);
    setCidade(defaultPaciente.cidade);
    setBairro(defaultPaciente.bairro);
  };

  return (
    <PacienteContext.Provider
      value={{
        historico,
        setHistorico,
        listaFatores,
        setListaFatores,
        endereco,
        setEndereco,
        nome,
        setNome,
        cpf,
        setCpf,
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
        acomp,
        setAcomp,
        flush,
      }}
    >
      {children}
    </PacienteContext.Provider>
  );
}

export function usePaciente(): Paciente {
  const {
    historico,
    listaFatores,
    nome,
    cpf,
    dtNasci,
    sexo,
    endereco,
    email,
    telCell,
    telResp,
    nmMae,
    cidade,
    bairro,
    acomp,
  } = useContext(PacienteContext);
  return {
    historico,
    listaFatores,
    nome,
    cpf,
    dtNasci,
    sexo,
    endereco,
    email,
    telCell,
    telResp,
    nmMae,
    cidade,
    bairro,
    acomp,
  };
}

export const PacienteConsumer = PacienteContext.Consumer;

export const useFlushPaciente = () => {
  const { flush } = useContext(PacienteContext);
  return flush;
};

export default PacienteContext;
