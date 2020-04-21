import React, { useContext } from "react";
import { Button, Layout, Autocomplete } from "@ui-kitten/components";
import PageContainer from "../components/PageContainer";
import { search, add, clear } from "../assets/Icons";
import { StyleSheet, View } from "react-native";
import HistoricoProcedimento from "../components/HistoricoProcedimento";
import PacienteContext from "../contexts/PacienteContext";
import EmptyContent from "../components/EmptyContent";
import apiFunc from "../services/api";
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";
import { AxiosResponse } from "axios";
import { BuscaPacienteInterface } from "../utils/models/BuscaPacienteInterface";

const HomeScreen = ({ navigation }) => {
  const [value, setValue] = React.useState(null);
  const [nomes, setNomes] = React.useState([]);
  const [listaNomes, setListaNomes] = React.useState([]);
  const { historico, setHistorico } = useContext(PacienteContext);
  const { setAcomp } = useContext(PacienteContext);
  const { usuarioLogado } = useContext(UsuarioLogadoContext);

  async function loadHistorico(data) {
    let resp = await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario).get(
      `/historico/atendimentos/cpf/${data}`
    );
    let historico = resp.data;
    return historico;
  }

  const onSelect = async ({ title, id }) => {
    setValue(title);
    await loadHistorico(id).then((resp) => {
      if (resp == []) {
        setHistorico([]);
      } else {
        setHistorico(resp);
      }
    });
  };

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
