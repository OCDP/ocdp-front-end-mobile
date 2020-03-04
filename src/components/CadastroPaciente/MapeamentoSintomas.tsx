import React from "react";
import { View } from "react-native";
import { Text, useStyleSheet } from "@ui-kitten/components";

const MapeamentoSintomas = ({ navigation }) => {
  const styles = useStyleSheet({
    text: {
      margin: 8
    },
    lineContent: {
      flex: 1,
      width: "100%",
      marginVertical: 8
    }
  });

  return (
    <View style={styles.lineContent}>
      <View>
        <Text style={styles.text} appearance="default">
          Componente?
        </Text>
        <Text style={styles.text} appearance="default">
          Voce está vivo?
        </Text>
      </View>
    </View>
  );
};

export default MapeamentoSintomas;
