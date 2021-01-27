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
import {
  camera,
  close,
  user,
  lixeira,
  galeria,
  upload,
  calendar,
} from "../assets/Icons";
import { AtendimentosInterface } from "../utils/models/AtendimentosInterface";
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";
import axios from "axios";
import FormData from "form-data";

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
  //nome que chega da uri e deve ser usado pra acessar a imagem
  const [nameImage, setNameImage] = useState([]);

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
    imageContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      margin: 8,
    },
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    btnResult: {
      marginHorizontal: 36,
      marginVertical: 36,
    },
    miniBoxBtn: {
      alignItems: "center",
      backgroundColor: `${themedStyle.bgColorStrong}`,
      padding: 8,
      borderRadius: 8,
    },
    miniBoxCalendar: {
      alignItems: "center",
      backgroundColor: `${themedStyle.bgColorStrong}`,
      marginVertical: 8,
      paddingVertical: 8,
      borderRadius: 8,
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
    objResult.atendimento.dataAtendimento = moment().format(
      "YYYY-MM-DD HH:mm:ss"
    );

    for (let i in nameImage) {
      objResult.procedimentos[i].nomeArquivo = nameImage[i];
      delete objResult.procedimentos[i].anexo64;
    }

    let obj = {
      atendimento: {
        dataAtendimento: objResult.atendimento.dataAtendimento,
        id: objResult.atendimento.id,
        localAtendimentoId: objResult.atendimento.localAtendimento ? objResult.atendimento.localAtendimento.id : null,
        localEncaminhadoId: objResult.atendimento.localEncaminhado ? objResult.atendimento.localEncaminhado.id : null,
        pacienteId: objResult.atendimento.paciente.id,
        tipoAtendimento: objResult.atendimento.tipoAtendimento,
        usuarioId: objResult.atendimento.usuario.id 
      },
      confirmaRastreamento: true,
      diagnosticoFinal: diagnosticoFinal,
      procedimentos: objResult.procedimentos,
    };
    console.log(obj);
    console.log(JSON.stringify(obj));
    try {
      let resp = await apiFunc(
        objResult.atendimento.usuario.cpf,
        usuarioLogado.senhaUsuario
      ).post("/resultados/salvar", obj);
      alert("Enviado com sucesso");
    } catch (err) {
      console.log("erro ao salvar resultados >>>", err.response);
    } finally {
      setLoading(false);
    }
    return;
  }

  const setarObservacao = (texto, indice) => {
    let arr = objResult;
    // console.log(arr);
    arr.procedimentos[indice].observacao = texto;
    setObjResult(arr);
  };

  const setarNameImage = async (i) => {
    setLoading(true);
    let arrNameImage = nameImage;
    setNameImage(arrNameImage);

    await arrNameImage.map((e) => {
      if (e === nameImage[i]) {
        arrNameImage[i] = undefined;
      }
    });
    setNameImage(arrNameImage);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  async function enviaImagem(dataImage, i) {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", {
      type: "image/jpg",
      uri: dataImage.uri,
      name: "uploadImageResult",
    });
