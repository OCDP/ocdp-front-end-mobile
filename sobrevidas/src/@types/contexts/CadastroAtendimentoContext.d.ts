declare namespace Contexts {
  interface CadastroAtendimentoContext {
    atendimento: Models.Atendimento;
    setAtendimento: React.Dispatch<React.SetStateAction<Models.Atendimento>>;
  }
}
