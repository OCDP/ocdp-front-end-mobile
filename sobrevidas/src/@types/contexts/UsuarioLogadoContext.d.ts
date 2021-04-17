declare namespace Contexts {
  interface UsuarioLogadoContext {
    userTest: Models.Login;
    setUserTest: React.Dispatch<React.SetStateAction<Models.Login>>;
    usuarioLogado: Models.Usuario;
    setUsuarioLogado?: React.Dispatch<React.SetStateAction<Models.Usuario>>;
    logout: () => void;
  }
}
