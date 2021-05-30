declare namespace Models {
  interface Atendimento {
    atendimento: AtendimentoObj;
    dataSugeridaAcompanhamento: string;
    dataSugeridaTratamento: string;
    fatoresDeRisco: number[];
    regioesLesoes: RegioesLesoes[];
  }

  interface AtendimentoObj {
    dataAtendimento: string;
    id: number;
    localAtendimentoId: number;
    localEncaminhadoId: number;
    pacienteId: number;
    tipoAtendimento: string;
    usuarioId: number;
  }

  interface RegioesLesoes {
    id: number;
    imagemBase64?: string;
    nome?: string;
    lesoes?: Lesoes[];
  }

  interface Lesoes {
    subregiao: number;
    tipoLesao: TipoLesao;
    foto_sub_regiao_enviada: FotoSubRegiaoEnviada;
  }

  interface FotoSubRegiaoEnviada {
    id: number;
    url: string;
  }

  interface TipoLesao {
    id: number;
    descricao: number;
  }
}
