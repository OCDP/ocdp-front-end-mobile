import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import {
  useStyleSheet,
  Radio,
  RadioGroup,
  Input,
  Datepicker,
} from "@ui-kitten/components";
import { calendar, user, emailIcon, phone } from "../../assets/Icons";
import PacienteContext from "../../contexts/PacienteContext";
import { sexos } from "../../utils/constants";
import NovoAcompContext from "../../contexts/NovoAcompContext";

const DadosPessoais = ({ navigation }) => {
  const {
    nome,
    setNome,
    dtNasci,
    setDtNasci,
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

  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    setSexo(sexos[selectedIndex].text);
  }, [selectedIndex]);

  useEffect(()=>{
    setIdNovoAcomp(2)
  },[])

  const styles = useStyleSheet({
    lineContent: {
      flex: 1,
      width: "100%",
      marginVertical: 8,
    },
    heightInput: {
      height: 40,
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
        <View>
          <Datepicker
            min={new Date("1900-12-25")}
            date={dtNasci}
            placeholder="Data de Nascimento"
            onSelect={setDtNasci}
            icon={calendar}
          />
        </View>
      </View>
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
