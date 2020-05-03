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
import { Ionicons } from "@expo/vector-icons";
import moment from 'moment';
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { user, phone, calendar, search, add, clear } from "../assets/Icons";
import apiFunc from "../services/api";
import LocaisContext from "../contexts/LocaisContext";
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";
import NovoAcompContext from "../contexts/NovoAcompContext";
import BotaoContext from "../contexts/BotoesContext";

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
  const { nomesLocaisAtendido, tiposLocaisAtendido, setNomesLocaisAtendido } = useContext(LocaisContext);
  const { setBloqBotaoProximo } = useContext(BotaoContext)
  const { nomesLocaisEncaminhado, tiposLocaisEncaminhado, setNomesLocaisEncaminhado } = useContext(LocaisContext);
  const { dataSugeridaAcompanhamento, dataSugeridaTratamento, setDataSugeridaAcompanhamento, setDataSugeridaTratamento } = useContext(LocaisContext);
  const [nomesAtendidosSelect, setnomesAtendidosSelect] = React.useState('');
  const [nomesEncaminhadoSelect, setNomesEncaminhadoSelect] = React.useState('');
  const [nomesAtendidosAll, setNomesAtendidosAll] = React.useState([]);
  const [nomesEncaminhadosAll, setNomesEncaminhadosAll] = React.useState([]);
  const [dataAtual, setDataAtual] = React.useState(null);
  const onSelect = ({ title }) => {
    setValue(title);
    // let historico = await loadHistorico(title);
    // setHistorico(historico);
  };

  useEffect(()=>{
    async function loadLocaisAtendido(){
      let url = `localAtendimento/byTipo/${tipoAtendido}`;
      // console.log('loadLocaisAtendido', tipoAtendido);
      // console.log(url);
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

  // useEffect(()=>{
  //   function loadDataAtual(){
  //     let mes = new Date().getMonth().toString();
  //     if(mes.length == 1){
  //       mes = '0' + mes;
  //     }
  //     let st = new Date().getFullYear() + '-' + mes + '-' + new Date().getDate()
  //     setDataAtual(st);
  //     console.log('dataAtual', dataAtual);
  //   }
  //   loadDataAtual
    
  // }, [])

  useEffect(()=>{
    async function loadLocaisAtendido(){
      let url = `localAtendimento/byTipo/${tipoEncaminhado}`;
      // console.log('loadLocaisAtendido', tipoEncaminhado);
      // console.log(url);
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
    // console.log('tipoAtendidoActions', text);
    setTipoAtendido('');
    setTipoAtendido(text);
    //console.log('tipoAtendido', tipoAtendido);
  };

  const nomeAtendidoActions = (text) => {
    //console.log('nomeAtendidoActions', text)
    //console.log('nomeAtendido', nomesLocaisAtendido);
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
    //console.log('nomeEncaminhadoActions', text)
    // setNomesLocaisEncaminhado('');
    // setNomesLocaisEncaminhado(text);
    setNomesEncaminhadoSelect(text);
    for(let i of nomesEncaminhadosAll){
      if(i.text == text){
        setNomesLocaisEncaminhado(i);
      }
    }
  }

  useEffect(()=>{
    async function setarBotao(){
      console.log('postFatores', nomesLocaisAtendido.length)
      console.log('lesoesRegioes', nomesLocaisEncaminhado.length)
      if((idNovoAcomp == 2 && nomesLocaisAtendido.length == 1 && nomesLocaisEncaminhado.length == 1) 
      || nomesLocaisEncaminhado.length > 0){
        setBloqBotaoProximo(false);
      }else setBloqBotaoProximo(true)
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
