import React, {useMemo, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {minimalBack, minimalAvance, check} from '../icons';
import {
  CurrentStep,
  StepDescription,
  StepsContainer,
  StepsProgress,
  FooterButtonsContainer,
  FooterButton,
} from './Steps.styles';

interface Props {
  description: string[];
  children: React.ReactNode[];
  onComplete: (values: any) => void;
}
const Steps: React.FC<Props> = ({description, children, onComplete}) => {
  const [index, setIndex] = useState(1);
  const currentStep = useMemo(() => children[index - 1], [children, index]);
  const currentDescription = useMemo(() => description[index - 1], [
    description,
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
      <StepsProgress size={children.length} step={index + 1} flexInfo={0.09} />
      {index && (
        <>
          <StepDescription category="h5">{currentDescription}</StepDescription>
          <ScrollView>
            <CurrentStep>{currentStep}</CurrentStep>
          </ScrollView>
        </>
      )}
      <FooterButtonsContainer>
        <FooterButton
          appearance="outline"
          size="medium"
          accessoryRight={minimalBack}
          onPress={togglePrev}
          disabled={isFirst}
        />
        <FooterButton
          appearance={isLast ? 'filled' : 'outline'}
          size="medium"
          accessoryRight={isLast ? check : minimalAvance}
          onPress={submit}
        />
      </FooterButtonsContainer>
    </StepsContainer>
  );
};

export default Steps;
