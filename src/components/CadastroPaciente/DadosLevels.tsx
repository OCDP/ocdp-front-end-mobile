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
import CadastroConduta from "../CadastroConduta";
import DadosAcompanhamento from "../DadosAcompanhamento";
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
  const { acomp } = useContext(PacienteContext);
  const paciente = usePaciente();
  const flush = useFlushPaciente();
  const { setFatores } = useContext(FatoresContext);

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

  const resetNav = () => {
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
