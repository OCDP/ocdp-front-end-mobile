import React, {memo} from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import {HomeText} from './CadastrarAtendimentoPage.styles';

interface Props {}
const CadastrarAtendimentoPage: React.FC<Props> = ({
  navigation,
  route,
}: any) => {
  const {id} = route.params;

  return (
    <PageContainer
      withHeader
      canGoBack
      pageTitle="Cadastrar um atendimento"
      navigation={navigation}>
      <HomeText>registrar atendimento de {id}</HomeText>
    </PageContainer>
  );
};

export default memo(CadastrarAtendimentoPage);
