import React, { useContext, useState, useEffect, useRef } from "react";
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
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { camera, close, user } from "../assets/Icons";
import { AtendimentosInterface } from "../utils/models/AtendimentosInterface";
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";
import axios from "axios";

const CadastrarResultados = ({ navigation, themedStyle = null }) => {
  const { atendimento, setAtendimento } = useContext(AtendimentoContext);
  const { usuarioLogado } = useContext(UsuarioLogadoContext);
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
  const camRef = useRef(null);
  const [diagnosticoFinal, setDiagnosticoFinal] = useState("");
  const [indiceFoto, setIndiceFoto] = useState(null);
  const [objResult, setObjResult] = useState<AtendimentosInterface>({});

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

  useEffect(() => {
    function setObjResultado() {
      setObjResult(atendimento);
    }
    setObjResultado();
  }, []);

  async function enviarPost() {
    setLoading(true);
    objResult.atendimento.tipoAtendimento = "RESULTADOS";
    objResult.atendimento.localAtendimento = null;
    objResult.atendimento.localEncaminhado = null;
    objResult.atendimento.dataAtendimento = moment().format(
      "YYYY-MM-DD HH:mm:ss"
    );
    let obj = {
      atendimento: objResult.atendimento,
      confirmaRastreamento: true,
      diagnosticoFinal: diagnosticoFinal,
      procedimentos: objResult.procedimentos,
    };
    // console.log(obj);
    let resp = apiFunc(
      objResult.atendimento.usuario.cpf,
      usuarioLogado.senhaUsuario
    )
      .post("/resultados/salvar", obj)
      .then(() => {
        Alert.alert("Registros enviadas com sucesso!");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("nao foi possivel enviar os registros!", err);
      })
      .finally(() => {
        setLoading(false);
      });
    return;
  }

  const setarObservacao = (texto, indice) => {
    let arr = objResult;
    // console.log(arr);
    arr.procedimentos[indice].observacao = texto;
    setObjResult(arr);
  };

  const setarImagem = (data, indice) => {
    let arr = objResult;
    // console.log(arr);
    arr.procedimentos[indice].anexo64 = data;
    setObjResult(arr);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  async function enviaImagem(dataImage) {
    const formData = new FormData();
    formData.append("file", dataImage.uri);
    formData.append("type", "image/jpg");
    formData.append("name", dataImage.uri.split("/").pop());
    apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario)
      .post(`/anexo/uploadFile?cpf=${objResult.atendimento.usuario.cpf}`, {
        data: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("resposta >>>", response);
      })
      .catch((response) => {
        console.log("erro catch", response);
      });
  }

  async function takePictureCamera() {
    if (camRef) {
      const options = { quality: 1, uri: true };
      const data = await camRef.current.takePictureAsync(options);
      setCanOpen(false);
      // console.log("indiceFoto", indiceFoto)
      // setarImagem(data.base64, indiceFoto);
      enviaImagem(data);
    }
  }

  async function takePictureFiles() {
    try {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(data);
      enviaImagem(data);
    } catch (E) {
      console.log(E);
    }
  }

  return (
    <PageContainer title="Enviar resultados" navigation={navigation}>
      <ScrollView>
        <Layout style={styles.container}>
          <View style={styles.boxInfo}>
            <Text>Envie os dados dos resultados:</Text>
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
                    width: 400,
                    height: 500,
                    padding: 16,
                  }}
                  type={type}
                  ref={camRef}
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
                        flex: 1,
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
                            onPress={() => takePictureCamera()}
                          />
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
              ({ nome, anexo64, observacao, id }, i) => (
                <View key={id}>
                  {anexo64 ? (
                    <Lesoes
                      title={nome}
                      navigation={navigation}
                      imgRegiao={anexo64}
                    />
                  ) : (
                    <>
                      <Button
                        style={{ marginHorizontal: 32 }}
                        onPress={() => {
                          setIndiceFoto(i);
                          setCanOpen(true);
                        }}
                      >{`tirar foto ${nome}`}</Button>
                      <Button
                        style={{ marginHorizontal: 32, marginTop: 8 }}
                        onPress={() => {
                          takePictureFiles();
                          setIndiceFoto(i);
                        }}
                      >
                        abrir arquivos
                      </Button>
                    </>
                  )}
                  <View style={styles.infoLesoes}>
                    {nome && <Text>Nome procedimento: {observacao}</Text>}
                    {observacao ? (
                      <Text>Obs: {observacao}</Text>
                    ) : (
                      <Input
                        onChangeText={(a) => {
                          console.log(a, i);
                          setarObservacao(a, i);
                        }}
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
              // appearance="alternative"
              // status="primary"
              // category="h6"
            >
              Diagnóstico final:
            </Text>
            <Input
              numberOfLines={2}
              onChangeText={(a) => {
                console.log(a);
                setDiagnosticoFinal(a);
              }}
            />
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
                  // appearance="hint"
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
          <Button onPress={() => enviarPost()}>Enviar resultado</Button>
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
