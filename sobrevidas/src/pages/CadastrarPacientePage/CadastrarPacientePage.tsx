import React from 'react';
import {useForm} from 'react-hook-form';
import FieldSetDadosContato from '../../components/FieldSetDadosContato/FieldSetDadosContato';
import FieldSetDadosEndereco from '../../components/FieldSetDadosEndereco/FieldSetDadosEndereco';
import FieldSetDadosPessoais from '../../components/FieldSetDadosPessoais/FieldSetDadosPessoais';

import PageContainer from '../../components/PageContainer/PageContainer';
import Steps from '../../components/Steps/Steps';

interface Props {}

const CadastrarPacientePage: React.FC<Props> = ({navigation}: any) => {
  const {register, setValue, handleSubmit, getValues} = useForm();

  return (
    <PageContainer
      withHeader
      canGoBack
      pageTitle="Cadastrar Paciente"
      navigation={navigation}>
      <Steps
        onComplete={handleSubmit(console.log)}
        description={[
          'Dados pessoais',
          'Dados de contato',
          'Dados de endereço',
        ]}>
        <FieldSetDadosPessoais
          getValues={getValues}
          register={register}
          setValue={setValue}
        />
        <FieldSetDadosContato
          getValues={getValues}
          register={register}
          setValue={setValue}
        />
        <FieldSetDadosEndereco
          getValues={getValues}
          register={register}
          setValue={setValue}
        />
      </Steps>
    </PageContainer>
  );
};

export default CadastrarPacientePage;
