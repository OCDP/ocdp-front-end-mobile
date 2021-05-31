import {Button, Layout} from '@ui-kitten/components';
import {View} from 'react-native';
import styled from 'styled-components/native';

export const BemVindoContainer = styled(Layout)`
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
`;

export const ButtonContainer = styled(View)`
  width: 130px;
  position: absolute;
  bottom: 8px;
  justify-content: center;
`;

export const ButtonGoLogin = styled(Button)`
  border-radius: 30px;
`;
