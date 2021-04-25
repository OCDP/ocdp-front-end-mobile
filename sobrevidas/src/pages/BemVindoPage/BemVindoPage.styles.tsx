import {Button, Layout} from '@ui-kitten/components';
import styled from 'styled-components/native';

export const BemVindoContainer = styled(Layout)`
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
`;

export const WaveContainer = styled(Layout)`
  position: absolute;
  top: 0;
  border-top-left-radius: 200px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 200px;
  width: 100%;
  height: 88%;
  top: 0px;
`;

export const ButtonContainer = styled(Layout)`
  width: 130px;
  justify-content: center;
`;

export const ButtonGoLogin = styled(Button)`
  border-radius: 30px;
`;
