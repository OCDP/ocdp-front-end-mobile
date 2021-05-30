import {Text} from '@ui-kitten/components';
import React, {memo} from 'react';
// import CadastroAtendimentoContext from '../../contexts/CadastroAtendimentoContext';

interface Props {}
const FieldSetSubRegioes: React.FC<Props> = () => {
  // const {atendimento, setAtendimento} = useContext(CadastroAtendimentoContext);

  return (
    <>
      <Text category="c2">FieldSetSubRegioes</Text>
    </>
  );
};

export default memo(FieldSetSubRegioes);
