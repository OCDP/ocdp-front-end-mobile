import {Button, Layout} from '@ui-kitten/components';
import {View} from 'react-native';
import styled from 'styled-components/native';

export const PerfilContainer = styled(Layout)`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const LogoContainer = styled(Layout)`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;

export const HeaderLine = styled(Layout)<{color: string}>`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 50px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 50px;
  height: 120px;
  width: 100%;
  position: absolute;
  top: 0px;
  ${props =>
    `
    background-color: ${props.color};
    `}
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
  margin: 0px 32px;
  align-items: center;
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
  height: 100px;
  margin-bottom: 16px;
`;

export const FooterContent = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  align-items: center;
`;

export const LogoutButton = styled(Button)`
  border-radius: 30px;
`;
