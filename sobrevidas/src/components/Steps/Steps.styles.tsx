import {Layout, Text, Button} from '@ui-kitten/components';
import styled from 'styled-components/native';

export const ProgressStepsContainer = styled(Layout)`
  padding: 8px 16px 0px 16px;
`;

export const StepsContainer = styled(Layout)`
  flex: 1;
  justify-content: center;
  margin: 0px 0px;
`;

export const StepDescription = styled(Text)`
  margin: 0px 16px 8px 16px;
  text-align: center;
`;

export const CurrentStep = styled(Layout)`
  padding: 0px 16px;
  height: 100%;
  flex: 1;
`;

export const FooterButtonsContainer = styled(Layout)`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  margin: 8px 0px;
`;

export const FooterButton = styled(Button)`
  border-radius: 20px;
  height: 20px;
  width: 60px;
`;
