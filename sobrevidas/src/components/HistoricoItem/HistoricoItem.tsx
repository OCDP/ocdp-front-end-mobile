import React, {useContext} from 'react';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';

import {
  HistoricoDetails,
  HistoricoInfos,
  HistoricoItemContainer,
  ItemListHistorico,
  TimeLineContent,
  CircleTimeLine,
  ColumnTimeLine,
} from './HistoricoItem.styles';

interface Props {
  historico: Models.Historico;
}
const HistoricoItem: React.FC<Props> = ({historico}) => {
  const {themeColors} = useContext(UsuarioLogadoContext);

  return (
    <HistoricoItemContainer>
      <TimeLineContent>
        <CircleTimeLine color={themeColors['color-primary-300']} />
        <ColumnTimeLine color={themeColors['color-primary-200']} />
      </TimeLineContent>

      <ItemListHistorico level="3">
        <HistoricoInfos>
          <HistoricoDetails>
            Data: {historico.dataAtendimento || 'Não informado'}
          </HistoricoDetails>
          <HistoricoDetails>
            {historico.diferenca || 'Não informado'} atrás
          </HistoricoDetails>
          <HistoricoDetails category="c2">
            Local: {historico.localAtendimento || 'Não informado'}
          </HistoricoDetails>
          <HistoricoDetails>
            Profissional: {historico.profissionalDeSaude || 'Não informado'}
          </HistoricoDetails>
          <HistoricoDetails>
            Atendimento {historico.tipoAtendiemtento || 'Não informado'}
          </HistoricoDetails>
        </HistoricoInfos>
      </ItemListHistorico>
    </HistoricoItemContainer>
  );
};

export default HistoricoItem;
