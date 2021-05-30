declare namespace Models {
  interface Atendimento {
    atendimento: AtendimentoObj;
    dataSugeridaAcompanhamento: string;
    dataSugeridaTratamento: string;
    fatoresDeRisco: number[];
    regioesLesoes: RegiaoLesao[];
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

  interface RegiaoLesao {
    id: number;
    imagemBase64?: string;
    nome?: string;
    subRegioes?: Subregiao[];
  }

  interface Subregiao {
    id: number;
    nome: string;
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
