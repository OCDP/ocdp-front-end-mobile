import moment from 'moment';
import React, {memo, useCallback} from 'react';
import {Alert} from 'react-native';
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

interface Props {}

const CadastrarPacientePage: React.FC<Props> = ({navigation}: any) => {
  const postPaciente = usePostPaciente();

  const _postPaciente = useCallback(
    async (values: Models.Paciente) => {
      try {
        console.log(values.dataNascimento);
        const dataNascimento = moment(
          values.dataNascimento,
          'DD-MM-YYYY HH:mm:ss',
        ).format('Y-MM-DD HH:mm:ss');
        await postPaciente({...values, dataNascimento});
      } catch (e) {
        Alert.alert(
          'Erro no cadastro',
          'Algo deu errado no momento do cadastro',
          [{text: 'Voltar'}],
        );
      }
    },
    [postPaciente],
  );

  return (
    <PageContainer
      withHeader
      canGoBack
      pageTitle="Cadastrar Paciente"
      navigation={navigation}>
      <CadastroPacienteProvider>
        <CadastroPacienteConsumer>
          {({newPaciente}) => (
            <Steps
              onComplete={() => _postPaciente(newPaciente)}
              descriptions={[
                'Dados pessoais',
                'Dados de contato',
                'Dados de endereço',
              ]}>
              <FieldSetDadosPessoais />
              <FieldSetDadosContato />
              <FieldSetDadosEndereco />
            </Steps>
          )}
        </CadastroPacienteConsumer>
      </CadastroPacienteProvider>
    </PageContainer>
  );
};

export default memo(CadastrarPacientePage);
