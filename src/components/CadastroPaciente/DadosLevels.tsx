import React, { useEffect, useContext } from "react";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { View } from "react-native";
import { useStyleSheet, withStyles } from "@ui-kitten/components";
import DadosLocais from "./DadosLocais";
import DadosPessoais from "./DadosPessoais";
import MapeamentoSintomas from "./MapeamentoSintomas/MapeamentoSintomas";
import { useDadosPacientes } from "../../contexts/AppContext";
import PacienteContext, {
  usePaciente,
  useFlushPaciente,
} from "../../contexts/PacienteContext";
import ListarPacientes from "./ListarPacientes";
import apiFunc from "../../services/api";
import { CommonActions } from "@react-navigation/native";
import FatoresContext from "../../contexts/FatoresRiscoContext";
import PostFatoresContext from "../../contexts/PostFatoresContext"
import CadastroConduta from "../CadastroConduta";
import DadosAcompanhamento from "../DadosAcompanhamento";
import UsuarioLogadoContext from "../../contexts/UsuarioLogadoContext";
import LocaisContext from "../../contexts/LocaisContext";
const DadosLevels = ({ navigation, themedStyle = null }) => {
  const styles = useStyleSheet({
    lineContent: {
      flex: 1,
      marginVertical: 8,
    },
    heightInput: {
      height: 40,
    },
  });

  const [dadosPacientes, setDadosPacientes] = useDadosPacientes();
  const paciente = usePaciente();
  const flush = useFlushPaciente();
  const { setFatores } = useContext(FatoresContext);
  const { postFatores, setPostFatores } = useContext(PostFatoresContext);
  const {usuarioLogado } = useContext(UsuarioLogadoContext);
  const { nomesLocaisAtendido, tiposLocaisAtendido, setNomesLocaisAtendido } = useContext(LocaisContext);
  const { nomesLocaisEncaminhado, tiposLocaisEncaminhado, setNomesLocaisEncaminhado } = useContext(LocaisContext);
  const { dataSugeridaAcompanhamento, dataSugeridaTratamento } = useContext(LocaisContext);
  const {acomp,bairro,cpf, cidade,dtNasci,email,endereco,historico
  ,listaFatores, nmMae, nome,sexo,telCell,telResp } = useContext(PacienteContext)

  const buttonTextStyle = {
    color: "#fff",
    fontSize: 14,
  };

  const btnStyle = {
    textAlign: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: themedStyle.primary,
    borderRadius: 4,
  };

  const resetNav = async () => {
    const {cpf, email, id, nivelAtencao, nome, 
      status, telefone, tipoUsuario} = usuarioLogado
  //   acomp,bairro,cidade,dtNasci,email,endereco,historico
  // ,listaFatores, nmMae, nome,sexo,telCell,telResp
    let arrObj = {
        atendimento: {
          paciente:{
          bairro:{
            id:bairro.id,
            nome: bairro.nome
          },
          cpf,
          dataNascimento: dtNasci,
          email,
          enderecoCompleto: endereco,
          id: "",
          nome,
          nomeDaMae: nmMae,
          sexo,
          telefoneCelular: telCell,
          telefoneResponsavel: telResp
        },
        dataSugeridaAcompanhamento, 
        dataSugeridaTratamento,
        localAtendimento: nomesLocaisAtendido,
        localEncaminhado: nomesLocaisEncaminhado,
        tipoAtendimento: "ACOMPANHAMENTO",
        usuario:{
          cpf,
          email,
          id,
          nivelAtencao,
          nome,
          status,
          telefone,
          tipoUsuario
        },
        fatoresDeRisco:postFatores
      }
    }
    console.log(arrObj);
    
    navigation.dispatch(
      CommonActions.reset({
        routes: [{ name: "Home" }],
      })
    );
  };

  useEffect(() => {
    console.log("acomp >>>>", acomp);
  }, []);

  const salvarPacienteLocal = () => {
    setDadosPacientes((old) => [...old, paciente]);
    flush();
  };

  return (
    <View style={styles.lineContent}>
      <View style={{ flex: 1 }}>
        <ProgressSteps
          style={{ flex: 1 }}
          activeStepIconColor={themedStyle.primary}
          completedProgressBarColor={themedStyle.primary}
          activeStepIconBorderColor={themedStyle.primary}
          borderWidth={2}
          completedStepIconColor={themedStyle.primary}
          labelColor={themedStyle.primaryDark}
          activeLabelColor={themedStyle.primary}
          activeStepNumColor="#fff"
        >
          <ProgressStep
            style={{ flex: 1 }}
            label="Passo 1"
            nextBtnText="avançar"
            nextBtnTextStyle={buttonTextStyle}
            nextBtnStyle={btnStyle}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              {acomp === true ? (
                <DadosAcompanhamento navigation={navigation} />
              ) : (
                <>
                  <DadosLocais navigation={navigation} />
                  <DadosPessoais navigation={navigation} />
                </>
              )}
            </View>
          </ProgressStep>
          <ProgressStep
            label="Passo 2"
            nextBtnText="avançar"
            previousBtnText="voltar"
            previousBtnStyle={btnStyle}
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
            nextBtnStyle={btnStyle}
          >
            <View style={{ alignItems: "center" }}>
              <MapeamentoSintomas navigation={navigation} />
            </View>
          </ProgressStep>
          <ProgressStep
            label="Passo 3"
            nextBtnText="avançar"
            previousBtnText="voltar"
            previousBtnStyle={btnStyle}
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
            nextBtnStyle={btnStyle}
            finishBtnText="concluir"
            onSubmit={() => resetNav()}
          >
            <View style={{ alignItems: "center" }}>
              <CadastroConduta navigation={navigation} />
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </View>
  );
};

//TODO usar um ou outro style, refatorar o outro pra style normal, deixar o withstyles

export default withStyles(DadosLevels, (theme) => ({
  primary: theme["color-primary-500"],
  primaryDark: theme["color-primary-900"],
  primaryLigth: theme["color-primary-400"],
}));
