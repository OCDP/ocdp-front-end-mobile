import React from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import {HomeText} from './HomePage.styles';

interface Props {}
const HomePage: React.FC<Props> = ({navigation}: any) => {
  return (
    <PageContainer withFooter navigation={navigation}>
      <HomeText>home page</HomeText>
    </PageContainer>
  );
};

export default HomePage;
