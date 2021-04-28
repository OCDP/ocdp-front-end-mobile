import React from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import {HomeText} from './CadastrarResultadosPage.styles';

interface Props {}
const CadastrarResultadosPage: React.FC<Props> = ({navigation}: any) => {
  return (
    <PageContainer navigation={navigation}>
      <HomeText>cadastrar resultados page</HomeText>
    </PageContainer>
  );
};

export default CadastrarResultadosPage;
