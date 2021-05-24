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
    <CadastroPacienteProvider>

      <CadastroPacienteConsumer>
        {({ newPaciente, setNewPaciente }) => {
          setNewPaciente(paciente);
          return (
            <PageContainer withFooter navigation={navigation}>
              <HomeText>{newPaciente.email}</HomeText>
            </PageContainer>
          )
        }}
      </CadastroPacienteConsumer>

    </CadastroPacienteProvider>
  );
};

export default memo(DadosPacientePage);
