export interface UsuarioInterface {
  id: string;
  cpf: string;
  nome: string;
  status: string;
  email: string;
  telefone: string;
  nivelAtencao: string;
  tipoUsuario: string;
  senhaUsuario?: string;
}
