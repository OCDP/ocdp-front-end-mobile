export interface LesoesRegiaoInterface {
  lesoes: {
    id: string;
    nome: string;
    tipoLesao: {
      id: string;
      nome: string;
    };
  };
  regioes: {
    id: string;
    nome: string;
    siglaRegiaoBoca: {
      id: string;
      imagemBase64: string;
      nome: string;
    };
  };
}
