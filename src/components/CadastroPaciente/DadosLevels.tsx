import React, { useEffect, useContext } from "react";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { View, Alert, BackHandler } from "react-native";
import { useStyleSheet, withStyles } from "@ui-kitten/components";
import DadosLocais from "./DadosLocais";
import DadosPessoais from "./DadosPessoais";
import {useFlushLocais} from "../../contexts/LocaisContext";
import {useFlushLesoesRegioes} from "../../contexts/LesoesRegioesContext";
import MapeamentoSintomas from "./MapeamentoSintomas/MapeamentoSintomas";
import { useDadosPacientes } from "../../contexts/AppContext";
import NovoAcompContext from "../../contexts/NovoAcompContext";
import moment from "moment";
import PacienteContext, {
  usePaciente,
  useFlushPaciente,
} from "../../contexts/PacienteContext";
import ListarPacientes from "./ListarPacientes";
import apiFunc from "../../services/api";
import { CommonActions } from "@react-navigation/native";
import FatoresContext from "../../contexts/FatoresRiscoContext";
import PostFatoresContext, { useFlushPostFatores } from "../../contexts/PostFatoresContext";
import LesoesRegioesContext from "../../contexts/LesoesRegioesContext";
import { useLoading } from "../../contexts/AppContext";
import CadastroConduta from "../CadastroConduta";
import DadosAcompanhamento from "../DadosAcompanhamento";
import UsuarioLogadoContext from "../../contexts/UsuarioLogadoContext";
import LocaisContext from "../../contexts/LocaisContext";
import HipoteseDiagnostico from "../HipoteseDiagnostico";
import CondutaIntervencao from "../CondutaIntervencao";
import IntervencaoContext from "../../contexts/IntervencaoContext";
import BotaoContext from "../../contexts/BotoesContext";
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
  const flushLocais = useFlushLocais();
  const flushLesoesRegioes = useFlushLesoesRegioes();
  const flushPostFatores = useFlushPostFatores();
  const { setFatores } = useContext(FatoresContext);
  const { idNovoAcomp } = useContext(NovoAcompContext)
  const { postFatores, setPostFatores } = useContext(PostFatoresContext);
  const { usuarioLogado } = useContext(UsuarioLogadoContext);
  const { lesoesRegioes } = useContext(LesoesRegioesContext);
  const {
    nomesLocaisAtendido,
    tiposLocaisAtendido,
    setNomesLocaisAtendido,
  } = useContext(LocaisContext);
  const {
    confirmaRastreamento, 
    hipoteseDiagnostico, 
    observacao, 
    procedimento
  } = useContext(IntervencaoContext)
  const {
    nomesLocaisEncaminhado,
    tiposLocaisEncaminhado,
    setNomesLocaisEncaminhado,
  } = useContext(LocaisContext);
  const { dataSugeridaAcompanhamento, dataSugeridaTratamento } = useContext(
    LocaisContext
  );
  const {
    acomp,
    bairro,
    cpf,
    cidade,
    dtNasci,
    email,
    endereco,
    historico,
    listaFatores,
    nmMae,
    nome,
    sexo,
    telCell,
    telResp,
  } = useContext(PacienteContext);
  
  const [, setLoading] = useLoading()
  const {activeStepBtn, setActiveStepBtn} = React.useContext(BotaoContext);
  
  const { bloqBotaoProximo, setBloqBotaoProximo, setAuxBloqBotaoProximo, setAuxBloqBotaoProximo2 } = useContext(BotaoContext)

  const buttonTextStyle = {
    color: "#fff",
    fontSize: 14,
  };

  const btnStyle = {
    textAlign: "center",
    //position: fixed,
    botton: 0,
    // paddingHorizontal: 8,
    // paddingVertical: 4,
    backgroundColor: themedStyle.primary,
    // borderRadius: 4,
  };


  const resetNav = async () => {
    const {} = usuarioLogado
  //   acomp,bairro,cidade,dtNasci,email,endereco,historico
  // ,listaFatores, nmMae, nome,sexo,telCell,telResp
  // let localAtendimento = [...nomesLocaisAtendido]
  // delete localAtendimento.text;
  // let localEncaminhado = [...nomesLocaisEncaminhado]
  // delete localEncaminhado.text;
  delete nomesLocaisAtendido.text;
  delete nomesLocaisEncaminhado.text;
  let arrObj;
  if(idNovoAcomp == 2 || idNovoAcomp == 1){
    arrObj = {
      atendimento: {
        dataAtendimento: moment().format("YYYY-MM-DD HH:mm:ss"),
        id: "",
        localAtendimento: nomesLocaisAtendido,
        localEncaminhado: nomesLocaisEncaminhado,
        paciente: {
          bairro: {
            id: bairro.id,
            nome: bairro.nome,
          },
          cpf: cpf,
          dataNascimento: moment(dtNasci).format('YYYY-MM-DD HH:mm:ss'),
          email: email,
          enderecoCompleto: endereco,
          id: "",
          nome: nome,
          nomeDaMae: nmMae,
          sexo: sexo.toUpperCase(),
          telefoneCelular: telCell,
          telefoneResponsavel: telResp,
        },
        tipoAtendimento: "ACOMPANHAMENTO",
        usuario:{
          cpf: usuarioLogado.cpf,
          email: usuarioLogado.email,
          id: usuarioLogado.id,
          nivelAtencao: usuarioLogado.nivelAtencao,
          nome: usuarioLogado.nome,
          status: usuarioLogado.status,
          telefone: usuarioLogado.telefone,
          tipoUsuario: usuarioLogado.tipoUsuario
        },
      },
        regioesLesoes: lesoesRegioes,
        dataSugeridaAcompanhamento:
          dataSugeridaAcompanhamento == undefined
            ? ""
            : dataSugeridaAcompanhamento,
        dataSugeridaTratamento:
          dataSugeridaTratamento == undefined ? "" : dataSugeridaTratamento,
        fatoresDeRisco: postFatores,
      };
    }else if(idNovoAcomp == 0){
      arrObj = {
        atendimento: {
          dataAtendimento: moment().format("YYYY-MM-DD HH:mm:ss"),
          id: "",
          localAtendimento: nomesLocaisAtendido,
          localEncaminhado: null,
          paciente: {
            bairro: {
              id: bairro.id,
              nome: bairro.nome,
            },
            cpf: cpf,
            dataNascimento: moment(dtNasci).format('YYYY-MM-DD HH:mm:ss'),
            email: email,
            enderecoCompleto: endereco,
            id: "",
            nome: nome,
            nomeDaMae: nmMae,
            sexo: sexo.toUpperCase(),
            telefoneCelular: telCell,
            telefoneResponsavel: telResp,
          },
          tipoAtendimento: "INTERVENCAO",
          usuario:{
            cpf: usuarioLogado.cpf,
            email: usuarioLogado.email,
            id: usuarioLogado.id,
            nivelAtencao: usuarioLogado.nivelAtencao,
            nome: usuarioLogado.nome,
            status: usuarioLogado.status,
            telefone: usuarioLogado.telefone,
            tipoUsuario: usuarioLogado.tipoUsuario
          },
        },
        confirmaRastreamento: confirmaRastreamento,
        hipoteseDiagnostico: hipoteseDiagnostico,
        observacao: observacao,
        procedimentos: procedimento
      }
    }
    await enviarPost(arrObj, idNovoAcomp);
  };

  async function enviarPost(arrObj, id) {
    if(id == 1 || id == 2){
      try {
        setLoading(true)
        let postJson = JSON.stringify(arrObj);
        let resp = await apiFunc(
          usuarioLogado.cpf,
          usuarioLogado.senhaUsuario
        ).post("/acompanhamento/salvar", postJson);
        Alert.alert(
          'Enviado com sucesso',
          "Voltar para tela inicial",
          [
            {text: 'Ok', onPress: () => {
              navigation.dispatch(
                CommonActions.reset({
                  routes: [{ name: "Home" }],
                })
              );
            }},
          ],
          {cancelable: false},
        );
      } catch (err) {
        console.log(err);
        Alert.alert(
          'Problema de envio',
          "Voltar para tela inicial?",
          [
            {text: 'Sim', onPress: () => {
              navigation.dispatch(
                CommonActions.reset({
                  routes: [{ name: "Home" }],
                })
              );
            }},
            {text: 'Tentar Novamente', style: 'cancel'},
            
          ],
          {cancelable: false},
        );
      }finally{
        setLoading(false)
      }
    }if(id == 0){
      try {
        let postJson = JSON.stringify(arrObj);
        let resp = await apiFunc(
          usuarioLogado.cpf,
          usuarioLogado.senhaUsuario
        ).post("/intervencao/salvar", postJson);
        Alert.alert(
          'Enviado com sucesso',
          "Voltar para tela inicial",
          [
            {text: 'Ok', onPress: () => {
              navigation.dispatch(
                CommonActions.reset({
                  routes: [{ name: "Home" }],
                })
              );
            }},
          ],
          {cancelable: false},
        );
      } catch (err) {
        console.log(err);
        Alert.alert(
          'Problema de envio',
          "Voltar para tela inicial?",
          [
            {text: 'Sim', onPress: () => {
              navigation.dispatch(
                CommonActions.reset({
                  routes: [{ name: "Home" }],
                })
              );
            }},
            {text: 'Tentar Novamente', style: 'cancel'},
            
          ],
          {cancelable: false},
        );
      }
    }
  }

  useEffect(() => {
    setAuxBloqBotaoProximo(true);
    flush;
  }, []);

  const salvarPacienteLocal = () => {
    setDadosPacientes((old) => [...old, paciente]);
    flush;
  };

  async function resetarBotao(){
    setBloqBotaoProximo(true);
    setAuxBloqBotaoProximo(true);
    setAuxBloqBotaoProximo2(true);
  }

  async function postPacientes(){
    try{
      await apiFunc(usuarioLogado.cpf, usuarioLogado.senhaUsuario).post("/paciente", 
      {
          bairro: {
          id: bairro.id,
          nome: bairro.nome,
          },
          cpf: cpf,
          dataNascimento: moment(dtNasci).format('YYYY-MM-DD HH:mm:ss'),
          email: email,
          enderecoCompleto: endereco,
          id: "",
          nome: nome,
          nomeDaMae: nmMae,
          sexo: sexo.toUpperCase(),
          telefoneCelular: telCell,
          telefoneResponsavel: telResp,
      })
    }catch(err){
        alert(JSON.stringify(err.response));
        setActiveStepBtn(0);
    }
  }

  useEffect(()=>{
    async function resetarPassos(){
      setActiveStepBtn(0)
    }
    resetarPassos();
  }, [])

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
          activeStep = {activeStepBtn}
        >
          <ProgressStep
            style={{ flex: 1 }}
            label="Passo 1"
            nextBtnText="avançar"
            nextBtnTextStyle={buttonTextStyle}
            nextBtnStyle={btnStyle}
            nextBtnDisabled={bloqBotaoProximo}
            onNext = {async () => {
              if(acomp === false){
                await postPacientes();
                resetarBotao()
              }
              else resetarBotao();
            }}
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
            nextBtnDisabled={bloqBotaoProximo}
            onNext = {() => resetarBotao()}
            onPrevious = {async ()=> 

              setBloqBotaoProximo(false)
            }
          >
            <View style={{ alignItems: "center" }}>
              {idNovoAcomp == 1 || idNovoAcomp == 2 ? (
                <MapeamentoSintomas navigation={navigation} />
              ): (<HipoteseDiagnostico navigation={navigation}/>
              )}
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
            nextBtnDisabled={bloqBotaoProximo}
            onNext = {() => resetarBotao()}
            onPrevious = { ()=> {
                setBloqBotaoProximo(false)
                flushLesoesRegioes();
                flushPostFatores();
              }
            }
            onSubmit={() => resetNav()}
          >
            <View style={{ alignItems: "center" }}>
              {idNovoAcomp == 1 || idNovoAcomp == 2 ? (
                <CadastroConduta navigation={navigation} />
              ): (<CondutaIntervencao navigation={navigation}/>
              )}
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </View>
  );
};

export default withStyles(DadosLevels, (theme) => ({
  primary: theme["color-primary-500"],
  primaryDark: theme["color-primary-900"],
  primaryLigth: theme["color-primary-400"],
}));
