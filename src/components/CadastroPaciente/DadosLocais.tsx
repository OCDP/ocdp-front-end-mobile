import React, { useContext, useState, useEffect, useMemo } from "react";
import { View } from "react-native";
import { useStyleSheet, Select, Layout } from "@ui-kitten/components";
import PacienteContext from "../../contexts/PacienteContext";
import api from "../../services/api";
import apiFunc from "../../services/api";
import UsuarioLogadoContext from "../../contexts/UsuarioLogadoContext";
import { useLoading } from "../../contexts/AppContext";
import { AxiosResponse } from "axios";
import { BairrosInterface } from "../../utils/models/BairrosInterface";
const DadosLocais = ({ navigation }) => {
  const { cidade, setCidade, bairro, setBairro } = useContext(PacienteContext);

  const { usuarioLogado } = useContext(UsuarioLogadoContext);
  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [, setLoading] = useLoading();

  useEffect(() => {
    async function loadCidades() {
      try {
        setLoading(true);
        await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario)
          .get("/cidade")
          .then((response) => {
            const cidadesServ = response.data;
            let result = cidadesServ.map((a) => {
              return {
                text: a.nome,
              };
            });
            setCidades(result);
          });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    loadCidades();
  }, []);

  useEffect(() => {
    async function loadBairros() {
      try {
        setLoading(true);
        const bairrosResp: AxiosResponse<BairrosInterface[]> = await apiFunc(
          usuarioLogado.cpf,
          usuarioLogado.senhaUsuario
        ).get(`/bairro/byCidade/${cidade}?nomeCidade=${cidade}`);
        const bairrosServ = bairrosResp.data;
        let result = bairrosServ.map((a) => {
          return {
            text: a.nome,
            id: a.id,
          };
        });
        setLoading(false);
        setBairros(result);
      } catch (err) {
        console.log(err);
      }
    }
    loadBairros();
  }, [cidade]);

  const styles = useStyleSheet({
    lineContent: {
      flex: 1,
      width: "100%",
      marginVertical: 8,
    },
    heightInput: {
      maxHeight: 50,
    },
  });

  return (
    <>
      <View style={styles.lineContent}>
        <Layout style={styles.heightInput}>
          <Select
            data={cidades}
            placeholder="selecionar cidade"
            selectedOption={{ text: cidade }}
            onSelect={(e) => setCidade(e["text"])}
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
            onSelect={(e) => setBairro(e["text"])}
          />
        </Layout>
      </View>
    </>
  );
};

export default DadosLocais;
