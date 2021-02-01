import React, { useContext } from "react";
import { Text, Layout } from "@ui-kitten/components";
import PageContainer from "../components/PageContainer";
import { View, Image, StyleSheet } from "react-native";
import Lesoes from "../components/CadastroPaciente/Lesoes";
import AtendimentoContext from "../contexts/AtendimentosContext";
import ListHistorico from "../components/ListHistorico";
import { ScrollView } from "react-native-gesture-handler";

const Historico = ({ navigation }) => {
  return (
    <PageContainer title="Detalhes histórico" navigation={navigation}>
      <ScrollView>
        <Layout style={styles.container}>
          <ListHistorico navigation={navigation} />
        </Layout>
      </ScrollView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});

export default Historico;
