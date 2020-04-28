import React, { useEffect } from "react";
import {
  Layout,
  Text,
  withStyles,
  Input,
  RadioGroup,
  Radio,
  Toggle,
  Datepicker,
  CheckBox,
} from "@ui-kitten/components";

import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { editText, calendar } from "../assets/Icons";

const HipoteseDiagnostico = ({ navigation, themedStyle = null }) => {
  const [value, setValue] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (index) => {
    setSelectedIndex(index);
  };

  const onCheckedChangeToggle = (isChecked) => {
    setChecked(isChecked);
  };

  useEffect(() => {}, []);

  return (
    <Layout style={styles.container}>
      <ScrollView style={styles.container}>
        <View>
          <View>
            <View style={styles.divider}>
              <View style={styles.contentBox}>
                <View>
                  <Text appearance="hint" style={{ marginBottom: 16 }}>
                    Procedimentos
                  </Text>
                </View>
                <View style={{ marginBottom: 8 }}>
                  <Text appearance="hint" category="h6">
                    Biópsia
                  </Text>
                </View>
                <View style={styles.toggleInit}>
                  <View style={{ marginBottom: 4 }}>
                    <Toggle
                      text={`Biópsia incisonal: ${checked}`}
                      checked={checked}
                      onChange={onCheckedChangeToggle}
                    />
                  </View>
                  <View style={{ width: "100%" }}>
                    <Input
                      disabled={checked ? false : true}
                      icon={editText}
                      size="large"
                      placeholder="Observação biópsia incisonal"
                      value={value}
                      onChangeText={setValue}
                    />
                  </View>
                </View>
                <View style={styles.toggleInit}>
                  <View style={{ marginBottom: 4 }}>
                    <Toggle
                      text={`Biópsia incisonal: ${checked}`}
                      checked={checked}
                      onChange={onCheckedChangeToggle}
                    />
                  </View>
                  <View style={{ width: "100%" }}>
                    <Input
                      disabled={checked ? false : true}
                      icon={editText}
                      size="large"
                      placeholder="Observação biópsia incisonal"
                      value={value}
                      onChangeText={setValue}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.contentBox}>
                <View style={{ marginBottom: 8 }}>
                  <Text appearance="hint" category="h6">
                    Citologia
                  </Text>
                </View>
                <View style={styles.toggleInit}>
                  <View style={{ marginBottom: 4 }}>
                    <Toggle
                      text={`Citologia: ${checked}`}
                      checked={checked}
                      onChange={onCheckedChangeToggle}
                    />
                  </View>
                  <View style={{ width: "100%" }}>
                    <Input
                      disabled={checked ? false : true}
                      icon={editText}
                      size="large"
                      placeholder="Observação citologia"
                      value={value}
                      onChangeText={setValue}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.contentBox}>
                <View style={{ marginBottom: 8 }}>
                  <Text appearance="hint" category="h6">
                    Outros
                  </Text>
                </View>
                <View style={styles.toggleInit}>
                  <View style={{ marginBottom: 4 }}>
                    <Toggle
                      text={`Outros: ${checked}`}
                      checked={checked}
                      onChange={onCheckedChangeToggle}
                    />
                  </View>
                  <View style={{ width: "100%" }}>
                    <Input
                      disabled={checked ? false : true}
                      icon={editText}
                      size="large"
                      placeholder="Observação outros"
                      value={value}
                      onChangeText={setValue}
                    />
                  </View>
                </View>
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
                    checked={checked}
                    onChange={onCheckedChangeToggle}
                  />
                </View>
                <View>
                  <Datepicker
                    disabled={2 > 3 ? false : true}
                    min={new Date("1900-12-25")}
                    date={new Date("2020-12-25")}
                    placeholder="Data sugerida"
                    onSelect={() => {}}
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
                    checked={checked}
                    onChange={onCheckedChangeToggle}
                  />
                </View>
                <View>
                  <Datepicker
                    disabled={2 > 3 ? false : true}
                    min={new Date("1900-12-25")}
                    date={new Date("2020-12-25")}
                    placeholder="Data sugerida"
                    onSelect={() => {}}
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
  divider: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
  lineContent: {
    width: "100%",
    marginVertical: 2,
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
  contentBox: {
    marginLeft: 16,
    marginBottom: 16,
  },
  toggleInit: {
    alignContent: "flex-start",
    alignItems: "flex-start",
  },
});

export default withStyles(HipoteseDiagnostico, (theme) => ({
  primary: theme["color-primary-500"],
  primaryDark: theme["color-primary-900"],
  primaryLigth: theme["color-primary-400"],
}));
