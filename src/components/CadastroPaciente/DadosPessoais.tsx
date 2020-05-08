import React, { useContext, useState, useEffect, ContextType }from "react";
import { View, Button, Alert, BackHandler } from "react-native";
import {
  useStyleSheet,
  Radio,
  RadioGroup,
  Input,
  Datepicker,
} from "@ui-kitten/components";
import DateTimePickerModal from "react-native-modal-datetime-picker"
import moment from 'moment';
import { calendar, user, emailIcon, phone } from "../../assets/Icons";
import PacienteContext from "../../contexts/PacienteContext";
import { sexos } from "../../utils/constants";
import NovoAcompContext from "../../contexts/NovoAcompContext";
import BotaoContext from "../../contexts/BotoesContext";
import { useLoading } from "../../contexts/AppContext";
import { CommonActions } from "@react-navigation/native";

const DadosPessoais = ({ navigation }) => {
  const {
    nome,
    setNome,
    dtNasci,
    setDtNasci,
    sexo,
    setSexo,
    cpf,
    setCpf,
    email,
    setEmail,
    endereco,
    setEndereco,
    telCell,
    setTelCell,
    telResp,
    setTelResp,
    nmMae,
    setNmMae,
  } = useContext(PacienteContext);
  
  const { idNovoAcomp, setIdNovoAcomp } = useContext(NovoAcompContext)
  const { bloqBotaoProximo, setBloqBotaoProximo, auxBloqBotaoProximo,
    setAuxBloqBotaoProximo, auxBloqBotaoProximo2, setAuxBloqBotaoProximo2} = useContext(BotaoContext)
  const [dtNascString, setDtNascString] = useState("")
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [, setLoading] = useLoading()
  const {activeStepBtn, setActiveStepBtn} = React.useContext(BotaoContext);
  
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Atenção", "Voltar agora te fará perder as informações. Para voltar um passo, utilize o botão voltar. \n\nDeseja prosseguir e cancelar procedimento?", [
        {
          text: "Voltar",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Desejo cancelar procedimento", onPress: () => {
              navigation.dispatch(
              CommonActions.reset({
                routes: [{ name: "Home" }],
              })
            );
          setActiveStepBtn(0);
        } }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(()=>{
    async function setarBotao(){
      if(bloqBotaoProximo == true){
        console.log("values", nome ,dtNasci, cpf, email, endereco, telCell,
        telResp, nmMae, idNovoAcomp)
        if(nome != null && dtNasci != null && cpf != null && email != null && endereco != null && telCell != null &&
          telResp != null && nmMae != null && idNovoAcomp != undefined){
            if(auxBloqBotaoProximo == false){
              setBloqBotaoProximo(false);
            }else{
              setAuxBloqBotaoProximo2(false);
            }
          }else{
            setAuxBloqBotaoProximo2(true);
          }
          console.log('auxBloqBotaoProximo', auxBloqBotaoProximo)
          console.log('auxBloqBotaoProximo2', auxBloqBotaoProximo2)
      }
    }
    setarBotao();
  }, [])

  useEffect(()=>{
    async function setarBotao(){
      console.log("values", nome ,dtNasci, cpf, email, endereco, telCell,
      telResp, nmMae, idNovoAcomp)
      if(nome != null && cpf != null && email != null && endereco != null && telCell != null &&
        telResp != null && nmMae != null && idNovoAcomp != undefined){
          if(auxBloqBotaoProximo == false){
            setBloqBotaoProximo(false);
          }else{
            setAuxBloqBotaoProximo2(false);
          }
        }else{
          setAuxBloqBotaoProximo2(true);
        }
        console.log('auxBloqBotaoProximo', auxBloqBotaoProximo)
        console.log('auxBloqBotaoProximo2', auxBloqBotaoProximo2)
    }
    setarBotao();
  }, [nome, dtNasci, cpf, email, endereco, telCell,
    telResp, nmMae, idNovoAcomp])
  
      const showDatePicker = () => {
        setDatePickerVisibility(true);
      };

  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    setSexo(sexos[selectedIndex].text);
  }, [selectedIndex]);

  useEffect(()=>{
    setIdNovoAcomp(2)
  },[])

  const confirmarData = (dt) => {
    console.log("confirmardata", dt)
    hideDatePicker()
    console.log(isDatePickerVisible)
      setDtNascString(moment(dt).format("DD/MM/YYYY"))
      setDtNasci(moment(dt).format("YYYY-MM-DD HH:mm:ss"));
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const styles = useStyleSheet({
    lineContent: {
      flex: 1,
      width: "100%",
      marginVertical: 8,
    },
    heightInput: {
      height: 40,
    },boxDatePicker: {
      marginHorizontal: 8,
      paddingVertical: 10,
      borderRadius: 10,
      elevation: 8,
      shadowRadius: 8,
      shadowColor: "#000",
      shadowOffset: {
        height: 1,
        width: 0,
      },
      shadowOpacity: 0.1,
    },
  });

  return (
    <>
      <View style={styles.lineContent}>
        <View>
          <Input
            placeholder="Nome do paciente"
            icon={user}
            value={nome}
            onChangeText={setNome}
          />
        </View>
      </View>
      <View style={styles.lineContent}>
        <View>
          <Input
            placeholder="Endereço Completo"
            icon={user}
            value={endereco}
            onChangeText={setEndereco}
          />
        </View>
      </View>
      <View style={styles.lineContent}>
        <Input
            placeholder="Data nascimento"
            icon={user}
            value={dtNascString}
            disabled={true} 
          />
        <Button title="Selecionar Data Nascimento" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(a)=> confirmarData(a)}
          onCancel={()=> hideDatePicker}
        />
      </View>
      {/* <View style={styles.lineContent}>
        <View>
          <Datepicker
            // min={new Date("1900-12-25")}
            date={dtNasci || new Date(moment().format('YYYY-MM-DD'))}
            placeholder="Data de Nascimento"
            onSelect={(dtNasci)=> {
              setDtNasci(dtNasci)
            }}
            icon={calendar}
          />
        </View>
      </View> */}
      {/* <View style={styles.lineContent}>
        <View>
          <Input
            placeholder="Data de Nascimento"
            icon={calendar}
            value={dtNascString}
            onChangeText={(dtNascString)=>{
              setarDataNascimento(dtNascString)
            }}
          />
        </View>
      </View> */}
      <View style={styles.lineContent}>
        <View
          style={{
            marginHorizontal: 16,
            borderRadius: 4,
          }}
        >
          <RadioGroup
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 16,
              },
              styles.heightInput,
            ]}
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
          >
            <Radio text="Masculino" />
            <Radio text="Feminino" />
          </RadioGroup>
        </View>
      </View>
      <View style={styles.lineContent}>
        <View>
          <Input
            placeholder="CPF"
            icon={user}
            onChangeText={setCpf}
            value={cpf}
          />
        </View>
      </View>
      <View style={styles.lineContent}>
        <View>
          <Input
            placeholder="E-mail"
            icon={emailIcon}
            onChangeText={setEmail}
            value={email}
          />
        </View>
      </View>
      <View style={styles.lineContent}>
        <View>
          <Input
            placeholder="Telefone Celular"
            icon={phone}
            value={telCell}
            onChangeText={setTelCell}
          />
        </View>
      </View>
      <View style={styles.lineContent}>
        <View>
          <Input
            placeholder="Telefone do resposável"
            icon={phone}
            value={telResp}
            onChangeText={setTelResp}
          />
        </View>
      </View>
      <View style={styles.lineContent}>
        <View>
          <Input
            placeholder="Nome da mãe"
            icon={user}
            value={nmMae}
            onChangeText={setNmMae}
          />
        </View>
      </View>
    </>
  );
};

export default DadosPessoais;
