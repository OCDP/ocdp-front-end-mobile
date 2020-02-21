import React, { useContext } from "react";
import { View } from "react-native";
import { Text, useStyleSheet } from "@ui-kitten/components";
import PacienteContext, { usePaciente } from "../../contexts/PacienteContext";

const ExibeDadosPaciente = ({ navigation }) => {
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

  const paciente = usePaciente();

  return (
    <View style={styles.lineContent}>
      <View>
        <Text style={styles.text} appearance="default">
          {paciente?.nome || "Nome usuario"}
        </Text>
        <Text style={styles.text} appearance="default">
          {paciente?.dtNasci?.toString() || "data de nascimento"}
        </Text>
        <Text style={styles.text} appearance="default">
          {paciente?.sexo || "sexo"}
        </Text>
        <Text style={styles.text} appearance="default">
          {paciente?.email || "email"}
        </Text>
        <Text style={styles.text} appearance="default">
          {paciente?.telCell || "celular"}
        </Text>
        <Text style={styles.text} appearance="default">
          {paciente?.telResp || "celular responsavel"}
        </Text>
        <Text style={styles.text} appearance="default">
          {paciente?.nmMae || "nome da mae"}
        </Text>
        <Text style={styles.text} appearance="default">
          {paciente?.cidade || "cidade"}
        </Text>
        <Text style={styles.text} appearance="default">
          {paciente?.bairro || "bairro"}
        </Text>
      </View>
    </View>
  );
};

export default ExibeDadosPaciente;
