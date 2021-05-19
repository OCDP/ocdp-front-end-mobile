import React, {memo} from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import {HomeText} from './HistoricoPage.styles';

interface Props {}
const HistoricoPage: React.FC<Props> = ({navigation}: any) => {
  return (
    <PageContainer withFooter navigation={navigation}>
      <HomeText>historico page</HomeText>
    </PageContainer>
  );
};

export default memo(HistoricoPage);
