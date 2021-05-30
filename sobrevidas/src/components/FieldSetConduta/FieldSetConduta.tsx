import {Text} from '@ui-kitten/components';
import React, {memo} from 'react';
// import CadastroAtendimentoContext from '../../contexts/CadastroAtendimentoContext';

interface Props {}
const FieldSetConduta: React.FC<Props> = () => {
  // const {atendimento, setAtendimento} = useContext(CadastroAtendimentoContext);

  return (
    <>
      <Text category="c2">FieldSetConduta</Text>
    </>
  );
};

export default memo(FieldSetConduta);
