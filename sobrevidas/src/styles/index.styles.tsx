import {Button, Layout} from '@ui-kitten/components';
import styled from 'styled-components';
import {buildStyledShadow} from './buildShadow';
const shadow = buildStyledShadow(8);

export const WaveContainer = styled(Layout)`
  position: absolute;
  top: 0;
  border-top-left-radius: 150px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 150px;
  width: 100%;
  height: 100%;
  top: 0px;
`;

export const DetailDivider = styled(Layout)`
  height: 60px;
  width: 5px;
  margin: 0px 12px 0px 2px;
  border-radius: 16px;
`;

export const ButtonFooterContainer = styled(Layout)`
  display: flex;
  align-items: center;
  bottom: 8px;
`;

export const ButtonFooterBig = styled(Button)`
  ${shadow}
  border-radius: 30px;
`;

export const FieldSetItem = styled(Layout)`
  margin: 8px 0px;
  padding: 18px 15px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 20px;
`;
