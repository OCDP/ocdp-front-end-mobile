import React, { useContext, useEffect, useState } from "react";
import { Button, Layout, Autocomplete } from "@ui-kitten/components";
import PageContainer from "../components/PageContainer";
import { search, add, clear } from "../assets/Icons";
import { StyleSheet, View } from "react-native";
import HistoricoProcedimento from "../components/HistoricoProcedimento";
import PacienteContext from "../contexts/PacienteContext";
import EmptyContent from "../components/EmptyContent";
import apiFunc from "../services/api";
import AppContext, { useLoading } from "../contexts/AppContext";
import { historicoMockup } from "../utils/constants";
import FatoresContext from "../contexts/FatoresRiscoContext";
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";
import LocaisContext from "../contexts/LocaisContext";
import { AxiosResponse } from "axios";
import {
  RespLocaisInterface,
  NomeSelect,
  TipoLocalAtendimento,
} from "../utils/models/RespLocaisInterface";
import { BuscaPacienteInterface } from "../utils/models/BuscaPacienteInterface";

const HomeScreen = ({ navigation }) => {
  const { fatores, setFatores } = useContext(FatoresContext);
  const [value, setValue] = React.useState(null);
  const [nomes, setNomes] = React.useState([]);
  const [listaNomes, setListaNomes] = React.useState([]);
  const { historico, setHistorico } = useContext(PacienteContext);
  const [, setLoading] = useLoading();
  const { setAcomp } = useContext(PacienteContext);
  const { usuarioLogado } = useContext(UsuarioLogadoContext);
  const { switchTheme } = useContext(AppContext);
  const {
    nomesLocais,
    setNomesLocais,
    tiposLocais,
    setTiposLocais,
  } = useContext(LocaisContext);
  let arrLocais = null;

  async function loadHistorico(data) {
    let resp = await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario).get(
      `/historico/atendimentos/cpf/${data}`
    );
    let historico = resp.data;
    return historico;
  }

  async function loadFatores() {
    try {
      await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario)
        .get("/fatorRisco")
        .then((resp) => {
          setFatores(resp.data);
        });
    } catch (err) {
      console.log("err", err);
    }
  }

  useEffect(() => {
    async function loadLocais() {
      try {
        const locais: AxiosResponse<RespLocaisInterface[]> = await apiFunc(
          usuarioLogado.cpf,
          usuarioLogado.senhaUsuario
        ).get("/localAtendimento");
        let nomesLocaisArr: NomeSelect[] = [];
        let tiposLocaisArr: TipoLocalAtendimento[] = [];

        await locais.data.forEach(({ id, nome }) => {
          nomesLocaisArr.push({ id, nome });
        });

        const nomesContext = nomesLocaisArr.map((a) => {
          return {
            id: a.id,
            text: a.nome,
          };
        });
        setNomesLocais(nomesContext);

        locais.data.forEach(({ tipoLocalAtendimento }) => {
          let incluir = true;
          if (tipoLocalAtendimento) {
            if (tiposLocaisArr.length == 0) {
              tiposLocaisArr.push({
                id: tipoLocalAtendimento.id,
                nome: tipoLocalAtendimento.nome,
              });
            }
            for (let i of tiposLocaisArr) {
              if (i.nome == tipoLocalAtendimento.nome) {
                incluir = false;
              }
            }
            if (incluir == true) {
              tiposLocaisArr.push({
                id: tipoLocalAtendimento.id,
                nome: tipoLocalAtendimento.nome,
              });
            }
          }
        });

        const tiposContext = tiposLocaisArr.map((a) => {
          return {
            id: a.id,
            text: a.nome,
          };
        });
        setTiposLocais(tiposContext);
      } catch (err) {
        console.log(err);
      }
    }
    loadLocais();
  }, []);

  useEffect(() => {
    loadFatores();
    if (usuarioLogado.nivelAtencao === "SECUNDARIA") {
      switchTheme();
    }
  }, []);

  const onSelect = async ({ title, id }) => {
    setValue(title);
    // let historico = await loadHistorico(title);
    // setHistorico(historico);
    await loadHistorico(id).then((resp) => {
      if (resp == []) {
        setHistorico([]);
      } else {
        setHistorico(resp);
      }
    });
  };

  let DATA = [];

  const onChangeText = async (query) => {
    setValue(query);
    if (query.length > 2) {
      try {
        const pacientes: AxiosResponse<
          BuscaPacienteInterface[]
        > = await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario).get(
          `/historico/pacientes/${query}`
        );
        let arrUsers = pacientes.data;
        const listaArr = arrUsers.map((a) => {
          return {
            id: a.cpf,
            title: `${a.nome} - ${a.cpf}`,
          };
        });
        setListaNomes(listaArr);
        console.log("lista >>>>", listaNomes);
        setNomes(
          listaNomes.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          )
        );
      } catch (err) {
        console.log("err", err);
      }
    }
  };

  const clearInput = () => {
    setValue("");
  };

  async function cadastroActions() {
    await setAcomp(false);
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
        />
        {historico && historico.length > 0 ? (
          <View style={{ height: "90%" }}>
            <HistoricoProcedimento navigation={navigation} />
          </View>
        ) : (
          <EmptyContent
            navigation={navigation}
            title="Nenhum registro encontrado"
            textContent="Faça uma busca ou cadastre um novo paciente!"
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
