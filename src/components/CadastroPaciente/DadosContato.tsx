import React, { useContext, useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, CheckBox, KeyboardAvoidingView } from "react-native";
import { useStyleSheet, Select, Layout, Input, RadioGroup, Radio } from "@ui-kitten/components";
import PacienteContext from "../../contexts/PacienteContext";
import Icon from 'react-native-vector-icons/FontAwesome';
import apiFunc from "../../services/api";
import UsuarioLogadoContext from "../../contexts/UsuarioLogadoContext";
import { useLoading } from "../../contexts/AppContext";
import { AxiosResponse } from "axios";
import { BairrosInterface } from "../../utils/models/BairrosInterface";
import BotaoContext from "../../contexts/BotoesContext";
import NovoAcompContext from "../../contexts/NovoAcompContext";
import { CommonActions } from "@react-navigation/native";
import { user, emailIcon, phone } from "../../assets/Icons";
import axios from 'axios'
import PageContainer from "../PageContainer";
import DadosContatoClass from "../../classes/DadosContatoClass";
import moment from "moment";
const DadosContato = ({ navigation }) => {
  const { bairro, cidade, cpf, endereco, nome, id, dtNasci, sexo, email, setId, setEmail, telCell, setTelCell, telResp, setTelResp, nmMae, setNmMae } = useContext(PacienteContext);
  const { usuarioLogado } = useContext(UsuarioLogadoContext);
  const { acomp } = React.useContext(PacienteContext);
  const [, setLoading] = useLoading();

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validateTelefoneCelular = (telCelular) => {
    var re = /(?:\()?[0-9]{2}(?:\))?\s?[0-9]{5}(?:-)?[0-9]{4}$/;
    return re.test(telCelular);
  };

  const validateTelefoneResponsavel = (telResponsavel) => {
    var re = /(?:\()?[0-9]{2}(?:\))?\s?[0-9]{4,5}(?:-)?[0-9]{4}$/;
    return re.test(telResponsavel);
  };
  
  async function verificaDadosContato() {
    const resp = new DadosContatoClass(email, telCell, telResp, nmMae).retornaValidacao();
    console.log("resp", resp)
    if (resp == "sucesso") {
      //navigation.navigate("MapeamentoSintomas", { navigation: navigation });
      if(id == null){
        await postPacientes()
      }else{
        await putPaciente()
      }
    }
  }

  // async function getPacientes(){
  //   let objPaciente = {
  //     bairro: {
  //     id: bairro.id,
  //     nome: bairro.nome,
  //     },
  //     cpf: cpf,
  //     dataNascimento: moment(dtNasci).format('YYYY-MM-DD HH:mm:ss'),
  //     email: email,
  //     enderecoCompleto: endereco,
  //     id: "",
  //     nome: nome,
  //     nomeDaMae: nmMae,
  //     sexo: sexo.toUpperCase(),
  //     telefoneCelular: telCell,
  //     telefoneResponsavel: telResp,
  //   }
  //   try{
  //     setLoading(true);
  //     let resp = await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario).post("/paciente/byId/"+id, objPaciente)
  //   }catch(err){
  //     console.log('post err', err);

  //   }finally{
  //     setLoading(false);
  //   }
  // }

  async function putPaciente(){
    let objPaciente = {
      bairro: {
        id: bairro.id,
        nome: bairro.nome,
      },
      cpf: cpf,
      dataNascimento: moment(dtNasci).format('YYYY-MM-DD HH:mm:ss'),
      email: email,
      enderecoCompleto: endereco,
      id: "",
      nome: nome,
      nomeDaMae: nmMae,
      sexo: sexo.toUpperCase(),
      telefoneCelular: telCell,
      telefoneResponsavel: telResp,
    }
    try{
      setLoading(true);
      let resp = await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario).post("/paciente", objPaciente)
      console.log('resp', resp)
      setId(resp.data);
      alert("cadastro atualizado!")
      navigation.navigate("MapeamentoSintomas", { navigation: navigation });
    }catch(err){
      console.log('post err', err);
      alert("erro no cadastro!");
    }finally{
      setLoading(false);
    }
  }

  async function postPacientes(){
    let objPaciente = {
      bairro: {
        id: bairro.id,
        nome: bairro.nome,
      },
      cpf: cpf,
      dataNascimento: moment(dtNasci).format('YYYY-MM-DD HH:mm:ss'),
      email: email,
      enderecoCompleto: endereco,
      id: "",
      nome: nome,
      nomeDaMae: nmMae,
      sexo: sexo.toUpperCase(),
      telefoneCelular: telCell,
      telefoneResponsavel: telResp,
    }
    console.log(JSON.stringify(objPaciente))
    try{
      setLoading(true);
      let resp = await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario).post("/paciente", objPaciente)
      console.log('resp', resp)
      setId(resp.data);
      alert("cadastro realizado!")
      navigation.navigate("MapeamentoSintomas", { navigation: navigation });
    }catch(err){
      console.log('post err', err);
      alert("erro no cadastro!");
    }finally{
      setLoading(false);
    }
  }

  const styles = useStyleSheet({
    lineContent: {
      flex: 1,
      width: "100%",
      marginVertical: 8,
    },
    testeInputCss: {
      flex: 1,
      width: '80%',
      paddingVertical: 10
      // justifyContent: 'flex-start',
      // alignItems: 'flex-start'
    },
    heightInput: {
      maxHeight: 50,
    }, container: {
      flex: 1,
    },
    view: {
      flex: 1,
      flexDirection: "column",
    },
    picker: {
      flex: 1,
      width: "100%",
      justifyContent: "space-between",
    },
    button: {
      marginHorizontal: 16,
    },
  });

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
              <View style={{ flex: 1, backgroundColor: "#1696B8", borderWidth: 1, borderColor: 'black' }}>
              </View>
              <View style={{ flex: 1, backgroundColor: "white", borderWidth: 1, borderColor: 'black' }}>
              </View>
              <View style={{ flex: 1, backgroundColor: "white", borderWidth: 1, borderColor: 'black' }}>
              </View>
            </View>
            <View style={{ flex: 1 }}>

              <ScrollView>
                <>
                <View style={{ flex: 0.88, alignItems: "center" }}>
                  <View style={styles.testeInputCss}>
                    <View>
                      <Input
                        placeholder="E-mail"
                        icon={emailIcon}
                        onChangeText={setEmail}
                        value={email}
                        onBlur={() => {
                          if (validateEmail(email) == false) {
                            alert("email inválido");
                            setEmail("");
                          }
                        }}
                      />
                    </View>
                    {/* <ButtonUiKitten
            disabled={validateEmail(email) ? false : true}
            size="small"
            onPress={() => setEmail("")}
          >
            limpar email
          </ButtonUiKitten> */}
                  </View>
                  <View style={styles.testeInputCss}>
                    <View>
                      <Input
                        placeholder="Telefone Celular"
                        icon={phone}
                        value={telCell}
                        onChangeText={setTelCell}
                        maxLength={11}
                        // textContentType={"telephoneNumber"}
                       // keyboardType={"phone-pad"}
                        // onBlur={() => {
                        //   if (validateTelefoneCelular(telCell) == false) {
                        //     alert("celular inválido");
                        //     setTelCell("");
                        //   }
                        // }}
                      />
                    </View>
                    {/* <ButtonUiKitten
            disabled={validateTelefoneCelular(telCell) ? false : true}
            size="small"
            onPress={() => setTelCell("")}
          >
            limpar telefone celular
          </ButtonUiKitten> */}
                  </View>
                  <View style={styles.testeInputCss}>
                    <View>
                      <Input
                        placeholder="Telefone do responsável"
                        icon={phone}
                        value={telResp}
                        maxLength={11}
                        onChangeText={setTelResp}
                        // onBlur={() => {
                        //   if (validateTelefoneResponsavel(telResp) == false) {
                        //     alert("telefone responsável inválido");
                        //     setTelResp("");
                        //   }
                        // }}
                      />
                    </View>
                    {/* <ButtonUiKitten
            disabled={validateTelefoneResponsavel(telResp) ? false : true}
            size="small"
            onPress={() => setTelResp("")}
          >
            limpar telefone responsavel
          </ButtonUiKitten> */}
                  </View>
                  <View style={styles.testeInputCss}>
                    <View>
                      <Input
                        placeholder="Nome da mãe"
                        icon={user}
                        value={nmMae}
                        onChangeText={setNmMae}
                      />
                    </View>
                    {/* <ButtonUiKitten
            disabled={nmMae ? nmMae.length == 0 : true}
            size="small"
            onPress={() => setNmMae("")}
          >
            limpar nome mãe
          </ButtonUiKitten> */}
                  </View>
                </View>
                </>
              </ScrollView>
            </View>
            <View style={{ flex: 0.05, flexDirection: 'row', marginBottom: 20 }}>
              <View style={{ flex: 1, marginHorizontal: 10 }}>
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() => navigation.navigate("DadosLocais", { navigation })} style={{ backgroundColor: "#1696B8", paddingVertical: 10 }}>
                  <Text style={{ fontSize: 16, textAlign: 'center', color: 'white' }}>Voltar</Text>
                </TouchableHighlight>
              </View>
              <View style={{ flex: 1, marginHorizontal: 10 }}>
                <TouchableHighlight onPress={() => verificaDadosContato()} style={{ backgroundColor: "#09527C", paddingVertical: 10 }}>
                  <Text style={{ fontSize: 16, textAlign: 'center', color: 'white' }}>Avançar</Text>
                </TouchableHighlight>
              </View>
            </View>

          </View>
        </View>
      </KeyboardAvoidingView>
    </PageContainer >
  );
};


export default DadosContato;
