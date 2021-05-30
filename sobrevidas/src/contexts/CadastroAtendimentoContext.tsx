import React, {createContext, useCallback, useState} from 'react';
import {Alert} from 'react-native';
import {useGetFatoresRisco} from '../hooks/networking/fatorRisco';
import {useGetRegioesLesoes} from '../hooks/networking/regiaoLesao';
import useMountEffect from '../hooks/utils/useMountEffect';

const CadastroAtendimentoContext = createContext(
  {} as Contexts.CadastroAtendimentoContext,
);

export const CadastroAtendimentoProvider: React.FC = ({children}: any) => {
  const getRegioesLesoes = useGetRegioesLesoes();
  const getFatoresRisco = useGetFatoresRisco();
  const [loading, setLoading] = useState(false);

  const [atendimento, setAtendimento] = useState<Models.Atendimento>({
    fatoresDeRisco: [],
    atendimento: {} as Models.AtendimentoObj,
    dataSugeridaAcompanhamento: '',
    regioesLesoes: [],
    dataSugeridaTratamento: '',
  });
  const [choicesFatoresRisco, setChoicesFatoresRisco] = useState<
    Models.FatorRisco[]
  >([] as Models.FatorRisco[]);
  const [choicesRegioes, setChoicesRegioes] = useState<Models.RegiaoLesao[]>(
    [] as Models.RegiaoLesao[],
  );

  const _getFatoresRisco = useCallback(async () => {
    try {
      setLoading(true);
      const {data} = await getFatoresRisco();
      console.log(data);
      setChoicesFatoresRisco(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      Alert.alert(
        'Erro ao buscar fatores de risco',
        'Algo deu errado ao buscar fatores de risco',
        [{text: 'Voltar'}],
      );
    }
  }, [getFatoresRisco]);

  const _getRegioesLesoes = useCallback(async () => {
    try {
      setLoading(true);
      const {data} = await getRegioesLesoes();
      console.log(data);
      setChoicesRegioes(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      Alert.alert(
        'Erro ao buscar regiões',
        'Algo deu errado ao buscar as regiões',
        [{text: 'Voltar'}],
      );
    }
  }, [getRegioesLesoes]);

  useMountEffect(() => {
    _getFatoresRisco();
    _getRegioesLesoes();
  });

  return (
    <CadastroAtendimentoContext.Provider
      value={{
        atendimento,
        setAtendimento,
        choicesFatoresRisco,
        choicesRegioes,
        loading,
      }}>
      {children}
    </CadastroAtendimentoContext.Provider>
  );
};

export const CadastroAtendimentoConsumer = CadastroAtendimentoContext.Consumer;

export default CadastroAtendimentoContext;
