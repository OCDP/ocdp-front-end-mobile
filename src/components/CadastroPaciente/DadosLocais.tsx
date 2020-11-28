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
import DadosLocaisClass from "../../classes/DadosLocaisClass";
import { cos } from "react-native-reanimated";
const DadosLocais = ({ navigation }) => {
  const { cidade, setCidade, bairro, setBairro, endereco, setEndereco } = useContext(PacienteContext);

  const { usuarioLogado } = useContext(UsuarioLogadoContext);
  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [bairroInput, setBairroInput] = useState("");
  const [complementoInput, setComplementoInput] = useState("");
  const [enderecoInput, setEnderecoInput] = useState("");
  const [cidadeInput, setCidadeInput] = useState("");
  const [, setLoading] = useLoading();
  const [cep, setCep] = useState("");
  const { bloqBotaoProximo, setBloqBotaoProximo, auxBloqBotaoProximo, setAuxBloqBotaoProximo,
    auxBloqBotaoProximo2, setAuxBloqBotaoProximo2 } = useContext(BotaoContext)
  const { idNovoAcomp } = useContext(NovoAcompContext)
  const { activeStepBtn, setActiveStepBtn } = React.useContext(BotaoContext);
  const { acomp } = React.useContext(PacienteContext);
  const [lembraDoCep, setLembraDoCep] = useState(true);

  function limparValoresInputLembroCPF(){
    setBairroInput("");
    setCidadeInput("");
    setComplementoInput("");
    setEnderecoInput("");
    setCep("");
  }

  async function pesquisarCEP() {
    try {
      console.log("pesquisacep", cep)
      const resp = await axios.get(`https://viacep.com.br/ws/${cep.trim()}/json/`);
      if (resp.data.uf != "GO") {
        alert("Esse CEP é referente à " + resp.data.uf)
      } else {
        // setCidadeInput(resp.data.cidade);
        // setEnderecoInput(resp.data.logradouro);
        setBairroInput(resp.data.bairro);
        setComplementoInput(resp.data.complemento);
        setCidade(resp.data.localidade);
        setBairros(resp.data.bairro);
      }
    } catch (err) {
      console.log("erro na busca do cep", err)
    }
  }

  function verificaDadosLocais() {
    // let bairroIdentificado = {};
    // let cidadeIdentificado = {};
    // for(let i of bairros){
    //   if(i.text == bairroInput){
    //     bairroIdentificado = i;
    //   }
    // }
    // for(let i of cidades){
    //   if(i.text == cidadeInput){
    //     cidadeIdentificado = i;
    //   }
    // }
    // if(bairroIdentificado == {}) { return alert("bairro não identificado") } 
    // if(cidadeIdentificado == {}) { return alert("cidade não identificada") } 
    let verificaEnd = enderecoInput + " " + complementoInput;
    const resp = new DadosLocaisClass(cidade, bairro, verificaEnd).retornaValidacao();
    // lembraDoCep ?
                //  new DadosLocaisClass(cidade, bairro, verificaEnd).retornaValidacao()
    console.log("resp", resp)
    if (resp == "sucesso") {
      setEndereco(verificaEnd);
      navigation.navigate("DadosContato", { navigation: navigation });
    }
  }

  useEffect(() => {
    async function loadCidades() {
      try {
        setLoading(true);
        await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario)
          .get("/cidade")
          .then((response) => {
            const cidadesServ = response.data;
            let result = cidadesServ.map((a) => {
              return {
                text: a.nome,
              };
            });
            setCidades(result);
          });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    loadCidades();
  }, []);

  useEffect(() => {
    async function loadBairros() {
      try {
        setLoading(true);
        const bairrosResp: AxiosResponse<BairrosInterface[]> = await apiFunc(
          usuarioLogado.cpf,
          usuarioLogado.senhaUsuario
        ).get(`/bairro/byCidade/${cidade}?nomeCidade=${cidade}`);
        const bairrosServ = bairrosResp.data;
        let result = bairrosServ.map((a) => {
          return {
            text: a.nome,
            id: a.id,
          };
        });
        setLoading(false);
        setBairros(result);
      } catch (err) {
        console.log(err);
      }
    }
    loadBairros();
  }, [cidade]);

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
              <View style={{ flex: 1, backgroundColor: "#1696B8", borderWidth: 1, borderColor: 'black' }}>
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
                <>
                  <View style={{ flex: 0.88, alignItems: "center" }}>
                    <View style={[styles.testeInputCss, { flexDirection: 'column' }]}>
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 0.8 }}>
                          <Input
                            placeholder="Pesquisar CEP"
                            icon={user}
                            value={cep}
                            onChangeText={setCep}
                          />
                        </View>
                        <View style={{ flex: 0.2 }}>
                          <TouchableHighlight style={{ alignItems: 'center', justifyContent: 'center' }} underlayColor={"black"} onPress={() => pesquisarCEP()}>
                            <Icon size={26} name={"search"} color="white" />
                          </TouchableHighlight>
                        </View>
                      </View>
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <CheckBox value={lembraDoCep} onValueChange={() => {
                          setLembraDoCep(!lembraDoCep);
                          limparValoresInputLembroCPF();
                        }} />
                        <Text>Lembra do CEP</Text>
                      </View>
                    </View>
                    {/* {lembraDoCep ? <>
                      <View style={styles.testeInputCss}>
                        <View>
                          <Input
                            placeholder="Cidade"
                            icon={user}
                            value={cidadeInput}
                            onChangeText={setCidadeInput}
                          />
                        </View>
                      </View>
                      <View style={styles.testeInputCss}>
                        <View>
                          <Input
                            placeholder="Bairro"
                            icon={user}
                            value={bairroInput}
                            onChangeText={setBairroInput}
                          />
                        </View>
                      </View>
                    </> : <> */}
                      <View style={[styles.testeInputCss, { flexDirection: 'row' }]}>
                        <Select
                          data={cidades}
                          placeholder="selecionar cidade"
                          selectedOption={{ text: cidade }}
                          onSelect={(e) => setCidade(e["text"])}
                        />
                      </View>
                      <View style={[styles.testeInputCss, { flexDirection: 'row' }]}>
                        <Select
                          data={bairros}
                          disabled={bairros.length > 0 ? false : true}
                          placeholder="selecionar bairro"
                          selectedOption={{ text: bairro.nome }}
                          onSelect={(e) => setBairro({ id: e["id"], nome: e["text"] })}
                        />
                      </View>
                    {/* </>} */}
                    <View style={styles.testeInputCss}>
                      <View>
                        <Input
                          placeholder="Endereço Completo"
                          icon={user}
                          value={enderecoInput}
                          onChangeText={setEnderecoInput}

                        />
                      </View>
                    </View>
                    <View style={styles.testeInputCss}>
                      <View>
                        <Input
                          placeholder="Complemento"
                          icon={user}
                          value={complementoInput}
                          onChangeText={setComplementoInput}

                        />
                      </View>
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
                  onPress={() => navigation.navigate("DadosPessoais", { navigation })} style={{ backgroundColor: "#1696B8", paddingVertical: 10 }}>
                  <Text style={{ fontSize: 16, textAlign: 'center', color: 'white' }}>Voltar</Text>
                </TouchableHighlight>
              </View>
              <View style={{ flex: 1, marginHorizontal: 10 }}>
                <TouchableHighlight
                  onPress={() => verificaDadosLocais()}
                  style={{ backgroundColor: "#09527C", paddingVertical: 10 }}>
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


export default DadosLocais;
