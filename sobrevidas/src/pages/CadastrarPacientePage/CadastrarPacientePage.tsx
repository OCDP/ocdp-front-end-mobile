import moment from 'moment';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {Alert, BackHandler} from 'react-native';
import FadeLoading from '../../components/FadeLoading/FadeLoading';
import FieldSetDadosContato from '../../components/FieldSetDadosContato/FieldSetDadosContato';
import FieldSetDadosEndereco from '../../components/FieldSetDadosEndereco/FieldSetDadosEndereco';
import FieldSetDadosPessoais from '../../components/FieldSetDadosPessoais/FieldSetDadosPessoais';

import PageContainer from '../../components/PageContainer/PageContainer';
import Steps from '../../components/Steps/Steps';
import {
  CadastroPacienteConsumer,
  CadastroPacienteProvider,
} from '../../contexts/CadastroPacienteContext';
import {usePostPaciente} from '../../hooks/networking/paciente';
import {ValidaCadastrarPaciente} from './ValidaCadastrarPaciente';

interface Props {}

const CadastrarPacientePage: React.FC<Props> = ({navigation}: any) => {
  const postPaciente = usePostPaciente();
  const [loading, setLoading] = useState(false);

  const _postPaciente = useCallback(
    async (values: Models.Paciente) => {
      if (ValidaCadastrarPaciente(values)) {
        try {
          setLoading(true);
          const dataNascimento = moment(
            values.dataNascimento,
            'DD-MM-YYYY HH:mm:ss',
          ).format('DD-MM-YYYY');
          const {data} = await postPaciente({...values, dataNascimento});
          setLoading(false);
          navigation.navigate('CadastroFeedback', {id: data});
        } catch (e) {
          setLoading(false);
          Alert.alert(
            'Erro no cadastro',
            'Algo deu errado no momento do cadastro',
            [{text: 'Voltar'}],
          );
        }
      }
    },
    [navigation, postPaciente],
  );

  const backAction = () => {
    Alert.alert(
      'Deseja realmente sair?',
      'Sair agora te fará perder os dados atuais',
      [
        {
          text: 'Não',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Sim', onPress: () => navigation.goBack()},
      ],
    );
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer
      withHeader
      canGoBack
      pageTitle="Cadastrar Paciente"
      navigation={navigation}>
      <FadeLoading loading={loading} />
      <CadastroPacienteProvider>
        <CadastroPacienteConsumer>
          {({newPaciente}) => (
            <Steps
              onComplete={() => _postPaciente(newPaciente)}
              childrens={[
                {
                  children: <FieldSetDadosPessoais />,
                  label: 'Dados pessoais',
                },
                {
                  children: <FieldSetDadosContato />,
                  label: 'Dados de contato',
                },
                {
                  children: <FieldSetDadosEndereco />,
                  label: 'Dados de endereço',
                },
              ]}
            />
          )}
        </CadastroPacienteConsumer>
      </CadastroPacienteProvider>
    </PageContainer>
  );
};

export default memo(CadastrarPacientePage);
