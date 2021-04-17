declare namespace Contexts {
  interface AppContext {
    dadosPacientes: Models.Paciente[];
    setDadosPacientes: React.Dispatch<React.SetStateAction<Models.Paciente[]>>;
    loading?: boolean;
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  }
}
