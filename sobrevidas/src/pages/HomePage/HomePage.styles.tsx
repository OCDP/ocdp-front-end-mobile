import {Button, Input, Text} from '@ui-kitten/components';
import styled from 'styled-components/native';
import {buildStyledShadow} from '../../styles/buildShadow';
const shadow = buildStyledShadow(8);

export const HomeText = styled(Text)``;

export const SearchPaciente = styled(Input)`
  width: 100%;
  padding: 8px 16px;
`;

export const ButtonAddPaciente = styled(Button)`
  ${shadow}
  width: 40px;
  height: 40px;
  border-radius: 50px;
  position: absolute;
  bottom: 16px;
  right: 16px;
`;
