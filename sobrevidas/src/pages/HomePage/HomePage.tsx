import React, {useCallback, useContext} from 'react';
import {SearchPaciente} from './HomePage.styles';
import {search} from '../../components/icons';
import {debounce} from 'lodash';

import PageContainer from '../../components/PageContainer/PageContainer';
import {useGetPacientes} from '../../hooks/networking/paciente';
import AppContext from '../../contexts/AppContext';

interface Props {}
const HomePage: React.FC<Props> = ({navigation}: any) => {
  const {setModal} = useContext(AppContext);

  const getPacientes = useGetPacientes();

  const _getPacientes = useCallback(
    async (nome: string) => {
      try {
        const {data} = await getPacientes(nome);
        console.log('pacientes >', data);
      } catch (e) {
        console.error('erro >> ', e);
        setModal({
          visible: true,
          title: 'Erro ao buscar pacientes',
          type: 'error',
          content: 'Alguma coisa deu errado ao buscar pacientes',
        });
      }
    },
    [getPacientes, setModal],
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
    </PageContainer>
  );
};

export default HomePage;
