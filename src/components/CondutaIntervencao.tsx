import React, { useEffect } from "react";
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

import { View, StyleSheet, BackHandler, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { editText, calendar } from "../assets/Icons";
import moment from 'moment';
import LocaisContext from "../contexts/LocaisContext";
import IntervencaoContext from "../contexts/IntervencaoContext";
import BotaoContext from "../contexts/BotoesContext";
import { CommonActions } from "@react-navigation/native";
const HipoteseDiagnostico = ({ navigation, themedStyle = null }) => {
  const [value, setValue] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [activeCheckedAcompanhamento, setActiveCheckedAcompanhamento] = React.useState(false);
  const [activeCheckedTratamento, setActiveCheckedTratamento] = React.useState(false);
  const [checked, setChecked] = React.useState([false, false,false,false]);
  const {activeStepBtn, setActiveStepBtn} = React.useContext(BotaoContext);
  const [obs0, setObs0] = React.useState("");    
  const [obs1, setObs1] = React.useState("");    
  const [obs2, setObs2] = React.useState("");    
  const [obs3, setObs3] = React.useState("");    
  const {procedimento, setProcedimento} = React.useContext(IntervencaoContext)
  const [procedimentos, setProcedimentos] = React.useState([
    {nome: 'Biópsia incisional', observacao: ''},
    {nome: 'Biópsia exisional', observacao: ''},
    {nome: 'Citologia', observacao: ''},
    {nome: 'Outros', observacao: ''},
  ]);
  const { dataSugeridaAcompanhamento, dataSugeridaTratamento, setDataSugeridaAcompanhamento, setDataSugeridaTratamento } = React.useContext(LocaisContext);0
  const onCheckedChange = (index) => {
    setSelectedIndex(index);
  };

  function onCheckedChangeToggle(i) {
    let ch = [...checked];
    ch[i] = ch[i] == false ? true : false;
    setChecked(ch);
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Atenção", "Voltar agora te fará perder as informações. Para voltar um passo, utilize o botão voltar. \n\nDeseja prosseguir e cancelar procedimento?", [
        {
          text: "Voltar",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Desejo cancelar procedimento", onPress: () => {
              navigation.dispatch(
              CommonActions.reset({
                routes: [{ name: "Home" }],
              })
            );
          setActiveStepBtn(0);
        } }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  
  useEffect(() => {
    function setProced(){
      let arrObs = [obs0, obs1, obs2, obs3]
      console.log("checked", checked);
      let proced = [];
      for(let i in checked){
        if(checked[i] == true){
          procedimentos[i].observacao = arrObs[i];
          proced.push({nome: procedimentos[i].nome, observacao: procedimentos[i].observacao});
        }
      }
      console.log(proced);
      setProcedimento(proced);
    }
    setProced();

  }, [checked, obs0, obs1, obs2, obs3]);

  return (
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
                      onChange={()=>onCheckedChangeToggle(0)}
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
                      onChange={()=>onCheckedChangeToggle(1)}
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
                      onChange={()=>onCheckedChangeToggle(2)}
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
                      onChange={()=>onCheckedChangeToggle(3)}
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
                  <Datepicker
                    disabled={activeCheckedAcompanhamento ? false : true}
                    min={new Date("1900-12-25")}
                    date={new Date("2020-12-25")}
                    placeholder="Data de Nascimento"
                    onSelect={(a) =>{
                      console.log(a)
                      
                      let data = moment(a.toString()).format('YYYY-MM-DD HH:mm:ss')
                      
                      console.log(data)
                      setDataSugeridaAcompanhamento(data)

                      return a;

                    }
                    }
                    icon={calendar}
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
                  <Datepicker
                    disabled={activeCheckedTratamento ? false : true}
                    min={new Date("1900-12-25")}
                    date={new Date("2020-12-25")}
                    placeholder="Data de Nascimento"
                    onSelect={(a) => {
                      let data = moment(a.toString()).format('YYYY-MM-DD HH:mm:ss')

                      setDataSugeridaTratamento(data)

                      return a;

                    }
                      
                    }
                    icon={calendar}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
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
