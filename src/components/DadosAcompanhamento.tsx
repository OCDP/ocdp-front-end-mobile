import React, { useContext, useEffect } from "react";
import {
  useStyleSheet,
  Layout,
  Text,
  withStyles,
  Card,
  Input,
  Select,
  Datepicker,
  Autocomplete,
  CheckBox,
  RadioGroup,
  Radio,
} from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Alert, BackHandler } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { user, phone, calendar, search, add, clear } from "../assets/Icons";
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";
import NovoAcompContext from "../contexts/NovoAcompContext";
import apiFunc from "../services/api";
import LocaisContext from "../contexts/LocaisContext";
import BotaoContext from "../contexts/BotoesContext";
import { CommonActions } from "@react-navigation/native";

const DATA = [
  {
    id: 1,
    title: "João",
    releaseYear: 1977,
  },
  {
    id: 2,
    title: "Maria",
    releaseYear: 1985,
  },
];

const DadosAcompanhamento = ({ navigation, themedStyle = null }) => {
  const [value, setValue] = React.useState(null);
  const {idNovoAcomp, setIdNovoAcomp} = React.useContext(NovoAcompContext)
  const [selectedIndex, setSelectedIndex] = React.useState<number>();
  const [tipoAtendido, setTipoAtendido] = React.useState(null);
  const { usuarioLogado } = useContext(UsuarioLogadoContext);
  const { nomesLocaisAtendido, tiposLocaisAtendido, setNomesLocaisAtendido } = useContext(LocaisContext);
  const [nomesAtendidosAll, setNomesAtendidosAll] = React.useState([]);
  const [nomesAtendidosSelect, setnomesAtendidosSelect] = React.useState('');
  const { bloqBotaoProximo, setBloqBotaoProximo } = React.useContext(BotaoContext)
  const {activeStepBtn, setActiveStepBtn} = React.useContext(BotaoContext);

  useEffect(()=>{
    async function resetarBotao(){
      setBloqBotaoProximo(true);
    }
    resetarBotao();
  }, [])

  useEffect(()=>{
    async function setarBotao(){
      if(nomesLocaisAtendido && !nomesLocaisAtendido.length && idNovoAcomp){
        setBloqBotaoProximo(false);
      }
    }
    setarBotao();
  }, [nomesLocaisAtendido, idNovoAcomp])

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

  const onSelect = ({ title }) => {
    setValue(title);
    // let historico = await loadHistorico(title);
    // setHistorico(historico);
  };

  const onChangeText = async (query) => {
    setValue(query);
  };

  const clearInput = () => {
    setValue("");
  };

  useEffect(()=>{
    function setarNovoAcompanhamento(){
      setIdNovoAcomp(selectedIndex);
    }
    setarNovoAcompanhamento()
  }, [selectedIndex])


  return (
    <Layout style={styles.container}>
      <View style={styles.lineContent}>
        <RadioGroup
          selectedIndex={selectedIndex || idNovoAcomp}
          onChange={(index) => {
            setSelectedIndex(index)
          }}
        >
          {usuarioLogado.nivelAtencao === "SECUNDARIA" ? (
            <Radio text="Intervenção"></Radio>
          ) : (
            <></>
          )}
          <Radio text="Acompanhamento"></Radio>
        </RadioGroup>
      </View>

      <View style={styles.lineContent}>
          <View>
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
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginVertical: 8,
  },
  lineContent: {
    width: "100%",
    marginVertical: 8,
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
});

export default withStyles(DadosAcompanhamento, (theme) => ({
  primary: theme["color-primary-500"],
  primaryDark: theme["color-primary-900"],
  primaryLigth: theme["color-primary-400"],
}));
