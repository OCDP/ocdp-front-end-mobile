declare namespace Contexts {
  interface CadastroPacienteContext {
    newPaciente: Models.Paciente;
    setNewPaciente: React.Dispatch<React.SetStateAction<Models.Paciente>>;
    currentEndereco?: Partial<Models.CurrentEndereco>;
    setCurrentEndereco: React.Dispatch<
      React.SetStateAction<Models.CurrentEndereco | undefined>
    >;
  }
}
