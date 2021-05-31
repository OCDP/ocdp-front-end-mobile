import {Layout} from '@ui-kitten/components';
import {View} from 'react-native';
import styled from 'styled-components';

export const HeaderContainer = styled(View)`
  margin-top: 32px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 8px;
`;

export const HeaderLine = styled(Layout)<{color: string}>`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 50px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 50px;
  height: 100px;
  width: 100%;
  position: absolute;
  top: 0px;
  ${props =>
    `
    background-color: ${props.color};
    `}
`;

export const LogoContainer = styled(Layout)`
  height: 90px;
  width: 90px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;

export const InfosHeader = styled(View)`
  flex-direction: column;
  margin: 0px 32px;
  align-items: center;
`;
