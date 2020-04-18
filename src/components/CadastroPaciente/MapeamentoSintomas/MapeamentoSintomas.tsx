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
  Select,
} from "@ui-kitten/components";
import { HeaderContainer, TextHeader } from "./MapeamentoSintonas.styles";
import Lesoes from "../Lesoes";
import FatoresContext from "../../../contexts/FatoresRiscoContext";
import { regioes } from "../../../utils/constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import apiFunc from "../../../services/api";
import { useLoading } from "../../../contexts/AppContext";
import EmptyContent from "../../EmptyContent";
import PostFatoresContext from "../../../contexts/PostFatoresContext";
import PacienteContext from "../../../contexts/PacienteContext";

const data = [{ text: "classificao 1" }, { text: "classificao 2" }];

const MapeamentoSintomas = ({ navigation }) => {
  const [activeChecked, setActiveChecked] = React.useState([]);
  const [activeCheckedLesao, setActiveCheckedLesao] = React.useState(false);
  const [checkedLesao, setCheckedLesao] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedIndexPotencial, setSelectedIndexPotencial] = React.useState(0);
  const [selectedIndexOutros, setSelectedIndexOutros] = React.useState(0);
  const { fatores, setFatores } = useContext(FatoresContext);
  const { postFatores, setPostFatores } = useContext(PostFatoresContext);
  const [tipoLesao, setTipoLesao] = React.useState([]);
  const [outros, setOutros] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [listRegioes, setListRegioes] = React.useState([]);
  const [nomeFator, setNomeFator] = React.useState([]);
  const [subregiao, setSubregiao] = React.useState(null);
  const [newNome, setNewNome] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);

  const [potencialmente, setPotencialmente] = React.useState(false);
  const onActiveChange = (length, i, nome, id) => {
    let fator = [];
    let fatoresReq = fatores;
    console.log(isChecked);
    if (isChecked == false) {
      for (let j = 0; j < length; j++) {
        fator.push({
          id: fatoresReq[j].id,
          nome: fatoresReq[j].nome,
          marcado: false,
        });
      }
    } else if (isChecked == true) {
      fator = [...activeChecked];
    }
    setIsChecked(true);
    fator[i].marcado = fator[i].marcado == true ? false : true;
    console.log("fator", fator);
    setActiveChecked(fator);
    let objSetFatores = [];
    for (let f of fator) {
      if (f.marcado == true) {
        objSetFatores.push({ id: f.id, nome: f.nome });
      }
    }
    setPostFatores(objSetFatores);
    console.log("postFatores", postFatores);
  };

  const onCheckedChange = (index) => {
    setSelectedIndex(index);
    console.log("principal");
  };

  const styles = useStyleSheet({
    container: {
      paddingLeft: 36,
      alignItems: "flex-start",
      justifyContent: "center",
      marginVertical: 16,
    },
    lineContent: {
      flex: 1,
      width: "100%",
    },
    columnsContent: {
      flex: 1,
      flexDirection: "row",
      marginHorizontal: 4,
      marginTop: 8,
    },
    columnCheck: {
      flexDirection: "column",
    },
    checkItem: {
      marginVertical: 8,
    },
    modalContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: 320,
    },
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    itemContainer: {
      marginVertical: 10,
      marginHorizontal: 5,
    },
    textItem: {
      fontWeight: "bold",
      fontSize: 16,
      textAlign: "center",
    },
    textItemSmall: {
      fontSize: 18,
      textAlign: "center",
      marginVertical: 8,
    },
    lesaoContent: {
      paddingVertical: 16,
      paddingHorizontal: 32,
      marginVertical: 8,
      backgroundColor: "#fcfcfc",
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
    radio: {
      marginVertical: 8,
    },
    rowCheck: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    colCheck: {
      margin: 4,
      flex: 1,
      height: 36,
    },
  });

  const toggleModal = (list?) => {
    setVisible(visible ? false : true);
    setListRegioes(list);
  };

  const dismiss = () => {
    setVisible(visible ? false : true);
    setSubregiao(null);
    setTipoLesao([]);
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

  const malignaArr = ["Maligna"];

  const potencialMalignaArr = [
    "Leucoplasia",
    "Eritoplasia",
    "Quelite Acnitica",
    "Eritoleucoplasia",
    "Liquen",
  ];

  const outrosArr = ["Autoimune", "Infecciosa", "Inflamatorio", "Neoplastica"];

  const renderEscolhaTipo = () => (
    <Layout level="3" style={styles.modalContainer}>
      <View>
        <Text style={styles.textItemSmall}>{tipoLesao}</Text>
        <RadioGroup selectedIndex={selectedIndex} onChange={onCheckedChange}>
          {tipoLesao.map((i) => (
            <View style={{ marginTop: 8, marginLeft: 8 }} key={i}>
              <Radio style={styles.radio} text={i} />
            </View>
          ))}
        </RadioGroup>
      </View>
    </Layout>
  );

  const rendeDetailLesao = () => (
    <Layout level="3" style={styles.modalContainer}>
      <Text style={styles.textItemSmall}>{subregiao}</Text>
      <Text
        style={[styles.textItemSmall, { marginHorizontal: 8 }]}
        appearance="hint"
      >
        que tipo de lesão você deseja cadastrar nessa subregiao?
      </Text>
      <TouchableOpacity onPress={() => setTipoLesao(malignaArr)}>
        <View style={{ marginTop: 4, marginLeft: 8 }}>
          <Text style={[styles.textItemSmall, styles.lesaoContent]}>
            Maligna
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTipoLesao(potencialMalignaArr)}>
        <View style={{ marginTop: 4, marginLeft: 8 }}>
          <Text style={[styles.textItemSmall, styles.lesaoContent]}>
            Potencialmente maligna
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTipoLesao(outrosArr)}>
        <View style={{ marginTop: 4, marginLeft: 8 }}>
          <Text style={[styles.textItemSmall, styles.lesaoContent]}>
            Outros
          </Text>
        </View>
      </TouchableOpacity>
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
                    checked={
                      activeChecked[i] ? activeChecked[i].marcado : false
                    }
                    onChange={() => onActiveChange(fatores.length, i, nome, id)}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      </HeaderContainer>
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
              {tipoLesao.length != 0
                ? renderEscolhaTipo()
                : subregiao
                ? rendeDetailLesao()
                : renderModalElement()}
            </Modal>
          </>
        ))}
      </View>
    </View>
  );
};

export default MapeamentoSintomas;
