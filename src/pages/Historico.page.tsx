import React, { useContext } from "react";
import { Button, Layout, Text, List, ListItem } from "@ui-kitten/components";
import PageContainer from "../components/PageContainer";
import { StyleSheet, View } from "react-native";

import { add, user, map, fileAgend } from "../assets/Icons";
import AtendimentoContext from "../contexts/AtendimentosContext";

const Historico = ({ navigation }) => {
  const { atendimento, setAtendimento } = useContext(AtendimentoContext);

  const renderItem = ({ item, index }) => (
    <ListItem title={`${item.title} ${index + 1}`} />
  );

  return (
    <PageContainer title="Detalhes historico" navigation={navigation}>
      <Layout style={styles.container}>
        <View>
          <Text>tope estamos aq no historico</Text>
        </View>
      </Layout>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default Historico;
