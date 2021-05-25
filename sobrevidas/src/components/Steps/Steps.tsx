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

type ChildrenProp = {
  children: React.ReactNode;
  label: string;
};

interface Props {
  childrens: ChildrenProp[];
  onComplete: (values: any) => void;
}
const Steps: React.FC<Props> = ({childrens, onComplete}) => {
  const [index, setIndex] = useState(1);
  const currentStep = useMemo(() => childrens[index - 1].children, [
    childrens,
    index,
  ]);
  const currentDescription = useMemo(() => childrens[index - 1].label, [
    childrens,
    index,
  ]);
  const isFirst = useMemo(() => index === 1, [index]);
  const isLast = useMemo(() => index === childrens.length, [
    childrens.length,
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
        <ProgressSteps size={childrens.length} step={index} />
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
