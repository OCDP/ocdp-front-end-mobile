import {Divider, Text, Toggle} from '@ui-kitten/components';
import React, {memo, useContext, useMemo} from 'react';
import {Alert} from 'react-native';
import {logout} from '../../components/icons';
import PageContainer from '../../components/PageContainer/PageContainer';
import {CustomThemeContext} from '../../contexts/CustomThemeContext';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import {
  PerfilContainer,
  LogoutButton,
  FooterItens,
  FooterContent,
} from './PerfilUsuarioPage.styles';
import atencaoLabels from '../../utils/atencaoLabels';
import PerfilHeader from '../../components/PerfilHeader/PerfilHeader';
import InfoListPerfil from '../../components/InfoListPerfil/InfoListPerfil';

interface Props {}

const PerfilUsuarioPage: React.FC<Props> = ({navigation}: any) => {
  const customThemeContext = useContext(CustomThemeContext);
  const {usuarioLogado, logout: logoutSystem} = useContext(
    UsuarioLogadoContext,
  );

  const contentList = useMemo(
    () =>
      [
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
        {
          title: 'Sexo',
          description: usuarioLogado.sexo,
        },
      ] as ListInfoPerfil[],
    [usuarioLogado],
  );

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
        <InfoListPerfil contentList={contentList} />
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
