declare namespace Models {
  interface Paciente {
    id?: string;
    dataNascimento: string;
    cpf: string;
    nome: string;
    nomeDaMae: string;
    sexo: string;
    telefoneCelular: string;
    telefoneResponsavel: string;
    email: string;
    idBairro: number;
    enderecoCompleto: string;
  }
}
