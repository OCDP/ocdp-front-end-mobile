declare namespace Contexts {
  interface UsuarioLogadoContext {
    usuarioLogado: Models.Usuario;
    setUsuarioLogado: React.Dispatch<React.SetStateAction<Models.Usuario>>;
    logout: (navigation: any) => void;
    themeColors: any;
    setThemeColors: React.Dispatch<React.SetStateAction<any>>;
  }
}
