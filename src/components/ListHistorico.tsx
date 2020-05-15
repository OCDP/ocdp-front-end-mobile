import React, { useContext } from "react";
import { View, Image } from "react-native";
import {
  useStyleSheet,
  Layout,
  Text,
  withStyles,
  Button,
  Divider,
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
    boxInfo: {
      marginHorizontal: 16,
      marginVertical: 8,
      backgroundColor: `${themedStyle.bgColor}`,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    divider: {
      backgroundColor: `${themedStyle.bgColorStrong}`,
      marginVertical: 4,
    },
    infoLesoes: {
      paddingLeft: 16,
      paddingTop: 8,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.boxInfo}>
        <Text appearance="alternative" status="primary" category="h6">
          Dados do atendimento
        </Text>
        <Divider style={styles.divider} />
        {atendimento.atendimento.dataAtendimento ? (
          <Text appearance="hint" category="c4">
            Data: {atendimento.atendimento.dataAtendimento.split(" ")[0]}
          </Text>
        ): null}
        <Divider style={styles.divider} />
        {atendimento.atendimento.localAtendimento !== null ? (
          <Text appearance="hint" category="c4">
            Local atendimento: {atendimento.atendimento.localAtendimento.nome}
          </Text>
        ): null}
        <Divider style={styles.divider} />
        {atendimento.atendimento.localEncaminhado ? (
        <Text appearance="hint" category="c4">
          Local encaminhado: {atendimento.atendimento.localEncaminhado.nome}
        </Text>
        ): null}
        <Divider style={styles.divider} />
        {atendimento.atendimento.paciente.nome ? (
          <Text appearance="hint" category="c4">
            Nome do paciente: {atendimento.atendimento.paciente.nome}
          </Text> 
        ): null}
        <Divider style={styles.divider} />
        {atendimento.atendimento.tipoAtendimento ? (
          <Text appearance="hint" category="c4">
            Tipo de atendimento: {atendimento.atendimento.tipoAtendimento}
          </Text>
        ): null}
        <Divider style={styles.divider} />
        {atendimento.atendimento.usuario.nome ? (
          <Text appearance="hint" category="c4">
            Usuario responsavel: {atendimento.atendimento.usuario.nome}
          </Text>
        ): null}
      </View>
      {atendimento.fatoresDeRisco ? (
        <View style={styles.boxInfo}>
          <Text appearance="alternative" status="primary" category="h6">
            Fatores de risco
          </Text>
          {atendimento.fatoresDeRisco.map(({ nome }, i) => (
            <>
              <Divider style={styles.divider} />
              <Text key={i}>{nome}</Text>
            </>
          ))}
        </View>
      ): null}

      {atendimento.regioesLesoes ? (
        <View style={styles.boxInfo}>
          <Text appearance="alternative" status="primary" category="h6">
            Regiões das lesões
          </Text>
          {atendimento.regioesLesoes ? atendimento.regioesLesoes.map(({ regiaoBoca, lesao }, i) => (
            <View key={i}>
              <Lesoes
                imgRegiao={regiaoBoca.siglaRegiaoBoca.imagemBase64}
                title={regiaoBoca.nome}
                navigation={navigation}
              />
              <View style={styles.infoLesoes}>
                <Text appearance="hint" category="c4">
                  Lesao: {lesao.nome}
                </Text>
                <Divider style={styles.divider} />
                <Text appearance="hint" category="c4">
                  Tipo da lesao: {lesao.tipoLesao.nome}
                </Text>
              </View>
            </View>
          )): null}
        </View>
      ): null}
      {atendimento.procedimentos ? (
        <View style={styles.boxInfo}>
          <Text appearance="alternative" status="primary" category="h6">
            Procedimentos
          </Text>
          {atendimento.procedimentos.map(({ nome, anexo64, observacao, id }) => (
            <View key={id}>
              <Lesoes imgRegiao={anexo64} title={nome} navigation={navigation} />
              <View style={styles.infoLesoes}>
                <Text appearance="hint" category="c4">
                  Obs: {observacao}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ): null}
    </View>
  );
};

export default withStyles(ListHistorico, (theme) => ({
  primary: theme["color-primary-500"],
  primaryDark: theme["color-primary-900"],
  primaryLigth: theme["color-primary-400"],
  bgColor: theme["background-basic-color-2"],
  bgColorStrong: theme["background-basic-color-4"],
}));
