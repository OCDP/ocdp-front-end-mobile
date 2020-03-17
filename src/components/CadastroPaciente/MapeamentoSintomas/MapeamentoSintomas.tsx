import React from "react";
import { View } from "react-native";
import {
  useStyleSheet,
  CheckBox,
  Text,
  Layout,
  Button,
  Modal,
  ListItem,
  List
} from "@ui-kitten/components";
import { buildStyledShadow } from "../../../styles/buildShadow";
import { HeaderContainer, TextHeader } from "./MapeamentoSintonas.styles";
import Lesoes from "../Lesoes";
import { regioes } from "../../../utils/constants";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    },
    modalContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: 256
    },
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.1)"
    },
    contentContainer: {
      width: 300
    }
  });

  const [visible, setVisible] = React.useState(false);
  const [listRegioes, setListRegioes] = React.useState([]);

  const toggleModal = (list?) => {
    setVisible(visible ? false : true);
    setListRegioes(list);
  };

  const dismiss = () => {
    setVisible(visible ? false : true);
  };

  const renderModalElement = () => (
    <Layout level="3" style={styles.modalContainer}>
      {listRegioes.map(({ desc }, j) => (
        <View key={j}>
          <Text>{desc}</Text>
        </View>
      ))}
    </Layout>
  );

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
        <View>
          {regioes.map(({ name, description, list }, i) => (
            <>
              <View key={i}>
                <TouchableOpacity onPress={() => toggleModal(list)}>
                  <Lesoes
                    navigation={navigation}
                    title={description}
                    imgRegiao={name}
                  />
                </TouchableOpacity>
              </View>
              <Modal
                backdropStyle={styles.backdrop}
                onBackdropPress={dismiss}
                visible={visible}
              >
                {renderModalElement()}
              </Modal>
            </>
          ))}
        </View>
      ) : (
        <Text> oi selecione a opcao p aparecer o menu</Text>
      )}
    </View>
  );
};

export default MapeamentoSintomas;
