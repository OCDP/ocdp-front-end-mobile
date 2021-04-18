import React from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
            iconRight
            icon={
              <Icon
                style={{marginLeft: 10}}
                color="#fff"
                name="login-variant"
                size={20}
              />
            }
            onPress={() => navigation.navigate('LoginPage')}
            title="Continuar"
          />
        </ButtonContainer>
        <TextContainer>v{version}</TextContainer>
      </BemVindoContainer>
    </PageContainer>
  );
};

export default BemVindoPage;
