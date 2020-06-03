import React, { useContext, useMemo, useEffect } from "react";
import { View } from "react-native";
import {
  useStyleSheet,
  Text,
  withStyles,
  Button,
  Divider,
} from "@ui-kitten/components";
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";
import AtendimentoContext from "../contexts/AtendimentosContext";
import Lesoes from "./CadastroPaciente/Lesoes";
import moment from "moment";
import { setaCadastrar } from "../assets/Icons";

const ListHistorico = ({ navigation, themedStyle = null }) => {
  const { atendimento } = useContext(AtendimentoContext);
  const { usuarioLogado } = useContext(UsuarioLogadoContext);

  const styles = useStyleSheet({
    container: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      marginBottom: 30,
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
    btnResult: {
      paddingVertical: 12,
      marginHorizontal: 36,
    },
  });

  const enviarResult = useMemo(() => {
    return (
      usuarioLogado.nivelAtencao === "SECUNDARIA" &&
      atendimento.atendimento.tipoAtendimento === "INTERVENCAO"
    );
  }, [atendimento]);

  return (
    <View style={styles.container}>
      <View style={styles.boxInfo}>
        <Text appearance="alternative" status="primary" category="h6">
          Dados do atendimento | ID: {atendimento.atendimento.id}
        </Text>
        <Divider style={styles.divider} />
        {atendimento.atendimento.dataAtendimento && (
          <>
            <Text appearance="hint" category="c4">
              Data:{" "}
              {moment(
                atendimento.atendimento.dataAtendimento.split(" ")[0]
              ).format("DD/MM/Y")}
            </Text>
            <Divider style={styles.divider} />
          </>
        )}
        {atendimento.atendimento.localAtendimento !== null && (
          <>
            <Text appearance="hint" category="c4">
              Local atendimento: {atendimento.atendimento.localAtendimento.nome}
            </Text>
            <Divider style={styles.divider} />
          </>
        )}
        {atendimento.atendimento.localEncaminhado && (
          <>
            <Text appearance="hint" category="c4">
              Local encaminhado: {atendimento.atendimento.localEncaminhado.nome}
            </Text>
            <Divider style={styles.divider} />
          </>
        )}
        {atendimento.atendimento.paciente.nome && (
          <>
            <Text appearance="hint" category="c4">
              Nome do paciente: {atendimento.atendimento.paciente.nome}
            </Text>
            <Divider style={styles.divider} />
          </>
        )}
        {atendimento.atendimento.tipoAtendimento && (
          <>
            <Text appearance="hint" category="c4">
              Tipo de atendimento: {atendimento.atendimento.tipoAtendimento}
            </Text>
            <Divider style={styles.divider} />
          </>
        )}
        {atendimento.atendimento.usuario.nome && (
          <Text appearance="hint" category="c4">
            Usuario responsavel: {atendimento.atendimento.usuario.nome}
          </Text>
        )}
      </View>
      {atendimento.fatoresDeRisco && (
        <View style={styles.boxInfo}>
          <Text appearance="alternative" status="primary" category="h6">
            Fatores de risco
          </Text>
          {atendimento.fatoresDeRisco.map(({ nome }, i) => (
            <View key={i}>
              <Divider style={styles.divider} />
              <Text>{nome}</Text>
            </View>
          ))}
        </View>
      )}

      {atendimento.regioesLesoes && (
        <View style={styles.boxInfo}>
          <Text appearance="alternative" status="primary" category="h6">
            Regiões das lesões
          </Text>
          {atendimento.regioesLesoes &&
            atendimento.regioesLesoes.map(({ regiaoBoca, lesao }, i) => (
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
            ))}
        </View>
      )}

      {atendimento.procedimentos ? (
        <View style={styles.boxInfo}>
          <Text appearance="alternative" status="primary" category="h6">
            Procedimentos:
          </Text>
          {atendimento.procedimentos.map(
            ({ nome, anexo64, nomeArquivo, observacao, id }) => (
              <View key={id}>
                {anexo64 || nomeArquivo ? (
                  <Lesoes
                    nomeArquivo={nomeArquivo.split(" ")[0]}
                    tipoAtendimento={atendimento.atendimento.tipoAtendimento}
                    title={nome}
                    navigation={navigation}
                  />
                ) : null}

                <View style={styles.infoLesoes}>
                  {observacao ? (
                    <Text appearance="hint" category="c4">
                      Obs: {observacao}
                    </Text>
                  ) : null}
                </View>
              </View>
            )
          )}
        </View>
      ) : null}

      {enviarResult && (
        <View style={styles.btnResult}>
          <Button
            appearance="outline"
            style={{ flexDirection: "row-reverse" }}
            onPress={() => {
              navigation.navigate("CadastrarResultados");
            }}
            icon={setaCadastrar}
          >
            Cadastrar resultados
          </Button>
        </View>
      )}
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
