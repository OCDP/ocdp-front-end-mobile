import React, { useEffect } from "react";
import {
  Layout,
  Text,
  withStyles,
  Input,
  RadioGroup,
  Radio,
} from "@ui-kitten/components";

import { View, StyleSheet, Alert, BackHandler } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { editText } from "../assets/Icons";
import IntervencaoContext from "../contexts/IntervencaoContext";
import BotaoContext from "../contexts/BotoesContext";
import { CommonActions } from "@react-navigation/native";
import HipoteseDiagnosticoClass from "../classes/HipoteseDiagnosticoClass";

const HipoteseDiagnostico = ({ navigation, themedStyle = null }) => {
  const [value, setValue] = React.useState(null);
  const [value2, setValue2] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [confirmaSuspeita, setConfirmaSuspeita] = React.useState<boolean>()
  const { bloqBotaoProximo, setBloqBotaoProximo } = React.useContext(BotaoContext)
  const { activeStepBtn, setActiveStepBtn } = React.useContext(BotaoContext);
  const { confirmaRastreamento,
    setConfirmaRastreamento,
    observacao,
    setObservacao,
    hipoteseDiagnostico,
    setHipoteseDiagnostico
  } = React.useContext(IntervencaoContext)

  useEffect(() => {
    async function resetarBotao() {
      setBloqBotaoProximo(true);
    }
    resetarBotao();
  }, [])

  useEffect(() => {
    async function setarBotao() {
      if (confirmaRastreamento && observacao && hipoteseDiagnostico) {
        setBloqBotaoProximo(false);
      }
    }
    setarBotao();
  }, [confirmaRastreamento, observacao, hipoteseDiagnostico])

  
  function verificaHipoteseDiagnostico() {
    const resp = new HipoteseDiagnosticoClass(confirmaRastreamento, observacao, hipoteseDiagnostico).retornaValidacao();
    console.log("resp", resp)
    if (resp == "sucesso") {
      navigation.navigate("CondutaIntervencao", { navigation: navigation });
    }
  }

  const onCheckedChange = (index) => {
    setSelectedIndex(index);
    index == 0 ? setConfirmaRastreamento(true) : setConfirmaRastreamento(false);
  };

  useEffect(() => { }, []);

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
                    <View style={styles.lineContent}>
                      <View style={styles.boxDatePicker}>
                        <View style={styles.divider}>
                          <View>
                            <Text appearance="hint">Hipotese de diagnóstico</Text>
                          </View>
                          <View>
                            <Input
                              icon={editText}
                              size="large"
                              placeholder="Texto sobre a hipótese de diagnóstico"
                              value={value || hipoteseDiagnostico}
                              onChangeText={(value) => {
                                setValue
                                setHipoteseDiagnostico(value);
                              }}
                            />
                          </View>
                        </View>
                        <View style={styles.divider}>
                          <View>
                            <Text appearance="hint">
                              Confirma a suspeita do rastreamento?
                </Text>
                          </View>
                          <View>
                            <RadioGroup
                              style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                paddingHorizontal: 16,
                                height: 60,
                              }}
                              selectedIndex={selectedIndex}
                              onChange={onCheckedChange}
                            >
                              <Radio text="SIM" />
                              <Radio text="NÃO" />
                            </RadioGroup>
                          </View>
                        </View>

                        <View style={styles.divider}>
                          <View>
                            <Text appearance="hint">Observação</Text>
                          </View>
                          <View>
                            <Input
                              icon={editText}
                              size="large"
                              placeholder="Texto sobre a observação"
                              value={value2 || observacao}
                              onChangeText={(value2) => {
                                setValue2
                                setObservacao(value2);
                              }}
                            />
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
                <TouchableHighlight onPress={() => verificaHipoteseDiagnostico()} style={{ backgroundColor: "#09527C", paddingVertical: 10 }}>
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
    marginHorizontal: 16,
    marginVertical: 8,
  },
  lineContent: {
    width: "100%",
    marginVertical: 2,
  },
  heightInput: {
    height: 40,
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

export default withStyles(HipoteseDiagnostico, (theme) => ({
  primary: theme["color-primary-500"],
  primaryDark: theme["color-primary-900"],
  primaryLigth: theme["color-primary-400"],
}));
