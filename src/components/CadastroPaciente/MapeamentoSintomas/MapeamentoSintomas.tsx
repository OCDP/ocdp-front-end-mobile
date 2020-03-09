import React from "react";
import { View } from "react-native";
import { useStyleSheet, CheckBox, Text } from "@ui-kitten/components";
import { buildStyledShadow } from "../../../styles/buildShadow";
import { HeaderContainer, TextHeader } from "./MapeamentoSintonas.styles";
import Lesoes from "../Lesoes";
import { regiaoA, regiaoB } from "../../../utils/constants";

const MapeamentoSintomas = ({ navigation }) => {
  const [activeChecked, setActiveChecked] = React.useState(false);
  const onActiveChange = isChecked => {
    setActiveChecked(isChecked);
  };

  const styles = useStyleSheet({
    container: {
      paddingLeft: 36,
      alignItems: "flex-start",
      justifyContent: "center",
      marginVertical: 16
    },
    lineContent: {
      flex: 1,
      width: "100%"
    },
    columnsContent: {
      flex: 1,
      flexDirection: "row",
      marginHorizontal: 4,
      marginTop: 8
    },
    columnCheck: {
      flexDirection: "column"
    },
    checkItem: {
      marginVertical: 8
    }
  });

  return (
    <View style={styles.lineContent}>
      <HeaderContainer>
        <View style={styles.container}>
          <TextHeader>Fatores de risco</TextHeader>
          <View style={styles.columnsContent}>
            <View style={styles.columnCheck}>
              <View style={styles.checkItem}>
                <CheckBox
                  text="Idade"
                  checked={activeChecked}
                  onChange={onActiveChange}
                />
              </View>
              <View style={styles.checkItem}>
                <CheckBox
                  text="Fumante"
                  checked={activeChecked}
                  onChange={onActiveChange}
                />
              </View>
              <View style={styles.checkItem}>
                <CheckBox
                  text="Sol"
                  checked={activeChecked}
                  onChange={onActiveChange}
                />
              </View>
              <View style={styles.checkItem}>
                <CheckBox
                  text="Alcool"
                  checked={activeChecked}
                  onChange={onActiveChange}
                />
              </View>
              <View style={styles.checkItem}>
                <CheckBox
                  text="Historia de doenca secundaria"
                  checked={activeChecked}
                  onChange={onActiveChange}
                />
              </View>
              <View style={styles.checkItem}>
                <CheckBox
                  text="Presença de lesão"
                  checked={activeChecked}
                  onChange={onActiveChange}
                />
              </View>
            </View>
          </View>
        </View>
      </HeaderContainer>

      {activeChecked ? (
        <Lesoes navigation={navigation} />
      ) : (
        <Text> ativada </Text>
      )}
    </View>
  );
};

export default MapeamentoSintomas;
