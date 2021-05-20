import {Button, Layout} from '@ui-kitten/components';
import styled from 'styled-components/native';

export const PerfilContainer = styled(Layout)`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const UserLogoContainer = styled(Layout)`
  padding-top: 32px;
  justify-content: center;
  background-color: transparent;
  align-items: center;
`;

export const CurveContainer = styled(Layout)`
  position: absolute;
  bottom: 0;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 0px;
  width: 100%;
  height: 400px;
`;

export const InfoListPerfil = styled(Layout)`
  background-color: transparent;
  width: 100%;
`;

export const InfoItemPerfil = styled(Layout)`
  margin: 4px 16px;
  background-color: transparent;
  flex-direction: row;
  justify-content: space-between;
`;

export const FooterItens = styled(Layout)`
  background-color: transparent;
  justify-content: space-around;
  align-items: center;
  height: 400px;
`;

export const LogoutButton = styled(Button)`
  width: 160px;
  border-radius: 30px;
`;
