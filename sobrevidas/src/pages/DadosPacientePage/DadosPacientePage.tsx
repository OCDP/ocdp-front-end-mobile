import React, {memo} from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import {HomeText} from './DadosPacientePage.styles';

interface Props {}
const DadosPacientePage: React.FC<Props> = ({navigation}: any) => {
  return (
    <PageContainer withFooter navigation={navigation}>
      <HomeText>dados paciente page</HomeText>
    </PageContainer>
  );
};

export default memo(DadosPacientePage);
