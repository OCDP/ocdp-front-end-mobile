import {Layout, Text, Button} from '@ui-kitten/components';
import styled from 'styled-components/native';
import {ProgressSteps} from '../ProgressSteps/ProgressSteps';

export const StepsContainer = styled(Layout)`
  flex: 1;
  justify-content: center;
  margin: 8px 16px;
`;

export const StepsProgress = styled(ProgressSteps)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const StepDescription = styled(Text)`
  margin-top: 8px;
  text-align: center;
`;

export const CurrentStep = styled(Layout)`
  flex: 1;
`;

export const FooterButtonsContainer = styled(Layout)`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 32px;
`;

export const FooterButton = styled(Button)`
  border-radius: 50px;
  width: 50px;
  height: 50px;
`;
