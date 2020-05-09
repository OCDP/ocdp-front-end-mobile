import React, { useContext } from "react";
import { View } from "react-native";
import {
  useStyleSheet,
  Layout,
  Text,
  withStyles,
  Button,
} from "@ui-kitten/components";
import PacienteContext, {useFlushPaciente} from "../contexts/PacienteContext";
import { useFlushLesoesRegioes } from "../contexts/LesoesRegioesContext";
import Timeline from "react-native-timeline-flatlist";
import { useLoading } from "../contexts/AppContext";
import apiFunc from "../services/api";
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";
import AtendimentoContext from "../contexts/AtendimentosContext";
import { AtendimentosInterface } from "../utils/models/AtendimentosInterface";

const HistoricoProcedimento = ({ navigation, themedStyle = null }) => {
  const flushLesoesRegioes = useFlushLesoesRegioes();
  const flushPaciente = useFlushPaciente()
  const { historico } = useContext(PacienteContext);
  const { setAcomp } = useContext(PacienteContext);
  const { usuarioLogado } = useContext(UsuarioLogadoContext);
  const { atendimento, setAtendimento } = useContext(AtendimentoContext);
  const [, setLoading] = useLoading();
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
    setLoading(true);
    try {
      await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario)
        .get<AtendimentosInterface>(`historico/atendimento/${data.id}`)
        .then((resp) => {
          setAtendimento(resp.data);
          setLoading(false);
          navigation.navigate("Historico");
        });
    } catch (err) {
      console.log("err", err);
    }
  }

  async function acompActions() {
    flushLesoesRegioes();
    flushPaciente();
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
        <Button onPress={() => console.log(atendimento)}>
          ver dados no context
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
