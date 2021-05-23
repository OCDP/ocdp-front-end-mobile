import React from 'react';
import ItemPaciente from '../ItemPaciente/ItemPaciente';
import { ScrollView } from 'react-native-gesture-handler';
import EmptyContent from '../EmptyContent/EmptyContent';
import { Text } from '@ui-kitten/components/ui/text/text.component';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import { View } from 'react-native';
import { Container } from './ListPacientes.styles';
import { CadastroPacienteProvider } from '../../contexts/CadastroPacienteContext';

interface Props {
  pacientes: Models.Paciente[];
  loading: boolean;
  navigation: any;
}
const ListPacientes: React.FC<Props> = ({ pacientes, loading, navigation }) => {
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
              <CadastroPacienteProvider>
                <ItemPaciente key={i} paciente={paciente} navigation={navigation} />
              </CadastroPacienteProvider>
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
