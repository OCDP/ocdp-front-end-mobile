import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import { useStyleSheet, Select, Layout } from "@ui-kitten/components";
import PacienteContext from "../../contexts/PacienteContext";
import { cidades, bairros } from "../../utils/constants";

const DadosLocais = ({ navigation }) => {
  const { cidade, setCidade, bairro, setBairro } = useContext(PacienteContext);

  const styles = useStyleSheet({
    lineContent: {
      flex: 1,
      width: "100%",
      marginVertical: 8
    },
    heightInput: {
      maxHeight: 50
    }
  });

  return (
    <>
      <View style={styles.lineContent}>
        <Layout style={styles.heightInput}>
          <Select
            data={cidades}
            placeholder="selecionar cidade"
            selectedOption={{ text: cidade }}
            onSelect={e => setCidade(e["text"])}
          />
        </Layout>
      </View>
      <View style={styles.lineContent}>
        <Layout style={styles.heightInput}>
          <Select
            data={bairros}
            placeholder="selecionar bairro"
            selectedOption={{ text: bairro }}
            onSelect={e => setBairro(e["text"])}
          />
        </Layout>
      </View>
    </>
  );
};

export default DadosLocais;
