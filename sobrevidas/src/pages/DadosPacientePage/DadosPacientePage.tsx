import React, {memo, useCallback, useState} from 'react';
import {Alert} from 'react-native';
import FadeLoading from '../../components/FadeLoading/FadeLoading';
import {calendar} from '../../components/icons';
import PageContainer from '../../components/PageContainer/PageContainer';
import PerfilHeader from '../../components/PerfilHeader/PerfilHeader';
import {useGetPaciente} from '../../hooks/networking/paciente';
import useMountEffect from '../../hooks/utils/useMountEffect';
import {
  ButtonFooterContainer,
  ButtonFooterBig,
} from '../../styles/index.styles';
import getFirstName from '../../utils/getFirstName';

import {DadosContainer} from './DadosPacientePage.styles';

interface Props {}
const DadosPacientePage: React.FC<Props> = ({navigation, route}: any) => {
  const {id} = route.params;
  const getPaciente = useGetPaciente();
  const [loading, setLoading] = useState(false);

  const [paciente, setPaciente] = useState<Models.Paciente>();

  const _usePaciente = useCallback(async () => {
    try {
      setLoading(true);
      const {data} = await getPaciente(id);
      setPaciente(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      Alert.alert('Erro na busca', 'Erro ao buscar paciente', [
        {text: 'Voltar'},
      ]);
    }
  }, [getPaciente, id]);

  useMountEffect(_usePaciente);

  return (
    <PageContainer
      withHeader
      canGoBack
      pageTitle={`Dados do paciente ${
        paciente?.nome ? getFirstName(paciente.nome) : ''
      }`}
      navigation={navigation}>
      <>
        <FadeLoading loading={loading} />
        {paciente && (
          <>
            <DadosContainer>
              <PerfilHeader
                type="PACIENTE"
                sexo={paciente.sexo}
                title={paciente.nome}
                subtitle={paciente.email}
              />
            </DadosContainer>

            <ButtonFooterContainer>
              <ButtonFooterBig
                onPress={() =>
                  navigation.navigate('HistoricoPage', {
                    id: id,
                    nome: paciente?.nome,
                  })
                }
                accessoryRight={calendar}>
                Abrir histórico
              </ButtonFooterBig>
            </ButtonFooterContainer>
          </>
        )}
      </>
    </PageContainer>
  );
};

export default memo(DadosPacientePage);
