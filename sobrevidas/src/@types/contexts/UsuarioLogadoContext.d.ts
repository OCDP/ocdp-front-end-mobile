declare namespace Contexts {
  interface UsuarioLogadoContext {
    usuarioLogado: Models.Usuario;
    setUsuarioLogado: React.Dispatch<React.SetStateAction<Models.Usuario>>;
    logout: () => void;
  }
}
