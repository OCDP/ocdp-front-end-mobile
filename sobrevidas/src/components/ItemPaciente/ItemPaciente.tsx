import { NavigationContainer } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext } from 'react';
import { Alert } from 'react-native';
import User from '../../assets/img/User';
import CadastroPacienteContext, { CadastroPacienteProvider } from '../../contexts/CadastroPacienteContext';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import { DetailDivider } from '../../styles/index.styles';
import {
  ItemListPaciente,
  PacienteDetails,
  PacienteInfos,
  PacienteNome,
} from './ItemPaciente.styles';

interface Props {
  paciente: Models.Paciente;
  navigation: any;
}
const ItemPaciente: React.FC<Props> = ({ paciente, navigation }) => {
  const { themeColors } = useContext(UsuarioLogadoContext);
  const { setNewPaciente } = useContext(CadastroPacienteContext)

  function setarPaciente() {
    // console.log(paciente);
    setNewPaciente(paciente);
    navigation.navigate("DadosPacientePage")
  }

  return (

    <ItemListPaciente level="2">
      <DetailDivider level="4" />
      <User color={themeColors['color-primary-500']} />
      <PacienteInfos onTouchEnd={() => setarPaciente()}>
        <PacienteNome category="c2">{paciente.nome}</PacienteNome>
        <PacienteDetails category="c2">
          Nascimento: {moment(paciente.dataNascimento).format('DD/MM/YYYY')} |
          CPF: {paciente.cpf}
        </PacienteDetails>
      </PacienteInfos>
    </ItemListPaciente>
  );
};

export default ItemPaciente;
