import React from 'react';
import ItemPaciente from '../ItemPaciente/ItemPaciente';
import { ScrollView } from 'react-native-gesture-handler';
import EmptyContent from '../EmptyContent/EmptyContent';
import { Text } from '@ui-kitten/components/ui/text/text.component';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import { View } from 'react-native';
import { Container } from './ListPacientes.styles';

interface Props {
  pacientes: Models.Paciente[];
  loading: boolean;
}
const ListPacientes: React.FC<Props> = ({ pacientes, loading }) => {
  if (loading) {
    return (
      <Container>
        <LoadingIndicator ></LoadingIndicator>
      </Container>
    )
  } else {
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
  }
};

export default ListPacientes;
