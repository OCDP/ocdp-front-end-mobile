import React from "react";
import { Button, Layout, Autocomplete } from "@ui-kitten/components";
import PageContainer from "../components/PageContainer";
import { search, add, clear } from "../assets/Icons";
import { StyleSheet, View } from "react-native";

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

  const onSelect = ({ title }) => {
    setValue(title);
  };

  const onChangeText = query => {
    setValue(query);
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