console.log('dataImage.uri.substr(30)', dataImage.uri.substr(30));
    apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario)
      .post(
        `anexo/uploadFile?cpf=${objResult.atendimento.paciente.cpf}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((response) => {
        console.log('response.data', response.data.name);
        let arrNameImage = nameImage;
        arrNameImage[i] = response.data;
        setNameImage(arrNameImage);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error >>>", error.response);
        setLoading(false);
        Alert.alert("Erro ao enviar imagem!");
      });
  }

  async function takePictureCamera() {
    if (camRef) {
      const options = { quality: 1, uri: true };
      const data = await camRef.current.takePictureAsync(options);
      setCanOpen(false);
      enviaImagem(data, indiceFoto);
    }
  }

  async function takePictureFiles(i) {
    try {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      // console.log(data);
      enviaImagem(data, i);
    } catch (E) {
      console.log(E);
    }
  }

  return (
    <PageContainer title="Enviar resultados" navigation={navigation}>
      <ScrollView>
        <Layout style={styles.container}>
          <View style={styles.boxInfo}>
            <Text>Anexe aqui os dados dos resultados:</Text>
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
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <View>
                          <Button
                            style={styles.button}
                            status="primary"
                            icon={camera}
                            appearance="ghost"
                            onPress={() => takePictureCamera()}
                          />
                        </View>
                        <View>
                          <Button
                            style={styles.button}
                            status="danger"
                            icon={close}
                            appearance="ghost"
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
                  <>
                    {nameImage[i] != undefined ? (
                      <>
                        <View style={styles.imageContainer}>
                          <Image
                            style={{
                              width: 300,
                              height: 300,
                            }}
                            source={{
                              uri: `http://200.137.215.35:9090/api/anexo/downloadFile/${nameImage[i]}`,
                            }}
                          />
                        </View>

                        <Button
                          style={[
                            styles.button,
                            { flexDirection: "row-reverse" },
                          ]}
                          onPress={() => setarNameImage(i)}
                          status="danger"
                          icon={lixeira}
                          size="small"
                        >
                          cancelar
                        </Button>
                        <Button onPress={() =>  console.log(nameImage[i])}>teste</Button>
                      </>
                    ) : (
                      <View
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          marginVertical: 10,
                        }}
                      >
                        <View>
                          <View style={styles.miniBoxBtn}>
                            <Button
                              appearance="outline"
                              onPress={() => {
                                setIndiceFoto(i);
                                setCanOpen(true);
                              }}
                              style={[
                                styles.button,
                                { flexDirection: "row-reverse" },
                              ]}
                              status="primary"
                              icon={camera}
                            />
                            <Text>camera</Text>
                          </View>
                        </View>
                        <View>
                          <View style={styles.miniBoxBtn}>
                            <Button
                              appearance="outline"
                              onPress={() => {
                                takePictureFiles(i);
                                setIndiceFoto(i);
                              }}
                              style={[
                                styles.button,
                                { flexDirection: "row-reverse" },
                              ]}
                              status="primary"
                              icon={galeria}
                            />
                            <Text>galeria</Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </>
                  <View style={styles.infoLesoes}>
                    {nome && (
                      <Text category="p2" appearance="hint">
                        Procedimento: {observacao}
                      </Text>
                    )}
                    {observacao ? (
                      <Text category="p2" appearance="hint">
                        Obs: {observacao}
                      </Text>
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
            <Text>Diagnóstico final:</Text>
            <Input
              style={{ marginVertical: 8 }}
              numberOfLines={2}
              onChangeText={(a) => {
                setDiagnosticoFinal(a);
              }}
            />
          </View>

          <View style={styles.boxInfo}>
            <Text
              style={{
                marginBottom: 4,
              }}
            >
              Retorno para:
            </Text>
            <View>
              <View style={styles.miniBoxCalendar}>
                <View style={{ width: "80%", marginVertical: 8 }}>
                  <View>
                    <CheckBox
                      text="Acompanhamento"
                      checked={activeAcomp}
                      onChange={(e) => {
                        setActiveAcomp(e);
                        setActiveTrat(!e);
                      }}
                    />
                  </View>
                  <View>
                    <Input
                      style={{ marginVertical: 8 }}
                      placeholder="Data sugerida acompanhamento"
                      icon={calendar}
                      value={dataSugeridaAcompanhamento || "escolha uma data"}
                      disabled={true}
                    />
                    <Button
                      disabled={!activeAcomp && activeTrat}
                      onPress={() => setPickerAcompVisible(true)}
                      size="small"
                      icon={calendar}
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

              <View style={styles.miniBoxCalendar}>
                <View style={{ width: "80%", marginVertical: 8 }}>
                  <View>
                    <CheckBox
                      text="Tratamento de lesão"
                      checked={activeTrat}
                      onChange={(e) => {
                        setActiveTrat(e);
                        setActiveAcomp(!e);
                      }}
                    />
                  </View>
                  <View>
                    <Input
                      style={{ marginVertical: 8 }}
                      placeholder="Data sugerida tratamento"
                      icon={calendar}
                      value={dataSugeridaTratamento || "escolha uma data"}
                      disabled={true}
                    />
                    <Button
                      disabled={!activeTrat && activeAcomp}
                      onPress={() => setPickerAcompVisible(true)}
                      size="small"
                      icon={calendar}
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
          </View>
          <Button
            appearance="outline"
            style={[styles.btnResult, { flexDirection: "row-reverse" }]}
            onPress={() => enviarPost()}
            icon={upload}
          >
            Enviar dados
          </Button>
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
