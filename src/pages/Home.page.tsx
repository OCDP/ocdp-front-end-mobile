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

const DATA = [
  {
    id: 1,
    title: "João",
    releaseYear: 1977,
  },
  {
    id: 2,
    title: "Jose",
    releaseYear: 1985,
  },
];

const HomeScreen = ({ navigation }) => {
  const { fatores, setFatores } = useContext(FatoresContext);
  const [value, setValue] = React.useState(null);
  const [nomes, setNomes] = React.useState([]);
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
      `/historico/atendimentos/${data}`
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

        await locais.data.forEach(({ tipoLocalAtendimento }, i) => {
          if (tipoLocalAtendimento) {
            tiposLocaisArr.push(tipoLocalAtendimento);
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

  const onSelect = async ({ title }) => {
    setValue(title);
    // let historico = await loadHistorico(title);
    // setHistorico(historico);
    await loadHistorico(title).then((resp) => {
      if (resp == []) {
        setHistorico([]);
      } else {
        setHistorico(resp);
      }
    });
  };
  const onChangeText = async (query) => {
    setValue(query);
    setNomes(
      DATA.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    );
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
        <Button onPressIn={() => console.log("tipos >>>>>>>", tiposLocais)}>
          tipos
        </Button>
        <Button onPressIn={() => console.log("nomes >>>>>>>", nomesLocais)}>
          nomes
        </Button>
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
          <View>
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
