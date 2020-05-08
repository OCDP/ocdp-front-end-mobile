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

const ListHistorico = ({ navigation, themedStyle = null }) => {
  const { atendimento } = useContext(AtendimentoContext);

  return (
    <View>
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
        <Lesoes
          key={i}
          imgRegiao={regiaoBoca.siglaRegiaoBoca}
          title={lesao.nome}
          navigation={navigation}
        />
      ))}
      <Text>PROCEDIMENTOS</Text>
      {atendimento.procedimentos.map(({ nome, anexo64, observacao }, i) => (
        <View key={i}>
          <Text>{nome}</Text>

          <Image source={{ uri: `${anexo64}` }} />
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
