import {Layout, Text, Button} from '@ui-kitten/components';
import {View} from 'react-native';
import styled from 'styled-components';
import {buildStyledShadow} from '../../styles/buildShadow';
const shadow = buildStyledShadow(6);

export const ItemListPaciente = styled(Layout)`
  ${shadow}
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
  height: 90px;
  padding: 8px 8px;
  margin: 8px 16px;
  padding: 16px 8px;
`;

export const PacienteInfos = styled(View)`
  flex: 1;
  flex-direction: column;
  margin-left: 12px;
`;

export const PacienteNome = styled(Text)`
  font-size: 16px;
`;

export const PacienteDetails = styled(Text)`
  font-size: 10px;
`;

export const ButtonDetail = styled(Button)`
  border-radius: 20px;
  height: 20px;
  width: 20px;
`;
