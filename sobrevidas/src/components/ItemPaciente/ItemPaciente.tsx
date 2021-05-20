import moment from 'moment';
import React, {useContext} from 'react';
import User from '../../assets/img/User';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import {
  DetailItemPaciente,
  ItemListPaciente,
  PacienteDetails,
  PacienteInfos,
  PacienteNome,
} from './ItemPaciente.styles';

interface Props {
  paciente: Models.Paciente;
}
const ItemPaciente: React.FC<Props> = ({paciente}) => {
  const {themeColors} = useContext(UsuarioLogadoContext);
  return (
    <ItemListPaciente level="2">
      <DetailItemPaciente level="4" />
      <User color={themeColors['color-primary-500']} />
      <PacienteInfos>
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
