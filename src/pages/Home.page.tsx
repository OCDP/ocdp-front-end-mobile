import React, { useContext, useEffect } from "react";
import { Button, Layout, Autocomplete } from "@ui-kitten/components";
import PageContainer from "../components/PageContainer";
import { search, add, clear } from "../assets/Icons";
import { StyleSheet, View, Alert } from "react-native";
import HistoricoProcedimento from "../components/HistoricoProcedimento";
import PacienteContext, { useFlushPaciente } from "../contexts/PacienteContext";
import { useFlushLocais } from "../contexts/LocaisContext";
import { useFlushLesoesRegioes } from "../contexts/LesoesRegioesContext";

import EmptyContent from "../components/EmptyContent";
import apiFunc from "../services/api";
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";
import { AxiosResponse } from "axios";
import { useFlushPostFatores } from "../contexts/PostFatoresContext";
import { BuscaPacienteInterface } from "../utils/models/BuscaPacienteInterface";
import LocaisContext from "../contexts/LocaisContext";
import BotaoContext from "../contexts/BotoesContext";
import { useLoading } from "../contexts/AppContext";

const HomeScreen = ({ navigation }) => {
  const [value, setValue] = React.useState(null);
  const [nomes, setNomes] = React.useState([]);
  const [listaNomes, setListaNomes] = React.useState([]);
  const [listaNomesAll, setListaNomesAll] = React.useState([]);
  const { historico, setHistorico } = useContext(PacienteContext);
  const {
    setId,
    setAcomp,
    setNome,
    setBairro,
    cpf,
    setCpf,
    setDtNasci,
    setEmail,
    setEndereco,
    setNmMae,
    setSexo,
    setTelCell,
    setTelResp,
  } = useContext(PacienteContext);
  const { usuarioLogado } = useContext(UsuarioLogadoContext);
  const { setBloqBotaoProximo } = useContext(BotaoContext);
  const flushPaciente = useFlushPaciente();
  const flushLocais = useFlushLocais();
  const flushLesoesRegioes = useFlushLesoesRegioes();
  const flushPostFatores = useFlushPostFatores();
  const [, setLoading] = useLoading();
  // const flushPostFatores = useFlushPostFatores()
  async function loadHistorico(data) {
    let resp = await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario).get(
      `/historico/atendimentos/cpf/${data}`
    );
    let historico = resp.data;
    return historico;
  }

  const onSelect = async ({ title, id }) => {
    let titleSplit = title.split(" ");
    flushPaciente();
    console.log('onSelect', titleSplit[titleSplit.length - 1]);
    for (let i of listaNomesAll) {
      if (i.cpf == titleSplit[titleSplit.length - 1]) {
        console.log("idOnSelect", i.id)
        setBairro(i.bairro);
        setCpf(i.cpf);
        setDtNasci(i.dataNascimento);
        setEmail(i.email);
        setEndereco(i.enderecoCompleto);
        setId(i.id);
        setNome(i.nome);
        setNmMae(i.nomeDaMae);
        setSexo(i.sexo);
        setTelCell(i.telefoneCelular);
        setTelResp(i.telefoneResponsavel);
      }
    }
    setValue(title);
    setLoading(true);
    await loadHistorico(id).then((resp) => {
      if (resp == []) {
        setHistorico([]);
      } else {
        setHistorico(resp);
      }
    });
    setLoading(false);
  };

  useEffect(()=>{
    function resetarHistorico(){
      setHistorico([]);
      flushPaciente();
    }

    resetarHistorico();
  }, [])

  const onChangeText = async (query) => {
    setValue(query);
  }

  const pesquisaPaciente = async (query) => {
    setLoading(true);
    flushPaciente();
    setHistorico([]);
    setValue(query);
    try {
      const pacientes: AxiosResponse<BuscaPacienteInterface[]> = await apiFunc(
        usuarioLogado.cpf,
        usuarioLogado.senhaUsuario
      ).get(`/paciente/byName/${query}`);
      let arrUsers = pacientes.data;
      const listaArr = arrUsers.map((a) => {
        return {
          id: a.cpf,
          title: `${a.nome} - ${a.cpf}`,
        };
      });
      console.log("pacientes.data", pacientes.data);
      setListaNomesAll(pacientes.data);
      setListaNomes(listaArr);
      setNomes(
        listaArr.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    } catch (err) {
      console.log("err", err);
    }finally{
      setLoading(false);
    }
  };

  const clearInput = () => {
    setValue("");
  };

  async function cadastroActions() {
    setLoading(true);
    flushPaciente();
    flushLesoesRegioes();
    flushPostFatores();
    setBloqBotaoProximo(true);
    await setAcomp(false);
    setLoading(false);
    navigation.navigate("CadastrarPaciente");
  }

  return (
    <PageContainer title="Buscar paciente" navigation={navigation}>
      <Layout style={styles.container}>
        <Autocomplete
          style={styles.picker}
          placeholder="Localizar paciente"
          value={value}
          data={nomes}
          icon={value?.length > 0 ? clear : search}
          onIconPress={clearInput}
          onChangeText={onChangeText}
          onSelect={onSelect}
          onSubmitEditing={async (e) => await pesquisaPaciente(e.nativeEvent.text)}
          returnKeyType={'search'}
          //onKeyPress={(e) => testeSubmit(e.nativeEvent.key)}
        />
        {historico && historico.length > 0 ? (
          <View style={{ height: "90%" }}>
            <HistoricoProcedimento navigation={navigation} />
          </View>
        ) : (
          <EmptyContent
            navigation={navigation}
            title={cpf ? "Paciente sem registro" : "Faça uma busca ou "}
            textContent={cpf ? "Cadastre um novo acompanhamento!" : "cadastre um novo paciente"}
            showBtnNovoAcomp={cpf ? true : false} 
            //showBtnNovoAcomp={false} 
          />
        )}
        <Button
          style={styles.button}
          status="primary"
          size="tiny"
          icon={add}
          onPress={cadastroActions}
        />
      </Layout>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  picker: {
    width: "100%",
    display: "flex",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  button: {
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 36,
    right: 16,
    borderRadius: 50,
    elevation: 8,
    shadowRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowOpacity: 0.1,
  },
});

export default HomeScreen;
