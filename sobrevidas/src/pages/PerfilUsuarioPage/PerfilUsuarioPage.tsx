import {Text, Toggle} from '@ui-kitten/components';
import React, {memo, useContext, useState} from 'react';
import {View} from 'react-native';
import MaleDoctor from '../../assets/img/MaleDoctor';
import FemaleDoctor from '../../assets/img/FemaleDoctor';
import {logout} from '../../components/icons';
import PageContainer from '../../components/PageContainer/PageContainer';
import {CustomThemeContext} from '../../contexts/CustomThemeContext';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import {
  PerfilContainer,
  LogoutButton,
  HeaderContainer,
  FooterItens,
  InfoListPerfil,
  InfoItemPerfil,
  InfosHeader,
} from './PerfilUsuarioPage.styles';
import atencaoLabels from '../../utils/atencaoLabels';
import {WaveContainer} from '../../styles/index.styles';

interface Props {}

const PerfilUsuarioPage: React.FC<Props> = ({navigation}: any) => {
  const customThemeContext = useContext(CustomThemeContext);
  const {themeColors} = useContext(UsuarioLogadoContext);
  const {usuarioLogado, logout: logoutSystem} = useContext(
    UsuarioLogadoContext,
  );
  const [infoUsuario] = useState([
    {
      title: 'CPF',
      description: usuarioLogado.cpf,
    },
    {
      title: 'Telefone',
      description: usuarioLogado.telefone,
    },
    {
      title: 'Email',
      description: usuarioLogado.email,
    },
    {
      title: 'Tipo Usuário',
      description: usuarioLogado.tipoUsuario,
    },
  ]);

  return (
    <PageContainer
      withHeader
      canGoBack
      pageTitle="Perfil do usuário"
      navigation={navigation}>
      <PerfilContainer>
        <WaveContainer level="2" />
        <HeaderContainer>
          {false ? (
            <MaleDoctor size={60} color={themeColors['color-primary-500']} />
          ) : (
            <FemaleDoctor size={60} color={themeColors['color-primary-500']} />
          )}
          <InfosHeader>
            <Text category="h6">{usuarioLogado.nome}</Text>
            <Text category="s1">
              Atenção {atencaoLabels[usuarioLogado.nivelAtencao]}
            </Text>
          </InfosHeader>
        </HeaderContainer>

        <InfoListPerfil>
          {infoUsuario.map(({title, description}, i) => (
            <View key={i}>
              <InfoItemPerfil>
                <Text category="h6">{title}</Text>
                <Text category="s1">{description}</Text>
              </InfoItemPerfil>
            </View>
          ))}
        </InfoListPerfil>

        <FooterItens>
          <Toggle
            children={`Ativar ${
              customThemeContext.theme === 'dark'
                ? 'tema claroo'
                : 'tema escuro'
            }`}
            checked={customThemeContext.theme === 'dark'}
            onChange={customThemeContext.toggleTheme}
          />
          <LogoutButton
            size="small"
            accessoryRight={logout}
            onPress={() => logoutSystem(navigation)}>
            Sair da Conta
          </LogoutButton>
        </FooterItens>
      </PerfilContainer>
    </PageContainer>
  );
};

export default memo(PerfilUsuarioPage);
