import styled from 'styled-components/native';
import {Layout, Text} from '@ui-kitten/components';
import {View} from 'react-native';

export const Container = styled(Layout)`
  flex: 1;
`;

export const HeaderContainer = styled(Layout)`
  height: 60px;
  top: 0px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderItem = styled(View)`
  align-items: center;
  flex: 1;
`;

export const TextPageTitle = styled(Text)`
  text-align: center;
`;

export const ChildContain = styled(Layout)`
  flex: 1;
`;
