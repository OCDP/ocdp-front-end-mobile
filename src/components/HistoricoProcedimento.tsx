import React, { useContext } from "react";
import { View } from "react-native";
import {
  useStyleSheet,
  Layout,
  Text,
  withStyles,
  Button,
} from "@ui-kitten/components";
import PacienteContext from "../contexts/PacienteContext";
import {useFlushLesoesRegioes} from "../contexts/LesoesRegioesContext"
import Timeline from "react-native-timeline-flatlist";


const HistoricoProcedimento = ({ navigation, themedStyle = null }) => {
  const flushLesoesRegioes = useFlushLesoesRegioes()
  const { historico } = useContext(PacienteContext);
  const [selected, setSelected] = React.useState();
  const { setAcomp } = useContext(PacienteContext);
  const dataTimeline = historico.map((a) => {
    return {
      id: a.idAtendimento,
      title: `${a.tipoAtendiemtento}\n(${a.diferencaMeses})`,
      description: `${a.localAtendimento}\n${a.profissionalDeSaude}\n${
        a.dataAtendimento.split(" ")[0]
      }`,
    };
  });

  const styles = useStyleSheet({
    container: {
      display: "flex",
    },
    timeline: {
      flex: 1,
      padding: 16,
    },
  });

  async function onEventPress(data) {
    await setSelected(data);
  }

  async function acompActions() {
    
    flushLesoesRegioes();
    await setAcomp(true);
    navigation.navigate("CadastrarPaciente");
  }

  return (
    <View style={styles.container}>
      <View style={styles.timeline}>
        <Text
          style={{
            padding: 16,
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Histórico do paciente
        </Text>
        <Button
          onPress={acompActions}
          style={{
            marginBottom: 16,
          }}
        >
          adicionar retorno
        </Button>
        <Timeline
          onEventPress={onEventPress}
          style={{ flex: 1 }}
          data={dataTimeline}
          titleStyle={{ fontSize: 10 }}
          descriptionStyle={{ fontSize: 12 }}
          detailContainerStyle={{
            marginBottom: 20,
            paddingLeft: 5,
            paddingRight: 5,
            backgroundColor: themedStyle.primary,
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
};

export default withStyles(HistoricoProcedimento, (theme) => ({
  primary: theme["color-primary-500"],
  primaryDark: theme["color-primary-900"],
  primaryLigth: theme["color-primary-400"],
}));
