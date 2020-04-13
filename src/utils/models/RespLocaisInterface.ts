export interface RespLocaisInterface {
  distrito: Distrito;
  emailResponsavel?: any;
  id: string;
  nome: string;
  nomeResponsavel?: any;
  tipoLocalAtendimento: TipoLocalAtendimento;
}

export interface Distrito {
  id: string;
  nome: string;
}

export interface NomeSelect {
  id: string;
  nome: string;
}

export interface TipoLocalAtendimento {
  id: string;
  nome: string;
}
