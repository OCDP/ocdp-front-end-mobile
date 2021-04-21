import React from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import Logo from '../../assets/img/Logo';
import {
  BemVindoContainer,
  TextContainer,
  ButtonContainer,
} from './BemVindoPage.styles';
import {version} from '../../utils/constants';
import {Button} from '@ui-kitten/components';
import {enter} from '../../components/icons';

const BemVindoPage = ({navigation}: any) => {
  return (
    <PageContainer>
      <BemVindoContainer>
        <Logo size={200} />
        <TextContainer>
          Rastreamento e Monitoramento do Grupo de Risco ao Câncer de Boca
        </TextContainer>
        <ButtonContainer>
          <Button
            accessoryRight={enter}
            onPress={() => {
              navigation.navigate('LoginPage');
            }}>
            login
          </Button>
        </ButtonContainer>
        <TextContainer>v{version}</TextContainer>
      </BemVindoContainer>
    </PageContainer>
  );
};

export default BemVindoPage;
