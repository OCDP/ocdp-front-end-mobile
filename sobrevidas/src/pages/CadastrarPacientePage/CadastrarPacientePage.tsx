import { Calendar, Input, NativeDateService, Select } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ScrollView, Text, View } from 'react-native';
import PageContainer from '../../components/PageContainer/PageContainer';
import ProgressSteps from '../../components/ProgressSteps/ProgressSteps';
import { HomeText } from './CadastrarPacientePage.styles';

interface Props { }

const CadastrarPacientePage: React.FC<Props> = ({ navigation }: any) => {

  const [date, setDate] = useState(new Date());
  const { register, setValue, handleSubmit } = useForm()

  useEffect(() => {
    register('nome')
    register('dataNascimento')
    register('cpf')
    register('sexo')
    register('nomeMae')
  }, [register])

  return (
    <PageContainer withHeader pageTitle="Cadastrar Paciente" navigation={navigation}>
      <ProgressSteps size={3} step={3} flexInfo={0.05}></ProgressSteps>
      <ScrollView style={{ flex: 1, paddingHorizontal: 12, paddingVertical: 12 }}>
        <View style={{ paddingBottom: 12 }}>
          <Input onChangeText={(newText => setValue('nome', newText))} label={"Nome"}></Input>
        </View>
        <View style={{ paddingBottom: 12 }}>
          <Text>
            Selected date: {date.toLocaleDateString()}
          </Text>

          <Calendar
            date={date}
            onSelect={nextDate => setDate(nextDate)}
          />
        </View>
        <View style={{ paddingBottom: 12 }}>
          <Input onChangeText={(newText => setValue('cpf', newText))} label={"Nome"}></Input>
        </View>
        <View style={{ paddingBottom: 12 }}>
          <Select value={"aa"} onSelect={(newSelect => setValue('sexo', newSelect))} label={"Nome"}></Select>
        </View>
        <View style={{ paddingBottom: 12 }}>
          <Input onChangeText={(newText => setValue('nomeMae', newText))} label={"Nome"}></Input>
        </View>
      </ScrollView>
    </PageContainer>
  );
};

export default CadastrarPacientePage;
