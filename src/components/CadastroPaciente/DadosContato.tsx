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
const DadosContato = ({ navigation }) => {
  const { email, setEmail, telCell, setTelCell, telResp, setTelResp, nmMae, setNmMae } = useContext(PacienteContext);

  const { acomp } = React.useContext(PacienteContext);

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
                </>
              </ScrollView>
            </View>
            <View style={{ flex: 0.05, flexDirection: 'row', marginBottom: 20 }}>
              <View style={{ flex: 1, marginHorizontal: 10 }}>
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() => navigation.navigate("DadosPessoais", { navigation })} style={{ backgroundColor: "#1696B8", paddingVertical: 10 }}>
                  <Text style={{ fontSize: 16, textAlign: 'center', color: 'white' }}>Voltar</Text>
                </TouchableHighlight>
              </View>
              <View style={{ flex: 1, marginHorizontal: 10 }}>
                <TouchableHighlight style={{ backgroundColor: "#09527C", paddingVertical: 10 }}>
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
