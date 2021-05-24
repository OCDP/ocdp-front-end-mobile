import { Layout, Text } from '@ui-kitten/components';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { buildStyledShadow } from '../../styles/buildShadow';

const shadow = buildStyledShadow(6);

export const HomeText = styled(Text)`
    /* text-align: center; */
    padding: 10px 20px
`;

export const PaddingContent = styled(View)`
    margin-bottom: 5%;
    margin-top:5%;
    align-self: center;
    border-width: 1px;
    border-color: gray;
    background-color: white;
`;

export const ItemListHistorico = styled(Layout)`
  ${shadow}
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
  height: 90px;
  width: 50%;
  padding: 8px 8px;
  margin: 8px 16px;
  padding: 16px 8px;
`;

export const HistoricoListContainer = styled(View)`
    /* padding-top: 20px; */
    flex-direction: row;
    align-self: center;
    padding-bottom: 1px;
`

export const HistoricoContainer = styled(ScrollView)`
  padding-top: 40px;
`

export const TimeLine = styled(View)<{indice:number, i0color:string, i1color:string}>`
    ${props => `background-color: ${props.indice == 0 ? props.i0color : props.i1color}; `}
    width: 20px;
`

export const HistoricoInfos = styled(Layout)`
  background-color: transparent;
  flex: 1;
  flex-direction: column;
  margin-left: 12px;
`;

export const HistoricoNome = styled(Text)`
  font-size: 16px;
`;

export const HistoricoDetails = styled(Text)`
  font-size: 10px;
`;

