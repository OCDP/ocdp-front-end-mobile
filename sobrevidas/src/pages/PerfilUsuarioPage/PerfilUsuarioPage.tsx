import {Divider, Text, Toggle} from '@ui-kitten/components';
import React, {memo, useContext, useState} from 'react';
import {Alert, View} from 'react-native';
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
  HeaderLine,
  LogoContainer,
  FooterContent,
} from './PerfilUsuarioPage.styles';
import atencaoLabels from '../../utils/atencaoLabels';

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
        <HeaderLine color={themeColors['color-primary-500']} />
        <HeaderContainer>
          <LogoContainer>
            {false ? (
              <MaleDoctor size={90} color={themeColors['color-primary-500']} />
            ) : (
              <FemaleDoctor
                size={90}
                color={themeColors['color-primary-500']}
              />
            )}
          </LogoContainer>

          <InfosHeader>
            <Text category="h3">{usuarioLogado.nome}</Text>
            <Text category="s1">
              Atenção {atencaoLabels[usuarioLogado.nivelAtencao]}
            </Text>
          </InfosHeader>
        </HeaderContainer>
        <Divider />
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
        <Divider />
        <FooterItens>
          <FooterContent>
            <Text category="s1">Tema escuro</Text>
            <Toggle
              checked={customThemeContext.theme === 'dark'}
              onChange={customThemeContext.toggleTheme}
            />
          </FooterContent>
          <FooterContent>
            <Text category="s1">Encerrar sessão</Text>
            <LogoutButton
              size="small"
              accessoryRight={logout}
              onPress={() =>
                Alert.alert('Fazer logout', 'Deseja sair da aplicação?', [
                  {text: 'Voltar'},
                  {
                    text: 'Confirmar',
                    onPress: () => logoutSystem(navigation),
                  },
                ])
              }
            />
          </FooterContent>
        </FooterItens>
      </PerfilContainer>
    </PageContainer>
  );
};

export default memo(PerfilUsuarioPage);
