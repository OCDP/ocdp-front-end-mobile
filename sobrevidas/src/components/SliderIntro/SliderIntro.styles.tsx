import {Layout, Text} from '@ui-kitten/components';
import styled from 'styled-components/native';

export const SliderContent = styled(Layout)`
  height: 670px;
  background-color: transparent;
`;

export const ItemSliderContainer = styled(Layout)`
  height: 580px;
  justify-content: space-around;
  align-items: center;
  background-color: transparent;
  text-align: left;
`;

export const TextContainer = styled(Layout)`
  margin: 0px 30px;
  background-color: transparent;
`;

export const TitleSliderContainer = styled(Text)`
  font-size: 24px;
`;

export const SubtitleSliderContainer = styled(Text)`
  font-size: 16px;
`;
