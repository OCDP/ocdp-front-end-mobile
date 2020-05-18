import React, { useContext, useState } from "react";
import {
  Text,
  Layout,
  withStyles,
  useStyleSheet,
  Button,
  Input,
} from "@ui-kitten/components";
import PageContainer from "../components/PageContainer";
import { View, Alert, Image } from "react-native";
import AtendimentoContext from "../contexts/AtendimentosContext";
import { ScrollView } from "react-native-gesture-handler";
import { useLoading } from "../contexts/AppContext";
import apiFunc from "../services/api";
import ImagePicker from "react-native-image-picker";
import Lesoes from "../components/CadastroPaciente/Lesoes";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

const CadastrarResultados = ({ navigation, themedStyle = null }) => {
  const { atendimento } = useContext(AtendimentoContext);
  const [, setLoading] = useLoading();
  const [imageURI, setImageURI] = useState("");

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
    infoLesoes: {
      paddingLeft: 16,
      paddingTop: 8,
    },
    images: {
      width: 150,
      height: 150,
      borderColor: "black",
      borderWidth: 1,
      marginHorizontal: 3,
    },
  });

  async function enviarPost(atendimento, password) {
    setLoading(true);
    let resp = apiFunc(atendimento, password)
      .post("/doutor/", {})
      .then(() => {
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

  const launchCamera = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.launchCamera(options, (response) => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log("response", JSON.stringify(response));
        setImageURI(response.uri);
      }
    });
  };

  function RenderFileUri() {
    return <Image source={{ uri: imageURI }} style={styles.images} />;
  }

  return (
    <PageContainer title="Enviar resultados" navigation={navigation}>
      <ScrollView>
        <Layout style={styles.container}>
          <View style={styles.boxInfo}>
            <Text appearance="alternative" status="primary" category="h6">
              Envie os dados do resultado:
            </Text>
            {atendimento.procedimentos.map(
              ({ nome, anexo64, observacao, id }) => (
                <View key={id}>
                  {imageURI ? (
                    <RenderFileUri />
                  ) : (
                    <Button
                      onPress={launchCamera}
                    >{`Selecione a imagem de ${nome}`}</Button>
                  )}

                  <View style={styles.infoLesoes}>
                    {nome && (
                      <Text appearance="hint" category="c4">
                        Nome procedimento: {observacao}
                      </Text>
                    )}
                    {observacao ? (
                      <Text appearance="hint" category="c4">
                        Obs: {observacao}
                      </Text>
                    ) : (
                      <Input
                        placeholder={`Insira a observacao sobre ${nome}`}
                      />
                    )}
                  </View>
                </View>
              )
            )}
          </View>
        </Layout>
      </ScrollView>
    </PageContainer>
  );
};

export default CadastrarResultados;
