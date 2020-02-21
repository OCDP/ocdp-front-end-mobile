import React, { useContext } from "react";
import { View } from "react-native";
import { useStyleSheet, Autocomplete } from "@ui-kitten/components";
import { pin, map } from "../../assets/Icons";
import PacienteContext from "../../contexts/PacienteContext";
import { cidades, bairros } from "../../utils/constants";

const DadosLocais = ({ navigation }) => {
  const { setCidade, setBairro } = useContext(PacienteContext);

  const styles = useStyleSheet({
    lineContent: {
      flex: 1,
      width: "100%",
      marginVertical: 8
    },
    heightInput: {
      height: 40
    }
  });

  const [dataBairros, setDataBairros] = React.useState(bairros);
  const [valueBairro, setValueBairro] = React.useState(null);
  const [dataCidades, setDataCidades] = React.useState(cidades);
  const [valueCidade, setValueCidade] = React.useState(null);

  const onSelectBairro = ({ title }) => {
    setBairro(title);
    setValueBairro(title);
  };

  const onSelectCidade = ({ title }) => {
    setCidade(title);
    setValueCidade(title);
  };

  const onChangeTextBairro = query => {
    setValueBairro(query);
    setDataBairros(
      bairros.filter(e => e.title.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const onChangeTextCidade = query => {
    setValueCidade(query);
    setDataCidades(
      cidades.filter(e => e.title.toLowerCase().includes(query.toLowerCase()))
    );
  };

  return (
    <>
      <View style={styles.lineContent}>
        <View></View>
        <View>
          <Autocomplete
            style={styles.heightInput}
            icon={map}
            onFocus={() => setValueCidade(null)}
            placeholder="Cidade"
            value={valueCidade}
            data={dataCidades}
            onChangeText={onChangeTextCidade}
            onSelect={onSelectCidade}
          />
        </View>
      </View>
      <View style={styles.lineContent}>
        <View>
          <Autocomplete
            style={styles.heightInput}
            icon={pin}
            onFocus={() => setValueBairro(null)}
            placeholder="Bairro"
            value={valueBairro}
            data={dataBairros}
            onChangeText={onChangeTextBairro}
            onSelect={onSelectBairro}
          />
        </View>
      </View>
    </>
  );
};

export default DadosLocais;
