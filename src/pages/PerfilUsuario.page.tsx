import React, { useContext } from "react";
import { Text, Layout, withStyles, Divider } from "@ui-kitten/components";
import PageContainer from "../components/PageContainer";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";

const PerfilUsuario = ({ navigation, themedStyle = null }) => {
  const { usuarioLogado } = useContext(UsuarioLogadoContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
    },
    boxInfo: {
      marginHorizontal: 16,
      marginVertical: 8,
      backgroundColor: `${themedStyle.bgColor}`,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    divider: {
      backgroundColor: `${themedStyle.bgColorStrong}`,
      marginVertical: 4,
    },
  });

  return (
    <PageContainer title="Detalhes historico" navigation={navigation}>
      <ScrollView>
        <Layout style={styles.container}>
          <View style={styles.boxInfo}>
            <Text appearance="alternative" status="primary" category="h6">
              Dados do usuário logado
            </Text>
            <Divider style={styles.divider} />
            {usuarioLogado.nome && (
              <>
                <Text category="h6">{usuarioLogado.nome}</Text>
                <Divider style={styles.divider} />
              </>
            )}
            {usuarioLogado.email && (
              <>
                <Text category="h6">{usuarioLogado.email}</Text>
                <Divider style={styles.divider} />
              </>
            )}
            {usuarioLogado.telefone && (
              <>
                <Text category="h6">{usuarioLogado.telefone}</Text>
                <Divider style={styles.divider} />
              </>
            )}

            {usuarioLogado.nivelAtencao && (
              <>
                <Text category="h6">
                  Nivel de atenção: {usuarioLogado.nivelAtencao}
                </Text>
                <Divider style={styles.divider} />
              </>
            )}
            {usuarioLogado.status && (
              <>
                <Text category="h6">Status: {usuarioLogado.status}</Text>
                <Divider style={styles.divider} />
              </>
            )}
            {usuarioLogado.id && (
              <>
                <Text category="h6">ID: {usuarioLogado.id}</Text>
              </>
            )}
          </View>
        </Layout>
      </ScrollView>
    </PageContainer>
  );
};

export default withStyles(PerfilUsuario, (theme) => ({
  primary: theme["color-primary-500"],
  primaryDark: theme["color-primary-900"],
  primaryLigth: theme["color-primary-400"],
  bgColor: theme["background-basic-color-2"],
  bgColorStrong: theme["background-basic-color-4"],
}));
