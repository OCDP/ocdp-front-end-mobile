import {Input, Radio, RadioGroup} from '@ui-kitten/components';
import React, {memo, useContext, useMemo} from 'react';
import CadastroPacienteContext from '../../contexts/CadastroPacienteContext';
import {FieldSetItem} from '../../styles/index.styles';
import MaskedInput from '../MaskedInput/MaskedInput';

interface Props {}
const FieldSetDadosPessoais: React.FC<Props> = ({}) => {
  const sexoArr = {0: 'MASCULINO', 1: 'FEMININO'} as Dict<Models.Sexo>;

  const {newPaciente, setNewPaciente} = useContext(CadastroPacienteContext);
  const selectedIndex = useMemo(
    () => (newPaciente.sexo === 'MASCULINO' ? 0 : 1),
    [newPaciente.sexo],
  );

  return (
    <>
      <FieldSetItem level="2">
        <Input
          value={newPaciente.nome}
          placeholder="Informe o nome do paciente"
          onChangeText={nome => {
            setNewPaciente(old => ({
              ...old,
              nome,
            }));
          }}
          label={'Nome'}
        />
      </FieldSetItem>

      <FieldSetItem level="2">
        <Input
          value={newPaciente.nomeDaMae}
          placeholder="Informe o nome da mãe"
          onChangeText={nomeDaMae => {
            setNewPaciente(old => ({
              ...old,
              nomeDaMae,
            }));
          }}
          label={'Nome da Mãe'}
        />
      </FieldSetItem>

      <FieldSetItem level="2">
        <MaskedInput
          valueParam={newPaciente.dataNascimento}
          keyboardType="number-pad"
          maxLength={10}
          placeholder="Digite a data"
          label={'Data de nascimento'}
          mask="data"
          inputMaskChange={dataNascimento => {
            setNewPaciente(old => ({
              ...old,
              dataNascimento,
            }));
          }}
        />
      </FieldSetItem>

      <FieldSetItem level="2">
        <MaskedInput
          valueParam={newPaciente.cpf}
          keyboardType="number-pad"
          maxLength={14}
          placeholder="Digitar CPF"
          label={'CPF'}
          mask="cpf"
          inputMaskChange={cpf => {
            setNewPaciente(old => ({
              ...old,
              cpf,
            }));
          }}
        />
      </FieldSetItem>

      <FieldSetItem level="2">
        <RadioGroup
          onChange={value => {
            setNewPaciente(old => ({
              ...old,
              sexo: sexoArr[value],
            }));
          }}
          selectedIndex={newPaciente.sexo ? selectedIndex : undefined}>
          <Radio>Masculino</Radio>
          <Radio>Feminino</Radio>
        </RadioGroup>
      </FieldSetItem>
    </>
  );
};

export default memo(FieldSetDadosPessoais);
