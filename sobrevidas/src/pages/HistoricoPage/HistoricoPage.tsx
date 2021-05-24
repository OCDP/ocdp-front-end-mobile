import { Button } from '@ui-kitten/components';
import { Divider } from '@ui-kitten/components/ui/divider/divider.component';
import { Text } from '@ui-kitten/components/ui/text/text.component';
import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ItemListPaciente } from '../../components/ItemPaciente/ItemPaciente.styles';
import PageContainer from '../../components/PageContainer/PageContainer';
import { CadastroPacienteProvider, CadastroPacienteConsumer } from '../../contexts/CadastroPacienteContext';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import { useGetHistoricoPaciente } from '../../hooks/networking/historico';
import { HistoricoInfos, HistoricoDetails, ItemListHistorico, PaddingContent, HistoricoListContainer, TimeLine, HistoricoContainer } from './HistoricoPage.styles';

interface Props { }
const HistoricoPage: React.FC<Props> = ({ navigation, route }: any) => {

  const getHistoricoPaciente = useGetHistoricoPaciente();

  
  const [pacienteState, setPacienteState] = useState<Models.Paciente>(route.params.paciente)
  const [historico, setHistorico] = useState<Models.Historico[]>([]);
  const { usuarioLogado, themeColors } = useContext(UsuarioLogadoContext);

  const historicos = useCallback(async () => {
    try {
      console.log(pacienteState.cpf)
      const { data } = await getHistoricoPaciente(pacienteState.cpf);
      console.log(data);
      setHistorico(data);
    } catch (err) {
      console.log(err);
    }
  }, [getHistoricoPaciente])

  useEffect(() => {
    historicos();
  }, [])

  return (
    <PageContainer withHeader pageTitle={`Histórico ${pacienteState.nome}`} withFooter navigation={navigation} paciente={pacienteState}>
      <HistoricoContainer>
        <View style={{flex:1, flexDirection: "row", alignSelf: "center", paddingBottom: 10}}>
          <Button> Novo Atendimento </Button>
          {usuarioLogado.nivelAtencao == "SECUNDARIA" && (
            <Button> Nova Intervenção </Button>
          )}
        </View>
        {historico.map((h, i) => (
          <>

            <HistoricoListContainer>
              <TimeLine indice={i} i0color={themeColors["color-primary-300"]} i1color={themeColors["color-primary-200"]}></TimeLine>
              <ItemListHistorico>
                <HistoricoInfos>
                  <HistoricoDetails>Data de Atendimento: {h.dataAtendimento}</HistoricoDetails>
                  <HistoricoDetails>{h.diferenca} atrás</HistoricoDetails>
                  <HistoricoDetails>{h.localAtendimento}</HistoricoDetails>
                  <HistoricoDetails>Profissional: {h.profissionalDeSaude}</HistoricoDetails>
                  <HistoricoDetails>Atendimento {h.tipoAtendiemtento}</HistoricoDetails>
                </HistoricoInfos>
              </ItemListHistorico>
            </HistoricoListContainer>
          </>
        ))}
      </HistoricoContainer>

    </PageContainer>
  );
};

export default memo(HistoricoPage);
