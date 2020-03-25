import React, { useContext, useState, useEffect, useMemo } from "react";
import { View } from "react-native";
import { useStyleSheet, Select, Layout } from "@ui-kitten/components";
import PacienteContext from "../../contexts/PacienteContext";
import api from "../../services/api";
import apiFunc from "../../services/api";
import UsuarioLogadoContext from "../../contexts/UsuarioLogadoContext";
const DadosLocais = ({ navigation }) => {
  const { cidade, setCidade, bairro, setBairro } = useContext(PacienteContext);

  const { usuarioLogado } = useContext(UsuarioLogadoContext);
  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);

  useEffect(() => {
    async function loadCidades() {
      console.log("aooooooo ????");
      let response
      try{
      response = await apiFunc("admin", "p@55w0Rd").get(
        "/cidade"
      );
      console.log(response.data);
      const cidadesServ = response.data;
      let result = cidadesServ.map(a => {
        return {
          text: a.nome
        };
      });
      setCidades(result);
      }catch(err){
        console.log(err)
      }}
    loadCidades();
  }, []);

  useEffect(() => {
    async function loadBairros() {
      try{
        const response = await apiFunc('admin', 'p@55w0Rd').get(
          `/bairro/byCidade/${cidade}?nomeCidade=${cidade}`
        );
        console.log(response.data);
        const bairrosServ = response.data;
        let result = bairrosServ.map(a => {
          return {
            text: a.nome
          };
        });
        setBairros(result);
      }catch(err){
        console.log(err)
      }
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
