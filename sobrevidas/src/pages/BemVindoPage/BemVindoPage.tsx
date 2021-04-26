import React from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import {
  BemVindoContainer,
  ButtonContainer,
  ButtonGoLogin,
  WaveContainer,
} from './BemVindoPage.styles';

import {withStyles} from '@ui-kitten/components';
import SliderIntro from '../../components/SliderIntro/SliderIntro';

interface Props {
  navigation?: any;
}

export const BemVindoPage: React.FC<Props> = ({navigation, ...props}) => {
  const {eva, style} = props as any;

  return (
    <PageContainer>
      <BemVindoContainer>
        <WaveContainer level="2" />
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

export default withStyles(BemVindoPage, theme => ({
  buttonLoginGradient: {
    backgroundColor: theme['color-primary-500'],
  },
}));
