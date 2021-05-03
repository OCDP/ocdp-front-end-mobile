import {Input} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import {FieldSetItem} from '../../pages/CadastrarPacientePage/CadastrarPacientePage.styles';
import SearchBairros from '../SearchBairros/SearchBairros';
import SearchCidades from '../SearchCidades/SearchCidades';

interface Props {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}
const FieldSetDadosEndereco: React.FC<Props> = ({
  register,
  setValue,
  getValues,
}) => {
  const [idCidade, setIdCidade] = useState<number>();

  useEffect(() => {
    register('idBairro');
    register('enderecoCompleto');
  }, [register]);

  return (
    <>
      <FieldSetItem>
        <SearchCidades
          onSelect={cidade => {
            setIdCidade(undefined);
            setTimeout(() => {
              setIdCidade(cidade.id);
            });
          }}
        />
      </FieldSetItem>

      {idCidade ? (
        <FieldSetItem>
          <SearchBairros
            cidadeId={idCidade}
            onSelect={bairro => setValue('idBairro', bairro.id)}
          />
        </FieldSetItem>
      ) : (
        <></>
      )}

      <FieldSetItem>
        <Input
          onChangeText={value => setValue('enderecoCompleto', value)}
          value={getValues('enderecoCompleto')}
          label={'Endereço completo'}
        />
      </FieldSetItem>
    </>
  );
};

export default FieldSetDadosEndereco;
