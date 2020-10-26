import React, { useEffect, useContext } from "react";
import {
  Layout,
  Text,
  withStyles,
  Input,
  RadioGroup,
  Radio,
  Toggle,
  Datepicker,
  CheckBox,
} from "@ui-kitten/components";

import { View, StyleSheet, BackHandler, Alert, Button } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ScrollView } from "react-native-gesture-handler";
import { editText, calendar, user } from "../assets/Icons";
import moment from "moment";
import LocaisContext from "../contexts/LocaisContext";
import IntervencaoContext from "../contexts/IntervencaoContext";
import BotaoContext from "../contexts/BotoesContext";
import { CommonActions } from "@react-navigation/native";
import PacienteContext from "../contexts/PacienteContext";
import CondutaIntervencaoClass from "../classes/CondutaIntervencaoClass";
const HipoteseDiagnostico = ({ navigation, themedStyle = null }) => {
  const [value, setValue] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [
    activeCheckedAcompanhamento,
    setActiveCheckedAcompanhamento,
  ] = React.useState(false);
  const [activeCheckedTratamento, setActiveCheckedTratamento] = React.useState(
    false
  );
  const [checked, setChecked] = React.useState([false, false, false, false]);
  const { activeStepBtn, setActiveStepBtn } = React.useContext(BotaoContext);
  const { cpf } = React.useContext(PacienteContext);
  const [obs0, setObs0] = React.useState("");
  const [obs1, setObs1] = React.useState("");
  const [obs2, setObs2] = React.useState("");
  const [obs3, setObs3] = React.useState("");
  const { procedimento, setProcedimento } = React.useContext(
    IntervencaoContext
  );
  const [dataAcompState, setDataAcompState] = React.useState("");
  const [dataTratState, setDataTratState] = React.useState("");
  const { setBloqBotaoProximo } = useContext(BotaoContext);
  const [procedimentos, setProcedimentos] = React.useState([
    { nome: "Biópsia incisional", observacao: "" },
    { nome: "Biópsia exisional", observacao: "" },
    { nome: "Citologia", observacao: "" },
    { nome: "Outros", observacao: "" },
  ]);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const {
    dataSugeridaAcompanhamento,
    dataSugeridaTratamento,
    setDataSugeridaAcompanhamento,
    setDataSugeridaTratamento,
  } = React.useContext(LocaisContext);
  0;
  const onCheckedChange = (index) => {
    setSelectedIndex(index);
  };

  const confirmarDataTratamento = (dt) => {
    hideDatePicker();
    setDataSugeridaTratamento(moment(dt).format("YYYY-MM-DD HH:mm:ss"));
    setDataTratState(moment(dt).format("DD/MM/YYYY"));
  };

  const confirmarDataAcompanhamento = (dt) => {
    hideDatePicker();
    setDataSugeridaAcompanhamento(moment(dt).format("YYYY-MM-DD HH:mm:ss"));
    setDataAcompState(moment(dt).format("DD/MM/YYYY"));
  };
  
  function verificaCondutaIntervencao() {
    const resp = new CondutaIntervencaoClass(procedimento, dataSugeridaAcompanhamento, dataSugeridaTratamento).retornaValidacao();
    console.log("resp", resp)
    if (resp == "sucesso") {
      navigation.navigate("CondutaIntervencao", { navigation: navigation });
    // }
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  useEffect(() => {
    async function setarBotao() {
      if (procedimento.length > 0) {
        setBloqBotaoProximo(false);
      } else {
        setBloqBotaoProximo(true);
      }
    }
    setarBotao();
  }, [procedimento]);

  function onCheckedChangeToggle(i) {
    let ch = [...checked];
    ch[i] = ch[i] == false ? true : false;
    setChecked(ch);
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  useEffect(() => {
    function setProced() {
      let arrObs = [obs0, obs1, obs2, obs3];
      let proced = [];
      for (let i in checked) {
        if (checked[i] == true) {
          procedimentos[i].observacao = arrObs[i];
          proced.push({
            nome: procedimentos[i].nome,
            observacao: procedimentos[i].observacao,
          });
        }
      }
      setProcedimento(proced);
    }
    setProced();
  }, [checked, obs0, obs1, obs2, obs3]);

  return (
    <PageContainer
      title={acomp ? "Novo acompanhamento" : "Cadastro de Paciente"}
      navigation={navigation}
    >
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <View style={styles.view}>
          <View style={styles.picker}>
            <View style={{ flex: 0.02, flexDirection: 'row', paddingHorizontal: 20, paddingBottom: 10 }}>
              <View style={{ flex: 1, backgroundColor: "#1696B8", borderWidth: 1, borderColor: 'black' }}>
              </View>
              <View style={{ flex: 1, backgroundColor: "white", borderWidth: 1, borderColor: 'black' }}>
              </View>
              <View style={{ flex: 1, backgroundColor: "white", borderWidth: 1, borderColor: 'black' }}>
              </View>
              <View style={{ flex: 1, backgroundColor: "white", borderWidth: 1, borderColor: 'black' }}>
              </View>
              <View style={{ flex: 1, backgroundColor: "white", borderWidth: 1, borderColor: 'black' }}>
              </View>
            </View>
            <View style={{ flex: 1 }}>

    <Layout style={styles.container}>
      <ScrollView style={styles.container}>
        <View>
          <View>
            <View style={styles.divider}>
              <View style={styles.contentBox}>
                <View>
                  <Text appearance="hint" style={{ marginBottom: 16 }}>
                    Procedimentos
                  </Text>
                </View>
                <View style={{ marginBottom: 8 }}>
                  <Text appearance="hint" category="h6">
                    Biópsia
                  </Text>
                </View>
                <View style={styles.toggleInit}>
                  <View style={{ marginBottom: 4 }}>
                    <Toggle
                      text={`Biópsia incisonal: ${checked[0]}`}
                      checked={checked[0]}
                      onChange={() => onCheckedChangeToggle(0)}
                    />
                  </View>
                  <View style={{ width: "100%" }}>
                    <Input
                      disabled={checked[0] ? false : true}
                      icon={editText}
                      size="large"
                      placeholder="Observação biópsia incisonal"
                      value={obs0}
                      onChangeText={setObs0}
                    />
                  </View>
                </View>
                <View style={styles.toggleInit}>
                  <View style={{ marginBottom: 4 }}>
                    <Toggle
                      text={`Biópsia exisional: ${checked[1]}`}
                      checked={checked[1]}
                      onChange={() => onCheckedChangeToggle(1)}
                    />
                  </View>
                  <View style={{ width: "100%" }}>
                    <Input
                      disabled={checked[1] ? false : true}
                      icon={editText}
                      size="large"
                      placeholder="Observação biópsia exisional"
                      value={obs1}
                      onChangeText={setObs1}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.contentBox}>
                <View style={{ marginBottom: 8 }}>
                  <Text appearance="hint" category="h6">
                    Citologia
                  </Text>
                </View>
                <View style={styles.toggleInit}>
                  <View style={{ marginBottom: 4 }}>
                    <Toggle
                      text={`Citologia: ${checked[2]}`}
                      checked={checked[2]}
                      onChange={() => onCheckedChangeToggle(2)}
                    />
                  </View>
                  <View style={{ width: "100%" }}>
                    <Input
                      disabled={checked[2] ? false : true}
                      icon={editText}
                      size="large"
                      placeholder="Observação citologia"
                      value={obs2}
                      onChangeText={setObs2}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.contentBox}>
                <View style={{ marginBottom: 8 }}>
                  <Text appearance="hint" category="h6">
                    Outros
                  </Text>
                </View>
                <View style={styles.toggleInit}>
                  <View style={{ marginBottom: 4 }}>
                    <Toggle
                      text={`Outros: ${checked[3]}`}
                      checked={checked[3]}
                      onChange={() => onCheckedChangeToggle(3)}
                    />
                  </View>
                  <View style={{ width: "100%" }}>
                    <Input
                      disabled={checked[3] ? false : true}
                      icon={editText}
                      size="large"
                      placeholder="Observação outros"
                      value={obs3}
                      onChangeText={setObs3}
                    />
                  </View>
                </View>
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
                    placeholder="Data sugerida tratamento"
                    icon={user}
                    value={dataAcompState}
                    disabled={true}
                  />
                  <Button
                    disabled={activeCheckedAcompanhamento ? false : true}
                    title="Escolher data"
                    onPress={showDatePicker}
                  />
                  <DateTimePickerModal
                    cancelTextIOS="cancelar"
                    confirmTextIOS="confirmar"
                    locale="pt-BR"
                    headerTextIOS="Escolha uma data"
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={(a) => confirmarDataAcompanhamento(a)}
                    onCancel={() => hideDatePicker}
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
                    onPress={showDatePicker}
                  />
                  <DateTimePickerModal
                    cancelTextIOS="cancelar"
                    confirmTextIOS="confirmar"
                    locale="pt-BR"
                    headerTextIOS="Escolha uma data"
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={(a) => confirmarDataTratamento(a)}
                    onCancel={() => hideDatePicker}
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
                  onPress={() => console.log("alo")} style={{ backgroundColor: "#1696B8", paddingVertical: 10 }}>
                  <Text style={{ fontSize: 16, textAlign: 'center', color: 'white' }}>Voltar</Text>
                </TouchableHighlight>
              </View>
              <View style={{ flex: 1, marginHorizontal: 10 }}>
                <TouchableHighlight onPress={() => verificaCondutaIntervencao()} style={{ backgroundColor: "#09527C", paddingVertical: 10 }}>
                  <Text style={{ fontSize: 16, textAlign: 'center', color: 'white' }}>Avançar</Text>
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
  divider: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
  lineContent: {
    width: "100%",
    marginVertical: 2,
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
  contentBox: {
    marginLeft: 16,
    marginBottom: 16,
  },
  toggleInit: {
    alignContent: "flex-start",
    alignItems: "flex-start",
  },
});

export default withStyles(HipoteseDiagnostico, (theme) => ({
  primary: theme["color-primary-500"],
  primaryDark: theme["color-primary-900"],
  primaryLigth: theme["color-primary-400"],
}));
