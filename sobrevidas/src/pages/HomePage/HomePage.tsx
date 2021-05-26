import React, {memo, useCallback, useState} from 'react';
import {SearchPaciente} from './HomePage.styles';
import {addButton, search} from '../../components/icons';
import {debounce} from 'lodash';

import PageContainer from '../../components/PageContainer/PageContainer';
import {useGetPacientes} from '../../hooks/networking/paciente';
import {Alert} from 'react-native';
import ListPacientes from '../../components/ListPacientes/ListPacientes';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import useMountEffect from '../../hooks/utils/useMountEffect';
import {
  ButtonFooterContainer,
  ButtonFooterBig,
} from '../../styles/index.styles';

interface Props {}
const HomePage: React.FC<Props> = ({navigation}: any) => {
  const getPacientes = useGetPacientes();
  const [loading, setLoading] = useState(false);
  const [pacientes, setPacientes] = useState<Models.Paciente[]>([]);

  const _getPacientes = useCallback(
    async (nome: string) => {
      try {
        setLoading(true);
        const {data} = await getPacientes(nome.length > 0 ? nome : 'a');
        setPacientes(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        Alert.alert('Erro na busca', 'Erro ao buscar pacientes', [
          {text: 'Voltar'},
        ]);
      }
    },
    [getPacientes],
  );

  useMountEffect(() => _getPacientes('a'));

  const onFilterThrottle = debounce(
    (value: string) => _getPacientes(value),
    600,
  );

  return (
    <PageContainer withHeader pageTitle="Pacientes" navigation={navigation}>
      <SearchPaciente
        placeholder="Buscar pacientes"
        accessoryRight={loading ? LoadingIndicator : search}
        onChangeText={(value: string) => onFilterThrottle(value)}
      />
      <ListPacientes pacientes={pacientes} navigation={navigation} />

      <ButtonFooterContainer>
        <ButtonFooterBig
          onPress={() => navigation.navigate('CadastrarPacientePage')}
          accessoryRight={addButton}>
          Adicionar Paciente
        </ButtonFooterBig>
      </ButtonFooterContainer>
    </PageContainer>
  );
};

export default memo(HomePage);
