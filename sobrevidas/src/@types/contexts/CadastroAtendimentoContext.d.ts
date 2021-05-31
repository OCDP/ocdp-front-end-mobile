declare namespace Contexts {
  interface CadastroAtendimentoContext {
    atendimento: Models.Atendimento;
    setAtendimento: React.Dispatch<React.SetStateAction<Models.Atendimento>>;
    choicesRegioes: Models.RegiaoLesao[];
    currentRegioes: Models.RegiaoLesao[];
    setCurrentRegioes: React.Dispatch<
      React.SetStateAction<Models.RegiaoLesao[]>
    >;

    currentRegioesSub: Models.RegiaoLesao[];
    setCurrentRegioesSub: React.Dispatch<
      React.SetStateAction<Models.RegiaoLesao[]>
    >;
    choicesFatoresRisco: Models.FatorRisco[];
    loading: boolean;
  }
}
