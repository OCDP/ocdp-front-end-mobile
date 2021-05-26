declare namespace Models {
  interface Historico {
    dataAtendimento: string;
    diferenca: string;
    idAtendimento: string;
    localAtendimento: string;
    profissionalDeSaude: string;
    tipoAtendiemtento: 'ACOMPANHAMENTO' | 'INTERVENCAO' | 'RESULTADOS';
  }
}
