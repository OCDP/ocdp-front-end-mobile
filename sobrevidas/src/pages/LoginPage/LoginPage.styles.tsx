import {Text, Button} from '@ui-kitten/components';
import {View} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled(View)`
  padding: 0px 32px;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
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
