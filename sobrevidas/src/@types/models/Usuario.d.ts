declare namespace Models {
  interface Usuario {
    id: string;
    cpf: string;
    nome: string;
    status: Status;
    email: string;
    telefone: string;
    nivelAtencao: NivelAtencao;
    sexo: Sexo;
    tipoUsuario: string;
    senhaUsuario: string;
  }

  type Status = 'ATIVO' | 'INATIVO';

  type NivelAtencao = 'PRIMARIA' | 'SECUNDARIA';

  type Sexo = 'MASCULINO' | 'FEMININO';
}
