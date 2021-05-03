import {Input, Radio, RadioGroup} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import {FieldSetItem} from '../../pages/CadastrarPacientePage/CadastrarPacientePage.styles';

interface Props {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}
const FieldSetDadosPessoais: React.FC<Props> = ({
  register,
  setValue,
  getValues,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sexoArr = {0: 'M', 1: 'F'} as Dict<string>;

  useEffect(() => {
    register('nome');
    register('nomeDaMae');
    register('dataNascimento');
    register('sexo');
    register('cpf');
  }, [register]);

  return (
    <>
      <FieldSetItem>
        <Input
          onChangeText={value => setValue('nome', value)}
          value={getValues('nome')}
          label={'Nome'}
        />
      </FieldSetItem>

      <FieldSetItem>
        <Input
          onChangeText={value => setValue('nomeDaMae', value)}
          value={getValues('nomeDaMae')}
          label={'Nome da Mãe'}
        />
      </FieldSetItem>

      <FieldSetItem>
        <Input
          onChangeText={value => setValue('dataNascimento', value)}
          value={getValues('dataNascimento')}
          label={'Data de nascimento'}
        />
      </FieldSetItem>

      <FieldSetItem>
        <RadioGroup
          onChange={value => {
            setSelectedIndex(value);
            setValue('sexo', sexoArr[value]);
          }}
          selectedIndex={selectedIndex}>
          <Radio>Masculino</Radio>
          <Radio>Feminino</Radio>
        </RadioGroup>
      </FieldSetItem>

      <FieldSetItem>
        <Input
          onChangeText={value => setValue('cpf', value)}
          value={getValues('cpf')}
          label={'CPF'}
        />
      </FieldSetItem>
    </>
  );
};

export default FieldSetDadosPessoais;
