import React, { useContext, useState, useEffect, ContextType } from "react";
import { View, Button, Alert, BackHandler } from "react-native";
import {
  useStyleSheet,
  Radio,
  RadioGroup,
  Input,
  Button as ButtonUiKitten,
  Datepicker,
} from "@ui-kitten/components";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { calendar, user, emailIcon, phone } from "../../assets/Icons";
import PacienteContext from "../../contexts/PacienteContext";
import { sexos } from "../../utils/constants";
import NovoAcompContext from "../../contexts/NovoAcompContext";
import BotaoContext from "../../contexts/BotoesContext";
import { useLoading } from "../../contexts/AppContext";
import { CommonActions } from "@react-navigation/native";

const DadosPessoais = ({ navigation }) => {
  let {
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

  const { idNovoAcomp, setIdNovoAcomp } = useContext(NovoAcompContext);
  const {
    bloqBotaoProximo,
    setBloqBotaoProximo,
    auxBloqBotaoProximo,
    setAuxBloqBotaoProximo,
    auxBloqBotaoProximo2,
    setAuxBloqBotaoProximo2,
  } = useContext(BotaoContext);
  const [dtNascString, setDtNascString] = useState("");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [, setLoading] = useLoading();
  const { activeStepBtn, setActiveStepBtn } = React.useContext(BotaoContext);

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Atenção",
        "Voltar agora te fará perder as informações. Para voltar um passo, utilize o botão voltar. \n\nDeseja prosseguir e cancelar procedimento?",
        [
          {
            text: "Voltar",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "Desejo cancelar procedimento",
            onPress: () => {
              navigation.dispatch(
                CommonActions.reset({
                  routes: [{ name: "Home" }],
                })
              );
              setActiveStepBtn(0);
            },
          },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    async function setarBotao() {
      if (bloqBotaoProximo == true) {
        console.log(
          "values",
          nome,
          dtNasci,
          cpf,
          email,
          endereco,
          telCell,
          telResp,
          nmMae,
          idNovoAcomp
        );
        if (
          nome != null &&
          dtNasci != null &&
          cpf != null &&
          email != null &&
          endereco != null &&
          telCell != null &&
          telResp != null &&
          nmMae != null &&
          idNovoAcomp != undefined
        ) {
          if (auxBloqBotaoProximo == false) {
            setBloqBotaoProximo(false);
          } else {
            setAuxBloqBotaoProximo2(false);
          }
        } else {
          setAuxBloqBotaoProximo2(true);
        }
        console.log("auxBloqBotaoProximo", auxBloqBotaoProximo);
        console.log("auxBloqBotaoProximo2", auxBloqBotaoProximo2);
      }
    }
    setarBotao();
  }, []);

  useEffect(() => {
    async function setarBotao() {
      console.log(
        "values",
        nome,
        dtNasci,
        cpf,
        email,
        endereco,
        telCell,
        telResp,
        nmMae,
        idNovoAcomp
      );
      if (
        nome != null &&
        cpf != null &&
        email != null &&
        endereco != null &&
        telCell != null &&
        telResp != null &&
        nmMae != null &&
        idNovoAcomp != undefined
      ) {
        if (auxBloqBotaoProximo == false) {
          setBloqBotaoProximo(false);
        } else {
          setAuxBloqBotaoProximo2(false);
        }
      } else {
        setAuxBloqBotaoProximo2(true);
      }
      console.log("auxBloqBotaoProximo", auxBloqBotaoProximo);
      console.log("auxBloqBotaoProximo2", auxBloqBotaoProximo2);
    }
    setarBotao();
  }, [
    nome,
    dtNasci,
    cpf,
    email,
    endereco,
    telCell,
    telResp,
    nmMae,
    idNovoAcomp,
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    setSexo(sexos[selectedIndex].text);
  }, [selectedIndex]);

  useEffect(() => {
    setIdNovoAcomp(2);
  }, []);

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  const validateTelefoneCelular = (telCelular) =>{
    var re = /(?:\()?[0-9]{2}(?:\))?\s?[0-9]{5}(?:-)?[0-9]{4}$/
      return re.test(telCelular)
  }

  const validateTelefoneResponsavel = (telResponsavel) =>{
    var re = /(?:\()?[0-9]{2}(?:\))?\s?[0-9]{4,5}(?:-)?[0-9]{4}$/
      return re.test(telResponsavel)
  }

  const confirmarData = (dt) => {
    setIsDatePickerVisible(false);
    setDtNascString(moment(dt).format("DD/MM/YYYY"));
    setDtNasci(moment(dt).format("YYYY-MM-DD HH:mm:ss"));
  };

  const styles = useStyleSheet({
    lineContent: {
      flex: 1,
      width: "100%",
      marginVertical: 8,
    },
    heightInput: {
      height: 40,
    },
    boxDatePicker: {
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

  const validateCpf = (cpf) => {
    let cpfMask: string = "00000000000";
    cpfMask = cpfMask.replace(/[^\d]/g, "");
    setCpf(cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
  };

  const onChangeCpf = (cpf) => {
    console.log(">>> ", cpf);
    validateCpf(cpf);
  };

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
        <ButtonUiKitten
          disabled={nome.length == 0}
          size="small"
          onPress={() => setNome("")}
        >
          limpar nome paciente
        </ButtonUiKitten>
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
        <ButtonUiKitten
          disabled={endereco.length == 0}
          size="small"
          onPress={() => setEndereco("")}
        >
          limpar endereço
        </ButtonUiKitten>
      </View>
      <View style={styles.lineContent}>
        <Input
          placeholder="Data nascimento"
          icon={user}
          value={dtNascString}
          disabled={true}
        />
        <Button
          title="Selecionar Data Nascimento"
          onPress={() => setIsDatePickerVisible(true)}
        />
        <DateTimePickerModal
          cancelTextIOS="cancelar"
          confirmTextIOS="confirmar"
          headerTextIOS="Escolha uma data"
          locale="pt-BR"
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(a) => confirmarData(a)}
          onCancel={() => setIsDatePickerVisible(false)}
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
            disabled={cpf?.length > 10 ? true : false}
            placeholder="CPF"
            icon={user}
            onChangeText={(value) => onChangeCpf(value)}
            value={cpf}
            maxLength={14}
          />
          {/* <TextInputMask
            refInput={value => { this.cpf = value }}
            onChangeText={(formatted, extracted) => {
              console.log(formatted) // +1 (123) 456-78-90
              console.log(extracted) // 1234567890
              setCpf(extracted)
            }}
            mask={"+1 ([000]) [000] [00] [00]"}
          /> */}
        </View>
        <ButtonUiKitten
          disabled={cpf?.length > 10 ? false : true}
          size="small"
          onPress={() => setCpf("")}
        >
          limpar CPF
        </ButtonUiKitten>
      </View>
      <View style={styles.lineContent}>
        <View>
          <Input
            placeholder="E-mail"
            icon={emailIcon}
            onChangeText={setEmail}
            value={email}
            onBlur={() => {
              if(validateEmail(email) == false){
                alert("email inválido");
                setEmail("");
              }
            }}
          />
        </View>
        <ButtonUiKitten
          disabled={(validateEmail(email) ? false : true)}
          size="small"
          onPress={() => setEmail("")}
        >
          limpar email
        </ButtonUiKitten>
      </View>
      <View style={styles.lineContent}>
        <View>
          <Input
            placeholder="Telefone Celular"
            icon={phone}
            value={telCell}
            onChangeText={setTelCell}
            maxLength={11}
            textContentType={"telephoneNumber"}
            keyboardType={"phone-pad"}
            onBlur={() => {
              if(validateTelefoneCelular(telCell) == false){
                alert("celular inválido");
                setTelCell("");
              }
            }}
          />
        </View>
        <ButtonUiKitten
          disabled={(validateTelefoneCelular(telCell) ? false : true)}
          size="small"
          onPress={() => setTelCell("")}
        >
          limpar telefone celular
        </ButtonUiKitten>
      </View>
      <View style={styles.lineContent}>
        <View>
          <Input
            placeholder="Telefone do resposável"
            icon={phone}
            value={telResp}
            maxLength={11}
            onChangeText={setTelResp}onBlur={() => {
              if(validateTelefoneResponsavel(telResp) == false){
                alert("telefone responsavel inválido");
                setTelResp("");
              }
            }}
          />
        </View>
        <ButtonUiKitten
          disabled={(validateTelefoneResponsavel(telResp) ? false : true)}
          size="small"
          onPress={() => setTelResp("")}
        >
          limpar telefone responsavel
        </ButtonUiKitten>
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
        <ButtonUiKitten
          disabled={nmMae.length == 0}
          size="small"
          onPress={() => setNmMae("")}
        >
          limpar nome mãe
        </ButtonUiKitten>
      </View>
    </>
  );
};

export default DadosPessoais;
