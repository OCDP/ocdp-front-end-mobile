import React, { memo, useContext, useEffect } from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import CadastroPacienteContext, { CadastroPacienteConsumer, CadastroPacienteProvider } from '../../contexts/CadastroPacienteContext';
import { HomeText } from './DadosPacientePage.styles';

interface Props { }
const DadosPacientePage: React.FC<Props> = ({ navigation, route }: any) => {

  const { paciente } = route.params;
  // const { newPaciente, setNewPaciente } = useContext(CadastroPacienteContext);
  // useEffect(() => {
  //   setNewPaciente(paciente);
  // }, [])

  return (

    <PageContainer withHeader
      pageTitle={"Dados do Paciente"}
      withFooter
      navigation={navigation}
      paciente={paciente}>
      <HomeText>{paciente.email}</HomeText>
    </PageContainer>
  );
};

export default memo(DadosPacientePage);
