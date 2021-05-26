import React, {memo} from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import {HomeText} from './CadastroFeedback.styles';

interface Props {}
const CadastroFeedback: React.FC<Props> = ({navigation}: any) => {
  return (
    <PageContainer navigation={navigation}>
      <HomeText>cadastrar resultados page</HomeText>
    </PageContainer>
  );
};

export default memo(CadastroFeedback);
