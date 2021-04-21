import {Button, Toggle} from '@ui-kitten/components';
import React, {useContext} from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import {CustomThemeContext} from '../../contexts/CustomThemeContext';
import {ButtonContainer} from '../BemVindoPage/BemVindoPage.styles';
import {HomeText} from './PerfilUsuarioPage.styles';

interface Props {}

const PerfilUsuarioPage: React.FC<Props> = ({navigation}: any) => {
  const customThemeContext = useContext(CustomThemeContext);

  return (
    <PageContainer withFooter navigation={navigation}>
      <HomeText>perfil usuario page</HomeText>
      <HomeText>tema do momento: {customThemeContext.theme}</HomeText>
      <ButtonContainer>
        <Button onPress={() => navigation.navigate('BemVindoPage')}>
          bem vindo
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
