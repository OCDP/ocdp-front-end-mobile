import React, { useEffect, useState, useContext } from "react";
import {
  useStyleSheet,
  Layout,
  Text,
  withStyles,
  Card,
  Input,
  Datepicker,
  Select,
  Autocomplete,
  CheckBox,
} from "@ui-kitten/components";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { View, StyleSheet, Button, BackHandler, Alert, KeyboardAvoidingView, TouchableHighlight } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { user, phone, calendar, search, add, clear } from "../assets/Icons";
import apiFunc from "../services/api";
import LocaisContext from "../contexts/LocaisContext";
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";
import NovoAcompContext from "../contexts/NovoAcompContext";
import BotaoContext from "../contexts/BotoesContext";
import PostFatoresContext from "../contexts/PostFatoresContext";
import { CommonActions } from "@react-navigation/native";
import CadastroCondutaClass from "../classes/CadastroCondutaClass";
import LesoesRegioesContext from "../contexts/LesoesRegioesContext";
import PacienteContext from "../contexts/PacienteContext";
import { useLoading } from "../contexts/AppContext";
import PageContainer from "./PageContainer";

const DATA = [
  {
    id: 1,
    title: "CAIS",
    releaseYear: 1977,
  },
  {
    id: 2,
    title: "POSTINHO",
    releaseYear: 1985,
  },
];

