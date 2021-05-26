import React from 'react';
import ItemPaciente from '../ItemPaciente/ItemPaciente';
import EmptyContent from '../EmptyContent/EmptyContent';
import {CadastroPacienteProvider} from '../../contexts/CadastroPacienteContext';
import {ScrollViewList} from './ListPacientes.styles';

interface Props {
  pacientes: Models.Paciente[];
  navigation: any;
}
const ListPacientes: React.FC<Props> = ({pacientes, navigation}) => {
  return (
    <>
      {pacientes.length > 0 ? (
        <ScrollViewList>
          {pacientes.map((paciente, i) => (
            <CadastroPacienteProvider>
              <ItemPaciente
                key={i}
                paciente={paciente}
                navigation={navigation}
              />
            </CadastroPacienteProvider>
          ))}
        </ScrollViewList>
      ) : (
        <EmptyContent emptyMessage="Nenhum paciente para listar!" />
      )}
    </>
  );
};

export default ListPacientes;
