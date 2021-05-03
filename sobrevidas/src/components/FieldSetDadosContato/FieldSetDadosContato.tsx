import {Input} from '@ui-kitten/components';
import React, {useEffect} from 'react';
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
const FieldSetDadosContato: React.FC<Props> = ({
  register,
  setValue,
  getValues,
}) => {
  useEffect(() => {
    register('email');
    register('telefoneCelular');
    register('telefoneResponsavel');
  }, [register]);

  return (
    <>
      <FieldSetItem>
        <Input
          onChangeText={value => setValue('email', value)}
          value={getValues('email')}
          label={'E-mail'}
        />
      </FieldSetItem>

      <FieldSetItem>
        <Input
          onChangeText={value => setValue('telefoneCelular', value)}
          value={getValues('telefoneCelular')}
          label={'Telefone'}
        />
      </FieldSetItem>

      <FieldSetItem>
        <Input
          onChangeText={value => setValue('telefoneResponsavel', value)}
          value={getValues('telefoneResponsavel')}
          label={'Telefone responsável'}
        />
      </FieldSetItem>
    </>
  );
};

export default FieldSetDadosContato;
