import {Layout, Text} from '@ui-kitten/components';
import styled from 'styled-components';
import {buildStyledShadow} from '../../styles/buildShadow';

const shadow = buildStyledShadow(3);

export const HistoricoItemContainer = styled(Layout)`
  flex-direction: row;
  align-self: center;
  padding-bottom: 1px;
  justify-content: center;
  width: 100%;
  margin: 4px 0px;
  height: 110px;
`;

export const TimeLineContent = styled(Layout)`
  flex-direction: column;
  margin-right: 16px;
  height: 100%;
  background-color: transparent;
  align-items: center;
`;

export const ColumnTimeLine = styled(Layout)<{
  color: string;
}>`
  ${props => `background-color: ${props.color}; `}
  width: 5px;
  height: 120px;
`;

export const CircleTimeLine = styled(Layout)<{
  color: string;
}>`
  ${props => `background-color: ${props.color}; `}
  border-radius: 20px;
  width: 10px;
  height: 10px;
`;

export const ItemListHistorico = styled(Layout)`
  ${shadow}
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
  height: 100%;
  width: 70%;
  padding: 8px 8px;
  padding: 16px 8px;
`;

export const HistoricoInfos = styled(Layout)`
  background-color: transparent;
  flex: 1;
  flex-direction: column;
  margin-left: 12px;
`;

export const HistoricoDetails = styled(Text)`
  font-size: 10px;
`;
