import React, {useContext} from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import {HomeText} from './Styles';

interface Props {}
const HomePage: React.FC<Props> = () => {
  const {userTest} = useContext(UsuarioLogadoContext);
  return (
    <PageContainer withFooter>
      <HomeText>
        {userTest.email} - {userTest.password}
      </HomeText>
    </PageContainer>
  );
};

export default HomePage;
