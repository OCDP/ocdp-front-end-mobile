import React, { useContext, useEffect } from "react";
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

async function loadHistorico(data) {
  console.log("data", data);
  try {
    let resp = await apiFunc("admin", "p@55w0Rd").get(
      `/historico/atendimentos/${data}`
    );
    let historico = resp.data;
    console.log("loadHistorico", historico);

    return historico;
  } catch (err) {
    console.log(err);
  }
}

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

const HomeScreen = ({ navigation }) => {
  const { setFatores } = useContext(FatoresContext);
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(DATA);
  const { historico, setHistorico } = useContext(PacienteContext);
  const [, setLoading] = useLoading();
  const { setAcomp } = useContext(PacienteContext);
  const { usuarioLogado } = useContext(UsuarioLogadoContext);
  const { switchTheme } = useContext(AppContext);

  async function loadHistorico(data) {
    let resp = await apiFunc("admin", "p@55w0Rd").get(
      `/historico/atendimentos/${data}`
    );
    let historico = resp.data;
    return historico;
  }

  async function loadFatores() {
    try {
      await apiFunc("admin", "p@55w0Rd")
        .get("/fatorRisco")
        .then((resp) => {
          console.log("fatores >>> ", resp.data);
          setFatores(resp.data);
        });
    } catch (err) {
      console.log("err", err);
    }
  }

  useEffect(() => {
    loadFatores();
    if (usuarioLogado.nivelAtencao === "SECUNDARIA") {
      switchTheme();
    }
  }, []);

  const onSelect = ({ title }) => {
    setValue(title);
    // let historico = await loadHistorico(title);
    // setHistorico(historico);
  };

  const onChangeText = async (query) => {
    setValue(query);
    if (query.length > 3) {
      await loadHistorico(query).then((resp) => {
        console.log("respHistorico", resp);
        if (resp == []) {
          setHistorico([]);
        } else {
          setHistorico(resp);
        }
        console.log("historico ", historico);
        setData(
          DATA.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          )
        );
      });
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
          data={data}
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
