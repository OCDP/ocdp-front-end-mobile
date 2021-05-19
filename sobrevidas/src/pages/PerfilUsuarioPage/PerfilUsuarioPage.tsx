import { Button, Divider, List, ListItem, Text, Toggle } from '@ui-kitten/components';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
    <View style={{
      padding: 10,
      flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'
    }}>
      <Text style={{ textAlignVertical: 'center', fontSize: 20 }}>{item.title}</Text>
      <Text style={{ fontStyle: 'italic', textAlignVertical: 'center', fontSize: 16 }}>{item.description}</Text>
    </View>
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
      <View style={{
        padding: 20,
        flexDirection: 'column', justifyContent: 'space-between'
      }}>
        <Toggle
        style={{paddingBottom: 20}}
          checked={customThemeContext.theme === 'dark'}
          onChange={customThemeContext.toggleTheme}>
          Trocar para {customThemeContext.theme == 'dark' ? 'tema claro' : 'tema escuro'}
        </Toggle>
        <Button> Sair da Conta </Button>
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%'
  },
});

export default PerfilUsuarioPage;
