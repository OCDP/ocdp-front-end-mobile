import {CheckBox} from '@ui-kitten/components';
import React, {memo, useCallback, useContext} from 'react';
import CadastroAtendimentoContext from '../../contexts/CadastroAtendimentoContext';
import FadeLoading from '../FadeLoading/FadeLoading';
import {FieldSetItem} from '../../styles/index.styles';
import {ImagemRegiao} from './FieldSetRegioesLesoes.styles';

interface Props {}
const FieldSetRegioesLesoes: React.FC<Props> = () => {
  const {atendimento, setAtendimento, loading, choicesRegioes} = useContext(
    CadastroAtendimentoContext,
  );

  const updateArray = useCallback(
    (value: number) => {
      if (atendimento.regioesLesoes.some(regiao => regiao.id === value)) {
        const index = atendimento.regioesLesoes.map(e => e.id).indexOf(value);
        const oldRegioes = [...atendimento.regioesLesoes];
        oldRegioes.splice(index, 1);
        setAtendimento(old => ({...old, regioesLesoes: oldRegioes}));
      } else {
        const newRegiao = choicesRegioes.find(regiao => regiao.id === value);
        setAtendimento(old => ({
          ...old,
          regioesLesoes: [...old.regioesLesoes, newRegiao!],
        }));
      }
    },
    [atendimento, choicesRegioes, setAtendimento],
  );

  return (
    <>
      <FadeLoading loading={loading} />
      {choicesRegioes && choicesRegioes.length > 0 && (
        <>
          {choicesRegioes.map((regItem, i) => (
            <FieldSetItem key={i} level="2">
              <CheckBox
                checked={atendimento.regioesLesoes.some(
                  regiao => regiao.id === regItem.id,
                )}
                onChange={() => updateArray(regItem.id)}>
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
