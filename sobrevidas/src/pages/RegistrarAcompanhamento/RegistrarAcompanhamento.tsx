import React, {memo} from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import {HomeText} from './RegistrarAcompanhamento.styles';

interface Props {}
const RegistrarAcompanhamento: React.FC<Props> = ({navigation, route}: any) => {
  const {id} = route.params;

  return (
    <PageContainer
      withHeader
      canGoBack
      pageTitle="Rsgistrar um atendimento"
      navigation={navigation}>
      <HomeText>registrar acompanhamento de {id}</HomeText>
    </PageContainer>
  );
};

export default memo(RegistrarAcompanhamento);
