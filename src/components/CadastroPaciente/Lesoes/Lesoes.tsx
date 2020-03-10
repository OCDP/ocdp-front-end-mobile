import React from "react";
import { View, Image } from "react-native";
import { useStyleSheet, CheckBox, Text } from "@ui-kitten/components";
import { CardLesoes, TextHeader } from "./Lesoes.styles";

const Lesoes = ({ navigation }) => {
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

  //styled components e em seguida transformar em componentes diferentes

  interface models {
    regiaoA: string;
  }

  return (
    <View style={styles.lineContent}>
      <CardLesoes>
        <View style={styles.container}>
          <TextHeader>Região A</TextHeader>
        </View>
        <View>
          <Image
            style={styles.imageContent}
            source={require("../../../assets/regioes_boca/regiaoA.jpg")}
          />
        </View>
      </CardLesoes>

      <CardLesoes>
        <View style={styles.container}>
          <TextHeader>Região B</TextHeader>
        </View>
        <View>
          <Image
            style={styles.imageContent}
            source={require("../../../assets/regioes_boca/regiaoB.jpg")}
          />
        </View>
      </CardLesoes>

      <CardLesoes>
        <View style={styles.container}>
          <TextHeader>Região C</TextHeader>
        </View>
        <View>
          <Image
            style={styles.imageContent}
            source={require("../../../assets/regioes_boca/regiaoC.jpg")}
          />
        </View>
      </CardLesoes>

      <CardLesoes>
        <View style={styles.container}>
          <TextHeader>Região D</TextHeader>
        </View>
        <View>
          <Image
            style={styles.imageContent}
            source={require("../../../assets/regioes_boca/regiaoD.jpg")}
          />
        </View>
      </CardLesoes>

      <CardLesoes>
        <View style={styles.container}>
          <TextHeader>Região E</TextHeader>
        </View>
        <View>
          <Image
            style={styles.imageContent}
            source={require("../../../assets/regioes_boca/regiaoE.jpg")}
          />
        </View>
      </CardLesoes>

      <CardLesoes>
        <View style={styles.container}>
          <TextHeader>Região F</TextHeader>
        </View>
        <View>
          <Image
            style={styles.imageContent}
            source={require("../../../assets/regioes_boca/regiaoF.jpg")}
          />
        </View>
      </CardLesoes>

      <CardLesoes>
        <View style={styles.container}>
          <TextHeader>Região G</TextHeader>
        </View>
        <View>
          <Image
            style={styles.imageContent}
            source={require("../../../assets/regioes_boca/regiaoG.jpg")}
          />
        </View>
      </CardLesoes>

      <CardLesoes>
        <View style={styles.container}>
          <TextHeader>Região H</TextHeader>
        </View>
        <View>
          <Image
            style={styles.imageContent}
            source={require("../../../assets/regioes_boca/regiaoH.jpg")}
          />
        </View>
      </CardLesoes>
      <CardLesoes>
        <View style={styles.container}>
          <TextHeader>Região I</TextHeader>
        </View>
        <View>
          <Image
            style={styles.imageContent}
            source={require("../../../assets/regioes_boca/regiaoI.jpg")}
          />
        </View>
      </CardLesoes>
      <CardLesoes>
        <View style={styles.container}>
          <TextHeader>Região J</TextHeader>
        </View>
        <View>
          <Image
            style={styles.imageContent}
            source={require("../../../assets/regioes_boca/regiaoJ.jpg")}
          />
        </View>
      </CardLesoes>
    </View>
  );
};

export default Lesoes;
