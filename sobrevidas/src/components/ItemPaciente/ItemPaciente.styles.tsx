import {Layout, Text} from '@ui-kitten/components';
import styled from 'styled-components';
import {buildStyledShadow} from '../../styles/buildShadow';
const shadow = buildStyledShadow(6);

export const ItemListPaciente = styled(Layout)`
  ${shadow}
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
  height: 90px;
  padding: 8px 8px;
  margin: 8px 16px;
  padding: 16px 8px;
`;

export const DetailItemPaciente = styled(Layout)`
  height: 60px;
  width: 5px;
  margin: 0px 12px 0px 2px;
  border-radius: 16px;
`;

export const PacienteInfos = styled(Layout)`
  background-color: transparent;
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
