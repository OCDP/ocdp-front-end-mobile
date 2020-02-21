import React from "react";
import {
  useStyleSheet,
  Layout,
  Text,
  withStyles,
  Card
} from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { useDadosPacientes } from "../../contexts/AppContext";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const ListarPacientes = ({ navigation, themedStyle = null }) => {
  const [dadosPacientes] = useDadosPacientes();

  return (
    <Layout style={styles.container}>
      <ScrollView style={styles.container}>
        {dadosPacientes.map(({ nome, cidade, telCell, telResp }, i) => (
          <View key={i} style={styles.container}>
            <Card style={{ borderRadius: 8, marginVertical: 8 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Ionicons size={30} name="md-contact" />
                <View
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    marginLeft: 20
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text category="h6" style={{ fontWeight: "bold" }}>
                      {nome}
                    </Text>
                    <Text category="c2" appearance="hint">
                      {telCell}
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Text>{cidade}</Text>
                    <Text category="c2" appearance="hint">
                      {telResp}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default withStyles(ListarPacientes, theme => ({
  primary: theme["color-primary-500"],
  primaryDark: theme["color-primary-900"],
  primaryLigth: theme["color-primary-400"]
}));