const CadastroConduta = ({ navigation, themedStyle = null }) => {
  const [
    activeCheckedAcompanhamento,
    setActiveCheckedAcompanhamento,
  ] = React.useState(false);
  const [activeCheckedTratamento, setActiveCheckedTratamento] = React.useState(
    false
  );
  const [value, setValue] = React.useState(null);
  const { usuarioLogado } = useContext(UsuarioLogadoContext);
  const { idNovoAcomp } = useContext(NovoAcompContext);
  const [tipoAtendido, setTipoAtendido] = React.useState(null);
  const [tipoEncaminhado, setTipoEncaminhado] = React.useState(null);
  const { postFatores } = React.useContext(PostFatoresContext);
  const {
    nomesLocaisAtendido,
    tiposLocaisAtendido,
    setNomesLocaisAtendido,
  } = useContext(LocaisContext);
  const { setBloqBotaoProximo } = useContext(BotaoContext);
  const {
    nomesLocaisEncaminhado,
    tiposLocaisEncaminhado,
    setNomesLocaisEncaminhado,
  } = useContext(LocaisContext);
  const {
    dataSugeridaAcompanhamento,
    dataSugeridaTratamento,
    setDataSugeridaAcompanhamento,
    setDataSugeridaTratamento,
  } = useContext(LocaisContext);
  const [nomesAtendidosSelect, setnomesAtendidosSelect] = React.useState("");
  const [nomesEncaminhadoSelect, setNomesEncaminhadoSelect] = React.useState(
    ""
  );
  const {
    acomp,
    bairro,
    cpf,
    cidade,
    dtNasci,
    email,
    endereco,
    id,
    setId,
    historico,
    listaFatores,
    nmMae,
    nome,
    sexo,
    telCell,
    telResp,
  } = useContext(PacienteContext);
  const [nomesAtendidosAll, setNomesAtendidosAll] = React.useState([]);
  const [nomesEncaminhadosAll, setNomesEncaminhadosAll] = React.useState([]);
  const [dataAcompState, setDataAcompState] = React.useState("");
  const [dataTratState, setDataTratState] = React.useState("");
  const [dataAtual, setDataAtual] = React.useState(null);
  const [datePickerVisibleTrat, setDatePickerVisibleTrat] = useState(false);
  const [datePickerVisibleAcomp, setDatePickerVisibleAcomp] = useState(false);
  const { lesoesRegioes } = useContext(LesoesRegioesContext);
  const [, setLoading] = useLoading();

  const { activeStepBtn, setActiveStepBtn } = React.useContext(BotaoContext);
  
  function verificaCadastroConsulta(){
    console.log(nomesLocaisAtendido, nomesLocaisEncaminhado)
    const resp = new CadastroCondutaClass(idNovoAcomp, nomesLocaisAtendido, nomesLocaisEncaminhado, dataSugeridaAcompanhamento, dataSugeridaTratamento).retornaValidacao();
    console.log("resp", resp)
    if (resp == "sucesso") {
      setarValores();
    }
  }

  function setarValores(){
  
    let arrObj = {
      atendimento: {
        dataAtendimento: moment().format("YYYY-MM-DD HH:mm:ss"),
        id: "",
        localAtendimentoId: nomesLocaisAtendido.id,
        localEncaminhadoId: nomesLocaisEncaminhado.id,
        pacienteId: id,
        tipoAtendimento: "ACOMPANHAMENTO",
        usuarioId: usuarioLogado.id
      },
        regioesLesoes: lesoesRegioes,
        dataSugeridaAcompanhamento:
          dataSugeridaAcompanhamento == undefined
            ? ""
            : dataSugeridaAcompanhamento,
        dataSugeridaTratamento:
          dataSugeridaTratamento == undefined ? "" : dataSugeridaTratamento,
        fatoresDeRisco: postFatores,
      };
      enviarPost(arrObj);
  }

  async function enviarPost(arrObj){
    try {
      setLoading(true)
      let postJson = JSON.stringify(arrObj);
      let resp = await apiFunc(
        usuarioLogado.cpf,
        usuarioLogado.senhaUsuario
      ).post("/acompanhamento/salvar", postJson);
      Alert.alert(
        'Enviado com sucesso',
        "Voltar para tela inicial",
        [
          {text: 'Ok', onPress: () => {
            navigation.dispatch(
              CommonActions.reset({
                routes: [{ name: "Home" }],
              })
            );
          }},
        ],
        {cancelable: false},
      );
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Problema de envio',
        "Voltar para tela inicial?",
        [
          {text: 'Sim', onPress: () => {
            navigation.dispatch(
              CommonActions.reset({
                routes: [{ name: "Home" }],
              })
            );
          }},
          {text: 'Tentar Novamente', style: 'cancel'},
          
        ],
        {cancelable: false},
      );
    }finally{
      setLoading(false)
    }
      
  }

  useEffect(() => {
    async function loadLocaisAtendido() {
      setnomesAtendidosSelect("");
      if (idNovoAcomp == 2) {
        setNomesLocaisAtendido({});
      }
      let url = `localAtendimento/byTipo/${tipoAtendido}`;
      try {
        await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario)
          .get(url)
          .then((resp) => {
            for (let i of resp.data) {
              i.text = i.nome;
            }
            setNomesAtendidosAll(resp.data);
          });
      } catch (err) {
        console.log(err);
      }
    }
    loadLocaisAtendido();
  }, [tipoAtendido]);

  useEffect(() => {
    async function loadLocaisAtendido() {
      setNomesLocaisEncaminhado({});
      setNomesEncaminhadoSelect("");
      let url = `localAtendimento/byTipo/${tipoEncaminhado}`;
      try {
        await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario)
          .get(url)
          .then((resp) => {
            for (let i of resp.data) {
              i.text = i.nome;
            }
            setNomesEncaminhadosAll(resp.data);
          });
      } catch (err) {
        console.log(err);
      }
    }
    loadLocaisAtendido();
  }, [tipoEncaminhado]);

  const onChangeText = async (query) => {
    setValue(query);
  };

  const clearInput = () => {
    setValue("");
  };

  const tipoAtendidoActions = (text) => {
    setTipoAtendido("");
    setTipoAtendido(text);
  };

  const nomeAtendidoActions = (text) => {
    setnomesAtendidosSelect(text);
    for (let i of nomesAtendidosAll) {
      if (i.text == text) {
        setNomesLocaisAtendido(i);
      }
    }
  };

  const tipoEncaminhadoActions = (text) => {
    setTipoEncaminhado("");
    setTipoEncaminhado(text);
  };

  const nomeEncaminhadoActions = (text) => {
    setNomesEncaminhadoSelect(text);
    for (let i of nomesEncaminhadosAll) {
      if (i.text == text) {
        setNomesLocaisEncaminhado(i);
      }
    }
  };

  const confirmarDataTratamento = (dt) => {
    setDatePickerVisibleTrat(false);
    setDataSugeridaTratamento(moment(dt).format("YYYY-MM-DD HH:mm:ss"));
    setDataTratState(moment(dt).format("DD/MM/YYYY"));
  };

  const confirmarDataAcompanhamento = (dt) => {
    setDatePickerVisibleAcomp(false);
    setDataSugeridaAcompanhamento(moment(dt).format("YYYY-MM-DD HH:mm:ss"));
    setDataAcompState(moment(dt).format("DD/MM/YYYY"));
  };

  const [dtNascString, setDtNascString] = useState("");

  useEffect(() => {
    async function setarBotao() {
      setBloqBotaoProximo(false);
      // if (
      //   (idNovoAcomp == 2 &&
      //     nomesLocaisAtendido.length == undefined &&
      //     nomesLocaisEncaminhado.length == undefined) ||
      //   (idNovoAcomp == 1 && nomesLocaisEncaminhado.length == undefined)
      // ) {
      //   setBloqBotaoProximo(false);
      // } else {
      //   setBloqBotaoProximo(true);
      // }
    }
    setarBotao();
  }, []);

  // useEffect(() => {
  //   async function setarBotao() {
  //     if (
  //       (idNovoAcomp == 2 &&
  //         nomesLocaisAtendido.length == undefined &&
  //         nomesLocaisEncaminhado.length == undefined) ||
  //       (idNovoAcomp == 1 && nomesLocaisEncaminhado.length == undefined)
  //     ) {
  //       setBloqBotaoProximo(false);
  //     } else {
  //       setBloqBotaoProximo(true);
  //     }
  //   }
  //   setarBotao();
  // }, [nomesLocaisAtendido, nomesLocaisEncaminhado]);

  return (
    <PageContainer
      title={acomp ? "Novo acompanhamento" : "Cadastro de Paciente"}
      navigation={navigation}
    >
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <View style={styles.view}>
          <View style={styles.picker}>
            <View style={{ flex: 0.02, flexDirection: 'row', paddingHorizontal: 20, paddingBottom: 10 }}>
              <View style={{ flex: 1, backgroundColor: "grey", borderWidth: 1, borderColor: 'black' }}>
              </View>
              <View style={{ flex: 1, backgroundColor: "grey", borderWidth: 1, borderColor: 'black' }}>
              </View>
              <View style={{ flex: 1, backgroundColor: "grey", borderWidth: 1, borderColor: 'black' }}>
              </View>
              <View style={{ flex: 1, backgroundColor: "grey", borderWidth: 1, borderColor: 'black' }}>
              </View>
              <View style={{ flex: 1, backgroundColor: "#1696B8", borderWidth: 1, borderColor: 'black' }}>
              </View>
            </View>
            <View style={{ flex: 1 }}>

              <Layout style={styles.container}>
                <ScrollView style={styles.container}>
                  {idNovoAcomp !== 1 ? (
                    <View style={styles.lineContent}>
                      <View style={styles.boxDatePicker}>
                        <View
                          style={{
                            marginHorizontal: 16,
                          }}
                        >
                          <View>
                            <Text appearance="hint">
                              Selecione o local em que está sendo atendido
                  </Text>
                          </View>
                          <View style={{ marginVertical: 8 }}>
                            <Select
                              data={tiposLocaisAtendido}
                              placeholder="Selecionar um tipo"
                              onSelect={(e) => tipoAtendidoActions(e["text"])}
                              selectedOption={{ text: tipoAtendido }}
                            />
                          </View>
                          <View>
                            <Select
                              disabled={tipoAtendido ? false : true}
                              data={nomesAtendidosAll}
                              placeholder="Local em que está sendo atendido"
                              onSelect={(e) => nomeAtendidoActions(e["text"])}
                              selectedOption={{ text: nomesAtendidosSelect }}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  ) : (
                      <></>
                    )}

                  <View style={styles.lineContent}>
                    <View style={styles.boxDatePicker}>
                      <View
                        style={{
                          marginHorizontal: 16,
                        }}
                      >
                        <View>
                          <Text appearance="hint">
                            Selecione o local para o qual será encaminhado
                </Text>
                        </View>
                        <View style={{ marginVertical: 8 }}>
                          <Select
                            data={tiposLocaisEncaminhado}
                            placeholder="Selecionar um tipo"
                            onSelect={(e) => tipoEncaminhadoActions(e["text"])}
                            selectedOption={{ text: tipoEncaminhado }}
                          />
                        </View>
                        <View>
                          <Select
                            disabled={tipoEncaminhado ? false : true}
                            data={nomesEncaminhadosAll}
                            placeholder="Local que será encaminhado"
                            onSelect={(e) => nomeEncaminhadoActions(e["text"])}
                            selectedOption={{ text: nomesEncaminhadoSelect }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>

                  <View>
                    <View style={styles.lineContent}>
                      <View style={styles.boxDatePicker}>
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
                              checked={activeCheckedAcompanhamento}
                              onChange={setActiveCheckedAcompanhamento}
                            />
                          </View>
                          <View>
                            <Input
                              placeholder="Data sugerida acompanhamento"
                              icon={user}
                              value={dataSugeridaAcompanhamento}
                              disabled={true}
                            />
                            <Button
                              disabled={activeCheckedAcompanhamento ? false : true}
                              title="Escolher data"
                              onPress={() => setDatePickerVisibleAcomp(true)}
                            />
                            <DateTimePickerModal
                              cancelTextIOS="cancelar"
                              confirmTextIOS="confirmar"
                              locale="pt-BR"
                              headerTextIOS="Escolha uma data"
                              isVisible={datePickerVisibleAcomp}
                              mode="date"
                              onConfirm={(a) => confirmarDataAcompanhamento(a)}
                              onCancel={() => setDatePickerVisibleAcomp(false)}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.lineContent}>
                      <View style={styles.boxDatePicker}>
                        <View
                          style={{
                            marginHorizontal: 16,
                          }}
                        >
                          <View style={{ marginVertical: 8 }}>
                            <CheckBox
                              text="Tratamento de lesão"
                              checked={activeCheckedTratamento}
                              onChange={setActiveCheckedTratamento}
                            />
                          </View>
                          <View>
                            <Input
                              placeholder="Data sugerida tratamento"
                              icon={user}
                              value={dataTratState}
                              disabled={true}
                            />
                            <Button
                              disabled={activeCheckedTratamento ? false : true}
                              title="Escolher data"
                              onPress={() => setDatePickerVisibleTrat(true)}
                            />
                            <DateTimePickerModal
                              cancelTextIOS="cancelar"
                              confirmTextIOS="confirmar"
                              locale="pt-BR"
                              headerTextIOS="Escolha uma data"
                              isVisible={datePickerVisibleTrat}
                              mode="date"
                              onConfirm={(a) => confirmarDataTratamento(a)}
                              onCancel={() => setDatePickerVisibleTrat(false)}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </Layout>
            </View>
            <View style={{ flex: 0.05, flexDirection: 'row', marginBottom: 20 }}>
              <View style={{ flex: 1, marginHorizontal: 10 }}>
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() => navigation.navigate("MapeamentoSintomas", { navigation })} style={{ backgroundColor: "#1696B8", paddingVertical: 10 }}>
                  <Text style={{ fontSize: 16, textAlign: 'center', color: 'white' }}>Voltar</Text>
                </TouchableHighlight>
              </View>
              <View style={{ flex: 1, marginHorizontal: 10 }}>
                <TouchableHighlight onPress={() => verificaCadastroConsulta()} style={{ backgroundColor: "#09527C", paddingVertical: 10 }}>
                  <Text style={{ fontSize: 16, textAlign: 'center', color: 'white' }}>Enviar</Text>
                </TouchableHighlight>
              </View>
            </View>

          </View>
        </View>
      </KeyboardAvoidingView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  lineContent: {
    flex:1,
    width: "100%",
    marginVertical: 8,
  },
  heightInput: {
    height: 40,
  },
  picker: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  view: {
    flex: 1,
    flexDirection: "column",
  },
  boxDatePicker: {
    marginHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 8,
    shadowRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.1,
  },
  button: {
    marginHorizontal: 16,
  },
  
});

export default withStyles(CadastroConduta, (theme) => ({
  primary: theme["color-primary-500"],
  primaryDark: theme["color-primary-900"],
  primaryLigth: theme["color-primary-400"],
}));
