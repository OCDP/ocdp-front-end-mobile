import React, { useEffect, useContext } from "react";
import { View } from "react-native";
import {
  useStyleSheet,
  CheckBox,
  Text,
  Layout,
  Button,
  Modal,
  ListItem,
  List,
  RadioGroup,
  Radio,
  Select
} from "@ui-kitten/components";
import { HeaderContainer, TextHeader } from "./MapeamentoSintonas.styles";
import Lesoes from "../Lesoes";
import FatoresContext from "../../../contexts/FatoresRiscoContext";
import { regioes } from "../../../utils/constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import apiFunc from "../../../services/api";
import { useLoading } from "../../../contexts/AppContext";
import EmptyContent from "../../EmptyContent";

const data = [{ text: "classificao 1" }, { text: "classificao 2" }];

const MapeamentoSintomas = ({ navigation }) => {
  const [activeChecked, setActiveChecked] = React.useState(false);
  const [activeCheckedLesao, setActiveCheckedLesao] = React.useState(false);
  const [checkedLesao, setCheckedLesao] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { fatores } = useContext(FatoresContext);
  const [, setLoading] = useLoading();
  const [visible, setVisible] = React.useState(false);
  const [listRegioes, setListRegioes] = React.useState([]);
  const [subregiao, setSubregiao] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState(null);

  const onActiveChange = onSelect => {
    setActiveChecked(onSelect);
  };

  const checkedLesoes = onSelect => {
    setCheckedLesao(onSelect);
  };

  const onActiveChangeLesao = onSelect => {
    setActiveCheckedLesao(onSelect);
  };

  const onCheckedChange = index => {
    setSelectedIndex(index);
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
      width: 300
    },
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.1)"
    },
    contentContainer: {
      width: 300
    },
    itemContainer: {
      marginVertical: 10,
      marginHorizontal: 5
    },
    textItem: {
      fontWeight: "bold",
      fontSize: 16,
      textAlign: "center"
    },
    textItemSmall: {
      fontSize: 15,
      textAlign: "center",
      marginTop: 8
    },
    lesaoContent: {
      marginVertical: 8
    },
    radio: {
      marginVertical: 8
    },
    rowCheck: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    colCheck: {
      margin: 4,
      flex: 1,
      height: 36
    }
  });

  const toggleModal = (list?) => {
    setVisible(visible ? false : true);
    setListRegioes(list);
  };

  const dismiss = () => {
    setVisible(visible ? false : true);
    setSubregiao(null);
  };

  const renderModalElement = () => (
    <Layout level="3" style={styles.modalContainer}>
      {listRegioes.map(({ desc }, j) => (
        <View key={j} style={styles.itemContainer}>
          <TouchableOpacity onPress={() => setSubregiao(desc)}>
            <Text style={styles.textItem}>{desc}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </Layout>
  );

  const rendeDetailLesao = () => (
    <Layout level="3" style={styles.modalContainer}>
      <Text style={styles.textItemSmall}>{subregiao}</Text>
      <View style={styles.lesaoContent}>
        <CheckBox
          text="Potencialmente maligna:"
          checked={activeCheckedLesao}
          onChange={onActiveChangeLesao}
        />
        <View style={{ marginTop: 16 }}>
          <RadioGroup selectedIndex={selectedIndex} onChange={onCheckedChange}>
            <Radio style={styles.radio} text="Leucoplasia" />
            <Radio style={styles.radio} text="Eritoplasia" />
            <Radio style={styles.radio} text="Quelite Actinica" />
            <Radio style={styles.radio} text="Eritoleucoplasia" />
            <Radio style={styles.radio} text="Líquen" />
          </RadioGroup>
        </View>
        <View style={styles.rowCheck}>
          <View style={styles.colCheck}>
            <CheckBox
              text="Maligna"
              checked={checkedLesao}
              onChange={checkedLesoes}
            />
          </View>
          <View style={styles.colCheck}>
            <CheckBox
              text="Outras"
              checked={checkedLesao}
              onChange={checkedLesoes}
            />
          </View>
        </View>
        <View>
          <Select
            disabled={checkedLesao ? false : true}
            size="small"
            data={data}
            placeholder="Classificação"
            selectedOption={selectedOption}
            onSelect={setSelectedOption}
          />
        </View>
      </View>
    </Layout>
  );

  return (
    <View style={styles.lineContent}>
      <HeaderContainer>
        <View style={styles.container}>
          <TextHeader>Fatores de risco</TextHeader>
          <View style={styles.columnsContent}>
            <View style={styles.columnCheck}>
              {fatores.map(({ id, nome }, i) => (
                <View key={i} style={styles.checkItem}>
                  <CheckBox
                    text={nome}
                    checked={activeChecked}
                    onChange={onActiveChange}
                  />
                </View>
              ))}
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
                {subregiao ? rendeDetailLesao() : renderModalElement()}
              </Modal>
            </>
          ))}
        </View>
      ) : (
        <EmptyContent
          navigation={navigation}
          title="Alguma região com lesão?"
          textContent="selecione o fator de risco lesão para definir as regiões afetadas!"
        />
      )}
    </View>
  );
};

export default MapeamentoSintomas;
