export interface NomesLocaisInterfaces {
  text?:string;
  distrito: DistritoInterface;
  emailResponsavel: string;
  id: string;
  nome: string;
  nomeResponsavel: string;
  tipoLocalAtendimento: TipoLocalAtendimentoInterface;
}

interface DistritoInterface{
  id: string;
  nome: string;
}

interface TipoLocalAtendimentoInterface{
  id: string;
  nome: string;
}

