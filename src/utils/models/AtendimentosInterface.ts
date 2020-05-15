export interface AtendimentosInterface {
  atendimento?: Atendimento;
  fatoresDeRisco?: DefaultIdNome[];
  regioesLesoes?: RegioesLesoe[];
  procedimentos?: Procedimento[];
}

interface Procedimento {
  id?: string;
  anexo64?: string;
  nome?: string;
  observacao?: any; // esse ja estava com ?
}

interface RegioesLesoe {
  lesao?: Lesao;
  regiaoBoca?: RegiaoBoca;
}

interface RegiaoBoca {
  id?: string;
  nome?: string;
  siglaRegiaoBoca?: SiglaRegiaoBoca;
}

interface SiglaRegiaoBoca {
  id?: string;
  nome?: string;
  imagemBase64?: string;
}

interface Lesao {
  id?: string;
  nome?: string;
  tipoLesao?: DefaultIdNome;
}

interface Atendimento {
  id?: string;
  dataAtendimento?: string;
  usuario?: Usuario;
  paciente?: Paciente;
  tipoAtendimento?: string;
  localAtendimento?: LocalAtendimento;
  localEncaminhado?: LocalAtendimento;
}

interface LocalAtendimento {
  id?: string;
  nome?: string;
  distrito?: DefaultIdNome;
  tipoLocalAtendimento?: DefaultIdNome;
  emailResponsavel?: string;
  nomeResponsavel?: string;
}

interface Paciente {
  id?: string;
  nome?: string;
  cpf?: string;
  dataNascimento?: string;
  sexo?: string;
  email?: string;
  telefoneCelular?: string;
  nomeDaMae?: string;
  telefoneResponsavel?: string;
  bairro?: Bairro;
  enderecoCompleto?: string;
}

interface Bairro {
  id?: string;
  nome?: string;
}

interface DefaultIdNome {
  id?: string;
  nome?: string;
}

interface Usuario {
  id?: string;
  cpf?: string;
  nome?: string;
  status?: string;
  email?: string;
  telefone?: string;
  nivelAtencao?: string;
  tipoUsuario?: string;
}
