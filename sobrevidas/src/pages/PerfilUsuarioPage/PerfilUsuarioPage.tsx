import {Divider, Text, Toggle} from '@ui-kitten/components';
import React, {memo, useContext, useState} from 'react';
import {Alert, View} from 'react-native';
import {logout} from '../../components/icons';
import PageContainer from '../../components/PageContainer/PageContainer';
import {CustomThemeContext} from '../../contexts/CustomThemeContext';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import {
  PerfilContainer,
  LogoutButton,
  FooterItens,
  InfoListPerfil,
  InfoItemPerfil,
  FooterContent,
} from './PerfilUsuarioPage.styles';
import atencaoLabels from '../../utils/atencaoLabels';
import PerfilHeader from '../../components/PerfilHeader/PerfilHeader';

interface Props {}

const PerfilUsuarioPage: React.FC<Props> = ({navigation}: any) => {
  const customThemeContext = useContext(CustomThemeContext);
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
        <PerfilHeader
          type="MEDICO"
          sexo={usuarioLogado.sexo}
          title={usuarioLogado.nome}
          subtitle={atencaoLabels[usuarioLogado.nivelAtencao]}
        />

        <InfoListPerfil>
          {infoUsuario.map(({title, description}, i) => (
            <View key={i}>
              <InfoItemPerfil>
                <Text category="c1">{title}</Text>
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
