import {Input} from '@ui-kitten/components';
import React, {memo, useContext} from 'react';
import CadastroPacienteContext from '../../contexts/CadastroPacienteContext';
import {FieldSetItem} from '../../pages/CadastrarPacientePage/CadastrarPacientePage.styles';
import MaskedInput from '../MaskedInput/MaskedInput';

interface Props {}
const FieldSetDadosContato: React.FC<Props> = ({}) => {
  const {newPaciente, setNewPaciente} = useContext(CadastroPacienteContext);

  return (
    <>
      <FieldSetItem>
        <Input
          value={newPaciente.email}
          onChangeText={email => {
            setNewPaciente(old => ({...old, email: email}));
          }}
          label={'E-mail'}
          placeholder="Inserir e-mail"
        />
      </FieldSetItem>

      <FieldSetItem>
        <MaskedInput
          valueParam={newPaciente.telefoneCelular}
          keyboardType="number-pad"
          maxLength={15}
          placeholder="Digite o telefone"
          label={'Tel. (DDD + número)'}
          mask="phone"
          inputMaskChange={telefoneCelular => {
            setNewPaciente(old => ({...old, telefoneCelular}));
          }}
        />
      </FieldSetItem>

      <FieldSetItem>
        <MaskedInput
          valueParam={newPaciente.telefoneResponsavel}
          keyboardType="number-pad"
          maxLength={15}
          placeholder="Digite o telefone do responsável"
          label={'Tel. responsável (DDD + número)'}
          mask="phone"
          inputMaskChange={telefoneResponsavel => {
            setNewPaciente(old => ({...old, telefoneResponsavel}));
          }}
        />
      </FieldSetItem>
    </>
  );
};

export default memo(FieldSetDadosContato);
