import React, { useContext } from "react";
import PageContainer from "../components/PageContainer";
import { KeyboardAvoidingView, Platform } from "react-native";
import { View, StyleSheet } from "react-native";
import DadosLevels from "../components/CadastroPaciente/DadosLevels";
import PacienteContext from "../contexts/PacienteContext";

const CadastrarPaciente = ({ navigation }) => {
  return (
    <DadosLevels navigation={navigation} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    flexDirection: "column",
  },
  picker: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    marginHorizontal: 16,
  },
});

export default CadastrarPaciente;
