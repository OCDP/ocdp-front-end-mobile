import styled from 'styled-components/native';
import {Layout, Text} from '@ui-kitten/components';
import {buildStyledShadow} from '../../styles/buildShadow';

const shadow = buildStyledShadow(12);

export const Container = styled(Layout)`
  flex: 1;
`;

export const HeaderContainer = styled(Layout)`
  height: 50px;
  top: 0px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TextPageTitle = styled(Text)``;

export const ChildContain = styled(Layout)`
  flex: 1;
`;

export const ContainerFooter = styled(Layout)`
  ${shadow}
  flex: 1;
  height: 60px;
  position: absolute;
  width: 100%;
  bottom: 0px;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
`;

export const ContainerItem = styled(Layout)`
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const LineCurrentRoute = styled.View`
  height: 4px;
  width: 45px;
  position: absolute;
  bottom: 4px;
  border-radius: 10px;
`;

export const ItemMenuText = styled(Text)`
  font-size: 10px;
  position: absolute;
  bottom: 1px;
`;
