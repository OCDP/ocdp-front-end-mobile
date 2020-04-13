import React, { useContext } from "react";
import {
  useStyleSheet,
  Layout,
  Text,
  withStyles,
  Card,
  Input,
  Datepicker,
  Autocomplete,
  CheckBox,
  RadioGroup,
  Radio,
} from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { user, phone, calendar, search, add, clear } from "../assets/Icons";
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";

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

const DadosAcompanhamento = ({ navigation, themedStyle = null }) => {
  const [value, setValue] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { usuarioLogado } = useContext(UsuarioLogadoContext);

  const onSelect = ({ title }) => {
    setValue(title);
    // let historico = await loadHistorico(title);
    // setHistorico(historico);
  };

  const onChangeText = async (query) => {
    setValue(query);
  };

  const clearInput = () => {
    setValue("");
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.lineContent}>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={(index) => setSelectedIndex(index)}
        >
          {usuarioLogado.nivelAtencao === "SECUNDARIA" ? (
            <>
              <Radio text="Acompanhamento"></Radio>
              <Radio text="Retorno"></Radio>
            </>
          ) : (
            <Radio status="control" text="Retorno"></Radio>
          )}
        </RadioGroup>
      </View>

      <View style={styles.lineContent}>
        <View>
          <Text appearance="hint">Local que está sendo atendido:</Text>
          <Autocomplete
            style={styles.picker}
            placeholder="Centro de atendimento"
            value={value}
            data={DATA}
            icon={value?.length > 0 ? clear : search}
            onIconPress={clearInput}
            onChangeText={onChangeText}
            onSelect={onSelect}
          />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginVertical: 8,
  },
  lineContent: {
    width: "100%",
    marginVertical: 8,
  },
  heightInput: {
    height: 40,
  },
  picker: {
    width: "100%",
    display: "flex",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
});

export default withStyles(DadosAcompanhamento, (theme) => ({
  primary: theme["color-primary-500"],
  primaryDark: theme["color-primary-900"],
  primaryLigth: theme["color-primary-400"],
}));
