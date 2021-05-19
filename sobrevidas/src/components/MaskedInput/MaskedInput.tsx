import {InputProps} from '@ui-kitten/components';
import React, {useCallback} from 'react';
import {maskCep, maskData, maskPhone, maskCpf} from '../../utils/masks';
import {InputStyled} from './MaskedInput.styles';

interface Props extends InputProps {
  mask: 'data' | 'cep' | 'phone' | 'cpf';
  inputMaskChange: (value: string) => void;
}
const MaskedInput: React.FC<Props> = ({mask, inputMaskChange, ...props}) => {
  const handleChange = useCallback(
    (value: string) => {
      switch (mask) {
        case 'data':
          return inputMaskChange(maskData(value));
        case 'cep':
          return inputMaskChange(maskCep(value));
        case 'phone':
          return inputMaskChange(maskPhone(value));
        case 'cpf':
          return inputMaskChange(maskCpf(value));
      }
    },
    [inputMaskChange, mask],
  );

  return <InputStyled {...props} onChangeText={text => handleChange(text)} />;
};

export default MaskedInput;
