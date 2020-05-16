import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  Layout,
  withStyles,
  useStyleSheet,
  Button,
} from "@ui-kitten/components";
import PageContainer from "../components/PageContainer";
import { View, Image, StyleSheet, Alert } from "react-native";
import Lesoes from "../components/CadastroPaciente/Lesoes";
import AtendimentoContext from "../contexts/AtendimentosContext";
import ListHistorico from "../components/ListHistorico";
import { ScrollView } from "react-native-gesture-handler";
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";
import { useLoading } from "../contexts/AppContext";
import apiFunc from "../services/api";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";

const CadastrarResultados = ({ navigation, themedStyle = null }) => {
  const { atendimento } = useContext(AtendimentoContext);
  const [, setLoading] = useLoading();
  const [image, setImage] = useState(null);

  const styles = useStyleSheet({
    container: {
      flex: 1,
      width: "100%",
    },
    boxInfo: {
      marginHorizontal: 16,
      marginVertical: 8,
      backgroundColor: `${themedStyle.bgColor}`,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    divider: {
      backgroundColor: `${themedStyle.bgColorStrong}`,
      marginVertical: 4,
    },
  });

  async function enviarPost(atendimento, password) {
    setLoading(true);
    let resp = apiFunc(atendimento, password)
      .post("/doutor/", {})
      .then(() => {
        console.log(resp);
        Alert.alert("Registros enviadas com sucesso!");
      })
      .catch(() => {
        Alert.alert("nao foi possivel enviar os registros!");
      })
      .finally(() => {
        setLoading(false);
      });
    return;
  }

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage({ image: result });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <PageContainer title="Enviar resultados" navigation={navigation}>
      <ScrollView>
        <Layout style={styles.container}>
          <View style={styles.boxInfo}>
            <Text>Enviar imagem X:</Text>
            <Button onPress={_pickImage}>clique para enviar</Button>
          </View>
        </Layout>
      </ScrollView>
    </PageContainer>
  );
};

export default withStyles(CadastrarResultados, (theme) => ({
  primary: theme["color-primary-500"],
  primaryDark: theme["color-primary-900"],
  primaryLigth: theme["color-primary-400"],
  bgColor: theme["background-basic-color-2"],
  bgColorStrong: theme["background-basic-color-4"],
}));
