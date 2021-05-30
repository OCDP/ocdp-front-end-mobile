import {Text} from '@ui-kitten/components';
import React, {memo, useContext} from 'react';
import CadastroAtendimentoContext from '../../contexts/CadastroAtendimentoContext';
import {FieldSetItem} from '../../styles/index.styles';
import {
  ImageRegiaoContainer,
  ListSubregioesContainer,
  RegiaoContent,
} from './FieldSetSuRegioes.styles';

interface Props {}
const FieldSetSubRegioes: React.FC<Props> = () => {
  const {atendimento, setAtendimento} = useContext(CadastroAtendimentoContext);

  return (
    <>
      {atendimento.regioesLesoes.map(regiao => (
        <FieldSetItem>
          <RegiaoContent>
            <ImageRegiaoContainer source={{uri: regiao.imagemBase64}} />
            <ListSubregioesContainer>
              <Text>ta ta </Text>
            </ListSubregioesContainer>
          </RegiaoContent>
        </FieldSetItem>
      ))}
    </>
  );
};

export default memo(FieldSetSubRegioes);
