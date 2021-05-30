import {Input} from '@ui-kitten/components';
import React, {memo, useContext} from 'react';
import CadastroPacienteContext from '../../contexts/CadastroPacienteContext';
import {FieldSetItem} from '../../styles/index.styles';
import SearchBairros from '../SearchBairros/SearchBairros';

interface Props {}
const FieldSetDadosEndereco: React.FC<Props> = ({}) => {
  const {newPaciente, setNewPaciente, setCurrentEndereco} = useContext(
    CadastroPacienteContext,
  );

  return (
    <>
      <FieldSetItem level="2">
        <SearchBairros
          onSelect={(bairro, cidade) => {
            setNewPaciente(old => ({...old, idBairro: bairro.id}));
            setCurrentEndereco({
              bairro: bairro,
              cidade: cidade,
            });
          }}
        />
      </FieldSetItem>

      <FieldSetItem level="2">
        <Input
          value={newPaciente.enderecoCompleto}
          placeholder="Informe o endereço completo"
          onChangeText={enderecoCompleto =>
            setNewPaciente(old => ({...old, enderecoCompleto}))
          }
          label={'Endereço completo'}
        />
      </FieldSetItem>
    </>
  );
};

export default memo(FieldSetDadosEndereco);
