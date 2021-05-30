import {Layout, Text} from '@ui-kitten/components';
import styled from 'styled-components/native';
import {buildStyledShadow} from '../../styles/buildShadow';

const shadow = buildStyledShadow(10);

export const FeedbackContainer = styled(Layout)`
  flex: 1;
`;
export const HeaderFeedback = styled(Layout)`
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex: 0.6;
`;

export const OptionsFeedback = styled(Layout)`
  flex: 0.4;
  /* background-color: green; */
  flex-direction: row;
  justify-content: space-around;
  /* align-items: center; */
`;

export const CardFeedback = styled(Layout)`
  ${shadow}
  border-radius: 20px;
  height: 140px;
  width: 140px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const TextCard = styled(Text)`
  text-align: center;
  margin: 0px 16px;
`;
