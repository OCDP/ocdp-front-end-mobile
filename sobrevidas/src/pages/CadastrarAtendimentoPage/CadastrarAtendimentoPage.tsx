import React, {memo, useCallback, useState} from 'react';
import {Alert} from 'react-native';
import FadeLoading from '../../components/FadeLoading/FadeLoading';
import FieldSetConduta from '../../components/FieldSetConduta/FieldSetConduta';
import FieldSetFatoresDeRisco from '../../components/FieldSetFatoresDeRisco/FieldSetFatoresDeRisco';
import FieldSetRegioesLesoes from '../../components/FieldSetRegioesLesoes/FieldSetRegioesLesoes';
import FieldSetSubRegioes from '../../components/FieldSetSubRegioes/FieldSetSubRegioes';
import FieldSetTipoLesao from '../../components/FieldSetTipoLesao/FieldSetTipoLesao';
import PageContainer from '../../components/PageContainer/PageContainer';
import Steps from '../../components/Steps/Steps';
import {
  CadastroAtendimentoProvider,
  CadastroAtendimentoConsumer,
} from '../../contexts/CadastroAtendimentoContext';

interface Props {}
const CadastrarAtendimentoPage: React.FC<Props> = ({
  navigation,
  route,
}: any) => {
  const {id} = route.params;
  const [loading, setLoading] = useState(false);
  const [possuiLesoes, setPossuiLesoes] = useState(false);

  const _postAtendimento = useCallback(
    async (values: Models.Atendimento) => {
      try {
        setLoading(true);
        console.log({values, id});
        setLoading(false);
      } catch (e) {
        setLoading(false);
        Alert.alert(
          'Erro no cadastro',
          'Algo deu errado no momento do cadastro',
          [{text: 'Voltar'}],
        );
      }
    },
    [id],
  );

  const fatoresField = {
    children: (
      <FieldSetFatoresDeRisco
        possuiLesoes={possuiLesoes}
        onChangeLesoes={setPossuiLesoes}
      />
    ),
    label: 'Selecionar fatores de risco',
  };

  const condutaField = {
    children: <FieldSetConduta />,
    label: 'Conduta do atendimento',
  };

  const semLesoesSteps = [fatoresField, condutaField];

  const comLesoesSteps = [
    fatoresField,
    {
      children: <FieldSetRegioesLesoes />,
      label: 'Selecionar regiões com lesões',
    },
    {
      children: <FieldSetSubRegioes />,
      label: 'Selecionar subregiões com lesões',
    },
    {
      children: <FieldSetTipoLesao />,
      label: 'Especificar tipo de lesão',
    },
    condutaField,
  ];

  return (
    <PageContainer
      withHeader
      canGoBack
      pageTitle="Cadastrar um atendimento"
      navigation={navigation}>
      <FadeLoading loading={loading} />
      <CadastroAtendimentoProvider>
        <CadastroAtendimentoConsumer>
          {({atendimento}) => (
            <Steps
              onComplete={() => _postAtendimento(atendimento)}
              childrens={possuiLesoes ? comLesoesSteps : semLesoesSteps}
            />
          )}
        </CadastroAtendimentoConsumer>
      </CadastroAtendimentoProvider>
    </PageContainer>
  );
};

export default memo(CadastrarAtendimentoPage);
