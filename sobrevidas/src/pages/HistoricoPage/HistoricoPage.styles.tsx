import {Button, Layout} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const HistoricoListContainer = styled(ScrollView)`
  margin: 4px 0px 0px 0px;
`;

export const BotaoContainer = styled(Layout)`
  flex-direction: row;
  justify-content: space-around;
  padding: 8px 16px;
`;

export const BotaoNovaAcao = styled(Button)`
  margin-right: 1px;
  margin-left: 1px;
  border-radius: 20px;
`;
