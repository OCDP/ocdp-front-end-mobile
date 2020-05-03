export interface AtendimentosInterface {
  atendimento: Atendimento;
  fatoresDeRisco: FatoresDeRisco[];
  regioesLesoes: RegioesLeso[];
  procedimentos: Procedimento[];
}

export interface Atendimento {
  id: string;
  dataAtendimento: string;
  usuario: Usuario;
  paciente: Paciente;
  tipoAtendimento: string;
  localAtendimento: LocalAtendimento;
  localEncaminhado: LocalEncaminhado;
}

export interface LocalAtendimento {
  id: string;
  nome: string;
  distrito: Distrito;
  tipoLocalAtendimento: TipoLocalAtendimento;
  emailResponsavel: string;
  nomeResponsavel: string;
}

export interface Distrito {
  id: string;
  nome: string;
}

export interface LocalEncaminhado {
  id: string;
  nome: string;
  distrito: Distrito2;
  tipoLocalAtendimento: TipoLocalAtendimento2;
  emailResponsavel: string;
  nomeResponsavel: string;
}

export interface Distrito2 {
  id: string;
  nome: string;
}

export interface FatoresDeRisco {
  id: string;
  nome?: any;
}

export interface RegioesLeso {
  lesao: Lesao;
  regiaoBoca: RegiaoBoca;
}

export interface RegiaoBoca {
  id: string;
  nome: string;
  siglaRegiaoBoca: SiglaRegiaoBoca;
}

export interface SiglaRegiaoBoca {
  id: string;
  nome: string;
  imagemBase64: string;
}

export interface Procedimento {
  anexo?: any;
  nome: string;
  observacao: string;
}

export interface Usuario {
  id: string;
  cpf: string;
  nome: string;
  status: string;
  email: string;
  telefone: string;
  nivelAtencao: string;
  tipoUsuario: string;
}

export interface Paciente {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  sexo: string;
  email: string;
  telefoneCelular: string;
  nomeDaMae: string;
  telefoneResponsavel: string;
  bairro: Bairro;
  enderecoCompleto: string;
}

export interface Bairro {
  id: string;
  nome: string;
}

export interface TipoLocalAtendimento {
  id: string;
  nome: string;
}

export interface TipoLocalAtendimento2 {
  id: string;
  nome: string;
}

export interface TipoLesao {
  id: string;
  nome: string;
}

export interface Lesao {
  id: string;
  nome: string;
  tipoLesao: TipoLesao;
}
