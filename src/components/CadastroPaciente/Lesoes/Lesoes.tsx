import React, { useState, useMemo } from "react";
import { View, Image } from "react-native";
import { useStyleSheet, Modal, Text } from "@ui-kitten/components";
import { CardLesoes, TextHeader } from "./Lesoes.styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import PinchZoomView from "react-native-pinch-zoom-view";
import { TipoAtendimento } from "../../../utils/models/AtendimentosInterface";

interface Props {
  title: string;
  nomeArquivo?: string;
  imgRegiao?: string;
  tipoAtendimento?: TipoAtendimento;
  navigation?: any;
  html:any;
}

const Lesoes: React.FC<Props> = ({
  title,
  nomeArquivo,
  imgRegiao,
  tipoAtendimento,
  html,
}) => {
  const [open, setOpen] = useState(false);
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
    imageContent: {
      flex: 1,
      width: "100%",
      height: 200,
      borderRadius: 8,
    },
    imageContentModal: {
      flex: 1,
      width: "100%",
      height: 300,
      borderRadius: 8,
    },
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  });

  const image = useMemo(
    () => (
      <Image
        resizeMode="contain"
        style={styles.imageContentModal}
        source={{
          uri: `${
            tipoAtendimento === "RESULTADOS"
              ? `http://api-ocdp.us-east-2.elasticbeanstalk.com:8080/api/anexo/downloadFile/${nomeArquivo}`
              : imgRegiao
          }`,
        }}
      />
    ),
    [tipoAtendimento, imgRegiao, nomeArquivo]
  );

  return (
    <TouchableOpacity onPress={() => setOpen(true)}>
      <Modal
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setOpen(false)}
        visible={open}
        style={{ width: 300 }}
      >
        <PinchZoomView>{image}</PinchZoomView>
      </Modal>
      <View style={styles.lineContent}>
        <CardLesoes>
          <View style={styles.container}>
            <TextHeader>{title}</TextHeader>
          </View>
            {/* {html} */}
          <View>{image}</View>
        </CardLesoes>
      </View>
    </TouchableOpacity>
  );
};

export default Lesoes;
