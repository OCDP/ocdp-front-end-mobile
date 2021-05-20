import {Divider, Text, Toggle} from '@ui-kitten/components';
import React, {memo, useContext, useState} from 'react';
import {View} from 'react-native';
import User from '../../assets/img/User';
import {logout} from '../../components/icons';
import PageContainer from '../../components/PageContainer/PageContainer';
import {CustomThemeContext} from '../../contexts/CustomThemeContext';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import {
  PerfilContainer,
  LogoutButton,
  UserLogoContainer,
  FooterItens,
  CurveContainer,
  InfoListPerfil,
  InfoItemPerfil,
} from './PerfilUsuarioPage.styles';

interface Props {}

const PerfilUsuarioPage: React.FC<Props> = ({navigation}: any) => {
  const customThemeContext = useContext(CustomThemeContext);
  const {themeColors} = useContext(UsuarioLogadoContext);
  const {usuarioLogado, logout: logoutSystem} = useContext(
    UsuarioLogadoContext,
  );
  const [infoUsuario] = useState([
    {
      title: 'Nome',
      description: usuarioLogado.nome,
    },
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
      title: 'Nivel Atenção',
      description: usuarioLogado.nivelAtencao,
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
        <CurveContainer level="3" />
        <UserLogoContainer>
          <User size={100} color={themeColors['color-primary-500']} />
        </UserLogoContainer>

        <FooterItens>
          <InfoListPerfil>
            {infoUsuario.map(({title, description}, i) => (
              <View key={i}>
                <InfoItemPerfil>
                  <Text category="s1">{title}</Text>
                  <Text category="s1">{description}</Text>
                </InfoItemPerfil>
                <Divider />
              </View>
            ))}
          </InfoListPerfil>
          <Toggle
            children={`Ativar ${
              customThemeContext.theme === 'dark' ? 'tema claro' : 'tema escuro'
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
