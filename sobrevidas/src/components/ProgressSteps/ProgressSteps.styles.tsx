import styled, {css} from 'styled-components/native';
import { Layout, Text } from '@ui-kitten/components';
import {View} from 'react-native';
import { buildStyledShadow } from '../../styles/buildShadow';

const shadow = buildStyledShadow(12);

export const Container = styled(View)<{flexInfo: number}>`
  flex-direction: column;
  align-self: center; 
  justify-content: center;
  ${props => props.flexInfo && `
      flex: ${props.flexInfo}
    `
  }}`;

export const Bar = styled(View)<{indice: number, step: number, colorVar:string}>`
  flex:1;
  background-color: ${({indice, step, colorVar}) => 
  (indice <= step - 2) 
  ? colorVar 
  : "white"}}
`;

export const SubContainer = styled(View)`
  flex: 0.5;
  flex-direction: row;
  border-width: 1px;
  border-radius: 50px;
  border-style: solid;
  width: 90%;
`