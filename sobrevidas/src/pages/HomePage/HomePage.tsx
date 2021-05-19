import React, {useCallback} from 'react';
import {ButtonAddPaciente, SearchPaciente} from './HomePage.styles';
import {addButton, search} from '../../components/icons';
import {debounce} from 'lodash';

import PageContainer from '../../components/PageContainer/PageContainer';
import {useGetPacientes} from '../../hooks/networking/paciente';
import {Alert} from 'react-native';

interface Props {}
const HomePage: React.FC<Props> = ({navigation}: any) => {
  const getPacientes = useGetPacientes();

  const _getPacientes = useCallback(
    async (nome: string) => {
      try {
        const {data} = await getPacientes(nome);
        console.log('pacientes >', data);
      } catch (e) {
        console.error('erro >> ', e);
        Alert.alert('Erro na busca', 'Erro ao buscar pacientes', [
          {text: 'Voltar'},
        ]);
      }
    },
    [getPacientes],
  );

  const onFilterThrottle = debounce(
    (value: string) => _getPacientes(value),
    300,
  );

  return (
    <PageContainer withHeader pageTitle="Pacientes" navigation={navigation}>
      <SearchPaciente
        placeholder="Buscar pacientes"
        accessoryRight={search}
        onChangeText={(value: string) => onFilterThrottle(value)}
      />
      <ButtonAddPaciente
        onPress={() => navigation.navigate('CadastrarPacientePage')}
        accessoryLeft={addButton}
      />
    </PageContainer>
  );
};

export default HomePage;
