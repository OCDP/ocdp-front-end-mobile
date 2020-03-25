import React, { useContext } from "react";
import { Button, Layout, Autocomplete } from "@ui-kitten/components";
import PageContainer from "../components/PageContainer";
import { search, add, clear } from "../assets/Icons";
import { StyleSheet, View } from "react-native";
import HistoricoProcedimento from "../components/HistoricoProcedimento";
import PacienteContext from "../contexts/PacienteContext";
import EmptyContent from "../components/EmptyContent";
import apiFunc from '../services/api'
import { historicoMockup } from "../utils/constants";

async function loadHistorico(data){
  console.log('data', data);
  let resp = await apiFunc('admin', 'p@55w0Rd').get(`/historico/atendimentos/${data}`);
  let historico = resp.data
  console.log('loadHistorico', historico);
  
  return historico;
}

const DATA = [
  {
    id: 1,
    title: "Star Wars",
    releaseYear: 1977
  },
  {
    id: 2,
    title: "Back to the Future",
    releaseYear: 1985
  },
  {
    id: 3,
    title: "The Matrix",
    releaseYear: 1999
  },
  {
    id: 4,
    title: "Inception",
    releaseYear: 2010
  },
  {
    id: 5,
    title: "Interstellar",
    releaseYear: 2014
  }
];

const HomeScreen = ({ navigation }) => {
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(DATA);
  const { historico, setHistorico } = useContext(PacienteContext);

  const onSelect = ({ title }) => {
    setValue(title);
    // let historico = await loadHistorico(title);
    // setHistorico(historico);
  };

  const onChangeText = async query => {
    setValue(query);
    let resp = await loadHistorico(query);
    console.log('respHistorico', resp);
    setHistorico(resp);
    console.log(historico);
    setData(
      DATA.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const clearInput = () => {
    setValue("");
  };

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
          <HistoricoProcedimento navigation={navigation} />
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
          onPress={() => navigation.navigate("CadastrarPaciente")}
        />
      </Layout>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  picker: {
    width: "100%",
    display: "flex",
    paddingHorizontal: 8,
    paddingTop: 8
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
      width: 0
    },
    shadowOpacity: 0.1
  }
});

export default HomeScreen;
