import {CheckBox} from '@ui-kitten/components';
import React, {memo, useCallback, useContext} from 'react';
import CadastroAtendimentoContext from '../../contexts/CadastroAtendimentoContext';
import FadeLoading from '../FadeLoading/FadeLoading';
import {FieldSetItem} from '../../styles/index.styles';
import {ImagemRegiao} from './FieldSetRegioesLesoes.styles';

interface Props {}
const FieldSetRegioesLesoes: React.FC<Props> = () => {
  const {
    loading,
    choicesRegioes,
    currentRegioes,
    setCurrentRegioes,
  } = useContext(CadastroAtendimentoContext);

  const updateArray = useCallback(
    (value: number) => {
      if (currentRegioes.some(regiao => regiao.id === value)) {
        const index = currentRegioes.map(e => e.id).indexOf(value);
        const oldRegioes = [...currentRegioes];
        oldRegioes.splice(index, 1);
        setCurrentRegioes(oldRegioes);
      } else {
        const newRegiao = choicesRegioes.find(regiao => regiao.id === value);
        setCurrentRegioes(old => [...old, newRegiao!]);
      }
    },
    [choicesRegioes, currentRegioes, setCurrentRegioes],
  );

  return (
    <>
      <FadeLoading loading={loading} />
      {choicesRegioes && choicesRegioes.length > 0 && (
        <>
          {choicesRegioes.map((regItem, i) => (
            <FieldSetItem key={i} level="2">
              <CheckBox
                checked={currentRegioes.some(
                  regiao => regiao.id === regItem.id,
                )}
                onChange={() => updateArray(regItem.id!)}>
                {regItem.nome}
              </CheckBox>
              <ImagemRegiao source={{uri: regItem.imagemBase64}} />
            </FieldSetItem>
          ))}
        </>
      )}
    </>
  );
};

export default memo(FieldSetRegioesLesoes);
