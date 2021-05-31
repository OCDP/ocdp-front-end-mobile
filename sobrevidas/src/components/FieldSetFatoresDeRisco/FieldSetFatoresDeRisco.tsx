import {CheckBox, Divider} from '@ui-kitten/components';
import React, {memo, useContext, useCallback} from 'react';
import CadastroAtendimentoContext from '../../contexts/CadastroAtendimentoContext';
import FadeLoading from '../FadeLoading/FadeLoading';
import {FieldSetItem} from '../../styles/index.styles';
interface Props {
  onChangeLesoes: (possuiLesoes: boolean) => void;
  possuiLesoes: boolean;
}
const FieldSetFatoresDeRisco: React.FC<Props> = ({
  onChangeLesoes,
  possuiLesoes,
}) => {
  const {
    atendimento,
    setAtendimento,
    loading,
    choicesFatoresRisco,
  } = useContext(CadastroAtendimentoContext);

  const updateArray = useCallback(
    (value: number) => {
      if (atendimento.fatoresDeRisco?.includes(value)) {
        const index = atendimento.fatoresDeRisco.indexOf(value);
        const fatoresDeRisco = [...atendimento.fatoresDeRisco];
        fatoresDeRisco.splice(index, 1);
        setAtendimento(old => ({...old, fatoresDeRisco}));
      } else {
        setAtendimento(old => ({
          ...old,
          fatoresDeRisco: [...old.fatoresDeRisco, value],
        }));
      }
    },
    [atendimento, setAtendimento],
  );

  return (
    <>
      <FadeLoading loading={loading} />
      {choicesFatoresRisco && choicesFatoresRisco.length > 0 && (
        <>
          {choicesFatoresRisco.map((fator, i) => (
            <FieldSetItem key={i} level="2">
              <CheckBox
                checked={atendimento.fatoresDeRisco?.includes(fator.id)}
                onChange={() => updateArray(fator.id)}>
                {fator.nome}
              </CheckBox>
            </FieldSetItem>
          ))}
          <Divider />
          <FieldSetItem level="4">
            <CheckBox onChange={onChangeLesoes} checked={possuiLesoes}>
              Possui lesões
            </CheckBox>
          </FieldSetItem>
        </>
      )}
    </>
  );
};

export default memo(FieldSetFatoresDeRisco);
