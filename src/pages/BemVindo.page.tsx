import React from "react";
import { Layout, Button, Text } from "@ui-kitten/components";
import PageContainer from "../components/PageContainer";
import Logo from "../assets/vectors/Logo.jsx";

const BemVindo = ({ navigation }) => {
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Layout style={{ alignItems: "center" }}>
        <Text appearance="hint">APP - Sobre Vida 1.0</Text>
        <Logo size={70} />
      </Layout>
      <Text appearance="hint">
        Rastreamento e Monitoramento do Grupo de Risco ao Câncer de Boca
      </Text>
      <Button onPress={() => navigation.navigate("Login")}>fazer login</Button>
    </Layout>
  );
};

export default BemVindo;
