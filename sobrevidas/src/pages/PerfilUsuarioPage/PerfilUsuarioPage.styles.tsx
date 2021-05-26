import {Button, Layout} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const PerfilContainer = styled(ScrollView)`
  flex: 1;
  flex-direction: column;
  /* justify-content: space-between; */
`;

export const FooterItens = styled(Layout)`
  background-color: transparent;
  justify-content: space-around;
  align-items: center;
  height: 100px;
`;

export const FooterContent = styled(Layout)`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  align-items: center;
`;

export const LogoutButton = styled(Button)`
  border-radius: 30px;
`;
