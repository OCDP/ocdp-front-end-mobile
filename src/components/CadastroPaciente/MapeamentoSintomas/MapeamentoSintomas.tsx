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
  const [tipoLesao, setTipoLesao] = React.useState([]);
  const [outros, setOutros] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [listRegioes, setListRegioes] = React.useState([]);
  const [nomeFator, setNomeFator] = React.useState([]);
  const [regioesArr, serRegioesArr] = React.useState([]);
  const [subregiao, setSubregiao] = React.useState(null);
  const [newNome, setNewNome] = React.useState([]);
  const [, setLoading] = useLoading();
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

  async function chamarListaSubregioes(name) {
    setLoading(true);
    try {
      await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario)
        .get(`regiaoBoca/bySiglaRegiao/${name}?sigla=${name}`)
        .then((resp) => {
          const listaAtual = resp.data;
          let regArrList = listaAtual.map((a) => {
            return {
              desc: a.nome,
              id: a.id,
              // braz, se vc quiser setar o base64 por sabe
              //  Deus qual motivo,faça isso: base64: a.siglaRegiaoBoca
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
            serRegioesArr(regArrImage);
            setLoading(false);
          });
      } catch (err) {
        console.log("err", err);
      }
    }
    loadFatores();
  }, []);

  useEffect(()=>{
    async function loadTipoLesao(){
      try{
        let resp = await apiFunc(usuarioLogado.cpf,usuarioLogado.senhaUsuario).get('/tipoLesao')
        console.log(resp.data);
        
        setTipoLesao(resp.data)
      }catch(err){
        console.log(err);
      }
    }
    loadTipoLesao()
  }, [])

  async function setarLesao(idTipoLesao){
    let resp = await apiFunc(usuarioLogado.cpf,usuarioLogado.senhaUsuario).get('/lesao');
    let lesao = [];
    console.log(resp.data.tipoLesao)
    for(let i of resp.data){
      if(i.tipoLesao.id == idTipoLesao){
        lesao.push(i)
      }
    }
    console.log(lesao);
    
  }

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
        <Text style={styles.textItemSmall}>{lesao}</Text>
        <RadioGroup selectedIndex={selectedIndex} onChange={onCheckedChange}>
          {lesao.map((i) => (
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
      {tipoLesao.map(({id, nome}, i)=>{
        <View key={i}>
          <TouchableOpacity onPress={() => setarLesao(id)}>
            <View style={{ marginTop: 4, marginLeft: 8 }}>
              <Text style={[styles.textItemSmall, styles.lesaoContent]}>
                {nome}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      })}
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
        {regioesArr.map(({ name, description, list }, i) => (
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
              {lesao.length != 0
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
