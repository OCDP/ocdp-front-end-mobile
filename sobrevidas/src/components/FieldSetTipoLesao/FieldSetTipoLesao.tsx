import {Text} from '@ui-kitten/components';
import React, {memo} from 'react';
// import CadastroAtendimentoContext from '../../contexts/CadastroAtendimentoContext';

interface Props {}
const FieldSetTipoLesao: React.FC<Props> = () => {
  // const {atendimento, setAtendimento} = useContext(CadastroAtendimentoContext);

  return (
    <>
      <Text category="c2">FieldSetTipoLesao</Text>
    </>
  );
};

export default memo(FieldSetTipoLesao);
