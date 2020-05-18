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
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { Ionicons } from "@expo/vector-icons";
import moment from 'moment';
import { View, StyleSheet, Button, BackHandler, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { user, phone, calendar, search, add, clear } from "../assets/Icons";
import apiFunc from "../services/api";
import LocaisContext from "../contexts/LocaisContext";
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";
import NovoAcompContext from "../contexts/NovoAcompContext";
import BotaoContext from "../contexts/BotoesContext";
import PostFatoresContext from "../contexts/PostFatoresContext";
import { CommonActions } from "@react-navigation/native";

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
  const [activeCheckedAcompanhamento, setActiveCheckedAcompanhamento] = React.useState(false);
  const [activeCheckedTratamento, setActiveCheckedTratamento] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const {usuarioLogado} = useContext(UsuarioLogadoContext);
  const { idNovoAcomp } = useContext(NovoAcompContext)
  const [tipoAtendido, setTipoAtendido] = React.useState(null);
  const [tipoEncaminhado, setTipoEncaminhado] = React.useState(null);
  const { postFatores } = React.useContext(PostFatoresContext)
  const { nomesLocaisAtendido, tiposLocaisAtendido, setNomesLocaisAtendido } = useContext(LocaisContext);
  const { setBloqBotaoProximo } = useContext(BotaoContext)
  const { nomesLocaisEncaminhado, tiposLocaisEncaminhado, setNomesLocaisEncaminhado } = useContext(LocaisContext);
  const { dataSugeridaAcompanhamento, dataSugeridaTratamento, setDataSugeridaAcompanhamento, setDataSugeridaTratamento } = useContext(LocaisContext);
  const [nomesAtendidosSelect, setnomesAtendidosSelect] = React.useState('');
  const [nomesEncaminhadoSelect, setNomesEncaminhadoSelect] = React.useState('');
  const [nomesAtendidosAll, setNomesAtendidosAll] = React.useState([]);
  const [nomesEncaminhadosAll, setNomesEncaminhadosAll] = React.useState([]);
  const [dataAcompState, setDataAcompState] = React.useState("");
  const [dataTratState, setDataTratState] = React.useState("");
  const [dataAtual, setDataAtual] = React.useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const {activeStepBtn, setActiveStepBtn} = React.useContext(BotaoContext);
  const onSelect = ({ title }) => {
    setValue(title);
    // let historico = await loadHistorico(title);
    // setHistorico(historico);
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

  useEffect(()=>{
    async function loadLocaisAtendido(){
      setnomesAtendidosSelect("");
      setNomesLocaisAtendido({});
      let url = `localAtendimento/byTipo/${tipoAtendido}`;
      try{
        
        await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario)
        .get(url).then((resp)=>{
          for(let i of resp.data){
            i.text = i.nome;
          }
          setNomesAtendidosAll(resp.data)
          
        })
      }catch(err){
        console.log(err);
        
      }
    }
    loadLocaisAtendido();
  }, [tipoAtendido])

  useEffect(()=>{
    async function loadLocaisAtendido(){
      setNomesLocaisEncaminhado({});
      setNomesEncaminhadoSelect("");
      let url = `localAtendimento/byTipo/${tipoEncaminhado}`;
      try{
        
        await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario)
        .get(url).then((resp)=>{
          for(let i of resp.data){
            i.text = i.nome;
          }
          setNomesEncaminhadosAll(resp.data)
        })
      }catch(err){
        console.log(err);
      }
    }
    loadLocaisAtendido();
  }, [tipoEncaminhado])

  const onChangeText = async (query) => {
    setValue(query);
  };

  const clearInput = () => {
    setValue("");
  };

  const tipoAtendidoActions = (text) => {
    setTipoAtendido('');
    setTipoAtendido(text);
  };

  const nomeAtendidoActions = (text) => {
    setnomesAtendidosSelect(text);
    for(let i of nomesAtendidosAll){
      if(i.text == text){
        setNomesLocaisAtendido(i);
      }
    }
  }
    
  const tipoEncaminhadoActions = (text) => {
    setTipoEncaminhado('');
    setTipoEncaminhado(text);
  };

  const nomeEncaminhadoActions = (text) => {
    setNomesEncaminhadoSelect(text);
    for(let i of nomesEncaminhadosAll){
      if(i.text == text){
        setNomesLocaisEncaminhado(i);
      }
    }
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const confirmarDataTratamento = (dt) => {
    hideDatePicker
      setDataSugeridaTratamento(moment(dt).format("YYYY-MM-DD HH:mm:ss"))
      setDataTratState(moment(dt).format("DD/MM/YYYY"));
  }

  const confirmarDataAcompanhamento = (dt) => {
    hideDatePicker
      setDataSugeridaAcompanhamento(moment(dt).format("YYYY-MM-DD HH:mm:ss"))
      setDataAcompState(moment(dt).format("DD/MM/YYYY"));
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const [dtNascString, setDtNascString] = useState("")
  
  useEffect(()=>{
    async function setarBotao(){

      if((idNovoAcomp == 2 && nomesLocaisAtendido.length == undefined && nomesLocaisEncaminhado.length == undefined) 
      || idNovoAcomp == 1 && nomesLocaisEncaminhado.length == undefined){
        setBloqBotaoProximo(false);
      }else {
        setBloqBotaoProximo(true); 
      }
    }
    setarBotao();
  }, [])

  useEffect(()=>{
    async function setarBotao(){
      if((idNovoAcomp == 2 && nomesLocaisAtendido.length == undefined && nomesLocaisEncaminhado.length == undefined) 
      || idNovoAcomp == 1 && nomesLocaisEncaminhado.length == undefined){
        
        setBloqBotaoProximo(false);
      }else {
        setBloqBotaoProximo(true)
      }
    }
    setarBotao();
  }, [nomesLocaisAtendido, nomesLocaisEncaminhado])

  return (
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
        ): <></>}

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
                      placeholder="Data sugerida tratamento"
                      icon={user}
                      value={dataSugeridaAcompanhamento}
                      disabled={true} 
                    />
                  <Button disabled={activeCheckedAcompanhamento ? false : true} title="Show Date Picker" onPress={showDatePicker} />
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={(a)=> confirmarDataAcompanhamento(a)}
                    onCancel={()=> hideDatePicker}
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
                  <Button disabled={activeCheckedTratamento ? false : true} title="Show Date Picker" onPress={showDatePicker} />
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={(a)=> confirmarDataTratamento(a)}
                    onCancel={()=> hideDatePicker}
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
  lineContent: {
    width: "100%",
    marginVertical: 2,
  },
  heightInput: {
    height: 40,
  },
  picker: {
    width: "100%",
    display: "flex",
    paddingHorizontal: 8,
    paddingTop: 8,
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
});

export default withStyles(CadastroConduta, (theme) => ({
  primary: theme["color-primary-500"],
  primaryDark: theme["color-primary-900"],
  primaryLigth: theme["color-primary-400"],
}));
