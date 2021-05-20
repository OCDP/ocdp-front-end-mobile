import {Button, Layout} from '@ui-kitten/components';
import styled from 'styled-components/native';

export const PerfilContainer = styled(Layout)`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const HeaderContainer = styled(Layout)`
  margin-top: 64px;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: transparent;
  align-items: center;
`;

export const InfosHeader = styled(Layout)`
  background-color: transparent;
  flex-direction: column;
`;

export const InfoListPerfil = styled(Layout)`
  background-color: transparent;
  margin-left: 16px;
  margin-right: 16px;
`;

export const InfoItemPerfil = styled(Layout)`
  margin: 8px 16px;
  background-color: transparent;
  flex-direction: column;
  /* justify-content: space-between; */
`;

export const FooterItens = styled(Layout)`
  background-color: transparent;
  justify-content: space-around;
  align-items: center;
  height: 130px;
`;

export const LogoutButton = styled(Button)`
  width: 160px;
  border-radius: 30px;
`;
