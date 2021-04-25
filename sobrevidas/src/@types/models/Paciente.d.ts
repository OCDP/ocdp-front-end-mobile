declare namespace Models {
  interface Paciente {
    historico: Models.Historico[];
    listaFatores: Models.Fatores[];
    nome: string;
    cpf: string;
    dtNasci: string;
    sexo: string;
    email: string;
    id: number;
    telCell: string;
    endereco: string;
    telResp: string;
    nmMae: string;
    cidade: string;
    bairro: Models.Bairro[];
    acomp: boolean;
    classifLesoes: Models.ClassificLesoes;
  }

  type DrawerSize = 'sm' | 'md' | 'lg';
}
