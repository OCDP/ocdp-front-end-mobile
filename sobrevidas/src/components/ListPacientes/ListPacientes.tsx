import React from 'react';
import ItemPaciente from '../ItemPaciente/ItemPaciente';
import {ScrollView} from 'react-native-gesture-handler';
import EmptyContent from '../EmptyContent/EmptyContent';

interface Props {
  pacientes: Models.Paciente[];
}
const ListPacientes: React.FC<Props> = ({pacientes}) => {
  return (
    <>
      {pacientes.length > 0 ? (
        <ScrollView>
          {pacientes.map((paciente, i) => (
            <ItemPaciente key={i} paciente={paciente} />
          ))}
        </ScrollView>
      ) : (
        <EmptyContent emptyMessage="Nenhum paciente para listar!" />
      )}
    </>
  );
};

export default ListPacientes;
