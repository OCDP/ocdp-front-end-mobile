import styled from 'styled-components/native';
import {Button, Layout} from '@ui-kitten/components';

export const ModalCardContainer = styled(Layout)`
  border-radius: 10px;
  width: 350px;
  height: 200px;
  align-items: center;
`;

export const ModalCard = styled(Layout)`
  background-color: transparent;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const LogoModalContainer = styled(Layout)`
  flex: 0.5;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export const TextModalContainer = styled(Layout)`
  flex: 1;
  height: 100px;
  justify-content: center;
`;

export const ButtonModalContainer = styled(Button)`
  border-radius: 30px;
  width: 130px;
  align-items: center;
  margin: 16px 0px;
`;
