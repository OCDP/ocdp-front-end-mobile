import { Divider, List, ListItem, Toggle } from '@ui-kitten/components';
import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import PageContainer from '../../components/PageContainer/PageContainer';
import { CustomThemeContext } from '../../contexts/CustomThemeContext';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';

interface Props { }

const PerfilUsuarioPage: React.FC<Props> = ({ navigation }: any) => {
  const customThemeContext = useContext(CustomThemeContext);
  const { usuarioLogado, logout } = useContext(UsuarioLogadoContext);
  const [infoUsuario] = useState([{
    title: "Nome", description: usuarioLogado.nome
  }, {
    title: "CPF", description: usuarioLogado.cpf
  }, {
    title: "Telefone", description: usuarioLogado.telefone
  }, {
    title: "Email", description: usuarioLogado.email
  }, {
    title: "Nivel Atenção", description: usuarioLogado.nivelAtencao
  }, {
    title: "Tipo Usuário", description: usuarioLogado.tipoUsuario
  }]);

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title}`}
      description={`${item.description}`}
    />
  );

  return (
    <PageContainer
      withHeader
      canGoBack
      pageTitle="Perfil do usuário"
      navigation={navigation}>
      <List
        style={styles.container}
        data={infoUsuario}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        persistentScrollbar={true}
      />
      <Toggle
        checked={customThemeContext.theme === 'dark'}
        onChange={customThemeContext.toggleTheme}>
        {customThemeContext.theme}
      </Toggle>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: '50%'
  },
});

export default PerfilUsuarioPage;
