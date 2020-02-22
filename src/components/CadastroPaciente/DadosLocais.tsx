import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import { useStyleSheet, Select, Layout } from "@ui-kitten/components";
import PacienteContext from "../../contexts/PacienteContext";
import { cidades, bairros } from "../../utils/constants";

const DadosLocais = ({ navigation }) => {
  const { cidade, setCidade, bairro, setBairro } = useContext(PacienteContext);
  const [seleCidade, setSeleCidade] = useState(null);
  const [seleBairro, setSeleBairro] = useState(null);

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

  useEffect(() => {
    setCidade(seleCidade);
  }, [seleCidade]);

  useEffect(() => {
    setBairro(seleBairro);
  }, [seleBairro]);

  return (
    <>
      <View style={styles.lineContent}>
        <Layout style={styles.heightInput}>
          <Select
            data={cidades}
            placeholder="Selecionar cidades"
            selectedOption={seleCidade}
            onSelect={setSeleCidade}
          />
        </Layout>
      </View>
      <View style={styles.lineContent}>
        <Layout style={styles.heightInput}>
          <Select
            data={bairros}
            placeholder="Selecionar bairros"
            selectedOption={seleBairro}
            onSelect={setSeleBairro}
          />
        </Layout>
      </View>
    </>
  );
};

export default DadosLocais;
