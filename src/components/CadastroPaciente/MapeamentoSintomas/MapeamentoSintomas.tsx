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
import { TouchableOpacity } from "react-native-gesture-handler";
import apiFunc from "../../../services/api";
import { useLoading } from "../../../contexts/AppContext";
import EmptyContent from "../../EmptyContent";
import PostFatoresContext from "../../../contexts/PostFatoresContext";
import PacienteContext from "../../../contexts/PacienteContext";
import UsuarioLogadoContext from "../../../contexts/UsuarioLogadoContext";

const data = [{ text: "classificao 1" }, { text: "classificao 2" }];

const MapeamentoSintomas = ({ navigation }) => {
  const [activeChecked, setActiveChecked] = React.useState([]);
  const [activeCheckedLesao, setActiveCheckedLesao] = React.useState(false);
  const [checkedLesao, setCheckedLesao] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedIndexPotencial, setSelectedIndexPotencial] = React.useState(0);
  const [selectedIndexOutros, setSelectedIndexOutros] = React.useState(0);
  const { fatores, setFatores } = useContext(FatoresContext);
  const { usuarioLogado } = useContext(UsuarioLogadoContext);
  const { postFatores, setPostFatores } = useContext(PostFatoresContext);
  const [lesao, setLesao] = React.useState([]);
  const [lesaoAll, setLesaoAll] = React.useState([]);
  const [lesaoSelecionado, setLesaoSelecionado] = React.useState([]);
  const [tipoLesaoOptions, setTipoLesaoOptions] = React.useState([]);
  const [outros, setOutros] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [listRegioes, setListRegioes] = React.useState([]);
  const [nomeFator, setNomeFator] = React.useState([]);
  const [regioesArr, setRegioesArr] = React.useState([]);
  const [subregiao, setSubregiao] = React.useState([]);
  const [regiaoSelect, setRegiaoSelect] = React.useState([]);
  const [nomeTipoLesao, setNomeTipoLesao] = React.useState(null);
  const [newNome, setNewNome] = React.useState([]);
  const [, setLoading] = useLoading();
  const [isChecked, setIsChecked] = React.useState(false);
  const [onCheckedChange, setOnCheckedChange] = React.useState([]);
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

  async function chamarListaSubregioes(name) {
    setLoading(true);
    try {
      await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario)
        .get(`regiaoBoca/bySiglaRegiao/${name}?sigla=${name}`)
        .then((resp) => {
          const listaAtual = resp.data;
          let regArrList = listaAtual.map((a) => {
            return {
              siglaRegiaoBoca: a.siglaRegiaoBoca,
              nome: a.nome,
              id: a.id,
            };
          });
          setLoading(false);
          setVisible(visible ? false : true);
          setListRegioes(regArrList);
        });
    } catch (err) {
      console.log("err", err);
    }
  }

  const dismiss = () => {
    setVisible(visible ? false : true);
    setSubregiao(null);
    setLesao([]);
  };

  function subRegiaoActions(id, indice) {
    let reg = [...listRegioes];
    //console.log('reg[indice]', reg[indice]);
    setSubregiao(reg[indice].nome);
    setRegiaoSelect(reg[indice]);
    // function subRegiaoActions(desc) {
    //   setSubregiao(desc);
    loadTipoLesao();
  }

  const renderModalElement = () => (
    <Layout level="3" style={styles.modalContainer}>
      {listRegioes.map(({ id, nome }, j) => (
        <View key={j} style={styles.itemContainer}>
          <TouchableOpacity onPress={() => subRegiaoActions(id, j)}>
            <Text style={styles.textItem}>{nome}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </Layout>
  );

  useEffect(() => {
    async function loadFatores() {
      setLoading(true);
      try {
        await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario)
          .get("/siglaRegiaoBoca")
          .then((resp) => {
            const dataAtual = resp.data;
            let regArrImage = dataAtual.map((a) => {
              return {
                description: a.nome,
                name: a.imagemBase64,
              };
            });
            setRegioesArr(regArrImage);
            setLoading(false);
          });
      } catch (err) {
        console.log("err", err);
      }
    }
    loadFatores();
  }, []);

  async function loadTipoLesao() {
    console.log("regiaoSelect", regiaoSelect);
    setLoading(true);
    try {
      let resp = await apiFunc(
        usuarioLogado.cpf,
        usuarioLogado.senhaUsuario
      ).get("/tipoLesao");
      const arrTiposLesoes = resp.data;
      setTipoLesaoOptions(arrTiposLesoes);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function setarLesao(nomeTipoLesao) {
    setLoading(true);
    let resp = await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario).get(
      `/lesao/byTipo/${nomeTipoLesao}`
    );
    setLoading(false);
    let lesao = resp.data;
    setLesaoAll(lesao);
    setNomeTipoLesao(nomeTipoLesao);
    let nomeLesao = lesao.map((a) => {
      return a.nome;
    });
    setLesao(nomeLesao);

  }

  function selectLesoesCtrl(nome, indice, length) {
    let lesaoCheck = [];
    for (let i = 0; i < length; i++) {
      lesaoCheck.push(false);
    }
    lesaoCheck[indice] = true;
    setLesaoSelecionado(lesaoAll[indice]);
    setOnCheckedChange(lesaoCheck);
  }


  const renderEscolhaTipo = () => (
    <Layout level="3" style={styles.modalContainer}>
      <View>
        <Text style={styles.textItemSmall}>{nomeTipoLesao}</Text>
        <RadioGroup>
          {lesao.map((a, i) => (
            <View style={{ marginTop: 8, marginLeft: 8 }} key={i}>
              <Radio
                onChange={(r) => {
                  selectLesoesCtrl(a, i, lesao.length);
                }}
                style={styles.radio}
                text={a}
                checked={onCheckedChange[i]}
              />
            </View>
          ))}
        </RadioGroup>
      </View>
      <Button
        style={{ marginVertical: 8 }}
        onPressIn={() => 
          console.log(lesaoSelecionado, regiaoSelect
            )}
      >
        cadastrar lesão
      </Button>
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
      {tipoLesaoOptions.map(({ id, nome }, i) => (
        <View key={i}>
          <TouchableOpacity onPress={() => setarLesao(nome)}>
            <View style={{ marginTop: 4, marginLeft: 8 }}>
              <Text style={[styles.textItemSmall, styles.lesaoContent]}>
                {nome}
              </Text>
            </View>
          </TouchableOpacity>
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
        {regioesArr.map(({ name, description }, i) => (
          <>
            <View key={i}>
              <TouchableOpacity
                onPress={() => chamarListaSubregioes(description)}
              >
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
              {lesao.length > 0
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
