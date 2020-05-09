import React, { useContext } from "react";
import { View, Image } from "react-native";
import {
  useStyleSheet,
  Layout,
  Text,
  withStyles,
  Button,
} from "@ui-kitten/components";
import PacienteContext from "../contexts/PacienteContext";
import { useFlushLesoesRegioes } from "../contexts/LesoesRegioesContext";
import Timeline from "react-native-timeline-flatlist";
import { useLoading } from "../contexts/AppContext";
import apiFunc from "../services/api";
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";
import AtendimentoContext from "../contexts/AtendimentosContext";
import { AtendimentosInterface } from "../utils/models/AtendimentosInterface";
import Lesoes from "./CadastroPaciente/Lesoes";
import { TouchableOpacity } from "react-native-gesture-handler";

const ListHistorico = ({ navigation, themedStyle = null }) => {
  const { atendimento } = useContext(AtendimentoContext);

  const styles = useStyleSheet({
    container: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Text>data atendimento: {atendimento.atendimento.dataAtendimento}</Text>
      <Text>
        local atendimento: {atendimento.atendimento.localAtendimento.nome}
      </Text>
      <Text>
        local encaminhado: {atendimento.atendimento.localEncaminhado.nome}
      </Text>
      <Text>nome do paciente: {atendimento.atendimento.paciente.nome}</Text>
      <Text>
        tipo de atendimento: {atendimento.atendimento.tipoAtendimento}
      </Text>
      <Text>usuario responsavel: {atendimento.atendimento.usuario.nome}</Text>
      <View>
        <Text>fatores de risco:</Text>
        {atendimento.fatoresDeRisco.map(({ nome }, i) => (
          <Text key={i}>{nome}</Text>
        ))}
      </View>
      <Text>REGIOES LESOES</Text>
      {atendimento.regioesLesoes.map(({ regiaoBoca, lesao }, i) => (
        <View key={i}>
          <TouchableOpacity onPress={() => console.log("cliquei")}>
            <Lesoes
              imgRegiao={regiaoBoca.siglaRegiaoBoca.imagemBase64}
              title={regiaoBoca.nome}
              navigation={navigation}
            />
            <Text>nome da lesao: {lesao.nome}</Text>
            <Text>tipo da lesao: {lesao.tipoLesao.nome}</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Text>PROCEDIMENTOS</Text>
      {atendimento.procedimentos.map(({ nome, anexo64, observacao, id }) => (
        <View key={id}>
          <TouchableOpacity onPress={() => console.log("cliquei")}>
            <Lesoes imgRegiao={anexo64} title={nome} navigation={navigation} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default withStyles(ListHistorico, (theme) => ({
  primary: theme["color-primary-500"],
  primaryDark: theme["color-primary-900"],
  primaryLigth: theme["color-primary-400"],
}));
