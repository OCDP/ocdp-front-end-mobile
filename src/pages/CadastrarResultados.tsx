import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  Layout,
  withStyles,
  useStyleSheet,
  Button,
  Input,
  Modal,
  CheckBox,
  Divider,
} from "@ui-kitten/components";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PageContainer from "../components/PageContainer";
import { View, Alert, Image } from "react-native";
import AtendimentoContext from "../contexts/AtendimentosContext";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useLoading } from "../contexts/AppContext";
import apiFunc from "../services/api";
import Lesoes from "../components/CadastroPaciente/Lesoes";
import Constants from "expo-constants";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { camera, close, user } from "../assets/Icons";

const CadastrarResultados = ({ navigation, themedStyle = null }) => {
  const { atendimento } = useContext(AtendimentoContext);
  const [, setLoading] = useLoading();
  const [hasPermission, setHasPermission] = useState(null);
  const [canOpen, setCanOpen] = useState(null);
  const [activeAcomp, setActiveAcomp] = useState(false);
  const [activeTrat, setActiveTrat] = useState(false);
  const [dataSugeridaAcompanhamento, setDataSugeridaAcompanhamento] = useState(
    null
  );
  const [dataSugeridaTratamento, setDataSugeridaTratamento] = useState(null);
  const [pickerAcompVisible, setPickerAcompVisible] = useState(false);
  const [pickerAcompTrat, setPickerAcompTrat] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const styles = useStyleSheet({
    container: {
      flex: 1,
      width: "100%",
      paddingBottom: 40,
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
      marginBottom: 12,
      marginTop: 8,
    },
    infoLesoes: {
      paddingLeft: 16,
      paddingTop: 8,
    },
    images: {
      width: 150,
      height: 150,
      borderColor: "black",
      borderWidth: 1,
      marginHorizontal: 3,
    },
    button: {
      margin: 8,
    },
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  });

  const confirmarDataTratamento = (dt) => {
    setPickerAcompTrat(false);
    setDataSugeridaTratamento(moment(dt).format("YYYY-MM-DD HH:mm:ss"));
  };

  const confirmarDataAcompanhamento = (dt) => {
    setPickerAcompVisible(false);
    setDataSugeridaAcompanhamento(moment(dt).format("YYYY-MM-DD HH:mm:ss"));
  };

  async function enviarPost(atendimento, password) {
    setLoading(true);
    let resp = apiFunc(atendimento, password)
      .post("/doutor/", {})
      .then(() => {
        Alert.alert("Registros enviadas com sucesso!");
      })
      .catch(() => {
        Alert.alert("nao foi possivel enviar os registros!");
      })
      .finally(() => {
        setLoading(false);
      });
    return;
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    let camera;
    if (camera) {
      const options = { quality: 1, base64: true };
      const data = await camera.takePictureAsync(options);
      console.log(data);
    }
  };

  return (
    <PageContainer title="Enviar resultados" navigation={navigation}>
      <ScrollView>
        <Layout style={styles.container}>
          <View style={styles.boxInfo}>
            <Text appearance="alternative" status="primary" category="h6">
              Envie os dados dos resultados:
            </Text>
            {hasPermission && canOpen ? (
              <Modal
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setCanOpen(false)}
                visible={canOpen}
              >
                <Camera
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 300,
                    height: 500,
                    padding: 16,
                  }}
                  type={type}
                >
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "transparent",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        flex: 0.1,
                        alignSelf: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <View>
                          <Button
                            style={styles.button}
                            status="primary"
                            icon={camera}
                            onPress={() => takePicture()}
                          />
                        </View>
                        <View>
                          <Button
                            style={styles.button}
                            status="danger"
                            icon={close}
                            onPress={() => setCanOpen(false)}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </Camera>
              </Modal>
            ) : (
              <View>
                <Text appearance="alternative">sem acesso a camera!</Text>
              </View>
            )}

            {atendimento.procedimentos.map(
              ({ nome, anexo64, observacao, id }) => (
                <View key={id}>
                  {anexo64 ? (
                    <Lesoes
                      title={nome}
                      navigation={navigation}
                      imgRegiao={anexo64}
                    />
                  ) : (
                    <Button
                      style={{ marginHorizontal: 32 }}
                      onPress={() => setCanOpen(true)}
                    >{`Selecione a imagem de ${nome}`}</Button>
                  )}
                  <View style={styles.infoLesoes}>
                    {nome && (
                      <Text appearance="hint" category="c4">
                        Nome procedimento: {observacao}
                      </Text>
                    )}
                    {observacao ? (
                      <Text appearance="hint" category="c4">
                        Obs: {observacao}
                      </Text>
                    ) : (
                      <Input
                        placeholder={`Insira a observacao sobre ${nome}`}
                      />
                    )}
                  </View>
                  <Divider style={styles.divider} />
                </View>
              )
            )}
          </View>
          <View style={styles.boxInfo}>
            <Text
              style={{ paddingBottom: 16 }}
              appearance="alternative"
              status="primary"
              category="h6"
            >
              Diagnóstico final:
            </Text>
            <Input numberOfLines={2} />
          </View>

          <View style={styles.boxInfo}>
            <View>
              <View
                style={{
                  marginHorizontal: 16,
                }}
              >
                <Text
                  style={{
                    marginBottom: 4,
                  }}
                  appearance="hint"
                >
                  Retorno para:
                </Text>
                <View style={{ marginVertical: 8 }}>
                  <CheckBox
                    text="Acompanhamento"
                    checked={activeAcomp}
                    onChange={setActiveAcomp}
                  />
                </View>
                <View>
                  <Input
                    placeholder="Data sugerida acompanhamento"
                    icon={user}
                    value={dataSugeridaAcompanhamento || "escolha uma data"}
                    disabled={true}
                  />
                  <Button
                    disabled={!activeAcomp}
                    title="Escolher data"
                    onPress={() => setPickerAcompVisible(true)}
                  >
                    Abrir calendário
                  </Button>
                  <DateTimePickerModal
                    cancelTextIOS="cancelar"
                    confirmTextIOS="confirmar"
                    locale="pt-BR"
                    headerTextIOS="Escolha uma data"
                    isVisible={pickerAcompVisible}
                    mode="date"
                    onConfirm={(a) => confirmarDataAcompanhamento(a)}
                    onCancel={() => setPickerAcompVisible(false)}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.boxInfo}>
            <View>
              <View
                style={{
                  marginHorizontal: 16,
                }}
              >
                <View style={{ marginVertical: 8 }}>
                  <CheckBox
                    text="Tratamento de lesão"
                    checked={activeTrat}
                    onChange={setActiveTrat}
                  />
                </View>
                <View>
                  <Input
                    placeholder="Data sugerida tratamento"
                    icon={user}
                    value={dataSugeridaTratamento || "escolha uma data"}
                    disabled={true}
                  />
                  <Button
                    disabled={!activeTrat}
                    title="Escolher data"
                    onPress={() => setPickerAcompVisible(true)}
                  >
                    Abrir calendário
                  </Button>
                  <DateTimePickerModal
                    cancelTextIOS="cancelar"
                    confirmTextIOS="confirmar"
                    locale="pt-BR"
                    headerTextIOS="Escolha uma data"
                    isVisible={pickerAcompTrat}
                    mode="date"
                    onConfirm={(a) => confirmarDataTratamento(a)}
                    onCancel={() => setPickerAcompTrat(false)}
                  />
                </View>
              </View>
            </View>
          </View>
        </Layout>
      </ScrollView>
    </PageContainer>
  );
};

export default withStyles(CadastrarResultados, (theme) => ({
  primary: theme["color-primary-500"],
  primaryDark: theme["color-primary-900"],
  primaryLigth: theme["color-primary-400"],
  bgColor: theme["background-basic-color-2"],
  bgColorStrong: theme["background-basic-color-4"],
}));
