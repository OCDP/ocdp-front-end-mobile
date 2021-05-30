import React, {memo} from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import {HomeText} from './RegistrarAtendimentoPage.styles';

interface Props {}
const RegistrarAtendimentoPage: React.FC<Props> = ({
  navigation,
  route,
}: any) => {
  const {id} = route.params;

  return (
    <PageContainer
      withHeader
      canGoBack
      pageTitle="Rsgistrar um atendimento"
      navigation={navigation}>
      <HomeText>registrar atendimento de {id}</HomeText>
    </PageContainer>
  );
};

export default memo(RegistrarAtendimentoPage);
