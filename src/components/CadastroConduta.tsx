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
  CheckBox,
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
    title: "CAIS",
    releaseYear: 1977,
  },
  {
    id: 2,
    title: "POSTINHO",
    releaseYear: 1985,
  },
];

const CadastroConduta = ({ navigation, themedStyle = null }) => {
  const [activeChecked, setActiveChecked] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [tipoAtendido, setTipoAtendido] = React.useState(null);
  const [tipoEncaminhado, setTipoEncaminhado] = React.useState(null);
  const { nomesLocais, tiposLocais } = useContext(LocaisContext);

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

  const tipoAtendidoActions = async (text) => {
    setTipoAtendido(text);
  };

  return (
    <Layout style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.lineContent}>
          <View style={styles.boxDatePicker}>
            <View
              style={{
                marginHorizontal: 16,
              }}
            >
              <View>
                <Text appearance="hint">
                  Selecione o local em que está sendo atendido
                </Text>
              </View>
              <View style={{ marginVertical: 8 }}>
                <Select
                  data={tiposLocais}
                  placeholder="Selecionar um tipo"
                  onSelect={(e) => tipoAtendidoActions(e["text"])}
                  selectedOption={{ text: tipoAtendido }}
                />
              </View>
              <View>
                <Select
                  disabled={tipoAtendido ? false : true}
                  data={nomesLocais}
                  placeholder="Local em que está sendo atendido"
                  onSelect={() => {}}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.lineContent}>
          <View style={styles.boxDatePicker}>
            <View
              style={{
                marginHorizontal: 16,
              }}
            >
              <View>
                <Text appearance="hint">
                  Selecione o local para o qual será encaminhado
                </Text>
              </View>
              <View style={{ marginVertical: 8 }}>
                <Select
                  data={tiposLocais}
                  placeholder="Selecionar um tipo"
                  onSelect={() => {}}
                />
              </View>
              <View>
                <Select
                  data={nomesLocais}
                  placeholder="Local que será encaminhado"
                  onSelect={() => {}}
                />
              </View>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.lineContent}>
            <View style={styles.boxDatePicker}>
              <View
                style={{
                  marginHorizontal: 16,
                }}
              >
                <Text
                  style={{
                    marginBottom: 4,
                  }}
                  appearance="hint"
                >
                  Retorno para:
                </Text>
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
                  marginHorizontal: 16,
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
  },
  lineContent: {
    width: "100%",
    marginVertical: 2,
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
  boxDatePicker: {
    marginHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 8,
    shadowRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.1,
  },
});

export default withStyles(CadastroConduta, (theme) => ({
  primary: theme["color-primary-500"],
  primaryDark: theme["color-primary-900"],
  primaryLigth: theme["color-primary-400"],
}));
