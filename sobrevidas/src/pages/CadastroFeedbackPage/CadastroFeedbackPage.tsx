import {Text} from '@ui-kitten/components';
import React, {memo, useContext} from 'react';
import AcompPrancheta from '../../assets/img/AcompPrancheta';
import CheckedFeedback from '../../assets/img/CheckedFeedback';
import GroupUsers from '../../assets/img/GroupUsers';
import PageContainer from '../../components/PageContainer/PageContainer';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import {
  FeedbackContainer,
  HeaderFeedback,
  OptionsFeedback,
  CardFeedback,
  TextCard,
} from './CadastroFeedbackPage.styles';

interface Props {}
const CadastroFeedbackPage: React.FC<Props> = ({navigation, route}: any) => {
  const {id} = route.params;
  const {themeColors} = useContext(UsuarioLogadoContext);

  return (
    <PageContainer withHeader pageTitle="Sucesso!" navigation={navigation}>
      <FeedbackContainer>
        <HeaderFeedback>
          <CheckedFeedback
            size={130}
            color={themeColors['color-success-500']}
          />
          <Text category="h4">Usuário cadastrado</Text>
        </HeaderFeedback>
        <OptionsFeedback>
          <CardFeedback
            onTouchStart={() => navigation.navigate('HomePage')}
            level="2">
            <GroupUsers size={70} color={themeColors['color-primary-300']} />
            <TextCard category="c2">Exibir todos os pacientes</TextCard>
          </CardFeedback>
          <CardFeedback
            onTouchStart={() =>
              navigation.navigate('RegistrarAtendimentoPage', {id: id})
            }
            level="2">
            <AcompPrancheta
              size={70}
              color={themeColors['color-primary-300']}
              colorShadow={themeColors['color-primary-600']}
              colorCross={themeColors['color-danger-500']}
            />
            <TextCard category="c2">Inserir um novo atendimento</TextCard>
          </CardFeedback>
        </OptionsFeedback>
      </FeedbackContainer>
    </PageContainer>
  );
};

export default memo(CadastroFeedbackPage);
