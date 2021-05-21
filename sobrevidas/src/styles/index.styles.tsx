import {Layout} from '@ui-kitten/components';
import styled from 'styled-components';

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
