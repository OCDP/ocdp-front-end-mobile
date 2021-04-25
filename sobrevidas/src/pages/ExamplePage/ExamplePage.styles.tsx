import styled from 'styled-components/native';
import {buildStyledShadow} from '../../styles/buildShadow';

const shadow = buildStyledShadow(30);

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.View`
  ${shadow}
  padding: 16px 16px;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 10px;
  width: 300px;
`;

export const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: 16px;
`;

export const FormItem = styled.View`
  margin: 8px 0px;
`;
