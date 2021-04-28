import {Button, Toggle} from '@ui-kitten/components';
import React, {useContext} from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import {CustomThemeContext} from '../../contexts/CustomThemeContext';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import useHeaders from '../../hooks/networking/useHeaders';
import useMountEffect from '../../hooks/utils/useMountEffect';
import {ButtonContainer} from '../BemVindoPage/BemVindoPage.styles';
import {HomeText} from './PerfilUsuarioPage.styles';

interface Props {}

const PerfilUsuarioPage: React.FC<Props> = ({navigation}: any) => {
  const customThemeContext = useContext(CustomThemeContext);
  const {usuarioLogado, logout} = useContext(UsuarioLogadoContext);
  const authHeaders = useHeaders();

  useMountEffect(() => console.log('cheguei'));

  return (
    <PageContainer
      withHeader
      canGoBack
      pageTitle="Perfil do usuário"
      navigation={navigation}>
      <HomeText>
        {usuarioLogado.nome} - {usuarioLogado.email}
      </HomeText>
      <HomeText>tema do momento: {customThemeContext.theme}</HomeText>
      <ButtonContainer>
        <Button onPress={() => navigation.navigate('BemVindoPage')}>
          bem vindo
        </Button>
        <Button onPress={() => logout(navigation)}>logout</Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button onPress={() => console.log(authHeaders)}>
          o que tem nos headers???
        </Button>
      </ButtonContainer>
      <Toggle
        checked={customThemeContext.theme === 'dark'}
        onChange={customThemeContext.toggleTheme}>
        {customThemeContext.theme}
      </Toggle>
    </PageContainer>
  );
};

export default PerfilUsuarioPage;
