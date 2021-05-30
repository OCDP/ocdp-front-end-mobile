import {Text, Toggle} from '@ui-kitten/components';
import React, {memo} from 'react';
// import CadastroAtendimentoContext from '../../contexts/CadastroAtendimentoContext';

interface Props {
  onChangeLesoes: (possuiLesoes: boolean) => void;
  possuiLesoes: boolean;
}
const FieldSetFatoresDeRisco: React.FC<Props> = ({
  onChangeLesoes,
  possuiLesoes,
}) => {
  // const {atendimento, setAtendimento} = useContext(CadastroAtendimentoContext);

  return (
    <>
      <Text category="c2">FieldSetFatoresDeRisco</Text>
      <Toggle checked={possuiLesoes} onChange={onChangeLesoes}>
        Possui lesoes
      </Toggle>
    </>
  );
};

export default memo(FieldSetFatoresDeRisco);
