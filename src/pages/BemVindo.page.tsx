import React from "react";
import { Layout, Button, Text } from "@ui-kitten/components";
import PageContainer from "../components/PageContainer";
import Logo from "../assets/vectors/Logo.jsx";
import { View, StyleSheet } from "react-native";

const BemVindo = ({ navigation }) => {
  return (
    <Layout style={styles.container}>
      <View style={styles.textHeader}>
        <Text appearance="hint">APP - Sobre Vida 1.0</Text>
      </View>
      <View style={styles.containerLogo}>
        <Logo size={200} />
        <View style={styles.textHeader}>
          <Text style={{ textAlign: "center" }} appearance="hint">
            Rastreamento e Monitoramento do Grupo de Risco ao Câncer de Boca
          </Text>
        </View>
      </View>
      <View style={styles.containerFooter}>
        <View>
          <Button
            style={styles.buttonFooter}
            onPress={() => navigation.navigate("Login")}
          >
            fazer login
          </Button>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    top: 36
  },
  container: {
    flex: 1,
    alignItems: "center"
  },
  containerLogo: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  containerFooter: {
    display: "flex",
    flexDirection: "column"
  },
  buttonFooter: {
    bottom: 36,
    width: "100%"
  }
});

export default BemVindo;
