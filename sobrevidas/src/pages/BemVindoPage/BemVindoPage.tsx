import React from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../assets/img/Logo';
import {BemVindoContainer, TextContainer, ButtonContainer} from './Styles';
import {version} from '../../utils/constants';

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
            icon={<Icon name="instagram" size={45} />}
            onPress={() => navigation.navigate('LoginPage')}
            title="Continuar"
          />
          <Icon.Button name="facebook" onPress={() => {}}>
            Login with Facebook
          </Icon.Button>
        </ButtonContainer>
        <TextContainer>v{version}</TextContainer>
      </BemVindoContainer>
    </PageContainer>
  );
};

export default BemVindoPage;
