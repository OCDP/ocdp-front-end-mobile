import React, {memo} from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import {
  BemVindoContainer,
  ButtonContainer,
  ButtonGoLogin,
} from './BemVindoPage.styles';

import {withStyles} from '@ui-kitten/components';
import SliderIntro from '../../components/SliderIntro/SliderIntro';
import {WaveContainer} from '../../styles/index.styles';

interface Props {
  navigation?: any;
}

export const BemVindoPage: React.FC<Props> = ({navigation, ...props}) => {
  const {eva, style} = props as any;

  return (
    <PageContainer>
      <BemVindoContainer>
        <WaveContainer level="3" />
        <SliderIntro />
        <ButtonContainer>
          <ButtonGoLogin
            style={[eva.style.buttonLoginGradient, style]}
            onPress={() => {
              navigation.navigate('LoginPage');
            }}>
            Continuar
          </ButtonGoLogin>
        </ButtonContainer>
      </BemVindoContainer>
    </PageContainer>
  );
};

export default withStyles(memo(BemVindoPage), theme => ({
  buttonLoginGradient: {
    backgroundColor: theme['color-primary-500'],
  },
}));
