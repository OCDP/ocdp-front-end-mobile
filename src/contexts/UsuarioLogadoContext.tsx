import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction
} from "react";

export interface UsuarioLogado {
  id: string;
  cpf: string;
  nome: string;
  senha: string;
  status: string;
  email: string;
  telefone?: any;
  tipoAtencao?: any;
  tipoUsuario?: any;
  localAtendimento?: any;
}

interface UsuarioLogadoContextProps {
  id: string;
  setId?: Dispatch<SetStateAction<string>>;
  cpf: string;
  setCpf?: Dispatch<SetStateAction<string>>;
  nome: string;
  setNome?: Dispatch<SetStateAction<string>>;
  senha: string;
  setSenha?: Dispatch<SetStateAction<string>>;
  status: string;
  setStatus?: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail?: Dispatch<SetStateAction<string>>;
  telefone?: string;
  setTelefone?: Dispatch<SetStateAction<string>>;
  tipoAtencao?: string;
  setTipoAtencao?: Dispatch<SetStateAction<string>>;
  tipoUsuario?: string;
  setTipoUsuario?: Dispatch<SetStateAction<string>>;
  localAtendimento?: string;
  setLocalAtendimento?: Dispatch<SetStateAction<string>>;
}

const defaultUsuarioLogado: UsuarioLogado = {
  id: null,
  cpf: null,
  nome: null,
  senha: null,
  status: null,
  email: null,
  telefone: null,
  tipoAtencao: null,
  tipoUsuario: null,
  localAtendimento: null,
};

const UsuarioLogadoContext = createContext<UsuarioLogadoContextProps>(defaultUsuarioLogado);

export function UsuarioLogadoProvider({ children }) {
  const [id, setId] = useState<string>(null);
  const [cpf, setCpf] = useState<string>(null);
  const [nome, setNome] = useState<string>(null);
  const [senha, setSenha] = useState<string>(null);
  const [status, setStatus] = useState<string>(null);
  const [email, setEmail] = useState<string>(null);
  const [tipoAtencao, setTipoAtencao] = useState<string>(null);
  const [tipoUsuario, setTipoUsuario] = useState<string>(null);
  const [localAtendimento, setLocalAtendimento] = useState<string>(null);

  return (
    <UsuarioLogadoContext.Provider
      value={{
        id,
        setId,
        cpf,
        setCpf,
        nome,
        setNome,
        senha,
        setSenha,
        status,
        setStatus,
        email,
        setEmail,
        tipoAtencao,
        setTipoAtencao,
        tipoUsuario,
        setTipoUsuario,
        localAtendimento,
        setLocalAtendimento,
      }}
    >
      {children}
    </UsuarioLogadoContext.Provider>
  );
}

export const UsuarioLogadoConsumer = UsuarioLogadoContext.Consumer;

export default UsuarioLogadoContext;
