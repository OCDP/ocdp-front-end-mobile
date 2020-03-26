import React, { useContext } from "react";
import { View } from "react-native";
import { useStyleSheet, Layout, Text } from "@ui-kitten/components";
import PacienteContext from "../contexts/PacienteContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import Timeline from "react-native-timeline-flatlist";

const HistoricoProcedimento = ({ navigation }) => {
  const { historico } = useContext(PacienteContext);

  const dataTimeline = historico.map(a => {
    let dataAtual = new Date().getDate() + '/' + new Date().getMonth() + '/' +new Date().getFullYear();
    return {
      title: a.profissionalDeSaude,
      description: a.tipoAtendiemtento + ' (' + a.diferencaDias + ' ' +
      dataAtual + ' )',
      id: a.idAtendimento,
    };
  });

  const styles = useStyleSheet({
    container: {
      display: "flex"
    },
    timeline: {
      flex: 1,
      padding: 16,
      backgroundColor: "white"
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.timeline}>
        <Text
          style={{
            padding: 16,
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          Histórico do paciente
        </Text>
        <Timeline
          onEventPress={() => console.log()}
          style={{ flex: 1 }}
          data={dataTimeline}
        />
      </View>
    </View>
  );
};

export default HistoricoProcedimento;
