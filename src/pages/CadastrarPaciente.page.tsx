import React, { useContext } from "react";
import PageContainer from "../components/PageContainer";
import { KeyboardAvoidingView, Platform } from "react-native";
import { View, StyleSheet } from "react-native";
import DadosLevels from "../components/CadastroPaciente/DadosLevels";

const CadastrarPaciente = ({ navigation }) => {
  return (
    <PageContainer title="Adicionar Paciente" navigation={navigation}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.view}>
          <View style={styles.picker}>
            <DadosLevels navigation={navigation} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  view: {
    flex: 1,
    flexDirection: "column",
    paddingBottom: 16
  },
  picker: {
    flex: 1,
    width: "100%",
    paddingBottom: 4,
    paddingHorizontal: 16,
    justifyContent: "space-between"
  },
  button: {
    marginHorizontal: 16
  }
});

export default CadastrarPaciente;
