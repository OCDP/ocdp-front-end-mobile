import {Layout, Text, Button} from '@ui-kitten/components';
import styled from 'styled-components/native';
import {buildStyledShadow} from '../../styles/buildShadow';

const shadow = buildStyledShadow(30);

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled(Layout)`
  ${shadow}
  padding: 16px 16px;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 10px;
  width: 350px;
`;

export const LogoContainer = styled.View`
  align-items: center;
  margin: 16px 16px;
`;

export const FormItem = styled.View`
  margin: 8px 0px;
  justify-content: center;
`;

export const FooterLogin = styled.View`
  align-items: center;
`;

export const ButtonLogin = styled(Button)`
  border-radius: 30px;
  width: 130px;
`;

export const VersionText = styled(Text)`
  font-size: 10px;
`;
