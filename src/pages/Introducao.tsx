import React, { useContext, useEffect } from "react";
import { Button, Layout, Autocomplete } from "@ui-kitten/components";
import PageContainer from "../components/PageContainer";
import { StyleSheet } from "react-native";
import HistoricoProcedimento from "../components/HistoricoProcedimento";
import PacienteContext from "../contexts/PacienteContext";
import EmptyContent from "../components/EmptyContent";
import apiFunc from "../services/api";
import AppContext, { useLoading } from "../contexts/AppContext";
import { historicoMockup } from "../utils/constants";
import FatoresContext from "../contexts/FatoresRiscoContext";
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";
import LocaisContext from "../contexts/LocaisContext";
import { AxiosResponse } from "axios";
import {
  RespLocaisInterface,
  NomeSelect,
  TipoLocalAtendimento,
} from "../utils/models/RespLocaisInterface";
import { add, user } from "../assets/Icons";

const Introducao = ({ navigation }) => {
  const { setFatores } = useContext(FatoresContext);
  const { usuarioLogado } = useContext(UsuarioLogadoContext);
  const { switchTheme } = useContext(AppContext);
  const {
    setNomesLocaisAtendido,
    setTiposLocaisAtendido,
    setNomesLocaisEncaminhado,
    setTiposLocaisEncaminhado,
  } = useContext(LocaisContext);

  useEffect(() => {
    async function loadLocais() {
      try {
        const locais: AxiosResponse<RespLocaisInterface[]> = await apiFunc(
          usuarioLogado.cpf,
          usuarioLogado.senhaUsuario
        ).get("/localAtendimento");
        let nomesLocaisArr: NomeSelect[] = [];
        let tiposLocaisArr: TipoLocalAtendimento[] = [];

        await locais.data.forEach(({ id, nome }) => {
          nomesLocaisArr.push({ id, nome });
        });

        const nomesContext = nomesLocaisArr.map((a) => {
          return {
            id: a.id,
            text: a.nome,
          };
        });
        setNomesLocaisAtendido(nomesContext);
        setNomesLocaisEncaminhado(nomesContext);

        locais.data.forEach(({ tipoLocalAtendimento }) => {
          let incluir = true;
          if (tipoLocalAtendimento) {
            if (tiposLocaisArr.length == 0) {
              tiposLocaisArr.push({
                id: tipoLocalAtendimento.id,
                nome: tipoLocalAtendimento.nome,
              });
            }
            for (let i of tiposLocaisArr) {
              if (i.nome == tipoLocalAtendimento.nome) {
                incluir = false;
              }
            }
            if (incluir == true) {
              tiposLocaisArr.push({
                id: tipoLocalAtendimento.id,
                nome: tipoLocalAtendimento.nome,
              });
            }
          }
        });

        const tiposContext = tiposLocaisArr.map((a) => {
          return {
            id: a.id,
            text: a.nome,
          };
        });
        setTiposLocaisAtendido(tiposContext);
        setTiposLocaisEncaminhado(tiposContext);
      } catch (err) {
        console.log(err);
      }
    }
    loadLocais();
  }, []);

  async function loadFatores() {
    try {
      await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario)
        .get("/fatorRisco")
        .then((resp) => {
          setFatores(resp.data);
        });
    } catch (err) {
      console.log("err", err);
    }
  }

  useEffect(() => {
    loadFatores();
    if (usuarioLogado.nivelAtencao === "SECUNDARIA") {
      switchTheme();
    }
  }, []);

  return (
    <PageContainer title="Buscar paciente" navigation={navigation}>
      <Layout style={styles.container}>
        <Button
          style={styles.button}
          status="primary"
          size="tiny"
          icon={user}
          onPress={() => navigation.navigate("Home")}
        />
      </Layout>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    width: 80,
    height: 80,
    position: "absolute",
    borderRadius: 50,
    elevation: 8,
    shadowRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowOpacity: 0.1,
  },
});

export default Introducao;
