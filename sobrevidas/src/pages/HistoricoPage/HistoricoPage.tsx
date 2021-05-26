import React, {memo, useCallback, useContext, useState} from 'react';
import {Alert} from 'react-native';
import EmptyContent from '../../components/EmptyContent/EmptyContent';
import FadeLoading from '../../components/FadeLoading/FadeLoading';
import HistoricoItem from '../../components/HistoricoItem/HistoricoItem';
import {addButton} from '../../components/icons';
import PageContainer from '../../components/PageContainer/PageContainer';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import {useGetHistoricoPaciente} from '../../hooks/networking/historico';
import useMountEffect from '../../hooks/utils/useMountEffect';
import getFirstName from '../../utils/getFirstName';

import {
  HistoricoListContainer,
  BotaoContainer,
  BotaoNovaAcao,
} from './HistoricoPage.styles';

interface Props {}
const HistoricoPage: React.FC<Props> = ({navigation, route}: any) => {
  const {id, nome} = route.params;
  const getHistoricoPaciente = useGetHistoricoPaciente();
  const [loading, setLoading] = useState(false);

  const [historico, setHistorico] = useState<Models.Historico[]>([]);
  const {usuarioLogado} = useContext(UsuarioLogadoContext);

  const _getHistoricos = useCallback(async () => {
    try {
      setLoading(true);
      const {data} = await getHistoricoPaciente(id);
      setLoading(false);
      setHistorico(data);
    } catch (e) {
      setLoading(false);
      Alert.alert('Erro na busca', 'Erro ao buscar histórico', [
        {text: 'Voltar'},
      ]);
    }
  }, [getHistoricoPaciente, id]);

  useMountEffect(_getHistoricos);

  return (
    <PageContainer
      withHeader
      canGoBack
      pageTitle={`Histórico de ${getFirstName(nome)}`}
      navigation={navigation}>
      <FadeLoading loading={loading} />
      <BotaoContainer>
        <BotaoNovaAcao
          accessoryRight={addButton}
          appearance="outline"
          size="small"
          onPress={() =>
            Alert.alert(
              'Feature prestes a ser implementada',
              'Logo logo estamos com isso funfando',
              [{text: 'Voltar'}],
            )
          }>
          Novo Atendimento
        </BotaoNovaAcao>
        {usuarioLogado.nivelAtencao === 'SECUNDARIA' && (
          <BotaoNovaAcao
            accessoryRight={addButton}
            appearance="outline"
            size="small"
            onPress={() =>
              Alert.alert(
                'Feature prestes a ser implementada',
                'Logo logo estamos com isso funfando',
                [{text: 'Voltar'}],
              )
            }>
            Nova Intervenção
          </BotaoNovaAcao>
        )}
      </BotaoContainer>
      {historico.length > 0 ? (
        <HistoricoListContainer>
          {historico.map((item, i) => (
            <HistoricoItem historico={item} key={i} />
          ))}
        </HistoricoListContainer>
      ) : (
        <EmptyContent emptyMessage="Nenhum item nesse histórico!" />
      )}
    </PageContainer>
  );
};

export default memo(HistoricoPage);
