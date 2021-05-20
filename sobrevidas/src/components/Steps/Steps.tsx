import React, {useMemo, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {minimalBack, minimalAvance, check} from '../icons';
import {ProgressSteps} from '../ProgressSteps/ProgressSteps';
import {
  CurrentStep,
  StepDescription,
  StepsContainer,
  FooterButtonsContainer,
  FooterButton,
  ProgressStepsContainer,
} from './Steps.styles';

interface Props {
  descriptions: string[];
  children: React.ReactNode[];
  onComplete: (values: any) => void;
}
const Steps: React.FC<Props> = ({descriptions, children, onComplete}) => {
  const [index, setIndex] = useState(1);
  const currentStep = useMemo(() => children[index - 1], [children, index]);
  const currentDescription = useMemo(() => descriptions[index - 1], [
    descriptions,
    index,
  ]);
  const isFirst = useMemo(() => index === 1, [index]);
  const isLast = useMemo(() => index === children.length, [
    children.length,
    index,
  ]);

  const togglePrev = () => {
    setIndex(index - 1);
  };

  const submit = () => {
    if (!isLast) {
      setIndex(index + 1);
    } else {
      onComplete('fiz o submit');
    }
  };

  return (
    <StepsContainer>
      <ProgressStepsContainer>
        <ProgressSteps size={children.length} step={index} />
      </ProgressStepsContainer>
      {index && (
        <>
          <StepDescription category="c4">{currentDescription}</StepDescription>
          <ScrollView>
            <CurrentStep>{currentStep}</CurrentStep>
          </ScrollView>
        </>
      )}
      <FooterButtonsContainer>
        <FooterButton
          appearance="outline"
          size="small"
          accessoryRight={minimalBack}
          onPress={togglePrev}
          disabled={isFirst}
        />
        <FooterButton
          appearance={isLast ? 'filled' : 'outline'}
          size="small"
          accessoryRight={isLast ? check : minimalAvance}
          onPress={submit}
        />
      </FooterButtonsContainer>
    </StepsContainer>
  );
};

export default Steps;
