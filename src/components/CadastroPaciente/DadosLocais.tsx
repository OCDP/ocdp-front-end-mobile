import React, { useContext, useState, useEffect, useMemo } from "react";
import { View } from "react-native";
import { useStyleSheet, Select, Layout } from "@ui-kitten/components";
import PacienteContext from "../../contexts/PacienteContext";
import api from "../../services/api";

const DadosLocais = ({ navigation }) => {
  const { cidade, setCidade, bairro, setBairro } = useContext(PacienteContext);
  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);

  useEffect(() => {
    async function loadCidades() {
      const response = await api.get("/acompanhamento/cidades");
      const cidadesServ = response.data;
      let result = cidadesServ.map(a => {
        return {
          text: a.nome
        };
      });
      setCidades(result);
    }
    loadCidades();
  }, []);

  useEffect(() => {
    async function loadBairros() {
      const response = await api.get(
        `/acompanhamento/bairros/{nomeCidade}?nomeCidade=${cidade}`
      );
      const bairrosServ = response.data;
      let result = bairrosServ.map(a => {
        return {
          text: a.nome
        };
      });
      setBairros(result);
    }
    loadBairros();
  }, [cidade]);

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
            disabled={bairros.length > 0 ? false : true}
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
