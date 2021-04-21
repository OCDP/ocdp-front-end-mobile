import React from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import {HomeText} from './CadastrarPacientePage.styles';

interface Props {}
const CadastrarPacientePage: React.FC<Props> = ({navigation}: any) => {
  return (
    <PageContainer withFooter navigation={navigation}>
      <HomeText>cadastrar paciente page</HomeText>
    </PageContainer>
  );
};

export default CadastrarPacientePage;
