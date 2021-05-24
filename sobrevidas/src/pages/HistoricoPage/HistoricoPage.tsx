import React, { memo } from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import { CadastroPacienteProvider, CadastroPacienteConsumer } from '../../contexts/CadastroPacienteContext';
import { HomeText } from './HistoricoPage.styles';

interface Props { }
const HistoricoPage: React.FC<Props> = ({ navigation, newPaciente }: any) => {
  return (

    <CadastroPacienteProvider>
      <PageContainer withFooter navigation={navigation}>
        <HomeText>{newPaciente.email}</HomeText>
      </PageContainer>
    </CadastroPacienteProvider>
  );
};

export default memo(HistoricoPage);
