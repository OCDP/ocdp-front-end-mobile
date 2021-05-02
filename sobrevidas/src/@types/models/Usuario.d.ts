declare namespace Models {
  interface Usuario {
    id: string;
    cpf: string;
    nome: string;
    status: string;
    email: string;
    telefone: string;
    nivelAtencao: NivelAtencao;
    tipoUsuario: string;
    senhaUsuario: string;
  }
  type NivelAtencao = 'PRIMARIA' | 'SECUNDARIA';
}
