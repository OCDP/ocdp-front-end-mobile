import React, {memo, useContext, useEffect} from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import CadastroPacienteContext, { CadastroPacienteConsumer, CadastroPacienteProvider } from '../../contexts/CadastroPacienteContext';
import {HomeText} from './DadosPacientePage.styles';

interface Props {}
const DadosPacientePage: React.FC<Props> = ({navigation, paciente}: any) => {

  useEffect(() => {
    
  }, [])

  return (
    <PageContainer withHeader withFooter pageTitle="Dados Paciente" navigation={navigation}>
      <CadastroPacienteProvider>
        <CadastroPacienteConsumer>
          {({newPaciente}) => (
            <HomeText>{JSON.stringify(newPaciente)}</HomeText>
          )}
        </CadastroPacienteConsumer>
      </CadastroPacienteProvider>
    </PageContainer>
  );
};

export default memo(DadosPacientePage);
