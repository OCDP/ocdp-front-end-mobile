export interface BuscaPacienteInterface {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: Date;
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
