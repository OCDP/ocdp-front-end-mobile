import React, { useContext, useState, useEffect, ContextType } from "react";
import { View, Button, Text, BackHandler, TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  useStyleSheet,
  Radio,
  RadioGroup,
  Input,
  Button as ButtonUiKitten,
} from "@ui-kitten/components";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import DadosPessoaisClass from "../../classes/DadosPessoaisClass"
import { calendar, user, emailIcon, phone } from "../../assets/Icons";
import PacienteContext from "../../contexts/PacienteContext";
import { sexos } from "../../utils/constants";
import NovoAcompContext from "../../contexts/NovoAcompContext";
import BotaoContext from "../../contexts/BotoesContext";
import { useLoading } from "../../contexts/AppContext";
import { CommonActions } from "@react-navigation/native";
import apiFunc from "../../services/api";
import axios from 'axios'
import UsuarioLogadoContext from "../../contexts/UsuarioLogadoContext";
import Axios from "axios";
import { TouchableHighlight, TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import DadosLocais from "./DadosLocais";
import PageContainer from "../PageContainer";

const DadosPessoais = ({ navigation }) => {
  let {
    acomp,
    nome,
    setNome,
    dtNasci,
    setDtNasci,
    sexo,
    setSexo,
    cpf,
    setCpf,
    email,
    setEmail,
    endereco,
    setEndereco,
    telCell,
    setTelCell,
    telResp,
    setTelResp,
    nmMae,
    setNmMae,
  } = useContext(PacienteContext);

  const { idNovoAcomp, setIdNovoAcomp } = useContext(NovoAcompContext);
  const {
    bloqBotaoProximo,
    setBloqBotaoProximo,
    auxBloqBotaoProximo,
    setAuxBloqBotaoProximo,
    auxBloqBotaoProximo2,
    setAuxBloqBotaoProximo2,
  } = useContext(BotaoContext);
  const [dtNascString, setDtNascString] = useState("");
  const { usuarioLogado } = useContext(UsuarioLogadoContext);
  const [cep, setCep] = useState("");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [, setLoading] = useLoading();
  const { activeStepBtn, setActiveStepBtn } = React.useContext(BotaoContext);

  useEffect(() => {
    console.log("navigation", navigation);
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    setSexo(sexos[selectedIndex].text);
  }, [selectedIndex]);

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

  const confirmarData = (dt) => {
    setIsDatePickerVisible(false);
    setDtNascString(moment(dt).format("DD/MM/YYYY"));
    setDtNasci(moment(dt).format("YYYY-MM-DD HH:mm:ss"));
  };

  const styles = useStyleSheet({
    
    container: {
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
    testeInputCss: {
      flex: 1,
      width: '80%',
      paddingVertical: 10
      // justifyContent: 'flex-start',
      // alignItems: 'flex-start'
    }
  });

  const validateCpf = (cpf) => {
    let cpfMask: string = "00000000000";
    cpfMask = cpfMask.replace(/[^\d]/g, "");
    setCpf(cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
  };

  const onChangeCpf = (cpf) => {
    validateCpf(cpf);
  };


  function verificaDadosPessoais() {
    const resp = new DadosPessoaisClass(nome, dtNasci, sexo, cpf, nmMae).retornaValidacao();
    console.log("resp", resp)
    if (resp == "sucesso") {
      setIdNovoAcomp(2);
      navigation.navigate("DadosLocais", { navigation: navigation });
    }
  }

  return (
    <>

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

                <ScrollView>
                  {/* <DadosLocais navigation={navigation}></DadosLocais> */}
                  <View style={{ flex: 0.88, alignItems: "center" }}>
                    <View style={styles.testeInputCss}>
                      <View>
                        <Input
                          placeholder="Nome do paciente"
                          icon={user}
                          value={nome}
                          onChangeText={setNome}
                        />
                      </View>
                      {/* <ButtonUiKitten
                disabled={nome ? nome.length == 0 : true}
                size="small"
                onPress={() => setNome("")}
              >
                limpar nome paciente
              </ButtonUiKitten> */}
                    </View>
                    {/* <View style={[styles.testeInputCss, {flexDirection: 'row'}]}>
              <View style={{flex:0.8}}>
                <Input
                    placeholder="Pesquisar CEP"
                    icon={user}
                    value={cep}
                    onChangeText={setCep}
                  />
              </View>
              <View style={{flex:0.2}}>
                <TouchableHighlight style={{alignItems:'center', justifyContent: 'center'}} underlayColor={"black"} onPress={() => pesquisarCEP()}>
                  <Icon size={26} name={"search"} color="white"/>
                </TouchableHighlight>
              </View>
            </View> */}
                    {/* <View style={styles.testeInputCss}>
              <View>
                <Input
                  placeholder="Endereço Completo"
                  icon={user}
                  value={endereco}
                  onChangeText={setEndereco}

                />
              </View>
              <ButtonUiKitten
                disabled={endereco ? endereco.length == 0 : true}
                size="small"
                onPress={() => setEndereco("")}
              >
                limpar endereço
              </ButtonUiKitten>
            </View> */}
                    {/* <View style={[styles.testeInputCss, {flexDirection: 'column', paddingBottom:50}]}> */}
                    <View style={styles.testeInputCss}>
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 0.8 }}>
                          <Input
                            placeholder="Data nascimento"
                            icon={user}
                            value={dtNascString}
                            disabled={true}
                          />
                        </View>
                        <View style={{ flex: 0.2 }}>
                          <TouchableHighlight style={{ alignItems: 'center', justifyContent: 'center' }} underlayColor={"black"} onPress={() => setIsDatePickerVisible(true)}>
                            <Icon size={26} name={"search"} color="white" />
                          </TouchableHighlight>
                        </View>
                        <DateTimePickerModal
                          cancelTextIOS="cancelar"
                          confirmTextIOS="confirmar"
                          headerTextIOS="Escolha uma data"
                          locale="pt-BR"
                          isVisible={isDatePickerVisible}
                          mode="date"
                          onConfirm={(a) => confirmarData(a)}
                          onCancel={() => setIsDatePickerVisible(false)}
                        />
                      </View>
                    </View>
                    <View style={styles.testeInputCss}>
                      <RadioGroup
                        style={
                          {
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: 16,
                          }}
                        selectedIndex={selectedIndex}
                        onChange={setSelectedIndex}
                      >
                        <Radio text="Masculino" />
                        <Radio text="Feminino" />
                      </RadioGroup>
                    </View>
                    <View style={styles.testeInputCss}>
                      <View>
                        <Input
                          disabled={cpf?.length > 10 ? true : false}
                          placeholder="CPF"
                          icon={user}
                          onChangeText={(value) => onChangeCpf(value)}
                          value={cpf}
                          maxLength={14}
                        />
                      </View>
                      {/* <ButtonUiKitten
                disabled={cpf ? (cpf?.length > 10 ? false : true) : true}
                size="small"
                onPress={() => setCpf("")}
              >
                limpar CPF
              </ButtonUiKitten> */}
                    </View>
                    {/* <View style={styles.testeInputCss}>
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
              <ButtonUiKitten
                disabled={validateEmail(email) ? false : true}
                size="small"
                onPress={() => setEmail("")}
              >
                limpar email
              </ButtonUiKitten>
            </View> */}
                    {/* <View style={styles.testeInputCss}>
              <View>
                <Input
                  placeholder="Telefone Celular"
                  icon={phone}
                  value={telCell}
                  onChangeText={setTelCell}
                  maxLength={11}
                  textContentType={"telephoneNumber"}
                  keyboardType={"phone-pad"}
                  onBlur={() => {
                    if (validateTelefoneCelular(telCell) == false) {
                      alert("celular inválido");
                      setTelCell("");
                    }
                  }}
                />
              </View>
              <ButtonUiKitten
                disabled={validateTelefoneCelular(telCell) ? false : true}
                size="small"
                onPress={() => setTelCell("")}
              >
                limpar telefone celular
              </ButtonUiKitten>
            </View> */}
                    {/* <View style={styles.testeInputCss}>
              <View>
                <Input
                  placeholder="Telefone do resposável"
                  icon={phone}
                  value={telResp}
                  maxLength={11}
                  onChangeText={setTelResp}
                  onBlur={() => {
                    if (validateTelefoneResponsavel(telResp) == false) {
                      alert("telefone responsavel inválido");
                      setTelResp("");
                    }
                  }}
                />
              </View>
              <ButtonUiKitten
                disabled={validateTelefoneResponsavel(telResp) ? false : true}
                size="small"
                onPress={() => setTelResp("")}
              >
                limpar telefone responsavel
              </ButtonUiKitten>
            </View> */}
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
                </ScrollView>
              </View>
              <View style={{ flex: 0.05, flexDirection: 'row', marginBottom: 20 }}>
                <View style={{ flex: 1, marginHorizontal: 10 }}>
                  <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() => navigation.dispatch(
                      CommonActions.reset({
                        routes: [{ name: "Home" }],
                      })
                    )} style={{ backgroundColor: "#1696B8", paddingVertical: 10 }}>
                    <Text style={{ fontSize: 16, textAlign: 'center', color: 'white' }}>Voltar</Text>
                  </TouchableHighlight>
                </View>
                <View style={{ flex: 1, marginHorizontal: 10 }}>
                  <TouchableHighlight onPress={() => verificaDadosPessoais()} style={{ backgroundColor: "#09527C", paddingVertical: 10 }}>
                    <Text style={{ fontSize: 16, textAlign: 'center', color: 'white' }}>Avançar</Text>
                  </TouchableHighlight>
                </View>
              </View>

            </View>
          </View>
        </KeyboardAvoidingView>
      </PageContainer>
    </>
  );
};

const styles = StyleSheet.create({
})

export default DadosPessoais;
