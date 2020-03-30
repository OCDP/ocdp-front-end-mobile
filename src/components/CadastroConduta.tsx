import React, { useEffect, useState, useContext } from "react";
import {
  useStyleSheet,
  Layout,
  Text,
  withStyles,
  Card,
  Input,
  Datepicker,
  Select,
  Autocomplete,
  CheckBox
} from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { user, phone, calendar, search, add, clear } from "../assets/Icons";
import apiFunc from "../services/api";
import LocaisContext from "../contexts/LocaisContext";

const DATA = [
  {
    id: 1,
    title: "João",
    releaseYear: 1977
  },
  {
    id: 2,
    title: "Maria",
    releaseYear: 1985
  }
];


const CadastroConduta = ({ navigation, themedStyle = null }) => {
  const [value, setValue] = React.useState(null);
  const [activeChecked, setActiveChecked] = React.useState(false);
  const {locais, setLocais} = useContext(LocaisContext);
  const onSelect = ({ title }) => {
    setValue(title);
    // let historico = await loadHistorico(title);
    // setHistorico(historico);
  };

  const onChangeText = async query => {
    setValue(query);
  };

  const clearInput = () => {
    setValue("");
  };

  return (
    <Layout style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.lineContent}>
            <Layout style={styles.heightInput}>
              <Select
                data={locais}
                placeholder="Local de atendimento"
                selectedOption={{ text: locais }}
                onSelect={e => setLocais(e["text"])}
              />
            </Layout>
        </View>
        <View style={styles.lineContent}>
            <Layout style={styles.heightInput}>
              <Select
                data={locais}
                placeholder="Local que será encaminhado"
                selectedOption={{ text: locais }}
                onSelect={e => setLocais(e["text"])}
              />
            </Layout>
        </View>
        <View>
          <Text appearance="hint">Retorno para:</Text>
          <View style={styles.lineContent}>
            <View style={styles.boxDatePicker}>
              <View
                style={{
                  marginHorizontal: 16
                }}
              >
                <View style={{ marginVertical: 8 }}>
                  <CheckBox
                    text="Acompanhamento"
                    checked={activeChecked}
                    onChange={setActiveChecked}
                  />
                </View>
                <View>
                  <Datepicker
                    disabled={activeChecked ? false : true}
                    min={new Date("1900-12-25")}
                    date={new Date("2020-03-29")}
                    placeholder="Data de Nascimento"
                    onSelect={() =>
                      console.log("o que eu faco qnd selecioa uma data ")
                    }
                    icon={calendar}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.lineContent}>
            <View style={styles.boxDatePicker}>
              <View
                style={{
                  marginHorizontal: 16
                }}
              >
                <View style={{ marginVertical: 8 }}>
                  <CheckBox
                    text="Tratamento de lesão"
                    checked={activeChecked}
                    onChange={setActiveChecked}
                  />
                </View>
                <View>
                  <Datepicker
                    disabled={activeChecked ? false : true}
                    min={new Date("1900-12-25")}
                    date={new Date("2020-03-29")}
                    placeholder="Data de Nascimento"
                    onSelect={() =>
                      console.log("o que eu faco qnd selecioa uma data ")
                    }
                    icon={calendar}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginVertical: 8
  },
  lineContent: {
    width: "100%",
    marginVertical: 8
  },
  heightInput: {
    height: 40
  },
  picker: {
    width: "100%",
    display: "flex",
    paddingHorizontal: 8,
    paddingTop: 8
  },
  boxDatePicker: {
    marginHorizontal: 8,
    backgroundColor: "#fcfcfc",
    paddingVertical: 16,
    borderRadius: 10,
    elevation: 8,
    shadowRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowOpacity: 0.1
  }
});

export default withStyles(CadastroConduta, theme => ({
  primary: theme["color-primary-500"],
  primaryDark: theme["color-primary-900"],
  primaryLigth: theme["color-primary-400"]
}));
