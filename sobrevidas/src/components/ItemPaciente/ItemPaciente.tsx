import moment from 'moment';
import React, {useContext} from 'react';
import User from '../../assets/img/User';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import {DetailDivider} from '../../styles/index.styles';
import {minimalAvance} from '../icons';
import {
  ButtonDetail,
  ItemListPaciente,
  PacienteDetails,
  PacienteInfos,
  PacienteNome,
} from './ItemPaciente.styles';

interface Props {
  paciente: Models.Paciente;
  navigation: any;
}
const ItemPaciente: React.FC<Props> = ({paciente, navigation}) => {
  const {themeColors} = useContext(UsuarioLogadoContext);

  return (
    <ItemListPaciente level="2">
      <DetailDivider level="4" />
      <User color={themeColors['color-primary-500']} />
      <PacienteInfos>
        <PacienteNome category="c2">{paciente.nome}</PacienteNome>
        <PacienteDetails category="s1">
          {moment(paciente.dataNascimento).format('DD/MM/YYYY')} | CPF:{' '}
          {paciente.cpf}
        </PacienteDetails>
      </PacienteInfos>
      <ButtonDetail
        appearance="outline"
        size="small"
        accessoryRight={minimalAvance}
        onPress={() => {
          navigation.navigate('DadosPacientePage', {id: paciente.id});
        }}
      />
    </ItemListPaciente>
  );
};

export default ItemPaciente;
