import {InputProps} from '@ui-kitten/components';
import React, {useCallback, useState} from 'react';
import {maskCep, maskData, maskPhone, maskCpf} from '../../utils/masks';
import {InputStyled} from './MaskedInput.styles';

interface Props extends InputProps {
  mask: 'data' | 'cep' | 'phone' | 'cpf';
  valueParam?: string;
  inputMaskChange: (value: string) => void;
}
const MaskedInput: React.FC<Props> = ({
  mask,
  inputMaskChange,
  valueParam,
  ...props
}) => {
  const [value, setValue] = useState<string>();

  const handleChange = useCallback(
    (text: string) => {
      if (mask === 'data') {
        inputMaskChange(maskData(text));
        setValue(maskData(text));
      }

      if (mask === 'cep') {
        inputMaskChange(maskCep(text));
        setValue(maskCep(text));
      }

      if (mask === 'phone') {
        inputMaskChange(maskPhone(text));
        setValue(maskPhone(text));
      }

      if (mask === 'cpf') {
        inputMaskChange(maskCpf(text));
        setValue(maskCpf(text));
      }
    },
    [inputMaskChange, mask],
  );

  return (
    <InputStyled
      {...props}
      value={valueParam ? valueParam : value}
      onChangeText={text => handleChange(text)}
    />
  );
};

export default MaskedInput;
