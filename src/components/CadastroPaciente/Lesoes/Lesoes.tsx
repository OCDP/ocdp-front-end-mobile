import React from "react";
import { View, Image } from "react-native";
import { useStyleSheet, CheckBox, Text, Button } from "@ui-kitten/components";
import { CardLesoes, TextHeader } from "./Lesoes.styles";

const Lesoes = ({ navigation, title, imgRegiao }) => {
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
    imageContent: {
      flex: 1,
      height: 200,
      maxWidth: "100%",
      borderRadius: 8
    },
    modalContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: 256,
      padding: 16
    },
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    }
  });
  const [visible, setVisible] = React.useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.lineContent}>
      <CardLesoes>
        <View style={styles.container}>
          <TextHeader>{title}</TextHeader>
        </View>
        <View>
          <Image style={styles.imageContent} source={imgRegiao} />
        </View>
      </CardLesoes>
    </View>
  );
};

export default Lesoes;
